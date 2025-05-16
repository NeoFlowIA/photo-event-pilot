
import React, { useState, useEffect } from 'react';
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
import { Edit, Trash2, Eye, Search, Check, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { EditPhotoModal } from './modals/EditPhotoModal';
import { ConfirmDeleteModal } from './modals/ConfirmDeleteModal';
import { PhotoDetailsModal } from './modals/PhotoDetailsModal';

// Mock data generator for photos
const generateMockPhotos = (count: number) => {
  const photos = [];
  const events = ['Festival de Verão 2024', 'Formatura Engenharia', 'Campeonato Regional'];
  const statuses = ['active', 'hidden'];
  
  for (let i = 1; i <= count; i++) {
    photos.push({
      id: i,
      thumbnail: `https://picsum.photos/seed/${i}/80/80`,
      event: events[Math.floor(Math.random() * events.length)],
      price: Math.floor(Math.random() * 50) + 10,
      status: statuses[Math.floor(Math.random() * statuses.length)]
    });
  }
  
  return photos;
};

export function PhotosTab() {
  const [photos, setPhotos] = useState<any[]>([]);
  const [displayedPhotos, setDisplayedPhotos] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null);
  
  const PHOTOS_PER_PAGE = 20;
  
  // Initialize with first batch of photos
  useEffect(() => {
    const allPhotos = generateMockPhotos(60); // Total of 60 mock photos
    setPhotos(allPhotos);
    setDisplayedPhotos(allPhotos.slice(0, PHOTOS_PER_PAGE));
    setHasMore(allPhotos.length > PHOTOS_PER_PAGE);
  }, []);

  // Apply filters
  const applyFilters = () => {
    const filtered = photos.filter((photo) => {
      const matchesSearch = photo.event.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || photo.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
    
    setDisplayedPhotos(filtered.slice(0, page * PHOTOS_PER_PAGE));
    setHasMore(filtered.length > page * PHOTOS_PER_PAGE);
  };
  
  // Apply filters when search or status filter changes
  useEffect(() => {
    setPage(1);
    applyFilters();
  }, [searchTerm, statusFilter]);

  const loadMorePhotos = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    
    const filtered = photos.filter((photo) => {
      const matchesSearch = photo.event.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || photo.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
    
    setDisplayedPhotos(filtered.slice(0, nextPage * PHOTOS_PER_PAGE));
    setHasMore(filtered.length > nextPage * PHOTOS_PER_PAGE);
  };

  const handleEditPhoto = (photoData: any) => {
    // In a real app, you would make an API call here
    setPhotos(photos.map(photo => 
      photo.id === selectedPhoto.id ? { ...photo, ...photoData } : photo
    ));
    applyFilters();
    setEditModalOpen(false);
    toast.success('Foto atualizada com sucesso.');
  };

  const handleDeletePhoto = () => {
    // In a real app, you would make an API call here
    setPhotos(photos.filter(photo => photo.id !== selectedPhoto.id));
    applyFilters();
    setDeleteModalOpen(false);
    toast.success('Foto excluída com sucesso.');
  };

  const handleToggleStatus = (photo: any) => {
    // In a real app, you would make an API call here
    const newStatus = photo.status === 'active' ? 'hidden' : 'active';
    setPhotos(photos.map(p => 
      p.id === photo.id ? { ...p, status: newStatus } : p
    ));
    applyFilters();
    toast.success(`Foto ${newStatus === 'active' ? 'ativada' : 'ocultada'} com sucesso.`);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome do evento"
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="active">Ativas</SelectItem>
            <SelectItem value="hidden">Ocultas</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Miniatura</TableHead>
              <TableHead>Evento associado</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedPhotos.length > 0 ? (
              displayedPhotos.map((photo) => (
                <TableRow key={photo.id}>
                  <TableCell>
                    <img 
                      src={photo.thumbnail} 
                      alt="Miniatura" 
                      className="w-20 h-20 object-cover rounded-md"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{photo.event}</TableCell>
                  <TableCell>R$ {photo.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={photo.status === 'active' ? 'default' : 'secondary'}>
                      {photo.status === 'active' ? 'Ativa' : 'Oculta'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setSelectedPhoto(photo);
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
                          setSelectedPhoto(photo);
                          setEditModalOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Editar preço</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleToggleStatus(photo)}
                      >
                        {photo.status === 'active' ? (
                          <X className="h-4 w-4" />
                        ) : (
                          <Check className="h-4 w-4" />
                        )}
                        <span className="sr-only">
                          {photo.status === 'active' ? 'Ocultar' : 'Mostrar'}
                        </span>
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => {
                          setSelectedPhoto(photo);
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
                  Nenhuma foto encontrada.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {hasMore && (
        <div className="flex justify-center mt-4">
          <Button onClick={loadMorePhotos} variant="outline">
            Carregar mais
          </Button>
        </div>
      )}

      {/* Modals */}
      {selectedPhoto && (
        <>
          <EditPhotoModal 
            open={editModalOpen} 
            onClose={() => setEditModalOpen(false)}
            photo={selectedPhoto}
            onSave={handleEditPhoto}
          />
          
          <ConfirmDeleteModal 
            open={deleteModalOpen} 
            onClose={() => setDeleteModalOpen(false)}
            title="Excluir Foto"
            description="Tem certeza que deseja excluir permanentemente esta foto? Esta ação não pode ser desfeita."
            onConfirm={handleDeletePhoto}
          />
          
          <PhotoDetailsModal 
            open={detailsModalOpen} 
            onClose={() => setDetailsModalOpen(false)}
            photo={selectedPhoto}
          />
        </>
      )}
    </div>
  );
}
