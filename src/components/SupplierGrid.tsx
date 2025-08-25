import { useState } from "react";
import { SupplierCard } from "./SupplierCard";
import { LeadCaptureModal } from "./LeadCaptureModal";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";

// Mock data - Em produção viria do backend
const mockSuppliers = [
  {
    id: "1",
    name: "TechCozinha Equipamentos",
    category: "Equipamentos de Cozinha",
    location: "São Paulo, SP",
    rating: 4.8,
    description: "Especializada em fogões industriais, fornos e equipamentos de alta performance para franquias de alimentação. Mais de 15 anos no mercado com garantia estendida.",
    tags: ["Fogões Industriais", "Fornos", "Garantia Estendida", "Instalação Inclusa"],
    clientsServed: 150,
  },
  {
    id: "2", 
    name: "Mobiliário Corporativo Plus",
    category: "Móveis Corporativos",
    location: "Rio de Janeiro, RJ",
    rating: 4.6,
    description: "Móveis planejados para franquias, desde balcões até móveis completos para escritórios. Design moderno e funcional com prazo de entrega garantido.",
    tags: ["Móveis Planejados", "Design Moderno", "Entrega Rápida", "Projeto 3D"],
    clientsServed: 230,
  },
  {
    id: "3",
    name: "Sistemas Point Digital",
    category: "Tecnologia e Sistemas",
    location: "Belo Horizonte, MG", 
    rating: 4.9,
    description: "Soluções completas em PDV, sistemas de gestão e automação para franquias. Integração com principais ERPs do mercado e suporte 24/7.",
    tags: ["PDV", "ERP", "Automação", "Suporte 24h"],
    clientsServed: 320,
  },
  {
    id: "4",
    name: "Uniformes & Cia Profissional", 
    category: "Uniformes e Vestimentas",
    location: "Curitiba, PR",
    rating: 4.7,
    description: "Uniformes personalizados para todas as áreas: alimentação, saúde, varejo. Tecidos de alta qualidade com bordado e estampa inclusos no preço.",
    tags: ["Uniformes", "Bordado Incluso", "Alta Qualidade", "Entrega Nacional"],
    clientsServed: 180,
  },
  {
    id: "5",
    name: "Clean Master Produtos",
    category: "Produtos de Limpeza", 
    location: "Porto Alegre, RS",
    rating: 4.5,
    description: "Linha completa de produtos de limpeza profissional e sanitização. Certificações ANVISA e programas de treinamento para equipes.",
    tags: ["Certificado ANVISA", "Treinamento", "Linha Completa", "Sanitização"],
    clientsServed: 95,
  },
  {
    id: "6",
    name: "Marketing Visual Pro",
    category: "Marketing e Comunicação Visual",
    location: "Salvador, BA", 
    rating: 4.8,
    description: "Sinalização, displays, banners e materiais promocionais. Projetos personalizados que seguem o manual da marca com qualidade premium.",
    tags: ["Sinalização", "Material Premium", "Manual da Marca", "Projeto Personalizado"],
    clientsServed: 140,
  },
];

const categories = [
  "Todas as Categorias",
  "Equipamentos de Cozinha", 
  "Móveis Corporativos",
  "Tecnologia e Sistemas",
  "Uniformes e Vestimentas", 
  "Produtos de Limpeza",
  "Marketing e Comunicação Visual",
];

export const SupplierGrid = () => {
  const [selectedSupplier, setSelectedSupplier] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas as Categorias");

  const filteredSuppliers = mockSuppliers.filter((supplier) => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "Todas as Categorias" || supplier.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleViewContact = (supplierId: string) => {
    setSelectedSupplier(supplierId);
  };

  const handleLeadSubmit = (leadData: any) => {
    console.log("Lead capturado:", leadData);
    // Aqui você enviaria os dados para o backend
  };

  const selectedSupplierData = mockSuppliers.find(s => s.id === selectedSupplier);

  return (
    <section id="fornecedores" className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Nossos Fornecedores Qualificados
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Encontre os melhores parceiros para o seu negócio. Todos os fornecedores são pré-qualificados 
            e têm experiência comprovada com franquias.
          </p>
        </div>

        {/* Filtros */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 max-w-2xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Buscar por fornecedor, produto ou serviço..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="md:w-64">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Grid de Fornecedores */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSuppliers.map((supplier) => (
            <SupplierCard
              key={supplier.id}
              {...supplier}
              onViewContact={handleViewContact}
            />
          ))}
        </div>

        {filteredSuppliers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">
              Nenhum fornecedor encontrado com os filtros selecionados.
            </p>
          </div>
        )}

        {/* Modal de Captura de Lead */}
        <LeadCaptureModal
          isOpen={!!selectedSupplier}
          onClose={() => setSelectedSupplier(null)}
          supplierName={selectedSupplierData?.name || ""}
          onSubmit={handleLeadSubmit}
        />
      </div>
    </section>
  );
};