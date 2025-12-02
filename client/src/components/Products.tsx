import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { CheckCircle2, Star } from "lucide-react";

// Importe as imagens dos produtos - você precisará adicionar essas imagens na pasta assets
import pinusImage from "../assets/t1.png";
import eucaliptoImage from "../assets/t6.png";
import ipeImage from "../assets/t5.png";
import compensadoImage from "../assets/t4.png";
import mdfImage from "../assets/t2.png";
import tabuaImage from "../assets/t2.png";

const products = [
  {
    name: "Pinus Tratado",
    category: "Madeira de Construção",
    description: "Ideal para estruturas externas, decks e cercas. Tratamento autoclave garantido.",
    features: ["Resistente", "Econômico", "Durável"],
    image: pinusImage
  },
  {
    name: "Eucalipto",
    category: "Madeira Nobre",
    description: "Excelente para móveis e estruturas. Alta densidade e resistência.",
    features: ["Sustentável", "Versátil", "Renovável"],
    image: eucaliptoImage
  },
  {
    name: "Ipê",
    category: "Madeira Premium",
    description: "A madeira mais nobre brasileira. Perfeita para projetos especiais.",
    features: ["Premium", "Durabilidade", "Beleza"],
    image: ipeImage
  },
  {
    name: "Compensado Naval",
    category: "Painéis",
    description: "Resistente à umidade. Ideal para ambientes externos e náuticos.",
    features: ["Impermeável", "Resistente", "Leve"],
    image: compensadoImage
  },
  {
    name: "MDF",
    category: "Painéis",
    description: "Ótima opção para marcenaria e móveis planejados.",
    features: ["Uniforme", "Acabamento", "Versátil"],
    image: mdfImage
  },
  {
    name: "Tábua Aparelhada",
    category: "Acabamento",
    description: "Madeira beneficiada pronta para uso em acabamentos finos.",
    features: ["Pronto uso", "Qualidade", "Acabamento"],
    image: tabuaImage
  }
];

export const Products = () => {
  return (
    <section id="produtos" className="py-24 px-4 relative overflow-hidden bg-gradient-to-br from-background to-gray-50/50">
      {/* Background Elements */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full px-6 py-3 mb-6">
            <Star className="h-5 w-5 text-primary fill-current" />
            <span className="text-sm font-semibold text-primary">Catálogo Completo</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            <span className="bg-gradient-to-r from-foreground to-gray-600 bg-clip-text text-transparent">
              Nossos Produtos
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Seleção premium de madeiras e painéis para todos os tipos de projeto, 
            desde construções robustas até acabamentos refinados.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <Card 
              key={index} 
              className="
                group relative 
                bg-white/60 backdrop-blur-sm 
                border border-gray-200/50 
                hover:border-primary/30 
                hover:shadow-2xl 
                hover:shadow-primary/10
                transition-all 
                duration-500 
                ease-out
                overflow-hidden
                hover:scale-105
              "
            >
              {/* Efeito de brilho no hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay gradiente na imagem */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/90 backdrop-blur-sm text-foreground border-0 font-semibold">
                    {product.category}
                  </Badge>
                </div>
              </div>

              <CardHeader className="pb-3">
                <CardTitle className="
                  text-2xl 
                  group-hover:text-primary 
                  transition-colors 
                  duration-300
                  bg-gradient-to-r from-foreground to-gray-700 bg-clip-text text-transparent
                  group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent group-hover:bg-clip-text group-hover:text-transparent
                ">
                  {product.name}
                </CardTitle>
              </CardHeader>

              <CardContent className="pt-0">
                <CardDescription className="
                  text-base 
                  text-muted-foreground 
                  leading-relaxed 
                  mb-4
                  group-hover:text-foreground/80
                  transition-colors
                ">
                  {product.description}
                </CardDescription>
                
                {/* Features */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Características principais
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.features.map((feature, idx) => (
                      <Badge 
                        key={idx} 
                        variant="outline"
                        className="
                          border-primary/30 
                          text-foreground 
                          bg-primary/5 
                          hover:bg-primary/10 
                          hover:border-primary/50
                          transition-all
                          duration-300
                        "
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <button className="
                  w-full 
                  mt-4 
                  py-2 
                  px-4 
                  bg-transparent 
                  border 
                  border-primary 
                  text-primary 
                  rounded-xl 
                  font-semibold 
                  hover:bg-primary 
                  hover:text-white 
                  transition-all 
                  duration-300 
                  ease-out
                  transform
                  hover:scale-105
                  hover:shadow-lg
                  hover:shadow-primary/25
                ">
                  Solicitar Orçamento
                </button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl px-8 py-6">
            <div className="text-left">
              <h3 className="text-xl font-bold text-foreground mb-2">
                Não encontrou o que procura?
              </h3>
              <p className="text-muted-foreground">
                Temos uma variedade completa de produtos. Entre em contato para uma consultoria personalizada.
              </p>
            </div>
            <button className="
              bg-primary 
              text-white 
              px-8 
              py-3 
              rounded-xl 
              font-semibold 
              hover:bg-primary/90 
              transition-all 
              duration-300 
              transform
              hover:scale-105
              hover:shadow-lg
              whitespace-nowrap
            ">
              Falar com Especialista
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};