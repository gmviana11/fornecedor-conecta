import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  MessageSquare, 
  Clock, 
  CheckCircle, 
  Star, 
  Eye, 
  Send, 
  DollarSign, 
  Calendar,
  Home,
  Settings,
  User,
  LogOut,
  BarChart3,
  FileText,
  TrendingUp,
  Activity,
  Package,
  Users,
  Plus
} from "lucide-react";
import { useAuthContext } from "@/hooks/useAuth";
import { useServices } from "@/hooks/useServices";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const SupplierDashboard = () => {
  const { user, logout } = useAuthContext();
  const { services, getServicesBySupplier, respondToService } = useServices();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [responseMessage, setResponseMessage] = useState("");
  const [responsePrice, setResponsePrice] = useState("");
  const [responseTimeline, setResponseTimeline] = useState("");
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  const supplierServices = user?.supplierId ? getServicesBySupplier(user.supplierId) : [];
  
  const stats = {
    total: supplierServices.length,
    pending: supplierServices.filter(s => s.status === 'pending').length,
    responded: supplierServices.filter(s => s.status === 'responded').length,
    completed: supplierServices.filter(s => s.status === 'completed').length,
  };

  const averageRating = supplierServices
    .filter(s => s.rating)
    .reduce((acc, s) => acc + (s.rating?.stars || 0), 0) / 
    (supplierServices.filter(s => s.rating).length || 1);

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'requests', label: 'Solicitações', icon: FileText },
    { id: 'clients', label: 'Clientes', icon: Users },
    { id: 'services', label: 'Meus Serviços', icon: Package },
    { id: 'analytics', label: 'Relatórios', icon: BarChart3 },
    { id: 'settings', label: 'Configurações', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleRespond = () => {
    if (!selectedService || !responseMessage.trim()) return;

    respondToService(selectedService, {
      message: responseMessage,
      price: responsePrice || undefined,
      timeline: responseTimeline || undefined,
      respondedAt: new Date().toISOString()
    });

    setResponseMessage("");
    setResponsePrice("");
    setResponseTimeline("");
    setSelectedService(null);
    
    toast({
      title: "Resposta enviada",
      description: "Sua proposta foi enviada para o cliente."
    });
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: { variant: 'secondary' as const, label: 'Aguardando Resposta' },
      responded: { variant: 'default' as const, label: 'Respondido' },
      accepted: { variant: 'default' as const, label: 'Aceito' },
      rejected: { variant: 'destructive' as const, label: 'Rejeitado' },
      completed: { variant: 'default' as const, label: 'Concluído' },
    };
    
    const config = variants[status as keyof typeof variants] || variants.pending;
    
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col">
        {/* Logo/Header */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">MXS Fornecedor</h1>
          <p className="text-sm text-gray-500">Painel do Fornecedor</p>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2 flex-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === item.id
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
          
          {/* Botão de Sair integrado na navegação */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors text-red-600 hover:bg-red-50 hover:text-red-700 mt-4 border-t border-gray-200 pt-6"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Sair</span>
          </button>
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-green-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {sidebarItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
              </h1>
              <p className="text-gray-600">
                {activeTab === 'dashboard' && 'Visão geral das suas atividades como fornecedor'}
                {activeTab === 'requests' && 'Gerencie suas solicitações de orçamento'}
                {activeTab === 'clients' && 'Seus clientes e relacionamentos'}
                {activeTab === 'services' && 'Catálogo de serviços oferecidos'}
                {activeTab === 'analytics' && 'Relatórios e estatísticas de vendas'}
                {activeTab === 'settings' && 'Configurações da conta'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <Star className="h-3 w-3 mr-1" />
                {averageRating.toFixed(1)} estrelas
              </Badge>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-8">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="border-l-4 border-l-green-500">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Total de Solicitações</CardTitle>
                    <MessageSquare className="h-5 w-5 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-gray-900">{stats.total}</div>
                    <p className="text-xs text-gray-500 mt-1">
                      <TrendingUp className="inline h-3 w-3 mr-1" />
                      +8% desde o mês passado
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-yellow-500">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Aguardando Resposta</CardTitle>
                    <Clock className="h-5 w-5 text-yellow-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-yellow-600">{stats.pending}</div>
                    <p className="text-xs text-gray-500 mt-1">Necesssitam resposta urgente</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-blue-500">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Respondidas</CardTitle>
                    <Send className="h-5 w-5 text-blue-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-600">{stats.responded}</div>
                    <p className="text-xs text-gray-500 mt-1">Aguardando decisão do cliente</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-purple-500">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Concluídas</CardTitle>
                    <CheckCircle className="h-5 w-5 text-purple-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-purple-600">{stats.completed}</div>
                    <p className="text-xs text-gray-500 mt-1">
                      <Activity className="inline h-3 w-3 mr-1" />
                      Taxa de conversão: 78%
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Rating Card */}
              <Card className="border-l-4 border-l-yellow-400">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    Avaliação Média
                  </CardTitle>
                  <CardDescription>Feedback dos seus clientes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="text-4xl font-bold text-yellow-600">
                      {averageRating.toFixed(1)}
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(averageRating)
                              ? 'text-yellow-500 fill-yellow-500'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="text-sm text-gray-500 ml-2">
                        ({supplierServices.filter(s => s.rating).length} avaliações)
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Requests */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900">Solicitações Recentes</CardTitle>
                  <CardDescription>Últimas solicitações de orçamento recebidas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {supplierServices.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <MessageSquare className="h-8 w-8 text-gray-400" />
                        </div>
                        <p className="text-gray-500 mb-4">Você ainda não recebeu nenhuma solicitação</p>
                        <p className="text-sm text-gray-400">
                          Quando clientes solicitarem seus serviços, elas aparecerão aqui
                        </p>
                      </div>
                    ) : (
                      supplierServices
                        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                        .slice(0, 5)
                        .map((service) => (
                          <div key={service.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                              <MessageSquare className="h-5 w-5 text-green-600" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900">{service.title}</h4>
                              <p className="text-sm text-gray-500">
                                Cliente: {service.userName} • {new Date(service.createdAt).toLocaleDateString('pt-BR')}
                              </p>
                              {service.budget && (
                                <p className="text-sm font-medium text-green-600">
                                  Orçamento: {service.budget}
                                </p>
                              )}
                            </div>
                            <div className="flex items-center space-x-2">
                              {getStatusBadge(service.status)}
                            </div>
                          </div>
                        ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'requests' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Solicitações de Orçamento</CardTitle>
                  <CardDescription>
                    Gerencie as solicitações recebidas dos clientes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {supplierServices.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-500 mb-4">
                          Você ainda não recebeu nenhuma solicitação de orçamento
                        </p>
                      </div>
                    ) : (
                      supplierServices
                        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                        .map((service) => (
                          <div key={service.id} className="border rounded-lg p-6 space-y-4">
                            <div className="flex items-start justify-between">
                              <div className="space-y-2">
                                <h3 className="text-lg font-semibold">{service.title}</h3>
                                <p className="text-sm text-gray-500">
                                  Solicitante: {service.userName} • {new Date(service.createdAt).toLocaleDateString('pt-BR')}
                                </p>
                                {service.budget && (
                                  <p className="text-sm font-medium text-green-600">
                                    Orçamento disponível: {service.budget}
                                  </p>
                                )}
                              </div>
                              <div className="flex items-center gap-2">
                                {getStatusBadge(service.status)}
                              </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                              <h4 className="font-medium mb-2">Descrição do Serviço:</h4>
                              <p className="text-sm text-gray-700">{service.description}</p>
                            </div>

                            {service.supplierResponse ? (
                              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-l-green-500">
                                <h4 className="font-medium mb-2 text-green-800">Sua Resposta:</h4>
                                <p className="text-sm text-green-700 mb-2">{service.supplierResponse.message}</p>
                                <div className="flex gap-4 text-sm">
                                  {service.supplierResponse.price && (
                                    <p className="font-medium text-green-600">
                                      <DollarSign className="inline h-4 w-4 mr-1" />
                                      Preço: {service.supplierResponse.price}
                                    </p>
                                  )}
                                  {service.supplierResponse.timeline && (
                                    <p className="text-green-600">
                                      <Calendar className="inline h-4 w-4 mr-1" />
                                      Prazo: {service.supplierResponse.timeline}
                                    </p>
                                  )}
                                </div>
                                <p className="text-xs text-green-600 mt-2">
                                  Respondido em: {new Date(service.supplierResponse.respondedAt).toLocaleDateString('pt-BR')}
                                </p>
                              </div>
                            ) : (
                              <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-l-yellow-400">
                                <p className="text-sm text-yellow-700 font-medium">
                                  Aguardando sua resposta para esta solicitação
                                </p>
                              </div>
                            )}

                            {service.rating && (
                              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-l-blue-400">
                                <h4 className="font-medium mb-2 text-blue-800">Avaliação do Cliente:</h4>
                                <div className="flex items-center gap-2 mb-2">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < service.rating!.stars
                                          ? 'text-yellow-500 fill-yellow-500'
                                          : 'text-gray-300'
                                      }`}
                                    />
                                  ))}
                                  <span className="text-sm font-medium text-blue-700">
                                    ({service.rating.stars}/5)
                                  </span>
                                </div>
                                {service.rating.comment && (
                                  <p className="text-sm text-blue-700">{service.rating.comment}</p>
                                )}
                              </div>
                            )}

                            <div className="flex justify-end gap-2">
                              {service.status === 'pending' && (
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button 
                                      onClick={() => setSelectedService(service.id)}
                                      className="bg-green-600 hover:bg-green-700"
                                    >
                                      <Send className="h-4 w-4 mr-2" />
                                      Responder
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="sm:max-w-md">
                                    <DialogHeader>
                                      <DialogTitle>Responder Solicitação</DialogTitle>
                                      <DialogDescription>
                                        Envie sua proposta para: {service.userName}
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                      <div className="space-y-2">
                                        <Label htmlFor="message">Mensagem *</Label>
                                        <Textarea
                                          id="message"
                                          placeholder="Descreva sua proposta, experiência e diferenciais..."
                                          value={responseMessage}
                                          onChange={(e) => setResponseMessage(e.target.value)}
                                          rows={4}
                                          required
                                        />
                                      </div>
                                      <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                          <Label htmlFor="price">Preço (opcional)</Label>
                                          <Input
                                            id="price"
                                            placeholder="Ex: R$ 1.500,00"
                                            value={responsePrice}
                                            onChange={(e) => setResponsePrice(e.target.value)}
                                          />
                                        </div>
                                        <div className="space-y-2">
                                          <Label htmlFor="timeline">Prazo (opcional)</Label>
                                          <Input
                                            id="timeline"
                                            placeholder="Ex: 7 dias úteis"
                                            value={responseTimeline}
                                            onChange={(e) => setResponseTimeline(e.target.value)}
                                          />
                                        </div>
                                      </div>
                                      <div className="flex justify-end gap-2">
                                        <Button variant="outline" onClick={() => {
                                          setSelectedService(null);
                                          setResponseMessage("");
                                          setResponsePrice("");
                                          setResponseTimeline("");
                                        }}>
                                          Cancelar
                                        </Button>
                                        <Button 
                                          onClick={handleRespond}
                                          disabled={!responseMessage.trim()}
                                          className="bg-green-600 hover:bg-green-700"
                                        >
                                          <Send className="h-4 w-4 mr-2" />
                                          Enviar Proposta
                                        </Button>
                                      </div>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              )}
                              
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-2" />
                                Ver Detalhes
                              </Button>
                            </div>
                          </div>
                        ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'clients' && (
            <div className="space-y-6">
              {/* Stats Cards para Clientes */}
              <div className="grid gap-6 md:grid-cols-3">
                <Card className="border-l-4 border-l-blue-500">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Total de Clientes</CardTitle>
                    <Users className="h-5 w-5 text-blue-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-600">
                      {new Set(supplierServices.map(s => s.userName)).size}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Clientes únicos atendidos</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-green-500">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Clientes Ativos</CardTitle>
                    <Activity className="h-5 w-5 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-600">
                      {new Set(supplierServices.filter(s => s.status === 'responded' || s.status === 'pending').map(s => s.userName)).size}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Com projetos em andamento</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-purple-500">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Taxa de Retenção</CardTitle>
                    <TrendingUp className="h-5 w-5 text-purple-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-purple-600">85%</div>
                    <p className="text-xs text-gray-500 mt-1">Clientes que retornaram</p>
                  </CardContent>
                </Card>
              </div>

              {/* Lista de Clientes */}
              <Card>
                <CardHeader>
                  <CardTitle>Histórico de Clientes</CardTitle>
                  <CardDescription>Relacionamentos e projetos realizados</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {supplierServices.length === 0 ? (
                      <div className="text-center py-12">
                        <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">Você ainda não tem clientes</p>
                        <p className="text-sm text-gray-400">
                          Quando responder às primeiras solicitações, seus clientes aparecerão aqui
                        </p>
                      </div>
                    ) : (
                      Object.entries(
                        supplierServices.reduce((acc, service) => {
                          const client = service.userName;
                          if (!acc[client]) {
                            acc[client] = [];
                          }
                          acc[client].push(service);
                          return acc;
                        }, {} as Record<string, typeof supplierServices>)
                      ).map(([clientName, clientServices]) => (
                        <div key={clientName} className="border rounded-lg p-6 space-y-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <User className="h-6 w-6 text-blue-600" />
                              </div>
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900">{clientName}</h3>
                                <p className="text-sm text-gray-500">
                                  {clientServices.length} projeto{clientServices.length !== 1 ? 's' : ''}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">
                                Cliente desde {new Date(Math.min(...clientServices.map(s => new Date(s.createdAt).getTime()))).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
                              </Badge>
                            </div>
                          </div>

                          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {clientServices.map((service) => (
                              <div key={service.id} className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-medium text-gray-900 mb-2">{service.title}</h4>
                                <div className="flex items-center justify-between">
                                  {getStatusBadge(service.status)}
                                  <span className="text-xs text-gray-500">
                                    {new Date(service.createdAt).toLocaleDateString('pt-BR')}
                                  </span>
                                </div>
                                {service.rating && (
                                  <div className="flex items-center gap-1 mt-2">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`h-3 w-3 ${
                                          i < service.rating!.stars
                                            ? 'text-yellow-500 fill-yellow-500'
                                            : 'text-gray-300'
                                        }`}
                                      />
                                    ))}
                                    <span className="text-xs text-gray-500 ml-1">
                                      {service.rating.stars}/5
                                    </span>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'services' && (
            <div className="space-y-6">
              {/* Header com botão de adicionar */}
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Catálogo de Serviços</h2>
                  <p className="text-sm text-gray-500">Gerencie os serviços que você oferece</p>
                </div>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Serviço
                </Button>
              </div>

              {/* Grid de Serviços */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Serviços padrão baseados no perfil do fornecedor */}
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Desenvolvimento Web</CardTitle>
                      <Badge variant="default" className="bg-green-100 text-green-800">Ativo</Badge>
                    </div>
                    <CardDescription>Sites responsivos e sistemas web modernos</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <DollarSign className="h-4 w-4" />
                      <span>A partir de R$ 2.500,00</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>Prazo: 15-30 dias</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>4.8/5 (12 avaliações)</span>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-sm text-gray-700">
                        Criação de sites institucionais, e-commerce e sistemas web personalizados usando tecnologias modernas.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        Editar
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Consultoria em TI</CardTitle>
                      <Badge variant="default" className="bg-green-100 text-green-800">Ativo</Badge>
                    </div>
                    <CardDescription>Análise e otimização de processos tecnológicos</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <DollarSign className="h-4 w-4" />
                      <span>R$ 150,00/hora</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>Prazo: Flexível</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>4.9/5 (8 avaliações)</span>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-sm text-gray-700">
                        Consultoria especializada em infraestrutura, segurança e otimização de sistemas empresariais.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        Editar
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Manutenção de Sites</CardTitle>
                      <Badge variant="default" className="bg-green-100 text-green-800">Ativo</Badge>
                    </div>
                    <CardDescription>Suporte técnico e atualizações contínuas</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <DollarSign className="h-4 w-4" />
                      <span>R$ 200,00/mês</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>Serviço recorrente</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>5.0/5 (15 avaliações)</span>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-sm text-gray-700">
                        Manutenção preventiva, atualizações de conteúdo, backup e monitoramento de performance.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        Editar
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow border-dashed border-2 border-gray-300">
                  <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                    <Package className="h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="font-medium text-gray-900 mb-2">Adicionar Novo Serviço</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Expanda seu catálogo de serviços para atrair mais clientes
                    </p>
                    <Button variant="outline" className="border-green-300 text-green-700 hover:bg-green-50">
                      <Plus className="h-4 w-4 mr-2" />
                      Criar Serviço
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Estatísticas de Serviços */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance dos Serviços</CardTitle>
                  <CardDescription>Análise de demanda e popularidade</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="font-medium">Desenvolvimento Web</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>8 solicitações</span>
                        <span>4.8★</span>
                        <span className="text-green-600 font-medium">+ Popular</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="font-medium">Manutenção de Sites</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>5 solicitações</span>
                        <span>5.0★</span>
                        <span className="text-blue-600 font-medium">Melhor avaliado</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span className="font-medium">Consultoria em TI</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>3 solicitações</span>
                        <span>4.9★</span>
                        <span className="text-purple-600 font-medium">Maior valor/hora</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              {/* Cards de Métricas Principais */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="border-l-4 border-l-green-500">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Receita Total</CardTitle>
                    <DollarSign className="h-5 w-5 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-600">R$ 15.750</div>
                    <p className="text-xs text-gray-500 mt-1">
                      <TrendingUp className="inline h-3 w-3 mr-1" />
                      +12% este mês
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-blue-500">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Taxa de Conversão</CardTitle>
                    <BarChart3 className="h-5 w-5 text-blue-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-600">78%</div>
                    <p className="text-xs text-gray-500 mt-1">Propostas aceitas</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-purple-500">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Tempo Médio</CardTitle>
                    <Clock className="h-5 w-5 text-purple-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-purple-600">2.4h</div>
                    <p className="text-xs text-gray-500 mt-1">Para responder orçamentos</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-orange-500">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Projetos Ativos</CardTitle>
                    <Activity className="h-5 w-5 text-orange-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-orange-600">{stats.responded}</div>
                    <p className="text-xs text-gray-500 mt-1">Em andamento</p>
                  </CardContent>
                </Card>
              </div>

              {/* Gráfico de Receita Mensal */}
              <Card>
                <CardHeader>
                  <CardTitle>Receita Mensal</CardTitle>
                  <CardDescription>Evolução da receita nos últimos 6 meses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { month: 'Março', revenue: 8500, projects: 3 },
                      { month: 'Abril', revenue: 12200, projects: 4 },
                      { month: 'Maio', revenue: 15800, projects: 6 },
                      { month: 'Junho', revenue: 11400, projects: 4 },
                      { month: 'Julho', revenue: 18600, projects: 7 },
                      { month: 'Agosto', revenue: 15750, projects: 5 }
                    ].map((data, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="w-20 text-sm text-gray-600">{data.month}</div>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${(data.revenue / 20000) * 100}%` }}
                          ></div>
                        </div>
                        <div className="w-24 text-sm font-medium text-gray-900">
                          R$ {data.revenue.toLocaleString('pt-BR')}
                        </div>
                        <div className="w-16 text-xs text-gray-500">
                          {data.projects} proj.
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Análise por Tipo de Serviço */}
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance por Serviço</CardTitle>
                    <CardDescription>Análise de demanda e rentabilidade</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div>
                          <div className="font-medium text-green-800">Desenvolvimento Web</div>
                          <div className="text-sm text-green-600">8 projetos • R$ 9.200</div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-700">58%</div>
                          <div className="text-xs text-green-600">da receita</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div>
                          <div className="font-medium text-blue-800">Manutenção</div>
                          <div className="text-sm text-blue-600">5 contratos • R$ 4.200</div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-blue-700">27%</div>
                          <div className="text-xs text-blue-600">da receita</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                        <div>
                          <div className="font-medium text-purple-800">Consultoria</div>
                          <div className="text-sm text-purple-600">3 projetos • R$ 2.350</div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-purple-700">15%</div>
                          <div className="text-xs text-purple-600">da receita</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Satisfação dos Clientes</CardTitle>
                    <CardDescription>Distribuição das avaliações recebidas</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { stars: 5, count: 12, percentage: 75 },
                      { stars: 4, count: 3, percentage: 19 },
                      { stars: 3, count: 1, percentage: 6 },
                      { stars: 2, count: 0, percentage: 0 },
                      { stars: 1, count: 0, percentage: 0 }
                    ].map((rating) => (
                      <div key={rating.stars} className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1 w-16">
                          <span className="text-sm">{rating.stars}</span>
                          <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                        </div>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-yellow-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${rating.percentage}%` }}
                          ></div>
                        </div>
                        <div className="w-12 text-sm text-gray-600 text-right">
                          {rating.count}
                        </div>
                      </div>
                    ))}
                    <div className="pt-3 border-t">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Média geral:</span>
                        <div className="flex items-center gap-1">
                          <span className="text-lg font-bold text-yellow-600">4.8</span>
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Metas e Objetivos */}
              <Card>
                <CardHeader>
                  <CardTitle>Metas Mensais</CardTitle>
                  <CardDescription>Progresso dos objetivos de agosto</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Meta de Receita: R$ 20.000</span>
                      <span className="text-sm text-gray-500">R$ 15.750 (79%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '79%' }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Meta de Projetos: 8</span>
                      <span className="text-sm text-gray-500">5 (63%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '63%' }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Meta de Novos Clientes: 3</span>
                      <span className="text-sm text-gray-500">2 (67%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: '67%' }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              {/* Perfil do Fornecedor */}
              <Card>
                <CardHeader>
                  <CardTitle>Perfil do Fornecedor</CardTitle>
                  <CardDescription>Informações básicas da sua empresa</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="company-name">Nome da Empresa</Label>
                      <Input 
                        id="company-name" 
                        placeholder="Digite o nome da empresa"
                        defaultValue="MXS Tecnologia Ltda"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-name">Nome do Responsável</Label>
                      <Input 
                        id="contact-name" 
                        placeholder="Nome do responsável"
                        defaultValue={user?.name || ""}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="email@empresa.com"
                        defaultValue={user?.email || ""}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input 
                        id="phone" 
                        placeholder="(11) 99999-9999"
                        defaultValue="(11) 98765-4321"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cnpj">CNPJ</Label>
                      <Input 
                        id="cnpj" 
                        placeholder="00.000.000/0000-00"
                        defaultValue="12.345.678/0001-90"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input 
                        id="website" 
                        placeholder="https://meusite.com"
                        defaultValue="https://mxstecnologia.com.br"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição da Empresa</Label>
                    <Textarea
                      id="description"
                      placeholder="Descreva sua empresa, especialidades e diferenciais..."
                      rows={4}
                      defaultValue="Empresa especializada em desenvolvimento web e consultoria em TI, com mais de 5 anos de experiência no mercado. Focamos em soluções inovadoras e personalizadas para cada cliente."
                    />
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Cancelar</Button>
                    <Button className="bg-green-600 hover:bg-green-700">
                      Salvar Alterações
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Endereço */}
              <Card>
                <CardHeader>
                  <CardTitle>Endereço Comercial</CardTitle>
                  <CardDescription>Localização da sua empresa</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="cep">CEP</Label>
                      <Input 
                        id="cep" 
                        placeholder="00000-000"
                        defaultValue="01310-100"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="street">Rua</Label>
                      <Input 
                        id="street" 
                        placeholder="Nome da rua"
                        defaultValue="Av. Paulista, 1000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="number">Número</Label>
                      <Input 
                        id="number" 
                        placeholder="123"
                        defaultValue="1000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="complement">Complemento</Label>
                      <Input 
                        id="complement" 
                        placeholder="Sala, andar..."
                        defaultValue="Sala 1401"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="neighborhood">Bairro</Label>
                      <Input 
                        id="neighborhood" 
                        placeholder="Nome do bairro"
                        defaultValue="Bela Vista"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">Cidade</Label>
                      <Input 
                        id="city" 
                        placeholder="Nome da cidade"
                        defaultValue="São Paulo"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">Estado</Label>
                      <Input 
                        id="state" 
                        placeholder="SP"
                        defaultValue="SP"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Cancelar</Button>
                    <Button className="bg-green-600 hover:bg-green-700">
                      Salvar Endereço
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Configurações de Notificação */}
              <Card>
                <CardHeader>
                  <CardTitle>Notificações</CardTitle>
                  <CardDescription>Configure como deseja receber as notificações</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">Novas Solicitações</div>
                        <div className="text-sm text-gray-500">Receber notificação quando houver nova solicitação</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Label htmlFor="new-requests" className="text-sm">E-mail</Label>
                        <input type="checkbox" id="new-requests" defaultChecked className="rounded" />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">Mensagens de Clientes</div>
                        <div className="text-sm text-gray-500">Notificação para novas mensagens</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Label htmlFor="messages" className="text-sm">E-mail</Label>
                        <input type="checkbox" id="messages" defaultChecked className="rounded" />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">Avaliações</div>
                        <div className="text-sm text-gray-500">Quando um cliente avaliar seu serviço</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Label htmlFor="ratings" className="text-sm">E-mail</Label>
                        <input type="checkbox" id="ratings" defaultChecked className="rounded" />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">Relatórios Semanais</div>
                        <div className="text-sm text-gray-500">Resumo semanal de atividades</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Label htmlFor="reports" className="text-sm">E-mail</Label>
                        <input type="checkbox" id="reports" className="rounded" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Cancelar</Button>
                    <Button className="bg-green-600 hover:bg-green-700">
                      Salvar Preferências
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Configurações da Conta */}
              <Card>
                <CardHeader>
                  <CardTitle>Segurança da Conta</CardTitle>
                  <CardDescription>Configurações de segurança e privacidade</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">Alterar Senha</div>
                        <div className="text-sm text-gray-500">Última alteração: há 3 meses</div>
                      </div>
                      <Button variant="outline" size="sm">
                        Alterar
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">Autenticação em Duas Etapas</div>
                        <div className="text-sm text-gray-500">Adicione uma camada extra de segurança</div>
                      </div>
                      <Button variant="outline" size="sm">
                        Configurar
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">Sessões Ativas</div>
                        <div className="text-sm text-gray-500">Gerencie dispositivos conectados</div>
                      </div>
                      <Button variant="outline" size="sm">
                        Ver Sessões
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Ações da Conta */}
              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="text-red-800">Zona de Perigo</CardTitle>
                  <CardDescription>Ações irreversíveis da conta</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
                    <div>
                      <div className="font-medium text-red-800">Desativar Conta</div>
                      <div className="text-sm text-red-600">Sua conta ficará invisível para novos clientes</div>
                    </div>
                    <Button variant="destructive" size="sm">
                      Desativar
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
                    <div>
                      <div className="font-medium text-red-800">Excluir Conta</div>
                      <div className="text-sm text-red-600">Esta ação não pode ser desfeita</div>
                    </div>
                    <Button variant="destructive" size="sm">
                      Excluir
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupplierDashboard;
