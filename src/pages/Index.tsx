import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { SupplierGrid } from "@/components/SupplierGrid";
import { HowItWorks } from "@/components/HowItWorks";
import { ChatBot } from "@/components/ChatBot";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Building2, 
  Star, 
  CheckCircle, 
  ArrowRight, 
  Shield, 
  TrendingUp, 
  Zap,
  Clock,
  Award,
  Globe,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  HeadphonesIcon,
  MessageCircle,
  Heart,
  Target,
  Sparkles,
  PlayCircle
} from "lucide-react";
import { useState } from "react";

const Index = () => {
  const [email, setEmail] = useState("");

  const stats = {
    totalUsers: 45,
    totalSuppliers: 12,
    completedProjects: 128,
    satisfaction: 4.7
  };

  const features = [
    {
      icon: Users,
      title: "Rede de Fornecedores Qualificados",
      description: "Mais de 50+ fornecedores verificados em diversas categorias",
      color: "blue"
    },
    {
      icon: Shield,
      title: "Segurança Garantida",
      description: "Todos os fornecedores passam por verificação rigorosa",
      color: "green"
    },
    {
      icon: Zap,
      title: "Resposta Rápida",
      description: "Receba propostas em até 24 horas",
      color: "yellow"
    },
    {
      icon: Award,
      title: "Qualidade Comprovada",
      description: "Sistema de avaliação e feedback dos clientes",
      color: "purple"
    }
  ];

  const testimonials = [
    {
      name: "João Silva",
      role: "Empresário",
      content: "Encontrei o fornecedor perfeito para meu projeto em questão de horas. Plataforma incrível!",
      rating: 5,
      avatar: "JS"
    },
    {
      name: "Maria Santos",
      role: "Gestora de Marketing",
      content: "A qualidade dos fornecedores é excepcional. Recomendo para todos os meus colegas.",
      rating: 5,
      avatar: "MS"
    },
    {
      name: "Carlos Oliveira",
      role: "Diretor de TI",
      content: "Processo super simples e eficiente. Economizei tempo e dinheiro.",
      rating: 5,
      avatar: "CO"
    }
  ];

  const pricingPlans = [
    {
      name: "Básico",
      price: "Grátis",
      description: "Para pequenos projetos",
      features: ["2 solicitações por mês", "Suporte por email", "Acesso básico"],
      popular: false,
      color: "gray"
    },
    {
      name: "Profissional",
      price: "R$ 29",
      description: "Para empresas em crescimento",
      features: ["10 solicitações por mês", "Suporte prioritário", "Dashboard avançado", "API access"],
      popular: true,
      color: "blue"
    },
    {
      name: "Plus",
      price: "R$ 99",
      description: "Para empresas ativas",
      features: ["Tudo do Profissional", "30 solicitações por mês", "Relatórios avançados", "Integração premium"],
      popular: false,
      color: "green"
    },
    {
      name: "Enterprise",
      price: "R$ 199",
      description: "Para grandes empresas",
      features: ["50 solicitações por mês", "Página personalizada", "Chat dedicado", "Automações", "Gerente dedicado", "SLA garantido"],
      popular: false,
      color: "purple"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Seção 1: Hero */}
        <Hero />

        {/* Seção 2: Estatísticas e Números */}
        <section id="estatisticas" className="py-20 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-blue-100 text-blue-800 border-blue-200">
                Números que Impressionam
              </Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Resultados que Falam por Si
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Nossa plataforma conecta empresas e fornecedores com eficiência comprovada
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <Card className="text-center hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-blue-600 mb-2">{stats.totalUsers}+</h3>
                  <p className="text-gray-600 font-medium">Usuários Ativos</p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building2 className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-green-600 mb-2">{stats.totalSuppliers}+</h3>
                  <p className="text-gray-600 font-medium">Fornecedores Verificados</p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-purple-600 mb-2">{stats.completedProjects}+</h3>
                  <p className="text-gray-600 font-medium">Projetos Concluídos</p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="h-8 w-8 text-yellow-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-yellow-600 mb-2">{stats.satisfaction}</h3>
                  <p className="text-gray-600 font-medium">Avaliação Média</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Seção 2.5: Sobre Nós */}
        <section id="sobre" className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <Badge className="mb-4 bg-blue-100 text-blue-800 border-blue-200">
                <Building2 className="h-4 w-4 mr-1" />
                Sobre a MXS Soluções
              </Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Conectando Empresas com os Melhores Fornecedores
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Somos uma plataforma inovadora que revoluciona a forma como empresas encontram e contratam fornecedores. 
                Com tecnologia de ponta e uma rede de parceiros verificados, facilitamos conexões que geram resultados.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Nossa missão é simplificar o processo de contratação, garantindo qualidade, confiabilidade e 
                eficiência em cada projeto. Junte-se a milhares de empresas que já transformaram seus negócios conosco.
              </p>
            </div>
          </div>
        </section>

        {/* Seção 3: Nossos Serviços */}
        <section id="servicos" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-purple-100 text-purple-800 border-purple-200">
                <Sparkles className="h-4 w-4 mr-1" />
                Nossos Serviços
              </Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Soluções Completas para Sua Empresa
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Oferecemos uma gama completa de serviços para conectar sua empresa aos melhores fornecedores
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transform hover:-translate-y-2">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 bg-blue-500 group-hover:bg-blue-600 transition-colors duration-300">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Consultoria Especializada</h3>
                  <p className="text-gray-600 leading-relaxed">Análise completa das suas necessidades e recomendação dos melhores fornecedores para seu projeto</p>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 transform hover:-translate-y-2">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 bg-green-500 group-hover:bg-green-600 transition-colors duration-300">
                    <Building2 className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Gestão de Fornecedores</h3>
                  <p className="text-gray-600 leading-relaxed">Gerenciamento completo da sua rede de fornecedores com avaliações e métricas de performance</p>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 transform hover:-translate-y-2">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 bg-purple-500 group-hover:bg-purple-600 transition-colors duration-300">
                    <CheckCircle className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Verificação de Qualidade</h3>
                  <p className="text-gray-600 leading-relaxed">Todos os fornecedores passam por rigoroso processo de verificação e validação</p>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-yellow-50 to-yellow-100 hover:from-yellow-100 hover:to-yellow-200 transform hover:-translate-y-2">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 bg-yellow-500 group-hover:bg-yellow-600 transition-colors duration-300">
                    <Star className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Suporte 24/7</h3>
                  <p className="text-gray-600 leading-relaxed">Atendimento especializado disponível sempre que você precisar</p>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-indigo-50 to-indigo-100 hover:from-indigo-100 hover:to-indigo-200 transform hover:-translate-y-2">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 bg-indigo-500 group-hover:bg-indigo-600 transition-colors duration-300">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Contratos Seguros</h3>
                  <p className="text-gray-600 leading-relaxed">Gestão completa de contratos com garantias jurídicas e proteção legal</p>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 transform hover:-translate-y-2">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 bg-red-500 group-hover:bg-red-600 transition-colors duration-300">
                    <TrendingUp className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Análise de Performance</h3>
                  <p className="text-gray-600 leading-relaxed">Relatórios detalhados e análises para otimizar seus processos de contratação</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Seção 4: Recursos da Plataforma */}
        <section id="recursos" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-blue-100 text-blue-800 border-blue-200">
                <Zap className="h-4 w-4 mr-1" />
                Recursos da Plataforma
              </Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Tecnologia que Faz a Diferença
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Desenvolvemos a plataforma pensando em facilitar sua vida e acelerar seus negócios
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className={`group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br ${
                  feature.color === 'blue' ? 'from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200' :
                  feature.color === 'green' ? 'from-green-50 to-green-100 hover:from-green-100 hover:to-green-200' :
                  feature.color === 'yellow' ? 'from-yellow-50 to-yellow-100 hover:from-yellow-100 hover:to-yellow-200' :
                  'from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200'
                } transform hover:-translate-y-2`}>
                  <CardContent className="p-8 text-center">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 ${
                      feature.color === 'blue' ? 'bg-blue-500 group-hover:bg-blue-600' :
                      feature.color === 'green' ? 'bg-green-500 group-hover:bg-green-600' :
                      feature.color === 'yellow' ? 'bg-yellow-500 group-hover:bg-yellow-600' :
                      'bg-purple-500 group-hover:bg-purple-600'
                    } transition-colors duration-300`}>
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Seção 4: Como Funciona */}
        <div id="como-funciona">
          <HowItWorks />
        </div>

        {/* Seção 5: Grid de Fornecedores */}
        <section id="fornecedores" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-green-100 text-green-800 border-green-200">
                <Building2 className="h-4 w-4 mr-1" />
                Nossos Parceiros
              </Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Fornecedores de Confiança
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Trabalhamos apenas com fornecedores verificados e avaliados pelos nossos clientes
              </p>
            </div>
            <SupplierGrid />
            <div className="text-center mt-12">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 px-8 py-4">
                Ver Todos os Fornecedores
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Seção 6: Depoimentos */}
        <section id="depoimentos" className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                <Heart className="h-4 w-4 mr-1" />
                Depoimentos
              </Badge>
              <h2 className="text-4xl font-bold mb-4">
                O que Nossos Clientes Dizem
              </h2>
              <p className="text-xl opacity-90 max-w-3xl mx-auto">
                Histórias reais de empresas que transformaram seus negócios conosco
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                        <span className="text-white font-bold">{testimonial.avatar}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-white">{testimonial.name}</h4>
                        <p className="text-white/70 text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-white/90 mb-4 leading-relaxed">"{testimonial.content}"</p>
                    <div className="flex items-center">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Seção 7: Planos e Preços */}
        <section id="planos" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-orange-100 text-orange-800 border-orange-200">
                <Target className="h-4 w-4 mr-1" />
                Planos e Preços
              </Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Escolha o Plano Ideal para Você
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Temos opções para todos os tamanhos de empresa, desde startups até grandes corporações
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {pricingPlans.map((plan, index) => (
                <Card key={index} className={`relative hover:shadow-2xl transition-all duration-300 ${
                  plan.popular 
                    ? 'border-2 border-blue-500 transform scale-105 bg-gradient-to-br from-blue-50 to-blue-100' 
                    : 'border border-gray-200 hover:border-gray-300'
                }`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-blue-600 text-white px-4 py-1">
                        Mais Popular
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-xl font-bold text-gray-900">{plan.name}</CardTitle>
                    <CardDescription className="text-gray-600 text-sm">{plan.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                      {plan.price !== "Grátis" && <span className="text-gray-600">/mês</span>}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className={`w-full ${
                        plan.popular 
                          ? 'bg-blue-600 hover:bg-blue-700' 
                          : plan.color === 'green'
                          ? 'bg-green-600 hover:bg-green-700'
                          : plan.color === 'purple'
                          ? 'bg-purple-600 hover:bg-purple-700'
                          : 'bg-gray-900 hover:bg-gray-800'
                      }`}
                    >
                      Começar Agora
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Seção 8: Newsletter e Contato */}
        <section id="contato" className="py-20 bg-gradient-to-r from-gray-900 to-black text-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              {/* Newsletter */}
              <div>
                <Badge className="mb-4 bg-white/20 text-white border-white/30">
                  <Mail className="h-4 w-4 mr-1" />
                  Newsletter
                </Badge>
                <h2 className="text-4xl font-bold mb-4">
                  Fique por Dentro das Novidades
                </h2>
                <p className="text-xl opacity-90 mb-8">
                  Receba dicas exclusivas, novidades da plataforma e oportunidades de negócio direto no seu email.
                </p>
                <div className="flex gap-4">
                  <input
                    type="email"
                    placeholder="Seu melhor email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Button className="bg-blue-600 hover:bg-blue-700 px-8">
                    Inscrever
                  </Button>
                </div>
              </div>

              {/* Informações de Contato */}
              <div>
                <h3 className="text-2xl font-bold mb-8">Entre em Contato</h3>
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">Telefone</p>
                      <p className="opacity-90">(11) 99999-9999</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mr-4">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="opacity-90">contato@mxs.com.br</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mr-4">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">Endereço</p>
                      <p className="opacity-90">São Paulo, SP - Brasil</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center mr-4">
                      <MessageCircle className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">Suporte</p>
                      <p className="opacity-90">24/7 Chat Online</p>
                    </div>
                  </div>
                </div>

                {/* Redes Sociais */}
                <div className="mt-8">
                  <p className="font-semibold mb-4">Siga-nos nas Redes Sociais</p>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer">
                      <Facebook className="h-5 w-5 text-white" />
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center hover:from-purple-600 hover:to-pink-600 transition-colors cursor-pointer">
                      <Instagram className="h-5 w-5 text-white" />
                    </div>
                    <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors cursor-pointer">
                      <Linkedin className="h-5 w-5 text-white" />
                    </div>
                    <div className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors cursor-pointer">
                      <Twitter className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black text-white py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h3 className="text-2xl font-bold">MXS Soluções</h3>
                <p className="opacity-70">Conectando empresas e fornecedores</p>
              </div>
              <div className="flex items-center gap-8">
                <a href="#" className="opacity-70 hover:opacity-100 transition-opacity">Termos de Uso</a>
                <a href="#" className="opacity-70 hover:opacity-100 transition-opacity">Privacidade</a>
                <a href="#" className="opacity-70 hover:opacity-100 transition-opacity">Suporte</a>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center">
              <p className="opacity-70">© 2025 IA Code Labs. Todos os direitos reservados.</p>
            </div>
          </div>
        </footer>
      </main>
      
      {/* ChatBot flutuante */}
      <ChatBot />
    </div>
  );
};

export default Index;