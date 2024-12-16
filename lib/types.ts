export interface Account {
  id: string;
  name: string;
  type: 'CHECKING' | 'SAVINGS' | 'INVESTMENT' | 'CREDIT';
  balance: number;
  currency: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'INCOME' | 'EXPENSE' | 'TRANSFER' | 'INVESTMENT';
  category?: string;
  accountId?: string;
  cardId?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Investment {
  id: string;
  name: string;
  type: 'STOCKS' | 'BONDS' | 'MUTUAL_FUNDS' | 'ETF' | 'CRYPTO';
  userId: string;
  createdAt: string;
  updatedAt: string;
  stockHoldings: StockHolding[];
}

export interface StockHolding {
  id: string;
  symbol: string;
  shares: number;
  averageCost: number;
  userId: string;
  investmentId: string;
  createdAt: string;
  updatedAt: string;
  trades: StockTrade[];
}

export interface StockTrade {
  id: string;
  date: string;
  type: 'BUY' | 'SELL';
  shares: number;
  pricePerShare: number;
  totalAmount: number;
  stockHoldingId: string;
  createdAt: string;
  updatedAt: string;
}