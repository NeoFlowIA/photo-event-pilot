
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, CalendarDays, Image } from 'lucide-react';

interface AdminTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function AdminTabs({ activeTab, onTabChange }: AdminTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full mb-6">
      <TabsList className="w-full justify-start bg-accent">
        <TabsTrigger value="users" className="flex items-center gap-2">
          <Users className="w-4 h-4" />
          <span className="hidden sm:inline">Usuários</span>
        </TabsTrigger>
        <TabsTrigger value="events" className="flex items-center gap-2">
          <CalendarDays className="w-4 h-4" />
          <span className="hidden sm:inline">Eventos</span>
        </TabsTrigger>
        <TabsTrigger value="photos" className="flex items-center gap-2">
          <Image className="w-4 h-4" />
          <span className="hidden sm:inline">Fotos</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
