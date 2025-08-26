import { useAuthContext } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Building2, Menu, LogOut, User, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Logo } from "@/components/Logo";

export const Header = () => {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  if (user) {
    return (
      <header className="bg-background/80 backdrop-blur-lg border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Logo className="h-8 w-8" />
          <span className="text-2xl font-bold text-foreground">MXS Soluções</span>
        </div>          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span className="text-sm">{user.name}</span>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-background/80 backdrop-blur-lg border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Logo className="h-8 w-8" />
          <span className="text-2xl font-bold text-foreground">MXS Soluções</span>
        </div>
        
        <nav className="hidden lg:flex items-center space-x-6">
          <a href="#sobre" className="text-muted-foreground hover:text-primary transition-colors font-medium">
            Sobre
          </a>
          <a href="#servicos" className="text-muted-foreground hover:text-primary transition-colors font-medium">
            Serviços
          </a>
          <a href="#como-funciona" className="text-muted-foreground hover:text-primary transition-colors font-medium">
            Como Funciona
          </a>
          <a href="#fornecedores" className="text-muted-foreground hover:text-primary transition-colors font-medium">
            Fornecedores
          </a>
          <a href="#planos" className="text-muted-foreground hover:text-primary transition-colors font-medium">
            Planos
          </a>
          <a href="#depoimentos" className="text-muted-foreground hover:text-primary transition-colors font-medium">
            Depoimentos
          </a>
          <a href="#contato" className="text-muted-foreground hover:text-primary transition-colors font-medium">
            Contato
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant="outline" className="hidden md:inline-flex" onClick={() => navigate('/login')}>
            Login
          </Button>
          <Button className="bg-gradient-primary shadow-button hover:scale-105 transition-transform hidden md:inline-flex" onClick={() => navigate('/cadastrar')}>
            Cadastrar Empresa
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="lg:hidden"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Menu Mobile */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-background/95 backdrop-blur-lg border-t border-border">
          <nav className="container mx-auto px-4 py-4 space-y-4">
            <a 
              href="#sobre" 
              className="block text-muted-foreground hover:text-primary transition-colors font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sobre
            </a>
            <a 
              href="#servicos" 
              className="block text-muted-foreground hover:text-primary transition-colors font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Serviços
            </a>
            <a 
              href="#como-funciona" 
              className="block text-muted-foreground hover:text-primary transition-colors font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Como Funciona
            </a>
            <a 
              href="#fornecedores" 
              className="block text-muted-foreground hover:text-primary transition-colors font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Fornecedores
            </a>
            <a 
              href="#planos" 
              className="block text-muted-foreground hover:text-primary transition-colors font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Planos
            </a>
            <a 
              href="#depoimentos" 
              className="block text-muted-foreground hover:text-primary transition-colors font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Depoimentos
            </a>
            <a 
              href="#contato" 
              className="block text-muted-foreground hover:text-primary transition-colors font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contato
            </a>
            
            <div className="pt-4 border-t border-border space-y-2">
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => {
                  navigate('/login');
                  setIsMobileMenuOpen(false);
                }}
              >
                Login
              </Button>
              <Button 
                className="w-full bg-gradient-primary shadow-button" 
                onClick={() => {
                  navigate('/cadastrar');
                  setIsMobileMenuOpen(false);
                }}
              >
                Cadastrar Empresa
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};