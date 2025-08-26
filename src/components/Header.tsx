import { useAuthContext } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Building2, Menu, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (user) {
    return (
      <header className="bg-background/80 backdrop-blur-lg border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">MXS Soluções</span>
          </div>
          
          <div className="flex items-center space-x-4">
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
          <Button variant="outline" className="hidden md:inline-flex" onClick={() => navigate('/login')}>
            Login
          </Button>
          <Button className="bg-gradient-primary shadow-button hover:scale-105 transition-transform" onClick={() => navigate('/cadastrar')}>
            Cadastrar Empresa
          </Button>
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};