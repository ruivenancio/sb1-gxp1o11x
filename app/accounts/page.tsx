import { Suspense } from 'react';
import { AccountsList } from '@/components/accounts/accounts-list';
import { AccountsHeader } from '@/components/accounts/accounts-header';
import { AccountsSkeleton } from '@/components/accounts/accounts-skeleton';

export default function AccountsPage() {
  return (
    <div className="space-y-6">
      <AccountsHeader />
      <Suspense fallback={<AccountsSkeleton />}>
        <AccountsList />
      </Suspense>
    </div>
  );
}