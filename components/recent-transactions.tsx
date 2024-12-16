'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const transactions = [
  {
    id: '1',
    date: '2024-03-20',
    description: 'Grocery Store',
    amount: -82.54,
    type: 'expense',
  },
  {
    id: '2',
    date: '2024-03-19',
    description: 'Salary Deposit',
    amount: 3200.00,
    type: 'income',
  },
  {
    id: '3',
    date: '2024-03-18',
    description: 'Netflix Subscription',
    amount: -15.99,
    type: 'expense',
  },
  {
    id: '4',
    date: '2024-03-17',
    description: 'Stock Dividend',
    amount: 45.32,
    type: 'income',
  },
];

export function RecentTransactions() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell>{transaction.date}</TableCell>
            <TableCell>{transaction.description}</TableCell>
            <TableCell className={`text-right ${
              transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
            }`}>
              {transaction.type === 'income' ? '+' : '-'}
              ${Math.abs(transaction.amount).toFixed(2)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}