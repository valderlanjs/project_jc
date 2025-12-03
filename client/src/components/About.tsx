import consultantImage from "../assets/PerfilJean.png";
import { CheckCircle2, Star, Award, Users, Target } from "lucide-react";

const benefits = [
  "Mais de 10 anos de experiência no mercado",
  "Consultoria técnica especializada",
  "Produtos certificados e sustentáveis",
  "Atendimento personalizado",
  "Melhor relação custo-benefício"
];

const stats = [
  { icon: Users, value: "500+", label: "Clientes Satisfeitos" },
  { icon: Target, value: "10+", label: "Anos de Experiência" },
  { icon: Award, value: "100%", label: "Qualidade Garantida" }
];

export const About = () => {
  return (
    <section id="sobre" className="py-24 px-4 relative overflow-hidden bg-gradient-to-br from-background to-gray-50/50">
      {/* Background Elements */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full px-6 py-3 mb-6">
            <Star className="h-5 w-5 text-primary fill-current" />
            <span className="text-sm font-semibold text-primary">Especialista em vendas de Madeiras</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            <span className="bg-gradient-to-r from-foreground to-gray-600 bg-clip-text text-transparent">
              Conheça o Especialista
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mb-8"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start"> {/* Alterado para items-start */}
          {/* Content Section - Agora na esquerda */}
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Jean Carlos
                </span>
              </h3>
              <p className="text-xl text-muted-foreground font-light mb-2">
                Especialista em Madeiras Nobres
              </p>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                Como consultor especializado em vendas de madeira, ofereço soluções personalizadas 
                para construtores, marceneiros e particulares. Meu compromisso é garantir que você 
                encontre exatamente o material que precisa, com a qualidade que merece.
              </p>
            </div>

            {/* Benefits List */}
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-foreground flex items-center gap-2">
                <CheckCircle2 className="h-6 w-6 text-primary" />
                Por que escolher nosso trabalho?
              </h4>
              
              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <div 
                    key={index} 
                    className="flex items-start gap-4 group p-3 rounded-2xl hover:bg-primary/5 transition-all duration-300"
                  >
                    <div className="mt-1 p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <CheckCircle2 className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                    </div>
                    <span className="text-foreground text-lg font-medium flex-1">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Image Section - Agora na direita e alinhada com o nome */}
          <div className="relative">
            {/* Container da imagem alinhada com o nome */}
            <div className="relative transform hover:scale-105 transition-transform duration-500">
              <img 
                src={consultantImage} 
                alt="Jean - Especialista em Madeiras"
                className="rounded-3xl w-full max-w-md object-contain"
                style={{
                  filter: `
                    drop-shadow(0 25px 50px rgba(0,0,0,0.15))
                    drop-shadow(0 10px 20px rgba(0,0,0,0.1))
                  `
                }}
              />
            </div>

            {/* Stats abaixo da imagem */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-4 rounded-2xl bg-white/50 backdrop-blur-sm border border-gray-200/50">
                  <stat.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
