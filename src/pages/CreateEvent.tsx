
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Layout } from '@/components/layout/Layout';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

type EventFormValues = z.infer<typeof eventSchema>;

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

export default function CreateEvent() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
    },
  });

  const onSubmit = async (values: EventFormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Creating event:", values);
      
      // Mock event creation
      const eventId = "evt_" + Math.random().toString(36).substring(2, 9);
      
      toast({
        title: "Evento criado com sucesso!",
        description: "Você será redirecionado para a página de edição.",
      });
      
      setIsSubmitting(false);
      
      // Redirect to edit page
      navigate(`/editar-evento/${eventId}`);
    }, 1000);
  };

  return (
    <Layout>
      <PageContainer>
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">Criar Evento</h1>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do evento</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Ex: Festival de Verão 2024" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Descreva seu evento em até 300 caracteres" 
                        className="resize-none"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                    <p className="text-xs text-subtle-text text-right">
                      {form.watch("description").length}/300
                    </p>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
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
                className="w-full bg-primary hover:bg-primary/90 h-14 text-base"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Criando..." : "Criar evento"}
              </Button>
            </form>
          </Form>
        </div>
      </PageContainer>
    </Layout>
  );
}
