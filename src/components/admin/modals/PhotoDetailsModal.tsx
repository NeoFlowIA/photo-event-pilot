
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
import { Badge } from '@/components/ui/badge';

interface PhotoDetailsModalProps {
  open: boolean;
  onClose: () => void;
  photo: any;
}

// Mock data for photo details
const mockPhotoDetails = {
  uploadedAt: new Date(2024, 4, 15, 10, 30),
  resolution: '1920x1080',
  size: '2.4MB',
  views: 120,
  purchases: 3,
};

// Mock log data
const mockLogs = [
  { date: new Date(2024, 4, 15, 10, 30), action: 'Foto carregada' },
  { date: new Date(2024, 4, 16, 14, 45), action: 'Preço alterado para R$ 30.00' },
  { date: new Date(2024, 4, 17, 9, 15), action: 'Foto marcada como oculta' },
  { date: new Date(2024, 4, 18, 16, 30), action: 'Foto marcada como ativa' },
];

export function PhotoDetailsModal({ open, onClose, photo }: PhotoDetailsModalProps) {
  const handleExport = () => {
    // Simulate export - in a real app this would download a file
    console.log('Exporting photo data:', photo);
    onClose();
  };
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Detalhes da Foto</DialogTitle>
          <DialogDescription>
            Informações completas sobre esta foto.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex justify-center mb-4">
            <img 
              src={photo.thumbnail}
              alt="Foto"
              className="w-full max-w-xs h-auto object-cover rounded-md"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium mb-1">Evento</h4>
              <p className="text-sm">{photo.event}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-1">Preço</h4>
              <p className="text-sm">R$ {photo.price.toFixed(2)}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-1">Status</h4>
              <Badge variant={photo.status === 'active' ? 'default' : 'secondary'}>
                {photo.status === 'active' ? 'Ativa' : 'Oculta'}
              </Badge>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-1">Data de upload</h4>
              <p className="text-sm">{format(mockPhotoDetails.uploadedAt, 'dd/MM/yyyy HH:mm')}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-1">Resolução</h4>
              <p className="text-sm">{mockPhotoDetails.resolution}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-1">Tamanho</h4>
              <p className="text-sm">{mockPhotoDetails.size}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-1">Visualizações</h4>
              <p className="text-sm">{mockPhotoDetails.views}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-1">Compras</h4>
              <p className="text-sm">{mockPhotoDetails.purchases}</p>
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
