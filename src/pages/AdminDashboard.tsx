import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Users, 
  Building2, 
  FileText, 
  TrendingUp, 
  Activity, 
  DollarSign, 
  BarChart3,
  Settings,
  User,
  LogOut,
  Home,
  Shield,
  Database,
  MessageSquare,
  Star,
  CheckCircle,
  Clock,
  AlertTriangle,
  Plus,
  Eye,
  Edit,
  Trash2,
  Search,
  Download,
  Bell
} from "lucide-react";
import { useAuthContext } from "@/hooks/useAuth";
import { useServices } from "@/hooks/useServices";
import { useSuppliers } from "@/hooks/useSuppliers";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const AdminDashboard = () => {
  const { user, logout } = useAuthContext();
  const { services } = useServices();
  const { suppliers } = useSuppliers();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState('dashboard');

  const stats = {
    totalUsers: 45,
    totalSuppliers: suppliers.length,
    totalServices: services.length,
    pendingServices: services.filter(s => s.status === 'pending').length,
    completedServices: services.filter(s => s.status === 'completed').length,
    totalRevenue: 25750,
    activeSuppliers: suppliers.filter(s => s.status === 'approved').length,
  };

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'users', label: 'Usuários', icon: Users },
    { id: 'suppliers', label: 'Fornecedores', icon: Building2 },
    { id: 'services', label: 'Serviços', icon: FileText },
    { id: 'analytics', label: 'Relatórios', icon: BarChart3 },
    { id: 'system', label: 'Sistema', icon: Database },
    { id: 'settings', label: 'Configurações', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: { variant: 'secondary' as const, label: 'Pendente', color: 'text-yellow-600' },
      responded: { variant: 'default' as const, label: 'Respondido', color: 'text-blue-600' },
      completed: { variant: 'default' as const, label: 'Concluído', color: 'text-green-600' },
      approved: { variant: 'default' as const, label: 'Aprovado', color: 'text-green-600' },
      rejected: { variant: 'destructive' as const, label: 'Rejeitado', color: 'text-red-600' },
      hidden: { variant: 'destructive' as const, label: 'Oculto', color: 'text-gray-600' },
      active: { variant: 'default' as const, label: 'Ativo', color: 'text-green-600' },
      inactive: { variant: 'destructive' as const, label: 'Inativo', color: 'text-red-600' },
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
          <h1 className="text-xl font-bold text-gray-800">MXS Admin</h1>
          <p className="text-sm text-gray-500">Painel Administrativo</p>
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
                    ? 'bg-purple-50 text-purple-700 border border-purple-200'
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
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <Shield className="h-5 w-5 text-purple-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
              <p className="text-xs text-gray-500 truncate">Administrador</p>
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
                {activeTab === 'dashboard' && 'Visão geral do sistema MXS'}
                {activeTab === 'users' && 'Gerenciamento de usuários da plataforma'}
                {activeTab === 'suppliers' && 'Controle de fornecedores cadastrados'}
                {activeTab === 'services' && 'Monitoramento de serviços e solicitações'}
                {activeTab === 'analytics' && 'Relatórios e análises detalhadas'}
                {activeTab === 'system' && 'Configurações e logs do sistema'}
                {activeTab === 'settings' && 'Configurações administrativas'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                <Shield className="h-3 w-3 mr-1" />
                Super Admin
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
                <Card className="border-l-4 border-l-blue-500">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Total de Usuários</CardTitle>
                    <Users className="h-5 w-5 text-blue-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-600">{stats.totalUsers}</div>
                    <p className="text-xs text-gray-500 mt-1">
                      <TrendingUp className="inline h-3 w-3 mr-1" />
                      +12% este mês
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-green-500">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Fornecedores Ativos</CardTitle>
                    <Building2 className="h-5 w-5 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-600">{stats.activeSuppliers}</div>
                    <p className="text-xs text-gray-500 mt-1">de {stats.totalSuppliers} cadastrados</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-yellow-500">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Serviços Pendentes</CardTitle>
                    <Clock className="h-5 w-5 text-yellow-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-yellow-600">{stats.pendingServices}</div>
                    <p className="text-xs text-gray-500 mt-1">Aguardando resposta</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-purple-500">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Receita Total</CardTitle>
                    <DollarSign className="h-5 w-5 text-purple-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-purple-600">R$ {stats.totalRevenue.toLocaleString('pt-BR')}</div>
                    <p className="text-xs text-gray-500 mt-1">
                      <Activity className="inline h-3 w-3 mr-1" />
                      +8% desde último mês
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Atividades Recentes */}
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-900">Atividades Recentes</CardTitle>
                    <CardDescription>Últimas ações no sistema</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Users className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">Novo usuário cadastrado</p>
                          <p className="text-xs text-gray-500">João Silva se cadastrou • há 2 horas</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 p-3 bg-green-50 rounded-lg">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">Serviço concluído</p>
                          <p className="text-xs text-gray-500">Desenvolvimento de site finalizado • há 4 horas</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 p-3 bg-yellow-50 rounded-lg">
                        <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                          <Building2 className="h-4 w-4 text-yellow-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">Novo fornecedor aprovado</p>
                          <p className="text-xs text-gray-500">TechSolutions aprovada • há 6 horas</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 p-3 bg-purple-50 rounded-lg">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <MessageSquare className="h-4 w-4 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">Nova solicitação</p>
                          <p className="text-xs text-gray-500">Consultoria em TI solicitada • há 8 horas</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-900">Status do Sistema</CardTitle>
                    <CardDescription>Monitoramento em tempo real</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="font-medium text-green-800">Servidor Web</span>
                        </div>
                        <Badge variant="outline" className="bg-green-100 text-green-700">Online</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="font-medium text-green-800">Banco de Dados</span>
                        </div>
                        <Badge variant="outline" className="bg-green-100 text-green-700">Online</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="font-medium text-green-800">E-mail Service</span>
                        </div>
                        <Badge variant="outline" className="bg-green-100 text-green-700">Online</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <span className="font-medium text-yellow-800">Backup System</span>
                        </div>
                        <Badge variant="outline" className="bg-yellow-100 text-yellow-700">Executando</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Gráfico de Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Mensal</CardTitle>
                  <CardDescription>Evolução dos principais indicadores</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { metric: 'Novos Usuários', current: 45, previous: 32, growth: 41 },
                      { metric: 'Serviços Concluídos', current: 28, previous: 25, growth: 12 },
                      { metric: 'Receita (R$)', current: 25750, previous: 18200, growth: 41 },
                      { metric: 'Fornecedores Ativos', current: 12, previous: 10, growth: 20 }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="w-32 text-sm text-gray-600">{item.metric}</div>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${Math.min(item.growth, 100)}%` }}
                          ></div>
                        </div>
                        <div className="w-20 text-sm font-medium text-gray-900">
                          {item.metric.includes('Receita') ? `R$ ${item.current.toLocaleString('pt-BR')}` : item.current}
                        </div>
                        <div className="w-16 text-xs text-green-600">
                          +{item.growth}%
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Gerenciamento de Usuários</h2>
                  <p className="text-sm text-gray-500">Total: {stats.totalUsers} usuários cadastrados</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Usuário
                </Button>
              </div>

              {/* Stats dos Usuários */}
              <div className="grid gap-4 md:grid-cols-4">
                <Card className="border-l-4 border-l-blue-500">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Total de Usuários</CardTitle>
                    <Users className="h-5 w-5 text-blue-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-600">{stats.totalUsers}</div>
                    <p className="text-xs text-gray-500 mt-1">+5 este mês</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-green-500">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Usuários Ativos</CardTitle>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-600">38</div>
                    <p className="text-xs text-gray-500 mt-1">84% do total</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-purple-500">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Novos Usuários</CardTitle>
                    <TrendingUp className="h-5 w-5 text-purple-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-purple-600">12</div>
                    <p className="text-xs text-gray-500 mt-1">Últimos 30 dias</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-orange-500">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Admins</CardTitle>
                    <Shield className="h-5 w-5 text-orange-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-orange-600">3</div>
                    <p className="text-xs text-gray-500 mt-1">Super usuários</p>
                  </CardContent>
                </Card>
              </div>

              {/* Filtros e Busca */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Filtros</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 items-end">
                    <div className="flex-1">
                      <Label htmlFor="search-users">Buscar Usuários</Label>
                      <Input 
                        id="search-users"
                        placeholder="Nome, email ou telefone..."
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="filter-role">Tipo de Usuário</Label>
                      <select 
                        id="filter-role" 
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 bg-white"
                      >
                        <option value="">Todos</option>
                        <option value="admin">Administrador</option>
                        <option value="user">Cliente</option>
                        <option value="supplier">Fornecedor</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="filter-status">Status</Label>
                      <select 
                        id="filter-status" 
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 bg-white"
                      >
                        <option value="">Todos</option>
                        <option value="active">Ativo</option>
                        <option value="inactive">Inativo</option>
                        <option value="pending">Pendente</option>
                      </select>
                    </div>
                    <Button variant="outline">
                      Buscar
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Lista de Usuários */}
              <Card>
                <CardHeader>
                  <CardTitle>Lista de Usuários</CardTitle>
                  <CardDescription>Gerencie todos os usuários da plataforma</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Usuário Mock 1 - Admin */}
                    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <Shield className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-semibold text-gray-900">Admin MXS</h4>
                          <p className="text-sm text-gray-500">admin@mxs.com.br</p>
                          <p className="text-sm text-gray-500">(11) 99999-9999</p>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-red-100 text-red-800 border-red-200">Super Admin</Badge>
                            {getStatusBadge('active')}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <p className="text-xs text-gray-500">Último acesso: Hoje às 14:30</p>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Usuário Mock 2 - Cliente */}
                    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                          <User className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-semibold text-gray-900">João Silva</h4>
                          <p className="text-sm text-gray-500">joao.silva@email.com</p>
                          <p className="text-sm text-gray-500">(11) 98765-4321</p>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-green-100 text-green-800 border-green-200">Cliente</Badge>
                            {getStatusBadge('active')}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <p className="text-xs text-gray-500">Último acesso: Ontem às 16:45</p>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Usuário Mock 3 - Fornecedor */}
                    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                          <Building2 className="h-6 w-6 text-purple-600" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-semibold text-gray-900">Maria Santos</h4>
                          <p className="text-sm text-gray-500">maria@designcriativo.com</p>
                          <p className="text-sm text-gray-500">(11) 97654-3210</p>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-purple-100 text-purple-800 border-purple-200">Fornecedor</Badge>
                            {getStatusBadge('active')}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <p className="text-xs text-gray-500">Último acesso: Hoje às 09:15</p>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Usuário Mock 4 - Cliente Inativo */}
                    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 opacity-75">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                          <User className="h-6 w-6 text-gray-600" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-semibold text-gray-900">Carlos Oliveira</h4>
                          <p className="text-sm text-gray-500">carlos.oliveira@email.com</p>
                          <p className="text-sm text-gray-500">(11) 96543-2109</p>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-green-100 text-green-800 border-green-200">Cliente</Badge>
                            {getStatusBadge('inactive')}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <p className="text-xs text-gray-500">Último acesso: 15 dias atrás</p>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Usuário Mock 5 - Fornecedor Pendente */}
                    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                          <Clock className="h-6 w-6 text-yellow-600" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-semibold text-gray-900">Pedro Costa</h4>
                          <p className="text-sm text-gray-500">pedro@techsolutions.com</p>
                          <p className="text-sm text-gray-500">(11) 95432-1098</p>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-purple-100 text-purple-800 border-purple-200">Fornecedor</Badge>
                            {getStatusBadge('pending')}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <p className="text-xs text-gray-500">Cadastrado: 2 dias atrás</p>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Ações em Massa */}
              <Card>
                <CardHeader>
                  <CardTitle>Ações em Massa</CardTitle>
                  <CardDescription>Gerencie múltiplos usuários simultaneamente</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    <Button variant="outline">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Ativar Selecionados
                    </Button>
                    <Button variant="outline">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Suspender Selecionados
                    </Button>
                    <Button variant="destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Excluir Selecionados
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Relatórios de Usuários */}
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Usuários por Tipo</CardTitle>
                    <CardDescription>Distribuição dos tipos de usuário</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <User className="h-5 w-5 text-green-600" />
                        <span className="font-medium text-green-800">Clientes</span>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-700">35</div>
                        <div className="text-xs text-green-600">78% do total</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-5 w-5 text-purple-600" />
                        <span className="font-medium text-purple-800">Fornecedores</span>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-purple-700">7</div>
                        <div className="text-xs text-purple-600">16% do total</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-red-600" />
                        <span className="font-medium text-red-800">Administradores</span>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-red-700">3</div>
                        <div className="text-xs text-red-600">6% do total</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Atividade dos Usuários</CardTitle>
                    <CardDescription>Estatísticas de engajamento</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Usuários ativos hoje</span>
                        <span className="font-medium">23</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '51%' }}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Usuários ativos esta semana</span>
                        <span className="font-medium">38</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '84%' }}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Taxa de retenção mensal</span>
                        <span className="font-medium">92%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'suppliers' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Gerenciamento de Fornecedores</h2>
                  <p className="text-sm text-gray-500">{stats.activeSuppliers} ativos de {stats.totalSuppliers} cadastrados</p>
                </div>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Fornecedor
                </Button>
              </div>

              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {suppliers.map((supplier) => (
                      <div key={supplier.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <Building2 className="h-6 w-6 text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{supplier.name}</h3>
                            <p className="text-sm text-gray-500">{supplier.category}</p>
                            <p className="text-xs text-gray-400">{supplier.email} • {supplier.address}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(supplier.status === 'approved' ? 'active' : supplier.status)}
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'services' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Monitoramento de Serviços</h2>
                  <p className="text-sm text-gray-500">{stats.totalServices} solicitações registradas</p>
                </div>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Relatório Completo
                </Button>
              </div>

              {/* Stats dos Serviços */}
              <div className="grid gap-4 md:grid-cols-4">
                <Card className="border-l-4 border-l-blue-500">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Total de Solicitações</CardTitle>
                    <FileText className="h-5 w-5 text-blue-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-600">{stats.totalServices}</div>
                    <p className="text-xs text-gray-500 mt-1">+8 esta semana</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-yellow-500">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Pendentes</CardTitle>
                    <Clock className="h-5 w-5 text-yellow-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-yellow-600">{stats.pendingServices}</div>
                    <p className="text-xs text-gray-500 mt-1">Aguardando fornecedores</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-green-500">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Concluídos</CardTitle>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-600">8</div>
                    <p className="text-xs text-gray-500 mt-1">Taxa: 73%</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-purple-500">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Em Andamento</CardTitle>
                    <Activity className="h-5 w-5 text-purple-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-purple-600">3</div>
                    <p className="text-xs text-gray-500 mt-1">Com fornecedores</p>
                  </CardContent>
                </Card>
              </div>

              {/* Filtros de Serviços */}
              <Card>
                <CardHeader>
                  <CardTitle>Filtros e Busca</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 items-end">
                    <div className="flex-1">
                      <Label htmlFor="search-services">Buscar Serviços</Label>
                      <Input 
                        id="search-services"
                        placeholder="Título, cliente ou fornecedor..."
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="filter-status-service">Status</Label>
                      <select 
                        id="filter-status-service" 
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 bg-white"
                      >
                        <option value="">Todos</option>
                        <option value="pending">Pendente</option>
                        <option value="responded">Respondido</option>
                        <option value="accepted">Aceito</option>
                        <option value="completed">Concluído</option>
                        <option value="cancelled">Cancelado</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="filter-category">Categoria</Label>
                      <select 
                        id="filter-category" 
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 bg-white"
                      >
                        <option value="">Todas</option>
                        <option value="desenvolvimento">Desenvolvimento</option>
                        <option value="design">Design</option>
                        <option value="marketing">Marketing</option>
                        <option value="consultoria">Consultoria</option>
                      </select>
                    </div>
                    <Button variant="outline">
                      <Search className="h-4 w-4 mr-2" />
                      Buscar
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Lista de Serviços Detalhada */}
              <Card>
                <CardHeader>
                  <CardTitle>Solicitações de Serviço</CardTitle>
                  <CardDescription>Monitoramento completo em tempo real</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Serviço 1 - Pendente */}
                    <div className="border rounded-lg p-6 space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <h3 className="text-lg font-semibold text-gray-900">Desenvolvimento de E-commerce</h3>
                            <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                              <Clock className="h-3 w-3 mr-1" />
                              Pendente
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">
                            Cliente: João Silva • Solicitado em 23/08/2025 às 14:30
                          </p>
                          <p className="text-sm text-gray-500">
                            Desenvolvimento de loja virtual para venda de produtos artesanais com integração de pagamento.
                          </p>
                        </div>
                        <div className="text-right space-y-1">
                          <p className="text-lg font-semibold text-green-600">R$ 5.000 - R$ 8.000</p>
                          <p className="text-xs text-gray-500">Orçamento estimado</p>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="text-center">
                          <p className="text-sm font-medium text-gray-700">Prazo Esperado</p>
                          <p className="text-lg font-semibold text-gray-900">45 dias</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium text-gray-700">Propostas</p>
                          <p className="text-lg font-semibold text-blue-600">0 recebidas</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium text-gray-700">Categoria</p>
                          <p className="text-lg font-semibold text-purple-600">Desenvolvimento Web</p>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          Ver Detalhes
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Contatar Cliente
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </Button>
                      </div>
                    </div>

                    {/* Serviço 2 - Em Andamento */}
                    <div className="border rounded-lg p-6 space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <h3 className="text-lg font-semibold text-gray-900">Design de Identidade Visual</h3>
                            <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                              <Activity className="h-3 w-3 mr-1" />
                              Em Andamento
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">
                            Cliente: Maria Santos • Fornecedor: Design Criativo Ltda
                          </p>
                          <p className="text-sm text-gray-500">
                            Criação completa de identidade visual incluindo logo, cartão de visita e material promocional.
                          </p>
                        </div>
                        <div className="text-right space-y-1">
                          <p className="text-lg font-semibold text-green-600">R$ 2.500</p>
                          <p className="text-xs text-gray-500">Valor acordado</p>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-4 gap-4 p-4 bg-blue-50 rounded-lg">
                        <div className="text-center">
                          <p className="text-sm font-medium text-blue-700">Progresso</p>
                          <p className="text-lg font-semibold text-blue-900">60%</p>
                          <div className="w-full bg-blue-200 rounded-full h-2 mt-1">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium text-blue-700">Iniciado em</p>
                          <p className="text-lg font-semibold text-blue-900">20/08/2025</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium text-blue-700">Prazo</p>
                          <p className="text-lg font-semibold text-blue-900">30/08/2025</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium text-blue-700">Comunicações</p>
                          <p className="text-lg font-semibold text-blue-900">8 mensagens</p>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          Ver Progresso
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Chat
                        </Button>
                        <Button variant="outline" size="sm">
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          Reportar Problema
                        </Button>
                      </div>
                    </div>

                    {/* Serviço 3 - Concluído */}
                    <div className="border rounded-lg p-6 space-y-4 bg-green-50/30">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <h3 className="text-lg font-semibold text-gray-900">Consultoria em Marketing Digital</h3>
                            <Badge className="bg-green-100 text-green-800 border-green-200">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Concluído
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">
                            Cliente: Carlos Oliveira • Fornecedor: Marketing Pro
                          </p>
                          <p className="text-sm text-gray-500">
                            Análise completa e estratégia de marketing digital para aumento de vendas online.
                          </p>
                        </div>
                        <div className="text-right space-y-1">
                          <p className="text-lg font-semibold text-green-600">R$ 1.800</p>
                          <p className="text-xs text-gray-500">Concluído • Pago</p>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-4 gap-4 p-4 bg-green-50 rounded-lg">
                        <div className="text-center">
                          <p className="text-sm font-medium text-green-700">Avaliação</p>
                          <div className="flex items-center justify-center gap-1 mt-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                            ))}
                          </div>
                          <p className="text-sm font-semibold text-green-900">5.0/5.0</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium text-green-700">Concluído em</p>
                          <p className="text-lg font-semibold text-green-900">18/08/2025</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium text-green-700">Duração</p>
                          <p className="text-lg font-semibold text-green-900">12 dias</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium text-green-700">Taxa Plataforma</p>
                          <p className="text-lg font-semibold text-green-900">R$ 144</p>
                        </div>
                      </div>

                      <div className="bg-green-100 p-3 rounded border-l-4 border-l-green-500">
                        <p className="text-sm font-medium text-green-800 mb-1">Comentário do Cliente:</p>
                        <p className="text-sm text-green-700">
                          "Excelente trabalho! A consultoria superou minhas expectativas e já vejo resultados positivos nas vendas."
                        </p>
                      </div>

                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-2" />
                          Ver Relatório
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Baixar Comprovantes
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Análise de Performance de Serviços */}
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance por Categoria</CardTitle>
                    <CardDescription>Distribuição e taxa de sucesso</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <span className="font-medium text-purple-800">Desenvolvimento</span>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-purple-700">45%</div>
                        <div className="text-xs text-purple-600">5 projetos</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="font-medium text-blue-800">Design</span>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-blue-700">27%</div>
                        <div className="text-xs text-blue-600">3 projetos</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="font-medium text-green-800">Consultoria</span>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-700">18%</div>
                        <div className="text-xs text-green-600">2 projetos</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                        <span className="font-medium text-orange-800">Marketing</span>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-orange-700">10%</div>
                        <div className="text-xs text-orange-600">1 projeto</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Tempo Médio de Conclusão</CardTitle>
                    <CardDescription>Por categoria de serviço</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Desenvolvimento Web</span>
                        <span className="text-sm font-bold text-gray-900">28 dias</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Design Gráfico</span>
                        <span className="text-sm font-bold text-gray-900">15 dias</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '38%' }}></div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Consultoria</span>
                        <span className="text-sm font-bold text-gray-900">12 dias</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Marketing Digital</span>
                        <span className="text-sm font-bold text-gray-900">20 dias</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-orange-500 h-2 rounded-full" style={{ width: '50%' }}></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Ações Administrativas */}
              <Card>
                <CardHeader>
                  <CardTitle>Ações Administrativas</CardTitle>
                  <CardDescription>Ferramentas de gestão e controle</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 flex-wrap">
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Exportar Relatório
                    </Button>
                    <Button variant="outline">
                      <Bell className="h-4 w-4 mr-2" />
                      Configurar Alertas
                    </Button>
                    <Button variant="outline">
                      <Settings className="h-4 w-4 mr-2" />
                      Configurações de Serviço
                    </Button>
                    <Button variant="outline">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Dashboard Avançado
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Relatórios e Análises</h2>
                  <p className="text-sm text-gray-500">Dashboards interativos e métricas de performance</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Relatório
                </Button>
              </div>

              {/* KPIs Principais */}
              <div className="grid gap-4 md:grid-cols-4">
                <Card className="border-l-4 border-l-green-500">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Receita Total</CardTitle>
                    <DollarSign className="h-5 w-5 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-600">R$ 125.480</div>
                    <p className="text-xs text-gray-500 mt-1">+12% vs mês anterior</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-blue-500">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Transações</CardTitle>
                    <Activity className="h-5 w-5 text-blue-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-600">847</div>
                    <p className="text-xs text-gray-500 mt-1">+8% este mês</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-purple-500">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Taxa de Conversão</CardTitle>
                    <TrendingUp className="h-5 w-5 text-purple-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-purple-600">23.8%</div>
                    <p className="text-xs text-gray-500 mt-1">+2.1% vs anterior</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-orange-500">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Satisfação Média</CardTitle>
                    <Star className="h-5 w-5 text-orange-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-orange-600">4.7</div>
                    <div className="flex items-center mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-3 w-3 ${i < 5 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Gráficos e Análises */}
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Receita por Mês</CardTitle>
                    <CardDescription>Evolução da receita nos últimos 12 meses</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { month: 'Jan', revenue: 18500, growth: 15 },
                        { month: 'Fev', revenue: 22300, growth: 20 },
                        { month: 'Mar', revenue: 25800, growth: 16 },
                        { month: 'Abr', revenue: 28400, growth: 10 },
                        { month: 'Mai', revenue: 31200, growth: 10 },
                        { month: 'Jun', revenue: 29800, growth: -4 },
                        { month: 'Jul', revenue: 33500, growth: 12 },
                        { month: 'Ago', revenue: 35200, growth: 5 }
                      ].map((data, index) => (
                        <div key={index} className="flex items-center space-x-4">
                          <div className="w-12 text-sm text-gray-600">{data.month}</div>
                          <div className="flex-1 bg-gray-200 rounded-full h-3">
                            <div 
                              className="bg-green-500 h-3 rounded-full transition-all duration-500"
                              style={{ width: `${(data.revenue / 40000) * 100}%` }}
                            ></div>
                          </div>
                          <div className="w-24 text-sm font-medium text-gray-900">
                            R$ {data.revenue.toLocaleString('pt-BR')}
                          </div>
                          <div className={`w-16 text-xs ${data.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {data.growth >= 0 ? '+' : ''}{data.growth}%
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Performance por Categoria</CardTitle>
                    <CardDescription>Serviços mais solicitados e rentáveis</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div>
                          <div className="font-medium text-blue-800">Desenvolvimento Web</div>
                          <div className="text-sm text-blue-600">126 projetos</div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-blue-700">R$ 45.200</div>
                          <div className="text-xs text-blue-600">36% da receita</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div>
                          <div className="font-medium text-green-800">Design Gráfico</div>
                          <div className="text-sm text-green-600">98 projetos</div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-700">R$ 32.850</div>
                          <div className="text-xs text-green-600">26% da receita</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                        <div>
                          <div className="font-medium text-purple-800">Marketing Digital</div>
                          <div className="text-sm text-purple-600">87 projetos</div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-purple-700">R$ 28.430</div>
                          <div className="text-xs text-purple-600">23% da receita</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                        <div>
                          <div className="font-medium text-orange-800">Consultoria</div>
                          <div className="text-sm text-orange-600">45 projetos</div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-orange-700">R$ 19.000</div>
                          <div className="text-xs text-orange-600">15% da receita</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Métricas de Usuários e Fornecedores */}
              <div className="grid gap-6 md:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Crescimento de Usuários</CardTitle>
                    <CardDescription>Novos registros por período</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Últimos 7 dias</span>
                        <span className="font-bold text-blue-600">+23</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Últimos 30 dias</span>
                        <span className="font-bold text-green-600">+89</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Últimos 90 dias</span>
                        <span className="font-bold text-purple-600">+245</span>
                      </div>
                      
                      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                        <div className="text-sm text-gray-600 mb-1">Taxa de crescimento mensal</div>
                        <div className="text-xl font-bold text-green-600">+18.5%</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Performance dos Fornecedores</CardTitle>
                    <CardDescription>Análise de qualidade e eficiência</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Taxa de resposta</span>
                          <span className="font-medium">92%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Projetos concluídos</span>
                          <span className="font-medium">87%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{ width: '87%' }}></div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Satisfação média</span>
                          <span className="font-medium">4.7/5.0</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '94%' }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Análise Financeira</CardTitle>
                    <CardDescription>Indicadores econômicos da plataforma</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-2 border rounded">
                        <span className="text-sm">Receita bruta</span>
                        <span className="font-bold text-green-600">R$ 125.480</span>
                      </div>
                      <div className="flex justify-between items-center p-2 border rounded">
                        <span className="text-sm">Taxa da plataforma (8%)</span>
                        <span className="font-bold text-blue-600">R$ 10.038</span>
                      </div>
                      <div className="flex justify-between items-center p-2 border rounded">
                        <span className="text-sm">Custos operacionais</span>
                        <span className="font-bold text-red-600">R$ 3.850</span>
                      </div>
                      <div className="flex justify-between items-center p-2 border rounded bg-green-50">
                        <span className="text-sm font-medium">Lucro líquido</span>
                        <span className="font-bold text-green-700">R$ 6.188</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Relatórios Personalizados */}
              <Card>
                <CardHeader>
                  <CardTitle>Relatórios Personalizados</CardTitle>
                  <CardDescription>Gere relatórios específicos para suas necessidades</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-center gap-3 mb-2">
                        <BarChart3 className="h-6 w-6 text-blue-600" />
                        <h3 className="font-medium">Relatório de Vendas</h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Análise detalhada de vendas por período, categoria e fornecedor</p>
                      <Button size="sm" variant="outline" className="w-full">Gerar Relatório</Button>
                    </div>

                    <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-center gap-3 mb-2">
                        <Users className="h-6 w-6 text-green-600" />
                        <h3 className="font-medium">Relatório de Usuários</h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Estatísticas de crescimento, engajamento e retenção</p>
                      <Button size="sm" variant="outline" className="w-full">Gerar Relatório</Button>
                    </div>

                    <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-center gap-3 mb-2">
                        <DollarSign className="h-6 w-6 text-purple-600" />
                        <h3 className="font-medium">Relatório Financeiro</h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Fluxo de caixa, projeções e análise de rentabilidade</p>
                      <Button size="sm" variant="outline" className="w-full">Gerar Relatório</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'system' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Sistema e Infraestrutura</h2>
                  <p className="text-sm text-gray-500">Monitoramento, logs e configurações do sistema</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Configuração
                </Button>
              </div>

              {/* Status do Sistema */}
              <div className="grid gap-4 md:grid-cols-4">
                <Card className="border-l-4 border-l-green-500">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Status do Sistema</CardTitle>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">Online</div>
                    <p className="text-xs text-gray-500 mt-1">Uptime: 99.8%</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-blue-500">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Uso do Servidor</CardTitle>
                    <Activity className="h-5 w-5 text-blue-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600">47%</div>
                    <p className="text-xs text-gray-500 mt-1">CPU e Memória</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-purple-500">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Banco de Dados</CardTitle>
                    <Database className="h-5 w-5 text-purple-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-purple-600">2.4GB</div>
                    <p className="text-xs text-gray-500 mt-1">Tamanho atual</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-orange-500">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Último Backup</CardTitle>
                    <Shield className="h-5 w-5 text-orange-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-orange-600">2h atrás</div>
                    <p className="text-xs text-gray-500 mt-1">Backup automático</p>
                  </CardContent>
                </Card>
              </div>

              {/* Logs do Sistema */}
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Logs Recentes
                    </CardTitle>
                    <CardDescription>Últimas atividades do sistema</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-green-800">Sistema iniciado com sucesso</p>
                          <p className="text-xs text-green-600">Hoje às 08:30:45</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                        <Database className="h-4 w-4 text-blue-600 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-blue-800">Backup automático realizado</p>
                          <p className="text-xs text-blue-600">Hoje às 06:00:00</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                        <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-yellow-800">Alto uso de CPU detectado</p>
                          <p className="text-xs text-yellow-600">Ontem às 23:15:22</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-green-800">Atualização de segurança aplicada</p>
                          <p className="text-xs text-green-600">Ontem às 22:45:10</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                        <Activity className="h-4 w-4 text-blue-600 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-blue-800">Cache limpo automaticamente</p>
                          <p className="text-xs text-blue-600">Ontem às 20:00:00</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Monitoramento de Performance
                    </CardTitle>
                    <CardDescription>Métricas de sistema em tempo real</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>CPU Usage</span>
                          <span className="font-medium">47%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '47%' }}></div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Memória RAM</span>
                          <span className="font-medium">62%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{ width: '62%' }}></div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Armazenamento</span>
                          <span className="font-medium">34%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-purple-600 h-2 rounded-full" style={{ width: '34%' }}></div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Tráfego de Rede</span>
                          <span className="font-medium">23%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-orange-600 h-2 rounded-full" style={{ width: '23%' }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Configurações do Sistema */}
              <Card>
                <CardHeader>
                  <CardTitle>Configurações do Sistema</CardTitle>
                  <CardDescription>Gerencie configurações globais da plataforma</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <div className="font-medium">Modo de Manutenção</div>
                          <div className="text-sm text-gray-500">Ativar modo de manutenção do sistema</div>
                        </div>
                        <input type="checkbox" className="rounded" />
                      </div>
                      
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <div className="font-medium">Registros de Auditoria</div>
                          <div className="text-sm text-gray-500">Registrar todas as ações administrativas</div>
                        </div>
                        <input type="checkbox" defaultChecked className="rounded" />
                      </div>
                      
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <div className="font-medium">Backup Automático</div>
                          <div className="text-sm text-gray-500">Backup diário às 6:00</div>
                        </div>
                        <input type="checkbox" defaultChecked className="rounded" />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <div className="font-medium">Notificações por Email</div>
                          <div className="text-sm text-gray-500">Alertas para administradores</div>
                        </div>
                        <input type="checkbox" defaultChecked className="rounded" />
                      </div>
                      
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <div className="font-medium">Cache Automático</div>
                          <div className="text-sm text-gray-500">Limpeza automática do cache</div>
                        </div>
                        <input type="checkbox" defaultChecked className="rounded" />
                      </div>
                      
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <div className="font-medium">SSL/HTTPS</div>
                          <div className="text-sm text-gray-500">Forçar conexões seguras</div>
                        </div>
                        <input type="checkbox" defaultChecked className="rounded" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Gerenciamento de Backups */}
              <Card>
                <CardHeader>
                  <CardTitle>Gerenciamento de Backups</CardTitle>
                  <CardDescription>Controle os backups do sistema e dados</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Database className="h-8 w-8 text-blue-600" />
                        <div>
                          <h3 className="font-medium">Backup Completo</h3>
                          <p className="text-sm text-gray-500">Backup_2025-08-26_06-00.zip - 1.2GB</p>
                          <p className="text-xs text-gray-400">Hoje às 06:00:00</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          Download
                        </Button>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Database className="h-8 w-8 text-green-600" />
                        <div>
                          <h3 className="font-medium">Backup Incremental</h3>
                          <p className="text-sm text-gray-500">Backup_Inc_2025-08-25_06-00.zip - 245MB</p>
                          <p className="text-xs text-gray-400">Ontem às 06:00:00</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          Download
                        </Button>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-4 border-t">
                      <Button variant="outline">
                        <Database className="h-4 w-4 mr-2" />
                        Backup Manual
                      </Button>
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        <Settings className="h-4 w-4 mr-2" />
                        Configurar Backups
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Informações do Sistema */}
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Informações do Sistema</CardTitle>
                    <CardDescription>Detalhes da infraestrutura atual</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Versão da Aplicação</span>
                        <span className="font-medium">v2.4.1</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Sistema Operacional</span>
                        <span className="font-medium">Ubuntu 22.04 LTS</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Node.js</span>
                        <span className="font-medium">v18.17.0</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Banco de Dados</span>
                        <span className="font-medium">PostgreSQL 15.3</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Redis Cache</span>
                        <span className="font-medium">v7.0.11</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Tempo Online</span>
                        <span className="font-medium">15 dias, 4h 32m</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Ações do Sistema</CardTitle>
                    <CardDescription>Operações de manutenção e controle</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start">
                        <Database className="h-4 w-4 mr-2" />
                        Otimizar Banco de Dados
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Activity className="h-4 w-4 mr-2" />
                        Limpar Cache do Sistema
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <FileText className="h-4 w-4 mr-2" />
                        Exportar Logs
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Verificar Integridade
                      </Button>
                      <Button variant="destructive" className="w-full justify-start">
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Reiniciar Sistema
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações Administrativas</CardTitle>
                  <CardDescription>Configurações gerais da plataforma</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="platform-name">Nome da Plataforma</Label>
                        <Input 
                          id="platform-name" 
                          defaultValue="MXS Conecta"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="admin-email">E-mail do Administrador</Label>
                        <Input 
                          id="admin-email" 
                          type="email" 
                          defaultValue={user?.email || ""}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="maintenance-message">Mensagem de Manutenção</Label>
                      <Textarea
                        id="maintenance-message"
                        placeholder="Mensagem exibida durante manutenção..."
                        rows={3}
                        defaultValue="Sistema em manutenção. Voltaremos em breve."
                      />
                    </div>
                    
                    <div className="flex justify-end gap-2">
                      <Button variant="outline">Cancelar</Button>
                      <Button className="bg-purple-600 hover:bg-purple-700">
                        Salvar Configurações
                      </Button>
                    </div>
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

export default AdminDashboard;
