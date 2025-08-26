import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useSuppliers } from "@/hooks/useSuppliers";
import { useServices } from "@/hooks/useServices";
import { useAuthContext } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Send, Building } from "lucide-react";

const ServiceRequest = () => {
  const navigate = useNavigate();
  const { suppliers } = useSuppliers();
  const { addServiceRequest } = useServices();
  const { user } = useAuthContext();
  const { toast } = useToast();

  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");

  // Only show approved suppliers
  const approvedSuppliers = suppliers.filter(s => s.status === 'approved');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedSupplier || !title || !description || !user) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    const supplier = suppliers.find(s => s.id === selectedSupplier);
    if (!supplier) return;

    addServiceRequest({
      userId: user.id,
      userName: user.name,
      supplierId: supplier.id,
      supplierName: supplier.name,
      category: supplier.category,
      title,
      description,
      budget: budget || undefined,
    });

    toast({
      title: "Solicitação enviada",
      description: "Sua solicitação foi enviada para o fornecedor."
    });

    navigate('/dashboard');
  };

  return (
    <div className="container max-w-4xl mx-auto py-6">
      <div className="mb-6">
        <Button variant="ghost" onClick={() => navigate('/dashboard')} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar ao Dashboard
        </Button>
        <h1 className="text-3xl font-bold">Nova Solicitação de Serviço</h1>
        <p className="text-muted-foreground">
          Solicite um orçamento ou serviço de nossos fornecedores aprovados
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Detalhes da Solicitação</CardTitle>
              <CardDescription>
                Preencha as informações do serviço que você precisa
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="supplier">Fornecedor *</Label>
                  <Select value={selectedSupplier} onValueChange={setSelectedSupplier}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um fornecedor" />
                    </SelectTrigger>
                    <SelectContent>
                      {approvedSuppliers.map((supplier) => (
                        <SelectItem key={supplier.id} value={supplier.id}>
                          <div className="flex items-center gap-2">
                            <Building className="h-4 w-4" />
                            <div>
                              <div className="font-medium">{supplier.name}</div>
                              <div className="text-sm text-muted-foreground">{supplier.category}</div>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Título do Serviço *</Label>
                  <Input
                    id="title"
                    placeholder="Ex: Fogão industrial para lanchonete"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição Detalhada *</Label>
                  <Textarea
                    id="description"
                    placeholder="Descreva em detalhes o que você precisa, especificações, dimensões, etc."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget">Orçamento Estimado (opcional)</Label>
                  <Input
                    id="budget"
                    placeholder="Ex: R$ 3.000 - R$ 5.000"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">
                    Informe uma faixa de preço para ajudar o fornecedor a preparar uma proposta adequada
                  </p>
                </div>

                <div className="flex gap-4">
                  <Button type="button" variant="outline" onClick={() => navigate('/dashboard')}>
                    Cancelar
                  </Button>
                  <Button type="submit">
                    <Send className="h-4 w-4 mr-2" />
                    Enviar Solicitação
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Fornecedores Disponíveis</CardTitle>
              <CardDescription>
                {approvedSuppliers.length} fornecedores aprovados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {approvedSuppliers.slice(0, 5).map((supplier) => (
                  <div 
                    key={supplier.id} 
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedSupplier === supplier.id 
                        ? 'border-primary bg-primary/5' 
                        : 'hover:bg-muted/50'
                    }`}
                    onClick={() => setSelectedSupplier(supplier.id)}
                  >
                    <div className="space-y-1">
                      <p className="font-medium text-sm">{supplier.name}</p>
                      <Badge variant="secondary" className="text-xs">
                        {supplier.category}
                      </Badge>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {supplier.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-lg">💡 Dicas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>• Seja específico na descrição do serviço</p>
              <p>• Inclua dimensões e especificações técnicas</p>
              <p>• Informe o prazo desejado se houver urgência</p>
              <p>• Forneça uma faixa de orçamento realista</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ServiceRequest;