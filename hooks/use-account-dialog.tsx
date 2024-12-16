'use client';

import { create } from 'zustand';
import { Account } from '@/lib/types';

interface AccountDialogStore {
  open: boolean;
  account?: Account;
  openDialog: (account?: Account) => void;
  closeDialog: () => void;
}

export const useAccountDialog = create<AccountDialogStore>((set) => ({
  open: false,
  account: undefined,
  openDialog: (account) => set({ open: true, account }),
  closeDialog: () => set({ open: false, account: undefined }),
}));