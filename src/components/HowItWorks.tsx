import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, UserCheck, Handshake, ArrowRight } from "lucide-react";

export const HowItWorks = () => {
  return (
    <section id="como-funciona" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Como Funciona?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Um processo simples e eficiente para conectar sua franquia aos melhores fornecedores do mercado.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="bg-gradient-card shadow-card p-8 text-center border-0 relative overflow-hidden group hover:shadow-card-hover transition-all duration-300">
            <div className="absolute top-4 right-4 bg-primary/10 text-primary px-2 py-1 rounded-full text-sm font-medium">
              01
            </div>
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
              <Search className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-card-foreground">Explore Fornecedores</h3>
            <p className="text-muted-foreground">
              Navegue pelos fornecedores qualificados em nossa plataforma. Use os filtros para encontrar exatamente o que precisa para sua franquia.
            </p>
          </Card>

          <Card className="bg-gradient-card shadow-card p-8 text-center border-0 relative overflow-hidden group hover:shadow-card-hover transition-all duration-300">
            <div className="absolute top-4 right-4 bg-accent/10 text-accent px-2 py-1 rounded-full text-sm font-medium">
              02
            </div>
            <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
              <UserCheck className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-card-foreground">Solicite Contato</h3>
            <p className="text-muted-foreground">
              Encontrou o fornecedor ideal? Preencha um formulário rápido com seus dados e receba as informações de contato na hora.
            </p>
          </Card>

          <Card className="bg-gradient-card shadow-card p-8 text-center border-0 relative overflow-hidden group hover:shadow-card-hover transition-all duration-300">
            <div className="absolute top-4 right-4 bg-primary/10 text-primary px-2 py-1 rounded-full text-sm font-medium">
              03
            </div>
            <div className="bg-gradient-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Handshake className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-card-foreground">Conecte-se Diretamente</h3>
            <p className="text-muted-foreground">
              O fornecedor entrará em contato com você diretamente para discutir suas necessidades e fechar o melhor negócio.
            </p>
          </Card>
        </div>

        <div className="bg-gradient-primary rounded-2xl p-8 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]" />
          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-4">Pronto para Começar?</h3>
            <p className="text-xl mb-6 text-primary-foreground/90">
              Junte-se a centenas de franquias que já encontraram seus fornecedores ideais
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white hover:text-primary">
                Explorar Fornecedores
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" className="bg-accent hover:bg-accent-hover">
                Cadastrar minha Empresa
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};