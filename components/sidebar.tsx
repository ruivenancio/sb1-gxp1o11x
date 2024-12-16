'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  ChevronRight,
  Home,
  Wallet,
  CreditCard,
  LineChart,
  ArrowLeftRight,
  PieChart,
  Settings,
} from 'lucide-react';

const sidebarLinks = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Accounts', href: '/accounts', icon: Wallet },
  { name: 'Cards', href: '/cards', icon: CreditCard },
  { name: 'Investments', href: '/investments', icon: LineChart },
  { name: 'Transfers', href: '/transfers', icon: ArrowLeftRight },
  { name: 'Reports', href: '/reports', icon: PieChart },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <div
      className={cn(
        'border-r bg-background transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-end p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
          >
            <ChevronRight
              className={cn(
                'h-4 w-4 transition-transform',
                collapsed ? 'rotate-180' : ''
              )}
            />
          </Button>
        </div>
        <nav className="flex-1">
          <ul className="space-y-1 p-2">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      'flex items-center space-x-2 rounded-lg px-3 py-2 hover:bg-accent',
                      pathname === link.href && 'bg-accent',
                      collapsed && 'justify-center'
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {!collapsed && <span>{link.name}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}