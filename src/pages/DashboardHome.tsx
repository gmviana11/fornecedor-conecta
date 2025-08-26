import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Users, Clock, CheckCircle, XCircle, EyeOff, TrendingUp, AlertTriangle, Activity, BarChart3, Calendar, MessageCircle, Star, DollarSign, FileText, Target, MapPin, Phone, Mail } from "lucide-react";
import { useSuppliers } from "@/hooks/useSuppliers";
import { useServices } from "@/hooks/useServices";
import { useNavigate } from "react-router-dom";

const DashboardHome = () => {
  const { suppliers } = useSuppliers();
  const { services } = useServices();
  const navigate = useNavigate();

  const stats = {
    total: suppliers.length,
    pending: suppliers.filter(s => s.status === 'pending').length,
    approved: suppliers.filter(s => s.status === 'approved').length,
    rejected: suppliers.filter(s => s.status === 'rejected').length,
    hidden: suppliers.filter(s => s.status === 'hidden').length,
  };

  // Service statistics
  const serviceStats = {
    total: services.length,
    pending: services.filter(s => s.status === 'pending').length,
    responded: services.filter(s => s.status === 'responded').length,
    completed: services.filter(s => s.status === 'completed').length,
    accepted: services.filter(s => s.status === 'accepted').length,
  };

  // Financial statistics (mock data for demonstration)
  const financialStats = {
    monthlyRevenue: 25750,
    totalTransactions: serviceStats.completed * 150, // Average transaction value
    averageTicket: serviceStats.completed > 0 ? (serviceStats.completed * 150) / serviceStats.completed : 0,
    platformFee: 25750 * 0.08, // 8% platform fee
  };

  const recentSuppliers = suppliers
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  // Category breakdown
  const categoryStats = suppliers.reduce((acc, supplier) => {
    acc[supplier.category] = (acc[supplier.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topCategories = Object.entries(categoryStats)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  // Recent activity (comments)
  const recentActivity = suppliers
    .flatMap(supplier => 
      (supplier.comments || []).map(comment => ({
        ...comment,
        supplierName: supplier.name,
        supplierId: supplier.id
      }))
    )
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 10);

  // System alerts
  const alerts = [
    ...(stats.pending > 5 ? [{ type: 'warning', message: `${stats.pending} fornecedores pendentes de aprovação`, action: 'review' }] : []),
    ...(stats.rejected > stats.approved ? [{ type: 'error', message: 'Alto índice de rejeições de fornecedores', action: 'analyze' }] : []),
    ...(suppliers.filter(s => !s.comments || s.comments.length === 0).length > stats.total * 0.5 ? 
        [{ type: 'info', message: 'Muitos fornecedores sem avaliações/comentários', action: 'review' }] : []),
    ...(serviceStats.pending > 10 ? [{ type: 'warning', message: `${serviceStats.pending} solicitações de serviço pendentes`, action: 'monitor' }] : []),
    ...(financialStats.monthlyRevenue < 20000 ? [{ type: 'info', message: 'Meta de receita mensal não atingida', action: 'strategy' }] : [])
  ];

  const approvalRate = stats.total > 0 ? Math.round((stats.approved / stats.total) * 100) : 0;
  const serviceCompletionRate = serviceStats.total > 0 ? Math.round((serviceStats.completed / serviceStats.total) * 100) : 0;

  // Top performing suppliers
  const topSuppliers = suppliers
    .filter(s => s.status === 'approved')
    .map(supplier => {
      const supplierServices = services.filter(service => service.supplierName === supplier.name);
      const completedServices = supplierServices.filter(s => s.status === 'completed');
      const avgRating = completedServices.length > 0 
        ? completedServices.reduce((acc, s) => acc + (s.rating?.stars || 0), 0) / completedServices.length 
        : 0;
      
      return {
        ...supplier,
        servicesCount: supplierServices.length,
        completedCount: completedServices.length,
        avgRating
      };
    })
    .sort((a, b) => b.completedCount - a.completedCount)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold">Dashboard Admin</h2>
          <p className="text-muted-foreground">
            Painel de controle - MXS Soluções
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => navigate('/dashboard/suppliers/new')} size="sm">
            <Users className="h-4 w-4 mr-2" />
            Novo Fornecedor
          </Button>
          <Button onClick={() => navigate('/dashboard/suppliers')} variant="outline" size="sm">
            <BarChart3 className="h-4 w-4 mr-2" />
            Gerenciar
          </Button>
        </div>
      </div>

      {/* System Alerts */}
      {alerts.length > 0 && (
        <div className="space-y-2">
          {alerts.map((alert, index) => (
            <Card key={index} className={`border-l-4 ${
              alert.type === 'error' ? 'border-l-red-500 bg-red-50/50' :
              alert.type === 'warning' ? 'border-l-yellow-500 bg-yellow-50/50' :
              'border-l-blue-500 bg-blue-50/50'
            }`}>
              <CardContent className="py-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className={`h-4 w-4 ${
                    alert.type === 'error' ? 'text-red-600' :
                    alert.type === 'warning' ? 'text-yellow-600' :
                    'text-blue-600'
                  }`} />
                  <span className="text-sm font-medium">{alert.message}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Main Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Fornecedores</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <p className="text-xs text-muted-foreground">+{recentSuppliers.length} esta semana</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aguardando Aprovação</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <p className="text-xs text-muted-foreground">Requer ação</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aprovados</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
            <p className="text-xs text-muted-foreground">Ativos no sistema</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Aprovação</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{approvalRate}%</div>
            <p className="text-xs text-muted-foreground">Últimos 30 dias</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Serviços Ativos</CardTitle>
            <FileText className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{serviceStats.total}</div>
            <p className="text-xs text-muted-foreground">{serviceStats.pending} pendentes</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-indigo-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Mensal</CardTitle>
            <DollarSign className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-indigo-600">
              R$ {financialStats.monthlyRevenue.toLocaleString('pt-BR')}
            </div>
            <p className="text-xs text-muted-foreground">Meta: R$ 30.000</p>
          </CardContent>
        </Card>
      </div>

      {/* Service Performance Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Conclusão</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{serviceCompletionRate}%</div>
            <Progress value={serviceCompletionRate} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {serviceStats.completed} de {serviceStats.total} serviços
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 150</div>
            <p className="text-xs text-muted-foreground">Por transação</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Resposta</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {serviceStats.total > 0 ? Math.round(((serviceStats.responded + serviceStats.completed) / serviceStats.total) * 100) : 0}%
            </div>
            <p className="text-xs text-muted-foreground">Fornecedores responsivos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Satisfação Média</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2</div>
            <div className="flex items-center mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-3 w-3 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
              ))}
            </div>
            <p className="text-xs text-muted-foreground">Avaliação dos clientes</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Recent Suppliers */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Fornecedores Recentes
            </CardTitle>
            <CardDescription>
              Últimos cadastros no sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSuppliers.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  Nenhum fornecedor cadastrado ainda
                </p>
              ) : (
                recentSuppliers.map((supplier) => (
                  <div
                    key={supplier.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => navigate('/dashboard/suppliers')}
                  >
                    <div className="space-y-1">
                      <p className="font-medium">{supplier.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {supplier.category} • {new Date(supplier.createdAt).toLocaleDateString('pt-BR')}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        {supplier.phone}
                        <Mail className="h-3 w-3 ml-2" />
                        {supplier.email}
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <Badge
                        variant={
                          supplier.status === 'approved' ? 'default' :
                          supplier.status === 'pending' ? 'secondary' :
                          'destructive'
                        }
                      >
                        {supplier.status === 'approved' && 'Aprovado'}
                        {supplier.status === 'pending' && 'Pendente'}
                        {supplier.status === 'rejected' && 'Rejeitado'}
                        {supplier.status === 'hidden' && 'Oculto'}
                      </Badge>
                      <p className="text-xs text-muted-foreground flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {supplier.address || 'Endereço não informado'}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Categories Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Categorias
            </CardTitle>
            <CardDescription>
              Distribuição por categoria
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topCategories.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">
                  Nenhuma categoria ainda
                </p>
              ) : (
                topCategories.map(([category, count]) => {
                  const percentage = (count / stats.total) * 100;
                  return (
                    <div key={category} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium truncate">{category}</span>
                        <Badge variant="outline">{count}</Badge>
                      </div>
                      <Progress value={percentage} className="h-2" />
                      <p className="text-xs text-muted-foreground">
                        {percentage.toFixed(1)}% do total
                      </p>
                    </div>
                  );
                })
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Performing Suppliers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Fornecedores Destaque
          </CardTitle>
          <CardDescription>
            Melhores fornecedores por performance e avaliações
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topSuppliers.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                Nenhum fornecedor com histórico de serviços ainda
              </p>
            ) : (
              topSuppliers.map((supplier, index) => (
                <div
                  key={supplier.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                      index === 0 ? 'bg-yellow-500' : 
                      index === 1 ? 'bg-gray-400' : 
                      index === 2 ? 'bg-orange-600' : 'bg-blue-500'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium">{supplier.name}</p>
                      <p className="text-sm text-muted-foreground">{supplier.category}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <FileText className="h-3 w-3" />
                          {supplier.servicesCount} serviços
                        </span>
                        <span className="flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" />
                          {supplier.completedCount} concluídos
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-medium">
                        {supplier.avgRating > 0 ? supplier.avgRating.toFixed(1) : 'N/A'}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Taxa: {supplier.servicesCount > 0 ? Math.round((supplier.completedCount / supplier.servicesCount) * 100) : 0}%
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recent Services Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Atividade de Serviços
          </CardTitle>
          <CardDescription>
            Últimas solicitações e atualizações de status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {services.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                Nenhuma atividade de serviços ainda
              </p>
            ) : (
              services
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .slice(0, 8)
                .map((service) => (
                  <div
                    key={service.id}
                    className="flex gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      service.status === 'completed' ? 'bg-green-100' :
                      service.status === 'responded' ? 'bg-blue-100' :
                      service.status === 'accepted' ? 'bg-purple-100' :
                      'bg-yellow-100'
                    }`}>
                      {service.status === 'completed' ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : service.status === 'responded' ? (
                        <MessageCircle className="h-4 w-4 text-blue-600" />
                      ) : service.status === 'accepted' ? (
                        <Target className="h-4 w-4 text-purple-600" />
                      ) : (
                        <Clock className="h-4 w-4 text-yellow-600" />
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-medium">{service.title}</span>
                        <Badge variant="outline" className="text-xs">
                          {service.status === 'pending' && 'Pendente'}
                          {service.status === 'responded' && 'Respondido'}
                          {service.status === 'accepted' && 'Aceito'}
                          {service.status === 'completed' && 'Concluído'}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Cliente: {service.userId} • Fornecedor: {service.supplierName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(service.createdAt).toLocaleDateString('pt-BR')} às {' '}
                        {new Date(service.createdAt).toLocaleTimeString('pt-BR', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                    {service.budget && (
                      <div className="text-right">
                        <p className="text-sm font-medium text-green-600">{service.budget}</p>
                        <p className="text-xs text-muted-foreground">Orçamento</p>
                      </div>
                    )}
                  </div>
                ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity - Comments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Comentários Recentes
          </CardTitle>
          <CardDescription>
            Últimos comentários e interações administrativas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                Nenhuma atividade recente
              </p>
            ) : (
              recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => navigate('/dashboard/suppliers')}
                >
                  <MessageCircle className="h-4 w-4 text-muted-foreground mt-1" />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-medium">{activity.author}</span>
                      <span className="text-muted-foreground">comentou sobre</span>
                      <span className="font-medium text-primary">{activity.supplierName}</span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      "{activity.text}"
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(activity.createdAt).toLocaleDateString('pt-BR')} às {' '}
                      {new Date(activity.createdAt).toLocaleTimeString('pt-BR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardHome;