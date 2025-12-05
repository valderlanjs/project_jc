import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import {
  Mail,
  Phone,
  MessageCircle,
  Star,
  ArrowRight,
  Users,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import seller1 from "../assets/v1.jpg";
import seller2 from "../assets/v2.jpg";
import seller3 from "../assets/v3.jpg";

const sellers = [
  {
    name: "José Darlisson",
    email: "jeancarlos2008@hotmail.com",
    whatsapp: "(82) 9416-1740",
    photo: seller1,
    specialty: "Vendedor",
    experience: "Online",
  },
  {
    name: "Érica Vieira",
    email: "jeancarlos2008@hotmail.com",
    whatsapp: "(82) 9351-5853",
    photo: seller2,
    specialty: "Assistente de Vendas",
    experience: "Online",
  },
  {
    name: "Hiago Albuquerque",
    email: "jeancarlos2008@hotmail.com",
    whatsapp: "(82) 9321-1989",
    photo: seller3,
    specialty: "Auxiliar de Escritório",
    experience: "Online",
  },
];

export const Contact = () => {
  const handleWhatsApp = (phone: string) => {
    const cleanPhone = phone.replace(/\D/g, "");
    window.open(`https://wa.me/55${cleanPhone}`, "_blank");
  };

  const handleEmail = (email: string) => {
    window.open(`mailto:${email}`, "_blank");
  };

  return (
    <section
      id="contato"
      className="py-24 px-4 relative overflow-hidden bg-gradient-to-br from-background to-gray-50/50"
    >
      {/* Background Elements */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10"></div>

      <div className="container mx-auto max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full px-6 py-3 mb-6">
            <Users className="h-5 w-5 text-primary fill-current" />
            <span className="text-sm font-semibold text-primary">
              Equipe Especializada
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            <span className="bg-gradient-to-r from-foreground to-gray-600 bg-clip-text text-transparent">
              Nossa Equipe
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Converse diretamente com nossos consultores especializados e receba
            atendimento personalizado para seu projeto.
          </p>
        </div>

        {/* Sellers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {sellers.map((seller, index) => (
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

              <CardContent className="pt-8 pb-6">
                <div className="text-center">
                  {/* Photo Container */}
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-xl opacity-60" />
                    <img
                      src={seller.photo}
                      alt={seller.name}
                      className="
                        relative 
                        w-full 
                        h-full 
                        rounded-2xl 
                        object-cover 
                        border-4 
                        border-white 
                        shadow-lg
                        group-hover:scale-105
                        transition-transform
                        duration-500
                      "
                    />
                    {/* Experience Badge */}
                    <div
                      className="
                      absolute 
                      -bottom-2 
                      -right-2 
                      bg-gradient-to-r 
                      from-primary 
                      to-accent 
                      text-white 
                      px-3 
                      py-1 
                      rounded-xl 
                      text-xs 
                      font-bold 
                      shadow-lg
                    "
                    >
                      {seller.experience}
                    </div>
                  </div>

                  {/* Name and Specialty */}
                  <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {seller.name}
                  </h3>
                  <p className="text-sm text-primary font-semibold mb-4 bg-primary/10 rounded-full px-3 py-1 inline-block">
                    {seller.specialty}
                  </p>

                  {/* Contact Info */}
                  <div className="space-y-3 mb-6">
                    <button
                      onClick={() => handleEmail(seller.email)}
                      className="
                        flex 
                        items-center 
                        justify-center 
                        gap-2 
                        text-muted-foreground 
                        hover:text-primary 
                        transition-colors 
                        duration-300 
                        w-full 
                        group/email
                      "
                    >
                      <Mail
                        size={18}
                        className="text-primary group-hover/email:scale-110 transition-transform"
                      />
                      <span className="text-sm">{seller.email}</span>
                    </button>
                    <div className="flex items-center justify-center gap-2 text-muted-foreground">
                      <Phone size={18} className="text-primary" />
                      <span className="text-sm">{seller.whatsapp}</span>
                    </div>
                  </div>

                  {/* WhatsApp Button */}
                  <Button
                    className="
                      w-full 
                      bg-gradient-to-r from-[#25D366] to-[#128C7E] 
                      hover:from-[#128C7E] hover:to-[#075E54] 
                      text-white
                      hover:shadow-lg
                      hover:shadow-[#25D366]/25
                      transition-all
                      duration-300
                      transform
                      hover:scale-105
                      group/btn
                    "
                    onClick={() => handleWhatsApp(seller.whatsapp)}
                  >
                    <FaWhatsapp className="mr-2 h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                    Chamar no WhatsApp
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl px-8 py-6 max-w-4xl mx-auto">
            <div className="text-left flex-1">
              <h3 className="text-2xl font-bold text-foreground mb-3">
                Não sabe por onde começar?
              </h3>
              <p className="text-muted-foreground text-lg">
                Solicite um orçamento completo e nossa equipe entrará em contato
                para entender suas necessidades.
              </p>
            </div>
            <Button
              size="lg"
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
              <span>Solicitar Orçamento</span>
              <ArrowRight className="h-5 w-5 group-hover/cta:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Additional Contact Info */}
        {/* Additional Contact Info */}
        <div className="text-center mt-12">
          <div
            className="
      inline-flex 
      flex-col 
      sm:flex-row 
      items-center 
      justify-center 
      gap-4 
      sm:gap-6 
      text-muted-foreground 
      px-4
    "
          >
            {/* Horário de Atendimento */}
            <div
              className="
        flex 
        flex-col 
        sm:flex-row 
        items-center 
        gap-2 
        text-sm 
        sm:text-base
        w-full 
        sm:w-auto
        justify-center
      "
            >
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="font-medium text-foreground">
                  Atendimento:
                </span>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-sm">Segunda a Sexta, 8h às 18h</div>
                <div className="text-sm">Sábado: 8h às 12h</div>
              </div>
            </div>

            {/* Separador visível apenas em desktop */}
            <div
              className="
        hidden 
        sm:block 
        w-1 
        h-1 
        bg-gray-300 
        rounded-full 
        flex-shrink-0
      "
            ></div>

            {/* Separador para mobile */}
            <div
              className="
        block 
        sm:hidden 
        w-32 
        h-px 
        bg-gradient-to-r 
        from-transparent 
        via-gray-300 
        to-transparent
      "
            ></div>

            {/* Email */}
            <div
              className="
        flex 
        flex-col 
        sm:flex-row 
        items-center 
        gap-2 
        text-sm 
        sm:text-base
        w-full 
        sm:w-auto
        justify-center
      "
            >
              <Mail className="h-5 w-5 text-primary flex-shrink-0" />
              <span
                className="
          text-primary 
          hover:underline 
          font-medium
          break-all
          text-center
          px-2
          max-w-full
          overflow-hidden
          text-ellipsis
          hover:text-primary/80
          transition-colors
        "
              >
                contato@jeancarlos.com
              </span>
            </div>
          </div>

          {/* Telefone Geral (opcional - se quiser adicionar) */}
          <div className="mt-6 flex flex-col items-center gap-2">
            <div className="text-sm text-muted-foreground">
              Telefone Principal
            </div>
            <a
              onClick={() =>
                window.open(
                  "https://wa.me/558298295404?text=Olá! Vim pelo site e gostaria de falar com um especialista.",
                  "_blank",
                  "noopener,noreferrer"
                )
              }
              className="
        text-lg 
        font-bold 
        text-primary 
        hover:text-primary/80 
        hover:underline 
        transition-colors
        cursor-pointer
      "
            >
              (82) 99829-5404
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
