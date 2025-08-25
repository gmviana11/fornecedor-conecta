import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { SupplierGrid } from "@/components/SupplierGrid";
import { HowItWorks } from "@/components/HowItWorks";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <SupplierGrid />
        <HowItWorks />
      </main>
    </div>
  );
};

export default Index;