import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Shield, Zap } from "lucide-react";
import heroImage from "@/assets/hero-marketplace.jpg";

export const Hero = () => {
  return (
    <section className="py-20 bg-gradient-hero text-primary-foreground overflow-hidden relative min-h-[600px]">
      <div className="absolute inset-0 opacity-20">
        <img 
          src={heroImage} 
          alt="Professional marketplace connecting businesses" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-hero/90" />
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Conectamos
            <span className="block bg-gradient-to-r from-white to-accent-foreground bg-clip-text text-transparent">
              Franquias & Fornecedores
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
            A plataforma que facilita a conexão entre redes de franquias e fornecedores qualificados. 
            Encontre os melhores parceiros para o seu negócio.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white hover:text-primary">
              Explorar Fornecedores
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" className="bg-accent hover:bg-accent-hover shadow-button">
              Cadastrar minha Empresa
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="bg-white/10 p-4 rounded-full mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Rede Exclusiva</h3>
              <p className="text-sm text-primary-foreground/80">
                Acesso direto aos tomadores de decisão das principais franquias
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-white/10 p-4 rounded-full mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Leads Qualificados</h3>
              <p className="text-sm text-primary-foreground/80">
                Receba apenas contatos interessados nos seus produtos/serviços
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-white/10 p-4 rounded-full mb-4">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Processo Ágil</h3>
              <p className="text-sm text-primary-foreground/80">
                Conectamos você ao cliente ideal em questão de minutos
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};