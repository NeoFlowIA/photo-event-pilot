
import React from 'react';
import { Navbar } from './Navbar';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as SonnerToaster } from '@/components/ui/sonner';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-light">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Toaster />
      <SonnerToaster />
    </div>
  );
}
