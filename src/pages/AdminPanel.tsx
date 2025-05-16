
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Layout } from '@/components/layout/Layout';
import { PageContainer } from '@/components/layout/PageContainer';
import { AdminTabs } from '@/components/admin/AdminTabs';
import { UsersTab } from '@/components/admin/UsersTab';
import { EventsTab } from '@/components/admin/EventsTab';
import { PhotosTab } from '@/components/admin/PhotosTab';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

// Simulated authentication state - in a real app, this would come from your auth system
const isAdmin = true; // This would be determined by your auth system

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<string>("users");
  const navigate = useNavigate();

  // If not an admin, redirect to home with a toast message
  React.useEffect(() => {
    if (!isAdmin) {
      toast.error("Acesso restrito a administradores.");
      navigate('/');
    }
  }, [isAdmin, navigate]);

  if (!isAdmin) {
    return null; // Don't render anything while redirecting
  }

  return (
    <Layout>
      <PageContainer className="max-w-7xl">
        <h1 className="text-2xl font-bold mb-6">Painel Administrativo</h1>
        
        <AdminTabs activeTab={activeTab} onTabChange={setActiveTab} />
        
        {activeTab === "users" && <UsersTab />}
        {activeTab === "events" && <EventsTab />}
        {activeTab === "photos" && <PhotosTab />}
      </PageContainer>
    </Layout>
  );
}
