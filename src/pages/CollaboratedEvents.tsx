
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { PageContainer } from '@/components/layout/PageContainer';
import { EventCard } from '@/components/ui/EventCard';
import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';

// Mock data for collaborated events
const collaboratedEvents = [
  {
    id: "evt_123456",
    name: "Festival de Jazz 2024",
    description: "O maior festival de jazz do país com artistas nacionais e internacionais.",
    category: "social",
    organizer: "Carlos Oliveira",
    salesCount: 32,
    totalRevenue: 960.0,
  },
  {
    id: "evt_234567",
    name: "Formatura Engenharia UFRJ",
    description: "Cerimônia de formatura da turma de Engenharia 2023.2 da UFRJ.",
    category: "escolar",
    organizer: "Ana Beatriz",
    salesCount: 48,
    totalRevenue: 1440.0,
  },
  {
    id: "evt_345678",
    name: "Campeonato de Surf",
    description: "Etapa do campeonato estadual de surf realizada na praia de Copacabana.",
    category: "esporte",
    organizer: "Marcos Vinicius",
    salesCount: 15,
    totalRevenue: 450.0,
  }
];

export default function CollaboratedEvents() {
  const hasCollaborations = collaboratedEvents.length > 0;

  return (
    <Layout>
      <PageContainer>
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Eventos Colaborados</h1>
        
        {hasCollaborations ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collaboratedEvents.map((event) => (
              <EventCard
                key={event.id}
                id={event.id}
                name={event.name}
                description={event.description}
                category={event.category}
                organizer={event.organizer}
                salesCount={event.salesCount}
                totalRevenue={event.totalRevenue}
                isCollaboration={true}
              />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center max-w-md mx-auto">
            <Users className="h-16 w-16 mx-auto text-subtle-text mb-4" />
            <h2 className="text-xl font-bold mb-2">
              Você ainda não colaborou em nenhum evento
            </h2>
            <p className="text-subtle-text mb-6">
              Quando um organizador te adicionar como colaborador, seus eventos aparecerão aqui.
            </p>
            <Button>Ver eventos disponíveis</Button>
          </div>
        )}
      </PageContainer>
    </Layout>
  );
}
