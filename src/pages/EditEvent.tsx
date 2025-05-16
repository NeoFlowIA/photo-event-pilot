
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { Layout } from '@/components/layout/Layout';
import { PageContainer } from '@/components/layout/PageContainer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Card, 
  CardContent, 
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage, 
} from '@/components/ui/form';
import { 
  Camera, 
  DollarSign, 
  Image, 
  Save, 
  Star, 
  Trash2, 
  Users,
  BarChart3,
  Check,
  Plus, 
} from 'lucide-react';
import { StatCard } from '@/components/ui/StatCard';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { cn } from '@/lib/utils';

// Mock data
const mockEvent = {
  id: "evt_123456",
  name: "Festival de Verão 2024",
  description: "Um incrível festival de verão com muita música e diversão",
  category: "social",
  photos: [
    { id: "1", url: "https://images.unsplash.com/photo-1498936178812-4b2e558d2937", price: 25.0, isCover: true },
    { id: "2", url: "https://images.unsplash.com/photo-1518877593221-1f28583780b4", price: 25.0, isCover: false },
    { id: "3", url: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac", price: 25.0, isCover: false },
    { id: "4", url: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f", price: 25.0, isCover: false },
    { id: "5", url: "https://images.unsplash.com/photo-1501286353178-1ec881214838", price: 30.0, isCover: false },
  ],
  defaultPrice: 25.0,
  collaborators: [
    { id: "1", name: "João Silva", email: "joao@email.com" },
    { id: "2", name: "Maria Souza", email: "maria@email.com" }
  ],
  stats: {
    totalSales: 127,
    totalRevenue: 3175.0,
    photosSold: 85,
    collaboratorRanking: [
      { id: "1", name: "João Silva", sales: 45 },
      { id: "2", name: "Maria Souza", sales: 32 },
      { id: "owner", name: "Você", sales: 50 }
    ]
  }
};

const eventSchema = z.object({
  name: z.string().min(3, {
    message: "Nome do evento deve ter pelo menos 3 caracteres.",
  }),
  description: z.string().max(300, {
    message: "Descrição não pode exceder 300 caracteres.",
  }),
  category: z.string().min(1, {
    message: "Selecione uma categoria.",
  }),
});

const priceSchema = z.object({
  defaultPrice: z.coerce.number().min(0, {
    message: "Preço não pode ser negativo."
  })
});

const collaboratorSchema = z.object({
  email: z.string().email({
    message: "Digite um e-mail válido."
  })
});

type EventFormValues = z.infer<typeof eventSchema>;
type PriceFormValues = z.infer<typeof priceSchema>;
type CollaboratorFormValues = z.infer<typeof collaboratorSchema>;

const categories = [
  { value: "esporte", label: "Esporte" },
  { value: "social", label: "Social" },
  { value: "escolar", label: "Escolar" },
  { value: "corporativo", label: "Corporativo" },
  { value: "casamento", label: "Casamento" },
  { value: "aniversario", label: "Aniversário" },
  { value: "festa", label: "Festa" },
  { value: "outro", label: "Outro" },
];

export default function EditEvent() {
  const { eventId } = useParams<{ eventId: string }>();
  const { toast } = useToast();
  const [event, setEvent] = useState(mockEvent);
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  // General info form
  const infoForm = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      name: event.name,
      description: event.description,
      category: event.category,
    },
  });
  
  // Price form
  const priceForm = useForm<PriceFormValues>({
    resolver: zodResolver(priceSchema),
    defaultValues: {
      defaultPrice: event.defaultPrice,
    },
  });
  
  // Collaborator form
  const collaboratorForm = useForm<CollaboratorFormValues>({
    resolver: zodResolver(collaboratorSchema),
    defaultValues: {
      email: "",
    },
  });

  // Save general info
  const onSaveInfo = async (values: EventFormValues) => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setEvent((prev) => ({
        ...prev,
        ...values,
      }));
      
      toast({
        title: "Informações atualizadas!",
        description: "As alterações foram salvas com sucesso.",
      });
      
      setIsSaving(false);
    }, 1000);
  };
  
  // Toggle photo selection
  const togglePhotoSelection = (photoId: string) => {
    setSelectedPhotos((prev) => 
      prev.includes(photoId)
        ? prev.filter(id => id !== photoId)
        : [...prev, photoId]
    );
  };
  
  // Set photo as cover
  const setPhotoAsCover = (photoId: string) => {
    setEvent((prev) => ({
      ...prev,
      photos: prev.photos.map(photo => ({
        ...photo,
        isCover: photo.id === photoId
      }))
    }));
    
    toast({
      title: "Capa definida!",
      description: "A foto foi definida como capa do evento.",
    });
  };
  
  // Delete photo
  const deletePhoto = (photoId: string) => {
    setEvent((prev) => ({
      ...prev,
      photos: prev.photos.filter(photo => photo.id !== photoId)
    }));
    
    toast({
      title: "Foto removida!",
      description: "A foto foi removida do evento.",
    });
  };
  
  // Update photo price
  const updatePhotoPrice = (photoId: string, price: number) => {
    setEvent((prev) => ({
      ...prev,
      photos: prev.photos.map(photo => 
        photo.id === photoId ? { ...photo, price } : photo
      )
    }));
  };
  
  // Delete selected photos
  const deleteSelectedPhotos = () => {
    setEvent((prev) => ({
      ...prev,
      photos: prev.photos.filter(photo => !selectedPhotos.includes(photo.id))
    }));
    
    toast({
      title: "Fotos removidas!",
      description: `${selectedPhotos.length} fotos foram removidas.`,
    });
    
    setSelectedPhotos([]);
  };
  
  // Apply price to selected photos
  const applyPriceToSelected = (price: number) => {
    setEvent((prev) => ({
      ...prev,
      photos: prev.photos.map(photo => 
        selectedPhotos.includes(photo.id) ? { ...photo, price } : photo
      )
    }));
    
    toast({
      title: "Preço atualizado!",
      description: `Preço aplicado a ${selectedPhotos.length} fotos.`,
    });
  };
  
  // Apply default price to all photos
  const applyPriceToAll = (values: PriceFormValues) => {
    setEvent((prev) => ({
      ...prev,
      defaultPrice: values.defaultPrice,
      photos: prev.photos.map(photo => ({
        ...photo,
        price: values.defaultPrice
      }))
    }));
    
    toast({
      title: "Preço atualizado!",
      description: "Preço atualizado com sucesso em todas as fotos.",
    });
  };
  
  // Add collaborator
  const addCollaborator = (values: CollaboratorFormValues) => {
    // Check if email already exists
    if (event.collaborators.some(collab => collab.email === values.email)) {
      toast({
        title: "Erro",
        description: "Este e-mail já foi adicionado.",
        variant: "destructive",
      });
      return;
    }
    
    // Add new collaborator
    setEvent((prev) => ({
      ...prev,
      collaborators: [
        ...prev.collaborators,
        {
          id: `collab_${Math.random().toString(36).substr(2, 9)}`,
          name: values.email.split('@')[0], // Simple name extraction
          email: values.email
        }
      ]
    }));
    
    // Reset form
    collaboratorForm.reset();
    
    toast({
      title: "Convite enviado!",
      description: `Um convite foi enviado para ${values.email}.`,
    });
  };
  
  // Remove collaborator
  const removeCollaborator = (collaboratorId: string) => {
    setEvent((prev) => ({
      ...prev,
      collaborators: prev.collaborators.filter(collab => collab.id !== collaboratorId)
    }));
    
    toast({
      title: "Colaborador removido!",
      description: "O colaborador foi removido do evento.",
    });
  };
  
  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    setIsUploading(true);
    
    // Simulate file upload
    setTimeout(() => {
      const newPhotos = Array.from(files).map((_, index) => ({
        id: `new_${Math.random().toString(36).substr(2, 9)}`,
        url: `https://images.unsplash.com/photo-${1500000000000 + index}`,
        price: event.defaultPrice,
        isCover: false
      }));
      
      setEvent((prev) => ({
        ...prev,
        photos: [...prev.photos, ...newPhotos]
      }));
      
      setIsUploading(false);
      
      toast({
        title: "Upload concluído!",
        description: `${files.length} fotos adicionadas ao evento.`,
      });
      
      // Reset input
      e.target.value = '';
    }, 2000);
  };

  return (
    <Layout>
      <PageContainer>
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            Editar Evento: {event.name}
          </h1>
          <p className="text-subtle-text">
            ID: {eventId}
          </p>
        </div>
        
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-grid md:grid-cols-5">
            <TabsTrigger value="general" className="gap-2">
              <Save className="h-4 w-4 md:mr-2" />
              <span className="hidden md:inline">Informações</span>
            </TabsTrigger>
            <TabsTrigger value="photos" className="gap-2">
              <Image className="h-4 w-4 md:mr-2" />
              <span className="hidden md:inline">Fotos</span>
            </TabsTrigger>
            <TabsTrigger value="pricing" className="gap-2">
              <DollarSign className="h-4 w-4 md:mr-2" />
              <span className="hidden md:inline">Preços</span>
            </TabsTrigger>
            <TabsTrigger value="collaborators" className="gap-2">
              <Users className="h-4 w-4 md:mr-2" />
              <span className="hidden md:inline">Colaboradores</span>
            </TabsTrigger>
            <TabsTrigger value="stats" className="gap-2">
              <BarChart3 className="h-4 w-4 md:mr-2" />
              <span className="hidden md:inline">Estatísticas</span>
            </TabsTrigger>
          </TabsList>
          
          {/* General information tab */}
          <TabsContent value="general" className="space-y-6">
            <div className="max-w-2xl">
              <h2 className="text-xl font-bold mb-4">Informações Gerais</h2>
              
              <Form {...infoForm}>
                <form onSubmit={infoForm.handleSubmit(onSaveInfo)} className="space-y-4">
                  <FormField
                    control={infoForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome do evento</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={infoForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descrição</FormLabel>
                        <FormControl>
                          <Textarea 
                            className="resize-none" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                        <p className="text-xs text-subtle-text text-right">
                          {field.value.length}/300
                        </p>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={infoForm.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Categoria</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione uma categoria" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem 
                                key={category.value} 
                                value={category.value}
                              >
                                {category.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="bg-primary hover:bg-primary/90"
                    disabled={isSaving}
                  >
                    {isSaving ? "Salvando..." : "Salvar alterações"}
                  </Button>
                </form>
              </Form>
            </div>
          </TabsContent>
          
          {/* Photos tab */}
          <TabsContent value="photos" className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Gerenciar Fotos</h2>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      const fileInput = document.getElementById('photo-upload');
                      if (fileInput) fileInput.click();
                    }}
                    disabled={isUploading}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar fotos
                  </Button>
                  <input
                    type="file"
                    id="photo-upload"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </div>
              </div>
              
              {/* Selected photos actions */}
              {selectedPhotos.length > 0 && (
                <div className="bg-accent rounded-md p-3 mb-4 flex flex-wrap items-center gap-2">
                  <span className="text-sm">
                    <strong>{selectedPhotos.length}</strong> fotos selecionadas
                  </span>
                  <div className="flex-1" />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const price = priceForm.getValues().defaultPrice;
                      applyPriceToSelected(price);
                    }}
                  >
                    <DollarSign className="h-4 w-4 mr-2" />
                    Aplicar preço a todas
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={deleteSelectedPhotos}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Remover selecionadas
                  </Button>
                </div>
              )}
              
              {/* Photo grid */}
              {isUploading && (
                <div className="bg-accent rounded-md p-4 mb-4">
                  <p className="text-center">Carregando fotos...</p>
                </div>
              )}
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {event.photos.map((photo) => (
                  <Card 
                    key={photo.id} 
                    className={cn(
                      "relative overflow-hidden border-2",
                      selectedPhotos.includes(photo.id) ? "border-primary" : "border-transparent"
                    )}
                  >
                    <div className="relative aspect-square">
                      <img
                        src={photo.url}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Photo selection */}
                      <div 
                        className="absolute top-2 right-2 h-5 w-5 border-2 rounded cursor-pointer flex items-center justify-center bg-white"
                        onClick={() => togglePhotoSelection(photo.id)}
                      >
                        {selectedPhotos.includes(photo.id) && (
                          <Check className="h-3 w-3 text-primary" />
                        )}
                      </div>
                      
                      {/* Cover star */}
                      <div 
                        className={cn(
                          "absolute top-2 left-2 cursor-pointer",
                          photo.isCover ? "text-primary" : "text-white/70 hover:text-white"
                        )}
                        onClick={() => setPhotoAsCover(photo.id)}
                        title="Definir como capa"
                      >
                        <Star className="h-5 w-5" fill={photo.isCover ? "currentColor" : "none"} />
                      </div>
                      
                      {/* Delete button */}
                      <div 
                        className="absolute bottom-2 right-2 text-white/70 hover:text-white cursor-pointer"
                        onClick={() => deletePhoto(photo.id)}
                        title="Remover foto"
                      >
                        <Trash2 className="h-5 w-5" />
                      </div>
                    </div>
                    
                    <CardContent className="p-2">
                      <div className="flex items-center">
                        <Label htmlFor={`price-${photo.id}`} className="mr-2 text-xs text-subtle-text">
                          R$
                        </Label>
                        <Input
                          id={`price-${photo.id}`}
                          type="number"
                          value={photo.price}
                          min="0"
                          step="0.5"
                          onChange={(e) => updatePhotoPrice(photo.id, parseFloat(e.target.value))}
                          className="h-8 text-right"
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {event.photos.length === 0 && (
                <div className="py-12 text-center">
                  <Camera className="h-12 w-12 mx-auto text-subtle-text mb-4" />
                  <h3 className="text-lg font-bold mb-2">Nenhuma foto adicionada</h3>
                  <p className="text-subtle-text mb-4">
                    Adicione fotos para começar a vender
                  </p>
                  <Button 
                    onClick={() => {
                      const fileInput = document.getElementById('photo-upload');
                      if (fileInput) fileInput.click();
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar fotos
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          {/* Pricing tab */}
          <TabsContent value="pricing" className="space-y-6">
            <div className="max-w-md">
              <h2 className="text-xl font-bold mb-4">Modificar Preços</h2>
              
              <Form {...priceForm}>
                <form onSubmit={priceForm.handleSubmit(applyPriceToAll)} className="space-y-4">
                  <FormField
                    control={priceForm.control}
                    name="defaultPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preço padrão para novas fotos (R$)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            min="0" 
                            step="0.5" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="bg-primary hover:bg-primary/90">
                    Aplicar para todas
                  </Button>
                </form>
              </Form>
            </div>
          </TabsContent>
          
          {/* Collaborators tab */}
          <TabsContent value="collaborators" className="space-y-6">
            <div className="max-w-2xl">
              <h2 className="text-xl font-bold mb-4">Gerenciar Colaboradores</h2>
              
              <div className="space-y-4 mb-6">
                {event.collaborators.map((collab) => (
                  <div 
                    key={collab.id}
                    className="flex items-center justify-between p-3 bg-accent/50 rounded-md"
                  >
                    <div>
                      <p className="font-medium">{collab.name}</p>
                      <p className="text-sm text-subtle-text">{collab.email}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeCollaborator(collab.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remover
                    </Button>
                  </div>
                ))}
                
                {event.collaborators.length === 0 && (
                  <div className="py-6 text-center">
                    <Users className="h-10 w-10 mx-auto text-subtle-text mb-2" />
                    <p className="text-subtle-text">
                      Nenhum colaborador adicionado
                    </p>
                  </div>
                )}
              </div>
              
              <div className="border-t pt-6">
                <h3 className="text-lg font-bold mb-4">Adicionar Colaborador</h3>
                
                <Form {...collaboratorForm}>
                  <form 
                    onSubmit={collaboratorForm.handleSubmit(addCollaborator)} 
                    className="flex items-end gap-2"
                  >
                    <FormField
                      control={collaboratorForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Adicionar colaborador por e-mail</FormLabel>
                          <FormControl>
                            <Input placeholder="email@exemplo.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="bg-primary hover:bg-primary/90">
                      Convidar
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </TabsContent>
          
          {/* Statistics tab */}
          <TabsContent value="stats" className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-4">Estatísticas do Evento</h2>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto pb-2 snap-x snap-mandatory">
                <StatCard 
                  icon={DollarSign}
                  value={event.stats.totalSales}
                  label="Total de vendas"
                  className="snap-center min-w-[200px]"
                />
                <StatCard 
                  icon={DollarSign}
                  value={`R$ ${event.stats.totalRevenue.toFixed(2)}`}
                  label="Total faturado"
                  className="snap-center min-w-[200px]"
                />
                <StatCard 
                  icon={Camera}
                  value={event.stats.photosSold}
                  label="Fotos vendidas"
                  className="snap-center min-w-[200px]"
                />
                <StatCard 
                  icon={Users}
                  value={event.stats.collaboratorRanking.length}
                  label="Colaboradores"
                  className="snap-center min-w-[200px]"
                />
              </div>
              
              {/* Collaborator Ranking */}
              <div className="mt-8">
                <h3 className="text-lg font-bold mb-4">Ranking de Colaboradores</h3>
                
                <div className="space-y-2">
                  {event.stats.collaboratorRanking
                    .sort((a, b) => b.sales - a.sales)
                    .map((collab, index) => (
                      <div 
                        key={collab.id}
                        className="flex items-center justify-between p-3 bg-accent/50 rounded-md"
                      >
                        <div className="flex items-center gap-3">
                          <div className="bg-secondary w-8 h-8 rounded-full flex items-center justify-center text-white font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium">{collab.name}</p>
                          </div>
                        </div>
                        <div className="font-bold text-dark">
                          {collab.sales} vendas
                        </div>
                      </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </PageContainer>
    </Layout>
  );
}
