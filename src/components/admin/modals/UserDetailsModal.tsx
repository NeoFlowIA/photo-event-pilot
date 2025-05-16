
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

interface UserDetailsModalProps {
  open: boolean;
  onClose: () => void;
  user: any;
}

// Mock log data
const mockLogs = [
  { date: new Date(2024, 4, 15, 10, 30), action: 'Criação de usuário' },
  { date: new Date(2024, 4, 16, 14, 45), action: 'Alteração de tipo de usuário' },
  { date: new Date(2024, 4, 17, 9, 15), action: 'Login no sistema' },
];

export function UserDetailsModal({ open, onClose, user }: UserDetailsModalProps) {
  const handleExport = () => {
    // Simulate export - in a real app this would download a file
    console.log('Exporting user data:', user);
    onClose();
  };
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Detalhes do Usuário</DialogTitle>
          <DialogDescription>
            Informações completas sobre {user.name}.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          <div>
            <h4 className="text-sm font-medium mb-1">Nome</h4>
            <p className="text-sm">{user.name}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-1">E-mail</h4>
            <p className="text-sm">{user.email}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-1">Tipo</h4>
            <p className="text-sm">{user.type === 'photographer' ? 'Fotógrafo' : 'Usuário comum'}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-1">Status</h4>
            <p className="text-sm">{user.status === 'active' ? 'Ativo' : 'Inativo'}</p>
          </div>
          
          <div className="col-span-1 md:col-span-2 mt-4">
            <h4 className="text-sm font-medium mb-2">Registro de Atividades</h4>
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
