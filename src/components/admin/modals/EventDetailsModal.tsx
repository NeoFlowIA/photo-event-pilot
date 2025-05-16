
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Download } from 'lucide-react';

interface EventDetailsModalProps {
  open: boolean;
  onClose: () => void;
  event: any;
}

// Mock log and stats data
const mockStats = {
  views: 450,
  sales: 32,
  revenue: 1280,
  averagePrice: 40,
};

const mockLogs = [
  { date: new Date(2024, 4, 15, 10, 30), action: 'Evento criado' },
  { date: new Date(2024, 4, 16, 14, 45), action: 'Fotos adicionadas (50)' },
  { date: new Date(2024, 4, 17, 9, 15), action: 'Preço de fotos atualizado' },
  { date: new Date(2024, 4, 18, 16, 30), action: 'Colaborador adicionado' },
];

export function EventDetailsModal({ open, onClose, event }: EventDetailsModalProps) {
  const handleExport = () => {
    // Simulate export - in a real app this would download a file
    console.log('Exporting event data:', event);
    onClose();
  };
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Detalhes do Evento</DialogTitle>
          <DialogDescription>
            Informações completas sobre {event.name}.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium mb-1">Nome</h4>
              <p className="text-sm">{event.name}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-1">Criador</h4>
              <p className="text-sm">{event.creator.name}</p>
              <p className="text-xs text-muted-foreground">{event.creator.email}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-1">Data de criação</h4>
              <p className="text-sm">{format(event.createdAt, 'dd/MM/yyyy')}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-1">Número de fotos</h4>
              <p className="text-sm">{event.photoCount}</p>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Estatísticas</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-accent p-3 rounded-md">
                <div className="text-xs text-muted-foreground">Visualizações</div>
                <div className="text-lg font-semibold">{mockStats.views}</div>
              </div>
              <div className="bg-accent p-3 rounded-md">
                <div className="text-xs text-muted-foreground">Vendas</div>
                <div className="text-lg font-semibold">{mockStats.sales}</div>
              </div>
              <div className="bg-accent p-3 rounded-md">
                <div className="text-xs text-muted-foreground">Faturamento</div>
                <div className="text-lg font-semibold">R$ {mockStats.revenue}</div>
              </div>
              <div className="bg-accent p-3 rounded-md">
                <div className="text-xs text-muted-foreground">Preço médio</div>
                <div className="text-lg font-semibold">R$ {mockStats.averagePrice}</div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Histórico de Atividades</h4>
            <div className="border rounded-md p-2 max-h-32 overflow-y-auto">
              {mockLogs.map((log, index) => (
                <div key={index} className="text-xs py-1 border-b last:border-0">
                  <span className="font-medium">{format(log.date, 'dd/MM/yyyy HH:mm')}</span>: {log.action}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button onClick={onClose} variant="outline">
            Fechar
          </Button>
          <Button onClick={handleExport} className="gap-1">
            <Download className="h-4 w-4" />
            <span>Exportar dados</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
