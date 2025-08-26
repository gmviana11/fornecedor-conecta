import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  MessageSquare, 
  Clock, 
  CheckCircle, 
  Star, 
  Plus, 
  ThumbsUp, 
  MessageCircle,
  Home,
  Settings,
  User,
  LogOut,
  BarChart3,
  FileText,
  TrendingUp,
  Activity,
  DollarSign,
  Users
} from "lucide-react";
import { useAuthContext } from "@/hooks/useAuth";
import { useServices } from "@/hooks/useServices";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const UserDashboard = () => {
  const { user, logout } = useAuthContext();
  const { services, getServicesByUser, rateService } = useServices();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [rating, setRating] = useState(0);
  const [ratingComment, setRatingComment] = useState("");
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  const userServices = user ? getServicesByUser(user.id) : [];
  
  const stats = {
    total: userServices.length,
    pending: userServices.filter(s => s.status === 'pending').length,
    responded: userServices.filter(s => s.status === 'responded').length,
    completed: userServices.filter(s => s.status === 'completed').length,
  };

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'services', label: 'Serviços', icon: FileText },
    { id: 'reviews', label: 'Avaliações', icon: Star },
    { id: 'analytics', label: 'Relatórios', icon: BarChart3 },
    { id: 'settings', label: 'Configurações', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleRateService = () => {
    if (!selectedService || rating === 0) return;

    rateService(selectedService, {
      stars: rating,
      comment: ratingComment,
      ratedAt: new Date().toISOString()
    });

    setRating(0);
    setRatingComment("");
    setSelectedService(null);
    
    toast({
      title: "Avaliação enviada",
      description: "Obrigado pelo seu feedback!"
    });
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: { variant: 'secondary' as const, label: 'Aguardando Resposta', color: 'text-yellow-600' },
      responded: { variant: 'default' as const, label: 'Proposta Recebida', color: 'text-blue-600' },
      accepted: { variant: 'default' as const, label: 'Aceito', color: 'text-green-600' },
      rejected: { variant: 'destructive' as const, label: 'Rejeitado', color: 'text-red-600' },
      completed: { variant: 'default' as const, label: 'Concluído', color: 'text-green-600' },
    };
    
    const config = variants[status as keyof typeof variants] || variants.pending;
    
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const StarRating = ({ value, onChange }: { value: number; onChange: (value: number) => void }) => {
    return (
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-6 w-6 cursor-pointer transition-colors ${
              i < value
                ? 'text-yellow-500 fill-yellow-500'
                : 'text-gray-300 hover:text-yellow-400'
            }`}
            onClick={() => onChange(i + 1)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col">
        {/* Logo/Header */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">MXS Dashboard</h1>
          <p className="text-sm text-gray-500">Painel do Cliente</p>
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
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
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
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-blue-600" />
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
                {activeTab === 'dashboard' && 'Visão geral das suas atividades'}
                {activeTab === 'services' && 'Gerencie suas solicitações de serviço'}
                {activeTab === 'reviews' && 'Suas avaliações e feedback'}
                {activeTab === 'analytics' && 'Relatórios e estatísticas'}
                {activeTab === 'settings' && 'Configurações da conta'}
              </p>
            </div>
            <Button onClick={() => navigate('/request-service')} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Nova Solicitação
            </Button>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-8">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="border-l-4 border-l-blue-500">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Total de Solicitações</CardTitle>
                    <MessageSquare className="h-5 w-5 text-blue-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-gray-900">{stats.total}</div>
                    <p className="text-xs text-gray-500 mt-1">
                      <TrendingUp className="inline h-3 w-3 mr-1" />
                      +12% desde o mês passado
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
                    <p className="text-xs text-gray-500 mt-1">Pendentes de fornecedores</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-green-500">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Propostas Recebidas</CardTitle>
                    <MessageCircle className="h-5 w-5 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-600">{stats.responded}</div>
                    <p className="text-xs text-gray-500 mt-1">Aguardando sua decisão</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-purple-500">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Concluídos</CardTitle>
                    <CheckCircle className="h-5 w-5 text-purple-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-purple-600">{stats.completed}</div>
                    <p className="text-xs text-gray-500 mt-1">
                      <Activity className="inline h-3 w-3 mr-1" />
                      Taxa de conclusão: 85%
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900">Atividades Recentes</CardTitle>
                  <CardDescription>Suas últimas interações e atualizações</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userServices.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <FileText className="h-8 w-8 text-gray-400" />
                        </div>
                        <p className="text-gray-500 mb-4">Você ainda não fez nenhuma solicitação de serviço</p>
                        <Button onClick={() => navigate('/request-service')} className="bg-blue-600 hover:bg-blue-700">
                          <Plus className="h-4 w-4 mr-2" />
                          Fazer Primeira Solicitação
                        </Button>
                      </div>
                    ) : (
                      userServices
                        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                        .slice(0, 5)
                        .map((service) => (
                          <div key={service.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <FileText className="h-5 w-5 text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900">{service.title}</h4>
                              <p className="text-sm text-gray-500">
                                Fornecedor: {service.supplierName} • {new Date(service.createdAt).toLocaleDateString('pt-BR')}
                              </p>
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

          {activeTab === 'services' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Suas Solicitações</CardTitle>
                  <CardDescription>
                    Acompanhe o andamento das suas solicitações de serviço
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userServices.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-500 mb-4">
                          Você ainda não fez nenhuma solicitação de serviço
                        </p>
                        <Button onClick={() => navigate('/request-service')}>
                          <Plus className="h-4 w-4 mr-2" />
                          Fazer Primeira Solicitação
                        </Button>
                      </div>
                    ) : (
                      userServices
                        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                        .map((service) => (
                          <div key={service.id} className="border rounded-lg p-4 space-y-3">
                            <div className="flex items-start justify-between">
                              <div className="space-y-1">
                                <h3 className="font-semibold">{service.title}</h3>
                                <p className="text-sm text-gray-500">
                                  Fornecedor: {service.supplierName} • {new Date(service.createdAt).toLocaleDateString('pt-BR')}
                                </p>
                                {service.budget && (
                                  <p className="text-sm font-medium text-green-600">
                                    Seu orçamento: {service.budget}
                                  </p>
                                )}
                              </div>
                              <div className="flex items-center gap-2">
                                {getStatusBadge(service.status)}
                              </div>
                            </div>

                            <p className="text-sm">{service.description}</p>

                            {service.supplierResponse && (
                              <div className="bg-blue-50 p-3 rounded border-l-4 border-l-blue-500">
                                <p className="text-sm font-medium mb-1">Proposta do Fornecedor:</p>
                                <p className="text-sm mb-2">{service.supplierResponse.message}</p>
                                <div className="flex gap-4 text-sm">
                                  {service.supplierResponse.price && (
                                    <p className="font-medium text-green-600">
                                      Preço: {service.supplierResponse.price}
                                    </p>
                                  )}
                                  {service.supplierResponse.timeline && (
                                    <p className="text-gray-500">
                                      Prazo: {service.supplierResponse.timeline}
                                    </p>
                                  )}
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                  Respondido em: {new Date(service.supplierResponse.respondedAt).toLocaleDateString('pt-BR')}
                                </p>
                              </div>
                            )}

                            {service.rating && (
                              <div className="bg-yellow-50 p-3 rounded border-l-4 border-l-yellow-400">
                                <p className="text-sm font-medium mb-1">Sua Avaliação:</p>
                                <div className="flex items-center gap-1 mb-1">
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
                                  <span className="text-sm font-medium ml-1">
                                    ({service.rating.stars}/5)
                                  </span>
                                </div>
                                <p className="text-sm">{service.rating.comment}</p>
                              </div>
                            )}

                            <div className="flex justify-end gap-2">
                              {service.status === 'responded' && !service.rating && (
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => setSelectedService(service.id)}
                                    >
                                      <Star className="h-4 w-4 mr-2" />
                                      Avaliar Serviço
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Avaliar Fornecedor</DialogTitle>
                                      <DialogDescription>
                                        Como foi sua experiência com: {service.supplierName}
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                      <div className="space-y-2">
                                        <Label>Classificação *</Label>
                                        <StarRating value={rating} onChange={setRating} />
                                      </div>
                                      <div className="space-y-2">
                                        <Label htmlFor="comment">Comentário (opcional)</Label>
                                        <Textarea
                                          id="comment"
                                          placeholder="Conte como foi sua experiência..."
                                          value={ratingComment}
                                          onChange={(e) => setRatingComment(e.target.value)}
                                          rows={3}
                                        />
                                      </div>
                                      <div className="flex justify-end gap-2">
                                        <Button variant="outline" onClick={() => {
                                          setSelectedService(null);
                                          setRating(0);
                                          setRatingComment("");
                                        }}>
                                          Cancelar
                                        </Button>
                                        <Button onClick={handleRateService} disabled={rating === 0}>
                                          <ThumbsUp className="h-4 w-4 mr-2" />
                                          Enviar Avaliação
                                        </Button>
                                      </div>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              )}
                            </div>
                          </div>
                        ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              {/* Stats das Avaliações */}
              <div className="grid gap-6 md:grid-cols-3">
                <Card className="border-l-4 border-l-yellow-500">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Total de Avaliações</CardTitle>
                    <Star className="h-5 w-5 text-yellow-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-yellow-600">
                      {userServices.filter(s => s.rating).length}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Feedbacks enviados</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-green-500">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Média Geral</CardTitle>
                    <ThumbsUp className="h-5 w-5 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-600">
                      {userServices.filter(s => s.rating).length > 0 
                        ? (userServices.filter(s => s.rating).reduce((acc, s) => acc + (s.rating?.stars || 0), 0) / userServices.filter(s => s.rating).length).toFixed(1)
                        : '0.0'
                      }
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Estrelas em média</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-blue-500">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Pendentes</CardTitle>
                    <MessageCircle className="h-5 w-5 text-blue-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-600">
                      {userServices.filter(s => s.status === 'completed' && !s.rating).length}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Aguardando avaliação</p>
                  </CardContent>
                </Card>
              </div>

              {/* Lista de Avaliações Enviadas */}
              <Card>
                <CardHeader>
                  <CardTitle>Avaliações Enviadas</CardTitle>
                  <CardDescription>Histórico completo dos seus feedbacks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userServices.filter(s => s.rating).length === 0 ? (
                      <div className="text-center py-12">
                        <Star className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 mb-4">Você ainda não enviou nenhuma avaliação</p>
                        <p className="text-sm text-gray-400">
                          Quando seus serviços forem concluídos, você poderá avaliar os fornecedores
                        </p>
                      </div>
                    ) : (
                      userServices
                        .filter(s => s.rating)
                        .sort((a, b) => new Date(b.rating?.ratedAt || 0).getTime() - new Date(a.rating?.ratedAt || 0).getTime())
                        .map((service) => (
                          <div key={service.id} className="border rounded-lg p-6 space-y-4">
                            <div className="flex items-start justify-between">
                              <div className="space-y-2">
                                <h3 className="text-lg font-semibold">{service.title}</h3>
                                <p className="text-sm text-gray-500">
                                  Fornecedor: {service.supplierName} • Avaliado em {new Date(service.rating?.ratedAt || 0).toLocaleDateString('pt-BR')}
                                </p>
                              </div>
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                Concluído
                              </Badge>
                            </div>

                            <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-l-yellow-400">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="font-medium text-yellow-800">Sua Avaliação:</span>
                                <div className="flex items-center gap-1">
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
                                  <span className="text-sm font-medium text-yellow-700 ml-1">
                                    ({service.rating!.stars}/5)
                                  </span>
                                </div>
                              </div>
                              {service.rating?.comment && (
                                <p className="text-sm text-yellow-700">{service.rating.comment}</p>
                              )}
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                              <h4 className="font-medium mb-2">Resumo do Serviço:</h4>
                              <p className="text-sm text-gray-700">{service.description}</p>
                              {service.supplierResponse && (
                                <div className="mt-3 p-3 bg-white rounded border">
                                  <p className="text-sm text-gray-700">{service.supplierResponse.message}</p>
                                  {service.supplierResponse.price && (
                                    <p className="text-sm font-medium text-green-600 mt-1">
                                      Valor: {service.supplierResponse.price}
                                    </p>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        ))
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Serviços Pendentes de Avaliação */}
              {userServices.filter(s => s.status === 'completed' && !s.rating).length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Aguardando Sua Avaliação</CardTitle>
                    <CardDescription>Serviços concluídos que ainda não foram avaliados</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {userServices
                        .filter(s => s.status === 'completed' && !s.rating)
                        .map((service) => (
                          <div key={service.id} className="border rounded-lg p-6 space-y-4">
                            <div className="flex items-start justify-between">
                              <div className="space-y-2">
                                <h3 className="text-lg font-semibold">{service.title}</h3>
                                <p className="text-sm text-gray-500">
                                  Fornecedor: {service.supplierName} • Concluído
                                </p>
                              </div>
                              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                Aguardando Avaliação
                              </Badge>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                              <p className="text-sm text-gray-700">{service.description}</p>
                            </div>

                            <div className="flex justify-end">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button 
                                    onClick={() => setSelectedService(service.id)}
                                    className="bg-yellow-600 hover:bg-yellow-700"
                                  >
                                    <Star className="h-4 w-4 mr-2" />
                                    Avaliar Fornecedor
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-md">
                                  <DialogHeader>
                                    <DialogTitle>Avaliar Fornecedor</DialogTitle>
                                    <DialogDescription>
                                      Como foi sua experiência com {service.supplierName}?
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div className="space-y-2">
                                      <Label>Classificação *</Label>
                                      <StarRating value={rating} onChange={setRating} />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="comment">Comentário (opcional)</Label>
                                      <Textarea
                                        id="comment"
                                        placeholder="Conte como foi sua experiência..."
                                        value={ratingComment}
                                        onChange={(e) => setRatingComment(e.target.value)}
                                        rows={3}
                                      />
                                    </div>
                                    <div className="flex justify-end gap-2">
                                      <Button variant="outline" onClick={() => {
                                        setSelectedService(null);
                                        setRating(0);
                                        setRatingComment("");
                                      }}>
                                        Cancelar
                                      </Button>
                                      <Button 
                                        onClick={handleRateService}
                                        disabled={rating === 0}
                                        className="bg-yellow-600 hover:bg-yellow-700"
                                      >
                                        <Star className="h-4 w-4 mr-2" />
                                        Enviar Avaliação
                                      </Button>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              {/* Cards de Métricas Principais */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="border-l-4 border-l-blue-500">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Gasto Total</CardTitle>
                    <DollarSign className="h-5 w-5 text-blue-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-600">R$ 8.750</div>
                    <p className="text-xs text-gray-500 mt-1">
                      <TrendingUp className="inline h-3 w-3 mr-1" />
                      +15% este mês
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-green-500">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Projetos Concluídos</CardTitle>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-600">{stats.completed}</div>
                    <p className="text-xs text-gray-500 mt-1">Taxa de sucesso: 92%</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-purple-500">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Tempo Médio</CardTitle>
                    <Clock className="h-5 w-5 text-purple-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-purple-600">12 dias</div>
                    <p className="text-xs text-gray-500 mt-1">Para conclusão</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-orange-500">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Fornecedores</CardTitle>
                    <Users className="h-5 w-5 text-orange-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-orange-600">
                      {new Set(userServices.map(s => s.supplierName)).size}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Parceiros únicos</p>
                  </CardContent>
                </Card>
              </div>

              {/* Gráfico de Gastos Mensais */}
              <Card>
                <CardHeader>
                  <CardTitle>Gastos Mensais</CardTitle>
                  <CardDescription>Evolução dos investimentos nos últimos 6 meses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { month: 'Março', amount: 1200, projects: 1 },
                      { month: 'Abril', amount: 2800, projects: 2 },
                      { month: 'Maio', amount: 1950, projects: 2 },
                      { month: 'Junho', amount: 3200, projects: 3 },
                      { month: 'Julho', amount: 2400, projects: 2 },
                      { month: 'Agosto', amount: 2850, projects: 2 }
                    ].map((data, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="w-20 text-sm text-gray-600">{data.month}</div>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${(data.amount / 4000) * 100}%` }}
                          ></div>
                        </div>
                        <div className="w-24 text-sm font-medium text-gray-900">
                          R$ {data.amount.toLocaleString('pt-BR')}
                        </div>
                        <div className="w-16 text-xs text-gray-500">
                          {data.projects} proj.
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Análise por Categoria de Serviço */}
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Gastos por Categoria</CardTitle>
                    <CardDescription>Distribuição dos investimentos por tipo de serviço</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div>
                          <div className="font-medium text-blue-800">Desenvolvimento Web</div>
                          <div className="text-sm text-blue-600">4 projetos</div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-blue-700">R$ 4.200</div>
                          <div className="text-xs text-blue-600">48% do total</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div>
                          <div className="font-medium text-green-800">Design Gráfico</div>
                          <div className="text-sm text-green-600">3 projetos</div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-700">R$ 2.850</div>
                          <div className="text-xs text-green-600">33% do total</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                        <div>
                          <div className="font-medium text-purple-800">Consultoria</div>
                          <div className="text-sm text-purple-600">2 projetos</div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-purple-700">R$ 1.700</div>
                          <div className="text-xs text-purple-600">19% do total</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Performance dos Fornecedores</CardTitle>
                    <CardDescription>Avaliação média dos seus parceiros</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(
                      userServices.reduce((acc, service) => {
                        const supplier = service.supplierName;
                        if (!acc[supplier]) {
                          acc[supplier] = { services: [], totalRating: 0, count: 0 };
                        }
                        acc[supplier].services.push(service);
                        if (service.rating) {
                          acc[supplier].totalRating += service.rating.stars;
                          acc[supplier].count++;
                        }
                        return acc;
                      }, {} as Record<string, { services: typeof userServices; totalRating: number; count: number }>)
                    ).map(([supplier, data]) => (
                      <div key={supplier} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">{supplier}</div>
                          <div className="text-sm text-gray-600">{data.services.length} projeto{data.services.length !== 1 ? 's' : ''}</div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            <span className="font-medium">
                              {data.count > 0 ? (data.totalRating / data.count).toFixed(1) : 'N/A'}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500">
                            {data.count} avaliação{data.count !== 1 ? 'ões' : ''}
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Status dos Projetos */}
              <Card>
                <CardHeader>
                  <CardTitle>Timeline de Projetos</CardTitle>
                  <CardDescription>Histórico cronológico das suas solicitações</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userServices.length === 0 ? (
                      <div className="text-center py-8">
                        <BarChart3 className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">Nenhum projeto encontrado</p>
                      </div>
                    ) : (
                      userServices
                        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                        .map((service, index) => (
                          <div key={service.id} className="flex items-start space-x-4 relative">
                            {index < userServices.length - 1 && (
                              <div className="absolute left-6 top-12 w-px h-16 bg-gray-200"></div>
                            )}
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                              service.status === 'completed' ? 'bg-green-100' :
                              service.status === 'responded' ? 'bg-blue-100' :
                              service.status === 'pending' ? 'bg-yellow-100' : 'bg-gray-100'
                            }`}>
                              {service.status === 'completed' ? (
                                <CheckCircle className="h-6 w-6 text-green-600" />
                              ) : service.status === 'responded' ? (
                                <MessageCircle className="h-6 w-6 text-blue-600" />
                              ) : (
                                <Clock className="h-6 w-6 text-yellow-600" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium text-gray-900">{service.title}</h4>
                                {getStatusBadge(service.status)}
                              </div>
                              <p className="text-sm text-gray-500 mt-1">
                                {service.supplierName} • {new Date(service.createdAt).toLocaleDateString('pt-BR')}
                              </p>
                              {service.supplierResponse?.price && (
                                <p className="text-sm font-medium text-green-600 mt-1">
                                  Valor: {service.supplierResponse.price}
                                </p>
                              )}
                            </div>
                          </div>
                        ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              {/* Perfil Pessoal */}
              <Card>
                <CardHeader>
                  <CardTitle>Informações Pessoais</CardTitle>
                  <CardDescription>Gerencie seus dados pessoais</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="full-name">Nome Completo</Label>
                      <Input 
                        id="full-name" 
                        placeholder="Digite seu nome completo"
                        defaultValue={user?.name || ""}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="seu@email.com"
                        defaultValue={user?.email || ""}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input 
                        id="phone" 
                        placeholder="(11) 99999-9999"
                        defaultValue="(11) 97654-3210"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cpf">CPF</Label>
                      <Input 
                        id="cpf" 
                        placeholder="000.000.000-00"
                        defaultValue="123.456.789-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="birth-date">Data de Nascimento</Label>
                      <Input 
                        id="birth-date" 
                        type="date"
                        defaultValue="1990-05-15"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="profession">Profissão</Label>
                      <Input 
                        id="profession" 
                        placeholder="Sua profissão"
                        defaultValue="Empresário"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Cancelar</Button>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Salvar Alterações
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Endereço */}
              <Card>
                <CardHeader>
                  <CardTitle>Endereço</CardTitle>
                  <CardDescription>Informações de localização</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="cep">CEP</Label>
                      <Input 
                        id="cep" 
                        placeholder="00000-000"
                        defaultValue="04038-001"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="street">Rua</Label>
                      <Input 
                        id="street" 
                        placeholder="Nome da rua"
                        defaultValue="Rua Vergueiro, 3185"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="number">Número</Label>
                      <Input 
                        id="number" 
                        placeholder="123"
                        defaultValue="3185"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="complement">Complemento</Label>
                      <Input 
                        id="complement" 
                        placeholder="Apt, casa..."
                        defaultValue="Apto 42"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="neighborhood">Bairro</Label>
                      <Input 
                        id="neighborhood" 
                        placeholder="Nome do bairro"
                        defaultValue="Vila Mariana"
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
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Salvar Endereço
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Preferências de Orçamento */}
              <Card>
                <CardHeader>
                  <CardTitle>Preferências de Orçamento</CardTitle>
                  <CardDescription>Configure suas preferências para solicitações</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="budget-min">Orçamento Mínimo (R$)</Label>
                      <Input 
                        id="budget-min" 
                        type="number" 
                        placeholder="500"
                        defaultValue="500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="budget-max">Orçamento Máximo (R$)</Label>
                      <Input 
                        id="budget-max" 
                        type="number" 
                        placeholder="10000"
                        defaultValue="10000"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">Receber sugestões automáticas</div>
                        <div className="text-sm text-gray-500">Fornecedores recomendados baseados no seu histórico</div>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">Priorizar fornecedores locais</div>
                        <div className="text-sm text-gray-500">Dar preferência para fornecedores da sua região</div>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">Aceitar orçamentos parciais</div>
                        <div className="text-sm text-gray-500">Permitir propostas que atendam parte do serviço</div>
                      </div>
                      <input type="checkbox" className="rounded" />
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Cancelar</Button>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Salvar Preferências
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Notificações */}
              <Card>
                <CardHeader>
                  <CardTitle>Configurações de Notificação</CardTitle>
                  <CardDescription>Escolha como deseja receber atualizações</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">Novas Propostas</div>
                        <div className="text-sm text-gray-500">Quando fornecedores responderem suas solicitações</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Label htmlFor="proposals-email" className="text-sm">E-mail</Label>
                        <input type="checkbox" id="proposals-email" defaultChecked className="rounded" />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">Mensagens</div>
                        <div className="text-sm text-gray-500">Comunicação direta com fornecedores</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Label htmlFor="messages-email" className="text-sm">E-mail</Label>
                        <input type="checkbox" id="messages-email" defaultChecked className="rounded" />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">Conclusão de Projetos</div>
                        <div className="text-sm text-gray-500">Quando seus projetos forem finalizados</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Label htmlFor="completion-email" className="text-sm">E-mail</Label>
                        <input type="checkbox" id="completion-email" defaultChecked className="rounded" />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">Newsletter Semanal</div>
                        <div className="text-sm text-gray-500">Resumo das atividades e dicas</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Label htmlFor="newsletter-email" className="text-sm">E-mail</Label>
                        <input type="checkbox" id="newsletter-email" className="rounded" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Cancelar</Button>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Salvar Notificações
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Segurança */}
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
                        <div className="text-sm text-gray-500">Última alteração: há 2 meses</div>
                      </div>
                      <Button variant="outline" size="sm">
                        Alterar
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">Autenticação em Duas Etapas</div>
                        <div className="text-sm text-gray-500">Proteção adicional para sua conta</div>
                      </div>
                      <Button variant="outline" size="sm">
                        Configurar
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">Dispositivos Conectados</div>
                        <div className="text-sm text-gray-500">Gerencie sessões ativas</div>
                      </div>
                      <Button variant="outline" size="sm">
                        Ver Dispositivos
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">Histórico de Login</div>
                        <div className="text-sm text-gray-500">Visualizar acessos recentes</div>
                      </div>
                      <Button variant="outline" size="sm">
                        Ver Histórico
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Ações da Conta */}
              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="text-red-800">Ações da Conta</CardTitle>
                  <CardDescription>Configurações avançadas e exclusão</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
                    <div>
                      <div className="font-medium text-red-800">Desativar Conta</div>
                      <div className="text-sm text-red-600">Suspender temporariamente sua conta</div>
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

export default UserDashboard;
