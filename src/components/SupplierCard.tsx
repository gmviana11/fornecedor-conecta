import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Users } from "lucide-react";

interface SupplierCardProps {
  id: string;
  name: string;
  category: string;
  location: string;
  rating: number;
  description: string;
  tags: string[];
  clientsServed: number;
  onViewContact: (supplierId: string) => void;
}

export const SupplierCard = ({
  id,
  name,
  category,
  location,
  rating,
  description,
  tags,
  clientsServed,
  onViewContact,
}: SupplierCardProps) => {
  return (
    <Card className="bg-gradient-card shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 overflow-hidden group">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-card-foreground mb-1">{name}</h3>
            <p className="text-primary font-medium">{category}</p>
          </div>
          <div className="flex items-center space-x-1 bg-accent/10 px-2 py-1 rounded-full">
            <Star className="h-4 w-4 text-accent fill-current" />
            <span className="text-sm font-medium text-accent">{rating.toFixed(1)}</span>
          </div>
        </div>

        <p className="text-muted-foreground mb-4 line-clamp-3">{description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{tags.length - 3}
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1" />
            {location}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="h-4 w-4 mr-1" />
            {clientsServed}+ clientes
          </div>
        </div>

        <Button 
          onClick={() => onViewContact(id)}
          className="w-full bg-gradient-primary hover:scale-105 transition-transform shadow-button"
        >
          Ver Contato
        </Button>
      </div>
    </Card>
  );
};