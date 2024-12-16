import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const stockTradeSchema = z.object({
  date: z.string().transform((str) => new Date(str)),
  type: z.enum(['BUY', 'SELL']),
  shares: z.number().positive(),
  pricePerShare: z.number().positive(),
  stockHoldingId: z.string(),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const holdingId = searchParams.get('holdingId');

    const trades = await prisma.stockTrade.findMany({
      where: holdingId ? { stockHoldingId: holdingId } : undefined,
      orderBy: {
        date: 'desc',
      },
    });
    return NextResponse.json(trades);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch stock trades' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const body = stockTradeSchema.parse(json);

    const trade = await prisma.stockTrade.create({
      data: {
        ...body,
        totalAmount: body.shares * body.pricePerShare,
      },
    });

    // Update the stock holding's average cost and shares
    const holding = await prisma.stockHolding.findUnique({
      where: { id: body.stockHoldingId },
    });

    if (holding) {
      const newShares =
        body.type === 'BUY'
          ? Number(holding.shares) + body.shares
          : Number(holding.shares) - body.shares;

      const newAverageCost =
        body.type === 'BUY'
          ? (Number(holding.averageCost) * Number(holding.shares) +
              body.pricePerShare * body.shares) /
            newShares
          : Number(holding.averageCost);

      await prisma.stockHolding.update({
        where: { id: body.stockHoldingId },
        data: {
          shares: newShares,
          averageCost: newAverageCost,
        },
      });
    }

    return NextResponse.json(trade, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: 'Failed to create stock trade' },
      { status: 500 }
    );
  }
}