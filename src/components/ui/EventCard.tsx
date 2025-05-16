
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface EventCardProps {
  id: string;
  name: string;
  description: string;
  category: string;
  thumbnailUrl?: string;
  salesCount?: number;
  totalRevenue?: number;
  organizer?: string;
  isCollaboration?: boolean;
  className?: string;
}

export function EventCard({
  id,
  name,
  description,
  category,
  thumbnailUrl,
  salesCount,
  totalRevenue,
  organizer,
  isCollaboration = false,
  className,
}: EventCardProps) {
  const defaultThumbnail = "https://images.unsplash.com/photo-1517022812141-23620dba5c23?auto=format&fit=crop&q=80&w=400";
  
  return (
    <Card className={cn("overflow-hidden transition-all duration-200 hover:shadow-md", className)}>
      <div className="relative aspect-video w-full overflow-hidden">
        <img
          src={thumbnailUrl || defaultThumbnail}
          alt={name}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-2 right-2">
          <Badge className="bg-accent text-text hover:bg-accent/90">{category}</Badge>
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-bold text-lg mb-1 line-clamp-1">{name}</h3>
        
        {isCollaboration && organizer && (
          <p className="text-sm text-subtle-text mb-2">
            Organizado por: {organizer}
          </p>
        )}
        
        <p className="text-sm text-text line-clamp-2 mb-3">{description}</p>
        
        {(salesCount !== undefined || totalRevenue !== undefined) && (
          <div className="flex flex-wrap gap-3 text-xs">
            {salesCount !== undefined && (
              <div className="bg-accent/50 rounded-full px-3 py-1">
                <span className="font-bold">{salesCount}</span> vendas
              </div>
            )}
            
            {totalRevenue !== undefined && (
              <div className="bg-accent/50 rounded-full px-3 py-1">
                <span className="font-bold">R$ {totalRevenue.toFixed(2)}</span>
              </div>
            )}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-end">
        <Link
          to={isCollaboration ? `/colaboracoes/${id}` : `/editar-evento/${id}`}
          className="text-xs font-medium text-secondary flex items-center gap-1 hover:underline"
        >
          {isCollaboration ? "Ver detalhes" : (
            <>
              <Edit className="h-3 w-3" />
              Editar evento
            </>
          )}
        </Link>
      </CardFooter>
    </Card>
  );
}
