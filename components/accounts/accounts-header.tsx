'use client';

import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAccountDialog } from '@/hooks/use-account-dialog';

export function AccountsHeader() {
  const { openDialog } = useAccountDialog();

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Accounts</h1>
        <p className="text-muted-foreground">Manage your financial accounts</p>
      </div>
      <Button onClick={openDialog}>
        <Plus className="mr-2 h-4 w-4" />
        Add Account
      </Button>
    </div>
  );
}