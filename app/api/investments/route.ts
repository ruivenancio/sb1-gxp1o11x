import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const investmentSchema = z.object({
  name: z.string().min(1),
  type: z.enum(['STOCKS', 'BONDS', 'MUTUAL_FUNDS', 'ETF', 'CRYPTO']),
});

export async function GET() {
  try {
    const investments = await prisma.investment.findMany({
      include: {
        stockHoldings: {
          include: {
            trades: true,
          },
        },
      },
    });
    return NextResponse.json(investments);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch investments' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const body = investmentSchema.parse(json);

    const investment = await prisma.investment.create({
      data: {
        ...body,
        userId: 'temp-user-id', // Replace with actual user ID from auth
      },
    });

    return NextResponse.json(investment, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: 'Failed to create investment' },
      { status: 500 }
    );
  }
}