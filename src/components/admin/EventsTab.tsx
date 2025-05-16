
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { PlusCircle, Search, Edit, Trash2, Eye } from 'lucide-react';
import { format } from 'date-fns';
import { CreateEventModal } from './modals/CreateEventModal';
import { EditEventModal } from './modals/EditEventModal';
import { ConfirmDeleteModal } from './modals/ConfirmDeleteModal';
import { EventDetailsModal } from './modals/EventDetailsModal';

// Mock data for events
const mockEvents = [
  { 
    id: 1, 
    name: 'Festival de Verão 2024', 
    creator: { name: 'João Silva', email: 'joao@example.com' },
    createdAt: new Date(2024, 4, 15),
    photoCount: 120
  },
  { 
    id: 2, 
    name: 'Formatura Engenharia', 
    creator: { name: 'Maria Oliveira', email: 'maria@example.com' },
    createdAt: new Date(2024, 4, 10),
    photoCount: 350
  },
  { 
    id: 3, 
    name: 'Campeonato Regional', 
    creator: { name: 'Carlos Souza', email: 'carlos@example.com' },
    createdAt: new Date(2024, 4, 5),
    photoCount: 200
  },
];

// Mock creators for filter dropdown
const mockCreators = [
  { id: 1, name: 'João Silva', email: 'joao@example.com' },
  { id: 2, name: 'Maria Oliveira', email: 'maria@example.com' },
  { id: 3, name: 'Carlos Souza', email: 'carlos@example.com' },
];

export function EventsTab() {
  const [events, setEvents] = useState(mockEvents);
  const [searchTerm, setSearchTerm] = useState('');
  const [creatorFilter, setCreatorFilter] = useState('all');
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [deletePhotos, setDeletePhotos] = useState(false);

  // Filter events based on search term and creator filter
  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCreator = creatorFilter === 'all' || event.creator.email === creatorFilter;
    return matchesSearch && matchesCreator;
  });

  const handleCreateEvent = (eventData: any) => {
    // In a real app, you would make an API call here
    const newEvent = {
      id: events.length + 1,
      ...eventData,
      creator: { name: 'Admin', email: 'admin@example.com' },
      createdAt: new Date(),
      photoCount: 0
    };
    setEvents([...events, newEvent]);
    setCreateModalOpen(false);
    toast.success('Evento criado com sucesso.');
  };

  const handleEditEvent = (eventData: any) => {
    // In a real app, you would make an API call here
    setEvents(events.map(event => 
      event.id === selectedEvent.id ? { ...event, ...eventData } : event
    ));
    setEditModalOpen(false);
    toast.success('Evento atualizado com sucesso.');
  };

  const handleDeleteEvent = () => {
    // In a real app, you would make an API call here and handle the deletePhotos flag
    setEvents(events.filter(event => event.id !== selectedEvent.id));
    setDeleteModalOpen(false);
    toast.success(`Evento excluído com sucesso${deletePhotos ? ' e suas fotos foram removidas' : ''}.`);
    setDeletePhotos(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex gap-2 flex-1">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome do evento"
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={creatorFilter} onValueChange={setCreatorFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Criador" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              {mockCreators.map(creator => (
                <SelectItem key={creator.id} value={creator.email}>
                  {creator.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button onClick={() => setCreateModalOpen(true)} className="gap-1">
          <PlusCircle className="h-4 w-4" />
          <span>Criar evento manualmente</span>
        </Button>
      </div>

      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome do Evento</TableHead>
              <TableHead>Criador</TableHead>
              <TableHead>Data de criação</TableHead>
              <TableHead>Nº de fotos</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">{event.name}</TableCell>
                  <TableCell>{`${event.creator.name} (${event.creator.email})`}</TableCell>
                  <TableCell>{format(event.createdAt, 'dd/MM/yyyy')}</TableCell>
                  <TableCell>{event.photoCount}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setSelectedEvent(event);
                          setDetailsModalOpen(true);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">Ver detalhes</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setSelectedEvent(event);
                          setEditModalOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Editar</span>
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => {
                          setSelectedEvent(event);
                          setDeleteModalOpen(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Excluir</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  Nenhum evento encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Modals */}
      <CreateEventModal 
        open={createModalOpen} 
        onClose={() => setCreateModalOpen(false)}
        onCreate={handleCreateEvent}
      />
      
      {selectedEvent && (
        <>
          <EditEventModal 
            open={editModalOpen} 
            onClose={() => setEditModalOpen(false)}
            event={selectedEvent}
            onSave={handleEditEvent}
          />
          
          <ConfirmDeleteModal 
            open={deleteModalOpen} 
            onClose={() => setDeleteModalOpen(false)}
            title="Excluir Evento"
            description={`Tem certeza que deseja excluir o evento "${selectedEvent.name}"?`}
            onConfirm={handleDeleteEvent}
            confirmText="Excluir Evento"
            additionalOptions={(
              <div className="flex items-center space-x-2 mt-4">
                <input 
                  type="checkbox" 
                  id="deletePhotos" 
                  checked={deletePhotos}
                  onChange={(e) => setDeletePhotos(e.target.checked)}
                  className="rounded border-gray-300"
                />
                <label htmlFor="deletePhotos">Excluir fotos associadas também</label>
              </div>
            )}
          />
          
          <EventDetailsModal 
            open={detailsModalOpen} 
            onClose={() => setDetailsModalOpen(false)}
            event={selectedEvent}
          />
        </>
      )}
    </div>
  );
}
