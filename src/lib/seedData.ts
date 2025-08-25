import { Supplier } from "@/hooks/useSuppliers";

export const seedSuppliers: Supplier[] = [
  {
    id: "1",
    name: "Equipamentos Gastronômicos Silva",
    category: "Equipamentos de Cozinha",
    description: "Fornecemos equipamentos industriais de alta qualidade para cozinhas de restaurantes e lanchonetes. Fogões industriais, chapas, fritadeiras, fornos e muito mais.",
    phone: "(11) 98765-4321",
    email: "contato@equipamentossilva.com.br",
    website: "https://equipamentossilva.com.br",
    address: "Rua das Indústrias, 123 - Bairro Industrial, São Paulo - SP, 01234-567",
    status: "approved",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-16T14:20:00Z",
    comments: [
      {
        id: "c1",
        text: "Fornecedor confiável, produtos de ótima qualidade.",
        author: "Admin",
        createdAt: "2024-01-16T14:20:00Z"
      }
    ]
  },
  {
    id: "2",
    name: "Móveis Corporativos Premium",
    category: "Móveis e Decoração",
    description: "Especializada em móveis corporativos sob medida. Mesas, cadeiras, balcões, estantes e soluções personalizadas para franquias.",
    phone: "(11) 97654-3210",
    email: "vendas@moveispremium.com.br",
    website: "",
    address: "Av. Móveis, 456 - Centro, São Paulo - SP, 02345-678",
    status: "pending",
    createdAt: "2024-01-20T09:15:00Z",
    updatedAt: "2024-01-20T09:15:00Z",
    comments: []
  },
  {
    id: "3",
    name: "TechSolutions Franquias",
    category: "Tecnologia e Informática",
    description: "Soluções completas de tecnologia para franquias: sistemas de PDV, equipamentos, redes, suporte técnico e consultoria em TI.",
    phone: "(11) 96543-2109",
    email: "suporte@techsolutions.com.br",
    website: "https://techsolutions.com.br",
    address: "Rua da Tecnologia, 789 - Vila Tech, São Paulo - SP, 03456-789",
    status: "approved",
    createdAt: "2024-01-18T16:45:00Z",
    updatedAt: "2024-01-19T11:30:00Z",
    comments: [
      {
        id: "c2",
        text: "Excelente suporte técnico e soluções inovadoras.",
        author: "Admin",
        createdAt: "2024-01-19T11:30:00Z"
      }
    ]
  },
  {
    id: "4",
    name: "Uniformes & Cia",
    category: "Uniformes e Vestuário",
    description: "Confecção de uniformes profissionais personalizados. Aventais, camisetas, bonés e acessórios com a identidade visual da sua franquia.",
    phone: "(11) 95432-1098",
    email: "pedidos@uniformesecia.com.br",
    website: "",
    address: "Rua das Confecções, 321 - Bom Retiro, São Paulo - SP, 04567-890",
    status: "rejected",
    createdAt: "2024-01-12T13:20:00Z",
    updatedAt: "2024-01-13T08:45:00Z",
    comments: [
      {
        id: "c3",
        text: "Prazo de entrega não compatível com nossas necessidades.",
        author: "Admin",
        createdAt: "2024-01-13T08:45:00Z"
      }
    ]
  },
  {
    id: "5",
    name: "Clean Master Produtos",
    category: "Limpeza e Higiene",
    description: "Linha completa de produtos de limpeza e higiene para estabelecimentos comerciais. Detergentes, desinfetantes, papel higiênico e equipamentos de limpeza.",
    phone: "(11) 94321-0987",
    email: "comercial@cleanmaster.com.br",
    website: "https://cleanmaster.com.br",
    address: "Av. Limpeza, 654 - Distrito Industrial, São Paulo - SP, 05678-901",
    status: "hidden",
    createdAt: "2024-01-10T11:00:00Z",
    updatedAt: "2024-01-22T15:30:00Z",
    comments: [
      {
        id: "c4",
        text: "Fornecedor temporariamente suspenso para reavaliação.",
        author: "Admin",
        createdAt: "2024-01-22T15:30:00Z"
      }
    ]
  }
];

export const initializeSeedData = (): void => {
  const existingData = localStorage.getItem('mxs-suppliers');
  if (!existingData) {
    localStorage.setItem('mxs-suppliers', JSON.stringify(seedSuppliers));
  }
};