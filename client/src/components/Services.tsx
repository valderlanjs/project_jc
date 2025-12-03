import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  TreePine,
  Package,
  Truck,
  Shield,
  Star,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    icon: TreePine,
    title: "Madeiras Nobres",
    description:
      "Seleção premium de madeiras certificadas com garantia de origem sustentável.",
    features: ["Certificação FSC", "Origem sustentável", "Qualidade superior"],
  },
  {
    icon: Package,
    title: "Corte Personalizado",
    description:
      "Serviço de corte sob medida para atender suas especificações exatas.",
    features: [
      "Precisão milimétrica",
      "Diversos formatos",
      "Acabamento perfeito",
    ],
  },
  {
    icon: Truck,
    title: "Entrega Rápida",
    description: "Logística eficiente para entrega no prazo em toda a região.",
    features: ["Entregas urgentes", "Rastreamento", "Montagem inclusa"],
  },
  {
    icon: Shield,
    title: "Qualidade Garantida",
    description: "Produtos com certificação e garantia de qualidade superior.",
    features: ["Garantia extendida", "Suporte técnico", "Assistência"],
  },
];

export const Services = () => {
  return (
    <section
      id="servicos"
      className="py-24 px-4 relative overflow-hidden bg-gradient-to-br from-background to-gray-50/50"
    >
      {/* Background Elements */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10"></div>

      <div className="container mx-auto max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full px-6 py-3 mb-6">
            <Star className="h-5 w-5 text-primary fill-current" />
            <span className="text-sm font-semibold text-primary">
              Serviços Exclusivos
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            <span className="bg-gradient-to-r from-foreground to-gray-600 bg-clip-text text-transparent">
              Nossos Serviços
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Soluções completas em madeira com atendimento especializado e
            qualidade garantida para transformar seus projetos em realidade.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
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
                h-full
                flex
                flex-col
              "
            >
              {/* Efeito de brilho no hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

              <CardHeader className="pb-4">
                {/* Icon Container */}
                <div
                  className="
                  relative
                  w-20
                  h-20
                  rounded-2xl
                  bg-gradient-to-br from-primary/10 to-accent/10
                  border border-primary/20
                  flex
                  items-center
                  justify-center
                  mb-6
                  group-hover:scale-110
                  group-hover:bg-gradient-to-br group-hover:from-primary/20 group-hover:to-accent/20
                  transition-all
                  duration-500
                  ease-out
                "
                >
                  <div
                    className="
                    absolute
                    inset-0
                    bg-gradient-to-br from-primary/5 to-accent/5
                    rounded-2xl
                    blur-sm
                  "
                  />
                  <service.icon
                    className="
                    h-10
                    w-10
                    text-primary
                    relative
                    z-10
                    group-hover:scale-110
                    transition-transform
                    duration-300
                  "
                  />
                </div>

                <CardTitle
                  className="
                  text-2xl
                  font-bold
                  group-hover:text-primary
                  transition-colors
                  duration-300
                  bg-gradient-to-r from-foreground to-gray-700 bg-clip-text text-transparent
                  group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent group-hover:bg-clip-text group-hover:text-transparent
                "
                >
                  {service.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col pt-0">
                <CardDescription
                  className="
                  text-base
                  text-muted-foreground
                  leading-relaxed
                  mb-6
                  group-hover:text-foreground/80
                  transition-colors
                  flex-1
                "
                >
                  {service.description}
                </CardDescription>

                {/* Features List */}
                <div className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground/70 transition-colors"
                    >
                      <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button
                  className="
                  w-full
                  py-3
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
                  flex
                  items-center
                  justify-center
                  gap-2
                  group/btn
                  mt-auto
                "
                  onClick={() =>
                    window.open(
                      "https://wa.me/558298295404?text=Olá! Vim pelo site e gostaria de falar com um especialista.",
                      "_blank",
                      "noopener,noreferrer"
                    )
                  }
                >
                  <span>Saiba mais</span>
                  <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl px-8 py-6 max-w-4xl mx-auto">
            <div className="text-left flex-1">
              <h3 className="text-2xl font-bold text-foreground mb-3">
                Precisa de um serviço personalizado?
              </h3>
              <p className="text-muted-foreground text-lg">
                Nossa equipe de especialistas está pronta para desenvolver a
                solução perfeita para seu projeto.
              </p>
            </div>
            <button
              className="
              bg-primary
              text-white
              px-8
              py-4
              rounded-xl
              font-semibold
              hover:bg-primary/90
              transition-all
              duration-300
              transform
              hover:scale-105
              hover:shadow-lg
              whitespace-nowrap
              text-lg
              flex
              items-center
              gap-2
              group/cta
            "
              onClick={() =>
                window.open(
                  "https://wa.me/558298295404?text=Olá! Vim pelo site e gostaria de falar com um especialista.",
                  "_blank",
                  "noopener,noreferrer"
                )
              }
            >
              <span>Falar com Especialista</span>
              <ArrowRight className="h-5 w-5 group-hover/cta:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
