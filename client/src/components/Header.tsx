import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo3.png";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Sobre", href: "#sobre" },
  { label: "Produtos", href: "#produtos" },
  { label: "Serviços", href: "#servicos" },
  { label: "Contato", href: "#contato" },
];

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Container Principal */}
      <div className={isScrolled ? "pt-16" : "pt-0"}>
        {/* Header Superior (Logo e Botão) - APENAS PARA DESKTOP */}
        <div
          className={`hidden md:block absolute top-0 left-0 right-0 transition-all duration-500 ${
            isScrolled
              ? "opacity-0 -translate-y-full"
              : "opacity-100 translate-y-0"
          }`}
        >
          <nav className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between h-16">
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("#home");
                }}
                className="inline-block flex-shrink-0 flex items-center h-full"
              >
                <img
                  src={logo}
                  alt="Madeireira Pro Logo"
                  className="h-16 w-auto max-w-[200px] object-contain"
                />
              </a>

              <div className="flex items-center h-full">
                <Button
                  variant="default"
                  className="bg-primary hover:bg-primary/80 text-lg px-6 py-2 h-12"
                  onClick={() =>
                    window.open(
                      "https://wa.me/558298295404?text=Olá! Vim pelo site e gostaria de falar com um especialista.",
                      "_blank",
                      "noopener,noreferrer"
                    )
                  }
                >
                  Orçamento
                </Button>
              </div>
            </div>
          </nav>
        </div>

        {/* Navegação Central - APENAS PARA DESKTOP */}
        <div className="hidden md:block fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300">
          <div
            className={`
            backdrop-blur-md rounded-full px-8 py-3 border shadow-lg
            transition-all duration-300
            ${
              isScrolled
                ? "bg-black/40 border-white/30 scale-105"
                : "bg-black/20 border-white/10 scale-100"
            }
          `}
          >
            <div className="flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  className={`
                    text-sm font-medium transition-all duration-200 hover:scale-105
                    ${
                      isScrolled
                        ? "text-white hover:text-primary"
                        : "text-white hover:text-primary"
                    }
                  `}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Header para Mobile - Só aparece em telas menores que 768px */}
        <div className="md:hidden">
          {/* Logo no Mobile - APENAS A LOGO, SEM BOTÃO */}
          <div
            className={`absolute top-0 left-0 right-0 transition-all duration-500 ${
              isScrolled
                ? "opacity-0 -translate-y-full"
                : "opacity-100 translate-y-0"
            }`}
          >
            <nav className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between h-16">
                <a
                  href="#home"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("#home");
                  }}
                  className="inline-block flex-shrink-0 flex items-center h-full"
                >
                  <img
                    src={logo}
                    alt="Madeireira Pro Logo"
                    className="h-12 w-auto max-w-[150px] object-contain"
                  />
                </a>

                {/* ESPAÇO VAZIO onde estava o botão - mantém o layout balanceado */}
                <div className="w-20"></div>
              </div>
            </nav>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`fixed top-4 right-4 z-50 p-2 backdrop-blur-md rounded-full border text-white transition-all duration-300 ${
              isScrolled
                ? "bg-black/40 border-white/30"
                : "bg-black/20 border-white/10"
            }`}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Mobile Navigation */}
          {isOpen && (
            <div
              className={`fixed top-16 right-4 z-50 backdrop-blur-md rounded-lg p-6 border shadow-lg space-y-4 min-w-[200px] transition-all duration-300 ${
                isScrolled
                  ? "bg-black/40 border-white/30"
                  : "bg-black/20 border-white/10"
              }`}
            >
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  className="block text-base font-medium text-white hover:text-primary transition-colors text-center"
                >
                  {item.label}
                </a>
              ))}
              {/* Botão de Orçamento DENTRO do menu hambúrguer */}
              <Button
                className="w-full bg-primary hover:bg-primary/90"
                onClick={() =>
                  window.open(
                    "https://wa.me/558298295404?text=Olá! Vim pelo site e gostaria de falar com um especialista.",
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
              >
                Orçamento
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
