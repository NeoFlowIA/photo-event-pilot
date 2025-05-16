
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
  className?: string;
}

export function StatCard({ icon: Icon, value, label, className }: StatCardProps) {
  return (
    <Card className={cn("bg-accent border-none", className)}>
      <CardContent className="flex items-center p-4 gap-3">
        <div className="bg-white p-2 rounded-full">
          <Icon className="h-5 w-5 text-dark" />
        </div>
        <div>
          <p className="text-xl font-bold text-dark">{value}</p>
          <p className="text-xs text-text">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}
