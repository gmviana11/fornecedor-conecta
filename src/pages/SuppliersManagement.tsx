import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSuppliers, Supplier } from "@/hooks/useSuppliers";
import { Search, Eye, Edit, Trash2, Check, X, EyeOff } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

const SuppliersManagement = () => {
  const { suppliers, updateSupplier, deleteSupplier, addComment } = useSuppliers();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [commentText, setCommentText] = useState("");

  const filteredSuppliers = suppliers.filter((supplier) => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || supplier.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (id: string, status: Supplier['status']) => {
    updateSupplier(id, { status });
    toast({
      title: "Status atualizado",
      description: `Fornecedor foi ${status === 'approved' ? 'aprovado' : status === 'rejected' ? 'rejeitado' : 'ocultado'}.`,
    });
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Tem certeza que deseja excluir o fornecedor "${name}"?`)) {
      deleteSupplier(id);
      toast({
        title: "Fornecedor excluído",
        description: `${name} foi removido do sistema.`,
      });
    }
  };

  const handleAddComment = () => {
    if (selectedSupplier && commentText.trim()) {
      addComment(selectedSupplier.id, {
        text: commentText,
        author: "Admin"
      });
      setCommentText("");
      toast({
        title: "Comentário adicionado",
        description: "Comentário foi salvo com sucesso.",
      });
    }
  };

  const getStatusBadge = (status: Supplier['status']) => {
    const variants = {
      pending: 'secondary',
      approved: 'default',
      rejected: 'destructive',
      hidden: 'outline'
    } as const;

    const labels = {
      pending: 'Pendente',
      approved: 'Aprovado',
      rejected: 'Rejeitado',
      hidden: 'Oculto'
    };

    return (
      <Badge variant={variants[status]}>
        {labels[status]}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Gerenciar Fornecedores</h2>
        <p className="text-muted-foreground">
          Aprovar, editar e gerenciar fornecedores cadastrados
        </p>
      </div>

      <div className="flex gap-4 flex-col sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar fornecedores..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="pending">Pendentes</SelectItem>
            <SelectItem value="approved">Aprovados</SelectItem>
            <SelectItem value="rejected">Rejeitados</SelectItem>
            <SelectItem value="hidden">Ocultos</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4">
        {filteredSuppliers.length === 0 ? (
          <Card>
            <CardContent className="py-8">
              <p className="text-center text-muted-foreground">
                Nenhum fornecedor encontrado
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredSuppliers.map((supplier) => (
            <Card key={supplier.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {supplier.name}
                      {getStatusBadge(supplier.status)}
                    </CardTitle>
                    <CardDescription>
                      {supplier.category} • {supplier.email}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedSupplier(supplier)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>{supplier.name}</DialogTitle>
                          <DialogDescription>
                            Detalhes completos do fornecedor
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="font-medium">Categoria</p>
                              <p className="text-muted-foreground">{supplier.category}</p>
                            </div>
                            <div>
                              <p className="font-medium">Status</p>
                              {getStatusBadge(supplier.status)}
                            </div>
                            <div>
                              <p className="font-medium">Telefone</p>
                              <p className="text-muted-foreground">{supplier.phone}</p>
                            </div>
                            <div>
                              <p className="font-medium">Email</p>
                              <p className="text-muted-foreground">{supplier.email}</p>
                            </div>
                          </div>
                          <div>
                            <p className="font-medium">Descrição</p>
                            <p className="text-muted-foreground">{supplier.description}</p>
                          </div>
                          <div>
                            <p className="font-medium">Endereço</p>
                            <p className="text-muted-foreground">{supplier.address}</p>
                          </div>
                          {supplier.website && (
                            <div>
                              <p className="font-medium">Website</p>
                              <p className="text-muted-foreground">{supplier.website}</p>
                            </div>
                          )}
                          
                          <div className="space-y-2">
                            <p className="font-medium">Comentários ({supplier.comments?.length || 0})</p>
                            <div className="space-y-2 max-h-32 overflow-y-auto">
                              {supplier.comments?.map((comment) => (
                                <div key={comment.id} className="p-2 bg-muted rounded">
                                  <p className="text-sm">{comment.text}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {comment.author} • {new Date(comment.createdAt).toLocaleDateString()}
                                  </p>
                                </div>
                              ))}
                            </div>
                            <div className="flex gap-2">
                              <Textarea
                                placeholder="Adicionar comentário..."
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                rows={2}
                              />
                              <Button onClick={handleAddComment} size="sm">
                                Adicionar
                              </Button>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    {supplier.status === 'pending' && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleStatusChange(supplier.id, 'approved')}
                          className="text-green-600"
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleStatusChange(supplier.id, 'rejected')}
                          className="text-red-600"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    )}

                    {supplier.status === 'approved' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusChange(supplier.id, 'hidden')}
                      >
                        <EyeOff className="h-4 w-4" />
                      </Button>
                    )}

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(supplier.id, supplier.name)}
                      className="text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {supplier.description}
                </p>
                <div className="mt-2 text-xs text-muted-foreground">
                  Cadastrado em: {new Date(supplier.createdAt).toLocaleDateString('pt-BR')}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default SuppliersManagement;