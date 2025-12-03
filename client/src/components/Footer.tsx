import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  ArrowUp,
  Star,
  MessageCircle,
} from "lucide-react";
import logo1 from "../assets/logo3.png";
export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-foreground to-gray-900 text-background py-16 px-4 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent"></div>
      <div className="absolute top-10 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-accent/5 rounded-full blur-3xl -z-10"></div>

      <div className="container mx-auto max-w-6xl">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <a className="text-3xl font-bold bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
                <img
                  src={logo1}
                  alt="Madeireira Pro Logo"
                  className="h-12 w-auto max-w-[180px] object-contain"
                />
              </a>
            </div>
            <p className="text-background/80 text-lg leading-relaxed mb-6 max-w-md">
              Especialistas em madeiras de qualidade com mais de 15 anos de
              experiência no mercado. Oferecemos soluções completas para seus
              projetos com atendimento personalizado.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href="#"
                className="
                  w-12 
                  h-12 
                  bg-background/10 
                  backdrop-blur-sm 
                  border 
                  border-background/20 
                  rounded-xl 
                  flex 
                  items-center 
                  justify-center 
                  hover:bg-primary 
                  hover:border-primary 
                  hover:scale-110 
                  transition-all 
                  duration-300
                  group
                "
              >
                <Facebook
                  size={20}
                  className="text-background/80 group-hover:text-white"
                />
              </a>
              <a
                href="#"
                className="
                  w-12 
                  h-12 
                  bg-background/10 
                  backdrop-blur-sm 
                  border 
                  border-background/20 
                  rounded-xl 
                  flex 
                  items-center 
                  justify-center 
                  hover:bg-pink-500 
                  hover:border-pink-500 
                  hover:scale-110 
                  transition-all 
                  duration-300
                  group
                "
              >
                <Instagram
                  size={20}
                  className="text-background/80 group-hover:text-white"
                />
              </a>
              <a
                href="#"
                className="
                  w-12 
                  h-12 
                  bg-background/10 
                  backdrop-blur-sm 
                  border 
                  border-background/20 
                  rounded-xl 
                  flex 
                  items-center 
                  justify-center 
                  hover:bg-blue-600 
                  hover:border-blue-600 
                  hover:scale-110 
                  transition-all 
                  duration-300
                  group
                "
              >
                <Linkedin
                  size={20}
                  className="text-background/80 group-hover:text-white"
                />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-6 text-accent flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              Navegação
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "#home" },
                { name: "Sobre", href: "#sobre" },
                { name: "Produtos", href: "#produtos" },
                { name: "Serviços", href: "#servicos" },
                { name: "Contato", href: "#contato" },
              ].map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className="
                      text-background/80 
                      hover:text-accent 
                      transition-all 
                      duration-300 
                      hover:translate-x-2 
                      flex 
                      items-center 
                      gap-2 
                      group
                    "
                  >
                    <div className="w-1 h-1 bg-background/40 rounded-full group-hover:bg-accent"></div>
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-semibold mb-6 text-accent flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              Contato
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/30 transition-colors">
                  <Phone size={18} className="text-accent" />
                </div>
                <div>
                  <span className="text-background/80 block">Telefone</span>
                  <span className="text-white font-medium">
                    (82) 9829-5404
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/30 transition-colors">
                  <Mail size={18} className="text-accent" />
                </div>
                <div>
                  <span className="text-background/80 block">Email</span>
                  <span className="text-white font-medium">
                    contato@jeancarlos.com
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/30 transition-colors">
                  <MapPin size={18} className="text-accent" />
                </div>
                <div>
                  <span className="text-background/80 block">Endereço</span>
                  <span className="text-white font-medium">
                    Av. Governador Lamenha Filho, 1800 - Quadra D, Lote 17 a 20 | Feitosa - Maceió - AL | 57043-600
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary/20 to-accent/20 backdrop-blur-sm border border-primary/30 rounded-2xl p-8 mb-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <h4 className="text-2xl font-bold text-white mb-2">
                Pronto para iniciar seu projeto?
              </h4>
              <p className="text-background/80 text-lg">
                Entre em contato e receba um orçamento personalizado.
              </p>
            </div>
            <button
              className="
              bg-gradient-to-r from-primary to-accent
              text-white
              px-8
              py-4
              rounded-xl
              font-semibold
              hover:shadow-2xl
              hover:shadow-primary/25
              transition-all
              duration-300
              transform
              hover:scale-105
              flex
              items-center
              gap-2
              group/cta
              whitespace-nowrap
            "
              onClick={() =>
                window.open(
                  "https://wa.me/558298295404?text=Olá! Vim pelo site e gostaria de falar com um especialista.",
                  "_blank",
                  "noopener,noreferrer"
                )
              }
            >
              <MessageCircle className="h-5 w-5" />
              Falar com Especialista
              <ArrowUp className="h-4 w-4 rotate-45 group-hover/cta:translate-x-1 group-hover/cta:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-background/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-background/70 text-center md:text-left">
              © {currentYear} Jean Carlos. Todos os direitos reservados.
            </p>

            <div className="flex items-center gap-4">
              <span className="text-background/60 text-sm">
                CNPJ: 40.484.468/0001-13
              </span>
              <button
                onClick={scrollToTop}
                className="
                  w-10 
                  h-10 
                  bg-background/10 
                  backdrop-blur-sm 
                  border 
                  border-background/20 
                  rounded-xl 
                  flex 
                  items-center 
                  justify-center 
                  hover:bg-primary 
                  hover:border-primary 
                  hover:scale-110 
                  transition-all 
                  duration-300
                  group
                "
              >
                <ArrowUp
                  size={20}
                  className="text-background/80 group-hover:text-white"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
