import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const stockHoldingSchema = z.object({
  symbol: z.string().min(1),
  shares: z.number().positive(),
  averageCost: z.number().positive(),
  investmentId: z.string(),
});

export async function GET() {
  try {
    const holdings = await prisma.stockHolding.findMany({
      include: {
        trades: {
          orderBy: {
            date: 'desc',
          },
        },
      },
    });
    return NextResponse.json(holdings);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch stock holdings' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const body = stockHoldingSchema.parse(json);

    const holding = await prisma.stockHolding.create({
      data: {
        ...body,
        userId: 'temp-user-id', // Replace with actual user ID from auth
      },
      include: {
        trades: true,
      },
    });

    return NextResponse.json(holding, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: 'Failed to create stock holding' },
      { status: 500 }
    );
  }
}