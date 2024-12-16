import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const transactionSchema = z.object({
  date: z.string().transform((str) => new Date(str)),
  description: z.string().min(1),
  amount: z.number(),
  type: z.enum(['INCOME', 'EXPENSE', 'TRANSFER', 'INVESTMENT']),
  category: z.string().optional(),
  accountId: z.string().optional(),
  cardId: z.string().optional(),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const accountId = searchParams.get('accountId');
    const cardId = searchParams.get('cardId');

    const transactions = await prisma.transaction.findMany({
      where: {
        ...(accountId && { accountId }),
        ...(cardId && { cardId }),
      },
      include: {
        account: true,
        card: true,
      },
      orderBy: {
        date: 'desc',
      },
    });

    return NextResponse.json(transactions);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch transactions' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const body = transactionSchema.parse(json);

    const transaction = await prisma.transaction.create({
      data: {
        ...body,
        userId: 'temp-user-id', // Replace with actual user ID from auth
      },
      include: {
        account: true,
        card: true,
      },
    });

    return NextResponse.json(transaction, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: 'Failed to create transaction' },
      { status: 500 }
    );
  }
}