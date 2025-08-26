import { useState, useEffect } from 'react';

export interface ServiceRequest {
  id: string;
  userId: string;
  userName: string;
  supplierId: string;
  supplierName: string;
  category: string;
  title: string;
  description: string;
  budget?: string;
  status: 'pending' | 'responded' | 'accepted' | 'rejected' | 'completed';
  createdAt: string;
  updatedAt: string;
  supplierResponse?: {
    message: string;
    price?: string;
    timeline?: string;
    respondedAt: string;
  };
  rating?: {
    stars: number;
    comment: string;
    ratedAt: string;
  };
}

const SERVICES_STORAGE_KEY = 'mxs-services';

// Seed data
const seedServices: ServiceRequest[] = [
  {
    id: '1',
    userId: '4',
    userName: 'João Silva',
    supplierId: '1',
    supplierName: 'Equipamentos Gastronômicos Silva',
    category: 'Equipamentos de Cozinha',
    title: 'Fogão Industrial para Lanchonete',
    description: 'Preciso de um fogão industrial de 4 bocas para uma lanchonete de 30m²',
    budget: 'R$ 3.000 - R$ 5.000',
    status: 'responded',
    createdAt: '2024-01-25T10:00:00Z',
    updatedAt: '2024-01-26T14:30:00Z',
    supplierResponse: {
      message: 'Temos o modelo perfeito para seu negócio! Fogão industrial de 4 bocas com forno, ideal para lanchonetes.',
      price: 'R$ 4.200,00',
      timeline: '3-5 dias úteis para entrega',
      respondedAt: '2024-01-26T14:30:00Z'
    }
  },
  {
    id: '2',
    userId: '5',
    userName: 'Maria Santos',
    supplierId: '3',
    supplierName: 'TechSolutions Franquias',
    category: 'Tecnologia e Informática',
    title: 'Sistema de PDV Completo',
    description: 'Busco um sistema de PDV com gestão de estoque e relatórios para minha padaria',
    budget: 'R$ 2.000 - R$ 8.000',
    status: 'completed',
    createdAt: '2024-01-20T09:15:00Z',
    updatedAt: '2024-01-28T16:00:00Z',
    supplierResponse: {
      message: 'Nossa solução completa de PDV é perfeita para padarias. Inclui gestão de estoque, relatórios e suporte.',
      price: 'R$ 6.800,00',
      timeline: '1 semana para instalação completa',
      respondedAt: '2024-01-21T11:20:00Z'
    },
    rating: {
      stars: 5,
      comment: 'Excelente serviço! Sistema muito bom e suporte impecável.',
      ratedAt: '2024-01-28T16:00:00Z'
    }
  },
  {
    id: '3',
    userId: '4',
    userName: 'João Silva',
    supplierId: '1',
    supplierName: 'Equipamentos Gastronômicos Silva',
    category: 'Equipamentos de Cozinha',
    title: 'Chapa para Hambúrguer',
    description: 'Chapa elétrica ou a gás para preparo de hambúrgueres',
    status: 'pending',
    createdAt: '2024-01-28T15:00:00Z',
    updatedAt: '2024-01-28T15:00:00Z'
  }
];

export const useServices = () => {
  const [services, setServices] = useState<ServiceRequest[]>([]);

  useEffect(() => {
    // Initialize with seed data if no data exists
    const stored = localStorage.getItem(SERVICES_STORAGE_KEY);
    if (stored) {
      setServices(JSON.parse(stored));
    } else {
      localStorage.setItem(SERVICES_STORAGE_KEY, JSON.stringify(seedServices));
      setServices(seedServices);
    }
  }, []);

  const saveServices = (newServices: ServiceRequest[]) => {
    setServices(newServices);
    localStorage.setItem(SERVICES_STORAGE_KEY, JSON.stringify(newServices));
  };

  const addServiceRequest = (serviceData: Omit<ServiceRequest, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => {
    const newService: ServiceRequest = {
      ...serviceData,
      id: Date.now().toString(),
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    saveServices([...services, newService]);
    return newService;
  };

  const updateServiceRequest = (id: string, updates: Partial<ServiceRequest>) => {
    const updated = services.map(service =>
      service.id === id
        ? { ...service, ...updates, updatedAt: new Date().toISOString() }
        : service
    );
    saveServices(updated);
  };

  const respondToService = (id: string, response: ServiceRequest['supplierResponse']) => {
    updateServiceRequest(id, {
      status: 'responded',
      supplierResponse: response
    });
  };

  const rateService = (id: string, rating: ServiceRequest['rating']) => {
    updateServiceRequest(id, { rating });
  };

  const getServicesByUser = (userId: string) => {
    return services.filter(service => service.userId === userId);
  };

  const getServicesBySupplier = (supplierId: string) => {
    return services.filter(service => service.supplierId === supplierId);
  };

  return {
    services,
    addServiceRequest,
    updateServiceRequest,
    respondToService,
    rateService,
    getServicesByUser,
    getServicesBySupplier
  };
};