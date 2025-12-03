import { Button } from "./ui/button";
import heroImage from "../assets/t1.png";
import { Phone, MessageCircle } from "lucide-react";

export const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
    >
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Madeiras de alta qualidade"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
      </div>

      <div className="container relative z-10 px-4 py-20 mx-auto">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="block bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              Especialista em
            </span>
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mt-2">
              Madeiras Nobres
            </span>
          </h1>

          <div className="w-16 h-0.5 bg-primary/60 mb-6"></div>

          <p className="max-w-2xl text-xl md:text-2xl text-white/90 mb-10 leading-relaxed font-light">
            Transforme seu projeto com madeiras de altíssima qualidade e
            acabamento impecável.
          </p>

          {/* Botão Compacto e Moderno */}
          <Button
            size="default"
            className="
    group
    bg-white/80
    border 
    border-primary
    text-primary
    hover:bg-primary
    hover:text-white
    hover:border-primary
    hover:shadow-lg
    hover:shadow-primary/30
    transition-all 
    duration-400 
    ease-in-out
    px-6 
    py-4
    text-base
    font-medium
    rounded-xl
    backdrop-blur-sm
  "
            onClick={() =>
              window.open(
                "https://wa.me/558298295404?text=Olá! Vim pelo site e gostaria de falar com um especialista.",
                "_blank",
                "noopener,noreferrer"
              )
            }
          >
            <span className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
              Falar com Especialista
            </span>
          </Button>

          <div className="mt-10">
            <p className="text-white/60 text-sm font-light">
              ✓ Atendimento personalizado ✓ Materiais certificados ✓ Garantia de
              qualidade
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};
