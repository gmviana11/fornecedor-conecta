import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Clock, CheckCircle, XCircle, EyeOff, TrendingUp, AlertTriangle, Activity, BarChart3, Calendar, MessageCircle } from "lucide-react";
import { useSuppliers } from "@/hooks/useSuppliers";
import { useNavigate } from "react-router-dom";

const DashboardHome = () => {
  const { suppliers } = useSuppliers();
  const navigate = useNavigate();

  const stats = {
    total: suppliers.length,
    pending: suppliers.filter(s => s.status === 'pending').length,
    approved: suppliers.filter(s => s.status === 'approved').length,
    rejected: suppliers.filter(s => s.status === 'rejected').length,
    hidden: suppliers.filter(s => s.status === 'hidden').length,
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
    ...(stats.pending > 5 ? [{ type: 'warning', message: `${stats.pending} fornecedores pendentes de aprovação` }] : []),
    ...(stats.rejected > stats.approved ? [{ type: 'error', message: 'Alto índice de rejeições de fornecedores' }] : []),
    ...(suppliers.filter(s => !s.comments || s.comments.length === 0).length > stats.total * 0.5 ? 
        [{ type: 'info', message: 'Muitos fornecedores sem avaliações/comentários' }] : [])
  ];

  const approvalRate = stats.total > 0 ? Math.round((stats.approved / stats.total) * 100) : 0;

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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Fornecedores</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">+{recentSuppliers.length} esta semana</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aguardando Aprovação</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <p className="text-xs text-muted-foreground">Requer ação</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aprovados</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
            <p className="text-xs text-muted-foreground">Ativos no sistema</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Aprovação</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvalRate}%</div>
            <p className="text-xs text-muted-foreground">Últimos 30 dias</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inativos</CardTitle>
            <EyeOff className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.rejected + stats.hidden}</div>
            <p className="text-xs text-muted-foreground">Rejeitados/Ocultos</p>
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
                    </div>
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
                topCategories.map(([category, count]) => (
                  <div key={category} className="flex justify-between items-center">
                    <span className="text-sm font-medium truncate">{category}</span>
                    <Badge variant="outline">{count}</Badge>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Atividade Recente
            </CardTitle>
            <CardDescription>
              Últimos comentários e interações
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
                    className="flex gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
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
    </div>
  );
};

export default DashboardHome;