import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { MessageSquare, Clock, CheckCircle, Star, Eye, Send, DollarSign, Calendar } from "lucide-react";
import { useAuthContext } from "@/hooks/useAuth";
import { useServices } from "@/hooks/useServices";
import { useToast } from "@/components/ui/use-toast";

const SupplierDashboard = () => {
  const { user } = useAuthContext();
  const { services, getServicesBySupplier, respondToService } = useServices();
  const { toast } = useToast();
  
  const [responseMessage, setResponseMessage] = useState("");
  const [responsePrice, setResponsePrice] = useState("");
  const [responseTimeline, setResponseTimeline] = useState("");
  const [selectedService, setSelectedService] = useState<string | null>(null);

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
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Dashboard do Fornecedor</h2>
        <p className="text-muted-foreground">
          Gerencie suas solicitações de orçamento e contatos
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Solicitações</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aguardando Resposta</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <p className="text-xs text-muted-foreground">Requer ação</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Respondidas</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.responded}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avaliação Média</CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageRating.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">
              {supplierServices.filter(s => s.rating).length} avaliações
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Service Requests */}
      <Card>
        <CardHeader>
          <CardTitle>Solicitações de Orçamento</CardTitle>
          <CardDescription>
            Gerencie as solicitações de seus clientes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {supplierServices.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                Nenhuma solicitação recebida ainda
              </p>
            ) : (
              supplierServices
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .map((service) => (
                  <div key={service.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h3 className="font-semibold">{service.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          Por: {service.userName} • {new Date(service.createdAt).toLocaleDateString('pt-BR')}
                        </p>
                        {service.budget && (
                          <p className="text-sm font-medium text-green-600">
                            Orçamento: {service.budget}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(service.status)}
                      </div>
                    </div>

                    <p className="text-sm">{service.description}</p>

                    {service.supplierResponse && (
                      <div className="bg-muted p-3 rounded border-l-4 border-l-primary">
                        <p className="text-sm font-medium mb-1">Sua Resposta:</p>
                        <p className="text-sm mb-2">{service.supplierResponse.message}</p>
                        {service.supplierResponse.price && (
                          <p className="text-sm font-medium text-green-600">
                            Preço: {service.supplierResponse.price}
                          </p>
                        )}
                        {service.supplierResponse.timeline && (
                          <p className="text-sm text-muted-foreground">
                            Prazo: {service.supplierResponse.timeline}
                          </p>
                        )}
                      </div>
                    )}

                    {service.rating && (
                      <div className="bg-yellow-50 p-3 rounded border-l-4 border-l-yellow-400">
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
                      {service.status === 'pending' && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              onClick={() => setSelectedService(service.id)}
                            >
                              <Send className="h-4 w-4 mr-2" />
                              Responder
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Responder Solicitação</DialogTitle>
                              <DialogDescription>
                                Envie sua proposta para: {service.title}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="message">Mensagem *</Label>
                                <Textarea
                                  id="message"
                                  placeholder="Descreva sua proposta..."
                                  value={responseMessage}
                                  onChange={(e) => setResponseMessage(e.target.value)}
                                  rows={3}
                                  required
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="price">Preço (opcional)</Label>
                                  <Input
                                    id="price"
                                    placeholder="R$ 0,00"
                                    value={responsePrice}
                                    onChange={(e) => setResponsePrice(e.target.value)}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="timeline">Prazo (opcional)</Label>
                                  <Input
                                    id="timeline"
                                    placeholder="Ex: 3-5 dias úteis"
                                    value={responseTimeline}
                                    onChange={(e) => setResponseTimeline(e.target.value)}
                                  />
                                </div>
                              </div>
                              <div className="flex justify-end gap-2">
                                <Button variant="outline" onClick={() => setSelectedService(null)}>
                                  Cancelar
                                </Button>
                                <Button onClick={handleRespond} disabled={!responseMessage.trim()}>
                                  Enviar Proposta
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
  );
};

export default SupplierDashboard;