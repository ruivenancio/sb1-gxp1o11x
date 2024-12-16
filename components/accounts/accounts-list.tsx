'use client';

import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AccountsTable } from '@/components/accounts/accounts-table';
import { useToast } from '@/components/ui/use-toast';
import { Account } from '@/lib/types';

export function AccountsList() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchAccounts() {
      try {
        const response = await fetch('/api/accounts');
        if (!response.ok) throw new Error('Failed to fetch accounts');
        const data = await response.json();
        setAccounts(data);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load accounts',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    }

    fetchAccounts();
  }, [toast]);

  if (loading) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Accounts</CardTitle>
        <CardDescription>
          View and manage all your financial accounts in one place
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AccountsTable accounts={accounts} />
      </CardContent>
    </Card>
  );
}