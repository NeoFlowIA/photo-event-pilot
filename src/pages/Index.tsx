
import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { EventCard } from '@/components/ui/EventCard';
import { Plus } from 'lucide-react';

// Mock events data
const myEvents = [
  {
    id: "evt_123456",
    name: "Festival de Verão 2024",
    description: "Um incrível festival de verão com muita música e diversão",
    category: "social",
    salesCount: 127,
    totalRevenue: 3175.0,
  },
  {
    id: "evt_234567",
    name: "Casamento João & Maria",
    description: "Registros do casamento de João e Maria realizado em 15/03/2024",
    category: "casamento",
    salesCount: 85,
    totalRevenue: 2975.0,
  },
  {
    id: "evt_345678",
    name: "Campeonato de Futebol",
    description: "Fotos oficiais do campeonato regional de futebol 2024",
    category: "esporte",
    salesCount: 42,
    totalRevenue: 1260.0,
  },
];

export default function Index() {
  return (
    <Layout>
      <PageContainer>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Meus Eventos</h1>
          <Link to="/criar-evento">
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Criar evento
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myEvents.map((event) => (
            <EventCard
              key={event.id}
              id={event.id}
              name={event.name}
              description={event.description}
              category={event.category}
              salesCount={event.salesCount}
              totalRevenue={event.totalRevenue}
            />
          ))}
        </div>
      </PageContainer>
    </Layout>
  );
}
