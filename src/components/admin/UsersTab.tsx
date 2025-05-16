
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
import { Badge } from '@/components/ui/badge';
import { CreateUserModal } from './modals/CreateUserModal';
import { EditUserModal } from './modals/EditUserModal';
import { ConfirmDeleteModal } from './modals/ConfirmDeleteModal';
import { UserDetailsModal } from './modals/UserDetailsModal';

// Mock data for users
const mockUsers = [
  { id: 1, name: 'João Silva', email: 'joao@example.com', type: 'common', status: 'active' },
  { id: 2, name: 'Maria Oliveira', email: 'maria@example.com', type: 'photographer', status: 'active' },
  { id: 3, name: 'Carlos Souza', email: 'carlos@example.com', type: 'common', status: 'inactive' },
  { id: 4, name: 'Ana Pereira', email: 'ana@example.com', type: 'photographer', status: 'active' },
];

export function UsersTab() {
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  // Filter users based on search term and type filter
  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || user.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleCreateUser = (userData: any) => {
    // In a real app, you would make an API call here
    const newUser = {
      id: users.length + 1,
      ...userData,
      status: 'active'
    };
    setUsers([...users, newUser]);
    setCreateModalOpen(false);
    toast.success('Usuário criado com sucesso.');
  };

  const handleEditUser = (userData: any) => {
    // In a real app, you would make an API call here
    setUsers(users.map(user => 
      user.id === selectedUser.id ? { ...user, ...userData } : user
    ));
    setEditModalOpen(false);
    toast.success('Usuário atualizado com sucesso.');
  };

  const handleDeleteUser = () => {
    // In a real app, you would make an API call here
    setUsers(users.filter(user => user.id !== selectedUser.id));
    setDeleteModalOpen(false);
    toast.success('Usuário excluído com sucesso.');
  };

  const handleToggleStatus = (user: any) => {
    // In a real app, you would make an API call here
    const newStatus = user.status === 'active' ? 'inactive' : 'active';
    setUsers(users.map(u => 
      u.id === user.id ? { ...u, status: newStatus } : u
    ));
    toast.success(`Usuário ${newStatus === 'active' ? 'ativado' : 'desativado'} com sucesso.`);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex gap-2 flex-1">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome ou email"
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Tipo de usuário" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="common">Usuário comum</SelectItem>
              <SelectItem value="photographer">Fotógrafo</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={() => setCreateModalOpen(true)} className="gap-1">
          <PlusCircle className="h-4 w-4" />
          <span>Criar novo usuário</span>
        </Button>
      </div>

      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.type === 'photographer' ? 'Fotógrafo' : 'Usuário comum'}
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                      {user.status === 'active' ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setSelectedUser(user);
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
                          setSelectedUser(user);
                          setEditModalOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Editar</span>
                      </Button>
                      <Button 
                        variant={user.status === 'active' ? 'secondary' : 'default'}
                        size="sm"
                        onClick={() => handleToggleStatus(user)}
                      >
                        {user.status === 'active' ? 'Desativar' : 'Ativar'}
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => {
                          setSelectedUser(user);
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
                  Nenhum usuário encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Modals */}
      <CreateUserModal 
        open={createModalOpen} 
        onClose={() => setCreateModalOpen(false)}
        onCreate={handleCreateUser}
      />
      
      {selectedUser && (
        <>
          <EditUserModal 
            open={editModalOpen} 
            onClose={() => setEditModalOpen(false)}
            user={selectedUser}
            onSave={handleEditUser}
          />
          
          <ConfirmDeleteModal 
            open={deleteModalOpen} 
            onClose={() => setDeleteModalOpen(false)}
            title="Excluir Usuário"
            description={`Tem certeza que deseja excluir permanentemente o usuário ${selectedUser.name}? Esta ação não pode ser desfeita.`}
            onConfirm={handleDeleteUser}
          />
          
          <UserDetailsModal 
            open={detailsModalOpen} 
            onClose={() => setDetailsModalOpen(false)}
            user={selectedUser}
          />
        </>
      )}
    </div>
  );
}
