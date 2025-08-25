import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Clock, CheckCircle, XCircle, EyeOff } from "lucide-react";
import { useSuppliers } from "@/hooks/useSuppliers";

const DashboardHome = () => {
  const { suppliers } = useSuppliers();

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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Dashboard</h2>
        <p className="text-muted-foreground">
          Visão geral do sistema de fornecedores
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aprovados</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.approved}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejeitados/Ocultos</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.rejected + stats.hidden}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Fornecedores Recentes</CardTitle>
          <CardDescription>
            Últimos fornecedores cadastrados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentSuppliers.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">
                Nenhum fornecedor cadastrado ainda
              </p>
            ) : (
              recentSuppliers.map((supplier) => (
                <div
                  key={supplier.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="space-y-1">
                    <p className="font-medium">{supplier.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {supplier.category}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={
                        supplier.status === 'approved'
                          ? 'default'
                          : supplier.status === 'pending'
                          ? 'secondary'
                          : 'destructive'
                      }
                    >
                      {supplier.status === 'approved' && 'Aprovado'}
                      {supplier.status === 'pending' && 'Pendente'}
                      {supplier.status === 'rejected' && 'Rejeitado'}
                      {supplier.status === 'hidden' && 'Oculto'}
                    </Badge>
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