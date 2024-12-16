import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const accountSchema = z.object({
  name: z.string().min(1),
  type: z.enum(['CHECKING', 'SAVINGS', 'INVESTMENT', 'CREDIT']),
  currency: z.string().default('USD'),
});

export async function GET() {
  try {
    const accounts = await prisma.account.findMany({
      include: { transactions: true },
    });
    return NextResponse.json(accounts);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch accounts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const body = accountSchema.parse(json);

    const account = await prisma.account.create({
      data: {
        ...body,
        userId: 'temp-user-id', // Replace with actual user ID from auth
      },
    });

    return NextResponse.json(account, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create account' }, { status: 500 });
  }
}