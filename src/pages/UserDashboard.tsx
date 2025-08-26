import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MessageSquare, Clock, CheckCircle, Star, Plus, ThumbsUp, MessageCircle } from "lucide-react";
import { useAuthContext } from "@/hooks/useAuth";
import { useServices } from "@/hooks/useServices";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const UserDashboard = () => {
  const { user } = useAuthContext();
  const { services, getServicesByUser, rateService } = useServices();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [rating, setRating] = useState(0);
  const [ratingComment, setRatingComment] = useState("");
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const userServices = user ? getServicesByUser(user.id) : [];
  
  const stats = {
    total: userServices.length,
    pending: userServices.filter(s => s.status === 'pending').length,
    responded: userServices.filter(s => s.status === 'responded').length,
    completed: userServices.filter(s => s.status === 'completed').length,
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
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold">Meus Serviços</h2>
          <p className="text-muted-foreground">
            Acompanhe suas solicitações e avalie os fornecedores
          </p>
        </div>
        <Button onClick={() => navigate('/request-service')}>
          <Plus className="h-4 w-4 mr-2" />
          Nova Solicitação
        </Button>
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Propostas Recebidas</CardTitle>
            <MessageCircle className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.responded}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Concluídos</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
          </CardContent>
        </Card>
      </div>

      {/* Service Requests */}
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
                <p className="text-muted-foreground mb-4">
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
                        <p className="text-sm text-muted-foreground">
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
                            <p className="text-muted-foreground">
                              Prazo: {service.supplierResponse.timeline}
                            </p>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
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
  );
};

export default UserDashboard;