import { Button } from "@/components/ui/button";
import { Building2, Menu } from "lucide-react";

export const Header = () => {
  return (
    <header className="bg-background/80 backdrop-blur-lg border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Building2 className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold text-foreground">MXS Soluções</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#fornecedores" className="text-muted-foreground hover:text-primary transition-colors">
            Fornecedores
          </a>
          <a href="#como-funciona" className="text-muted-foreground hover:text-primary transition-colors">
            Como Funciona
          </a>
          <a href="/cadastrar" className="text-muted-foreground hover:text-primary transition-colors">
            Seja um Fornecedor
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant="outline" className="hidden md:inline-flex" asChild>
            <a href="/dashboard">Dashboard</a>
          </Button>
          <Button className="bg-gradient-primary shadow-button hover:scale-105 transition-transform" asChild>
            <a href="/cadastrar">Cadastrar Empresa</a>
          </Button>
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};