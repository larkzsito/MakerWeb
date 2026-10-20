import { useState } from "react";
import { Menu, X, ArrowRight, Code2, Palette, Smartphone, BarChart3, CheckCircle, Star, Mail, Phone, MapPin, ChevronDown } from "lucide-react";
import { guardarSolicitud } from "../services/database";

const NAV_LINKS = ["Servicios", "Proceso", "Equipo", "Portafolio", "Contacto"];

const SERVICES = [
  {
    icon: Code2,
    title: "Desarrollo Web",
    description: "Creamos sitios web rápidos, seguros y escalables usando las tecnologías más modernas del mercado.",
    features: ["React / Next.js", "Node.js & APIs", "Bases de datos", "Hosting y dominio"],
  },
  {
    icon: Palette,
    title: "Diseño UI/UX",
    description: "Diseñamos interfaces claras y atractivas que guían al usuario de forma natural hacia sus objetivos.",
    features: ["Diseño responsivo", "Prototipado", "Sistemas de diseño", "Pruebas con usuarios"],
  },
  {
    icon: Smartphone,
    title: "Aplicaciones Móviles",
    description: "Desarrollamos apps que funcionan perfectamente en cualquier dispositivo, iOS y Android.",
    features: ["React Native", "PWA", "Notificaciones push", "Sincronización offline"],
  },
  {
    icon: BarChart3,
    title: "SEO y Rendimiento",
    description: "Optimizamos tu sitio para que aparezca primero en Google y cargue en menos de un segundo.",
    features: ["Auditoría SEO", "Core Web Vitals", "Analytics", "Reportes mensuales"],
  },
];

const STEPS = [
  { number: "01", title: "Reunión inicial", description: "Escuchamos tus ideas, objetivos y el público al que quieres llegar. Sin jergas técnicas, solo conversación." },
  { number: "02", title: "Propuesta y diseño", description: "Presentamos el diseño visual y la arquitectura del proyecto para que apruebes antes de escribir una sola línea de código." },
  { number: "03", title: "Desarrollo", description: "Nuestro equipo construye tu sitio con calidad profesional. Te mostramos avances cada semana." },
  { number: "04", title: "Entrega y soporte", description: "Lanzamos tu sitio y te capacitamos. Además ofrecemos soporte continuo para que nunca estés solo." },
];

const TEAM = [
  {
    name: "Laura Méndez",
    role: "Directora de Proyectos",
    bio: "10 años liderando equipos digitales. Garantiza que cada entrega cumpla plazos y supere expectativas.",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&auto=format",
  },
  {
    name: "Carlos Herrera",
    role: "Desarrollador Full-Stack",
    bio: "Experto en React, Node.js y arquitecturas en la nube. Ha construido más de 60 proyectos en producción.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&auto=format",
  },
  {
    name: "Sofía Ríos",
    role: "Diseñadora UI/UX",
    bio: "Diseña interfaces que las personas entienden de inmediato. Ganadora de dos premios de diseño latinoamericano.",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&auto=format",
  },
  {
    name: "Diego Vargas",
    role: "Especialista SEO",
    bio: "Posiciona sitios en la primera página de Google. Sus clientes han triplicado su tráfico orgánico en 6 meses.",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&auto=format",
  },
];

const PROJECTS = [
  {
    title: "TiendaRápida",
    category: "E-commerce",
    description: "Plataforma de ventas online para una cadena de supermercados con más de 3,000 productos.",
    img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop&auto=format",
    result: "+240% ventas online",
  },
  {
    title: "MediConsulta",
    category: "Salud",
    description: "Portal de citas médicas que conecta pacientes con especialistas en toda la región.",
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop&auto=format",
    result: "15,000 usuarios activos",
  },
  {
    title: "EduPlatform",
    category: "Educación",
    description: "LMS completo para una institución educativa con más de 200 cursos en línea.",
    img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop&auto=format",
    result: "98% satisfacción estudiantil",
  },
];

const TESTIMONIALS = [
  {
    name: "Ana Torres",
    company: "Fundadora de TiendaRápida",
    text: "Transformaron por completo nuestra presencia digital. El sitio es rápido, bonito y nuestros clientes lo entienden perfectamente. Las ventas se dispararon desde el primer mes.",
    rating: 5,
  },
  {
    name: "Dr. Marcos Castillo",
    company: "Director de MediConsulta",
    text: "El equipo fue muy profesional y transparente en todo momento. Nos explicaron cada decisión sin tecnicismos. El resultado superó todas nuestras expectativas.",
    rating: 5,
  },
  {
    name: "Patricia Núñez",
    company: "Rectora de EduPlatform",
    text: "Llevaban meses buscando una empresa confiable. MakerWeb cumplió cada promesa en tiempo y forma. Ya contratamos para el siguiente proyecto.",
    rating: 5,
  },
];

const STATS = [
  { value: "120+", label: "Proyectos entregados" },
  { value: "98%", label: "Clientes satisfechos" },
  { value: "8 años", label: "De experiencia" },
  { value: "15", label: "Países atendidos" },
];

const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || "hola@makerweb.dev";
const CONTACT_PHONE = import.meta.env.VITE_CONTACT_PHONE || "+57 (000) 000-0000";
const WHATSAPP_NUMBER = import.meta.env.VITE_CONTACT_WHATSAPP || "570000000000";

export default function App() {

  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const scrollTo = (id?: string) => {
    if (!id) return;
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const sectionIds: Record<string, string> = {
    Servicios: "servicios",
    Proceso: "proceso",
    Equipo: "equipo",
    Portafolio: "portafolio",
    Contacto: "contacto",
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-[Inter,sans-serif]">
      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-border">
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <span
            className="text-xl font-extrabold tracking-tight text-foreground font-[Plus_Jakarta_Sans,sans-serif] cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Maker<span className="text-primary">Web</span>
          </span>

          {/* Desktop links */}
          <ul className="hidden md:flex gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link}>
                <button
                  onClick={() => scrollTo(sectionIds[link])}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link}
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={() => scrollTo("contacto")}
            className="hidden md:flex items-center gap-2 bg-primary text-primary-foreground text-sm font-semibold px-5 py-2.5 rounded-md hover:bg-violet-800 transition-colors"
          >
            Cotizar proyecto <ArrowRight size={14} />
          </button>

          {/* Mobile burger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-foreground"
            aria-label="Menú"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-border px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(sectionIds[link])}
                className="text-left text-base font-medium text-foreground py-1"
              >
                {link}
              </button>
            ))}
            <button
              onClick={() => scrollTo("contacto")}
              className="mt-2 bg-primary text-primary-foreground text-sm font-semibold px-5 py-3 rounded-md"
            >
              Cotizar proyecto
            </button>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative pt-32 pb-20 px-6 bg-white overflow-hidden">
        {/* Background grid decoration */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(#7c3aed 1px, transparent 1px), linear-gradient(90deg, #7c3aed 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="relative max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block bg-secondary text-primary text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded mb-6">
              Agencia de Desarrollo Web
            </span>
            <h1 className="font-[Plus_Jakarta_Sans,sans-serif] text-5xl lg:text-6xl font-extrabold leading-[1.1] text-foreground mb-6">
              Creamos sitios web que{" "}
              <span className="text-primary">generan resultados</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-md">
              Somos un equipo de profesionales apasionados que transforma tus ideas en sitios web modernos, rápidos y fáciles de usar.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo("contacto")}
                className="flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3.5 rounded-md hover:bg-violet-800 transition-colors text-sm"
              >
                Iniciar proyecto <ArrowRight size={16} />
              </button>
              <button
                onClick={() => scrollTo("portafolio")}
                className="flex items-center gap-2 border border-border text-foreground font-semibold px-6 py-3.5 rounded-md hover:bg-muted transition-colors text-sm"
              >
                Ver portafolio
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-xl overflow-hidden shadow-2xl border border-border">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&h=480&fit=crop&auto=format"
                alt="Equipo de MakerWeb trabajando en proyectos web"
                className="w-full h-72 md:h-80 object-cover bg-muted"
              />
              {/* Floating badge */}
              <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg px-4 py-3 border border-border flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">Proyecto entregado</p>
                  <p className="text-xs text-muted-foreground">TiendaRápida — en 3 semanas</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="max-w-7xl mx-auto mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-border pt-12">
          {STATS.map((s) => (
            <div key={s.label} className="text-center md:text-left">
              <p className="font-[Plus_Jakarta_Sans,sans-serif] text-3xl font-extrabold text-primary mb-1">{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="servicios" className="py-24 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">Lo que hacemos</span>
            <h2 className="font-[Plus_Jakarta_Sans,sans-serif] text-4xl font-extrabold text-foreground mt-3 mb-4">
              Servicios profesionales
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Cubrimos todo el proceso: desde el diseño hasta el lanzamiento y mantenimiento. Tú te enfocas en tu negocio, nosotros en la tecnología.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
                >
                  <div className="w-11 h-11 bg-secondary rounded-lg flex items-center justify-center mb-5">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <h3 className="font-[Plus_Jakarta_Sans,sans-serif] text-lg font-bold text-foreground mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{service.description}</p>
                  <ul className="space-y-1.5">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="proceso" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">Cómo trabajamos</span>
            <h2 className="font-[Plus_Jakarta_Sans,sans-serif] text-4xl font-extrabold text-foreground mt-3 mb-4">
              Un proceso claro y transparente
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Sin sorpresas. Sabemos que confiar en una empresa nueva puede generar dudas, por eso te mantenemos informado en cada etapa.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-0 relative">
            {/* Connector line */}
            <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-border" />
            {STEPS.map((step, i) => (
              <div key={step.number} className="relative px-4 lg:px-6 pb-8 lg:pb-0">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0 font-[Plus_Jakarta_Sans,sans-serif] text-xl font-extrabold z-10 relative">
                    {step.number}
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="lg:hidden h-px flex-1 bg-border" />
                  )}
                </div>
                <h3 className="font-[Plus_Jakarta_Sans,sans-serif] text-base font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section id="equipo" className="py-24 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">Nuestro equipo</span>
            <h2 className="font-[Plus_Jakarta_Sans,sans-serif] text-4xl font-extrabold text-foreground mt-3 mb-4">
              Personas reales, resultados reales
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Cada proyecto tiene un equipo dedicado. Conoce a los profesionales que harán realidad tu sitio web.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((member) => (
              <div key={member.name} className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-200">
                <div className="h-56 bg-muted overflow-hidden">
                  <img
                    src={member.img}
                    alt={`Foto de ${member.name}`}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-[Plus_Jakarta_Sans,sans-serif] font-bold text-foreground">{member.name}</h3>
                  <p className="text-xs text-primary font-semibold uppercase tracking-wide mt-0.5 mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portafolio" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">Portafolio</span>
            <h2 className="font-[Plus_Jakarta_Sans,sans-serif] text-4xl font-extrabold text-foreground mt-3 mb-4">
              Proyectos que hablan por sí solos
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Cada proyecto es único. Aquí algunos de los trabajos que más nos han enorgullecido entregar.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {PROJECTS.map((project) => (
              <div key={project.title} className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl transition-all duration-200">
                <div className="h-48 bg-muted overflow-hidden relative">
                  <img
                    src={project.img}
                    alt={`Proyecto ${project.title}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-200" />
                  <span className="absolute top-4 left-4 bg-white text-foreground text-xs font-semibold px-2.5 py-1 rounded">
                    {project.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-[Plus_Jakarta_Sans,sans-serif] text-lg font-bold text-foreground mb-2">{project.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-primary flex-shrink-0" />
                    <span className="text-sm font-semibold text-primary">{project.result}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 px-6 bg-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-violet-200">Testimonios</span>
          <h2 className="font-[Plus_Jakarta_Sans,sans-serif] text-4xl font-extrabold text-white mt-3 mb-12">
            Lo que dicen nuestros clientes
          </h2>

          <div className="bg-white/5 backdrop-blur rounded-2xl p-8 md:p-12 border border-violet-500/30">
            <div className="flex justify-center gap-1 mb-6">
              {Array.from({ length: TESTIMONIALS[activeTestimonial].rating }).map((_, i) => (
                <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <blockquote className="text-lg md:text-xl text-white leading-relaxed mb-8 font-medium">
              "{TESTIMONIALS[activeTestimonial].text}"
            </blockquote>
            <div>
              <p className="font-[Plus_Jakarta_Sans,sans-serif] font-bold text-white">{TESTIMONIALS[activeTestimonial].name}</p>
              <p className="text-violet-200 text-sm">{TESTIMONIALS[activeTestimonial].company}</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex justify-center gap-3 mt-8">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={`h-2 rounded-full transition-all ${i === activeTestimonial ? "bg-white w-8" : "bg-white/40 w-2"}`}
                aria-label={`Testimonio ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contacto" className="py-24 px-6 bg-background">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">Contacto</span>
            <h2 className="font-[Plus_Jakarta_Sans,sans-serif] text-4xl font-extrabold text-foreground mt-3 mb-4">
              ¿Listo para empezar?
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Cuéntanos sobre tu proyecto. Te respondemos en menos de 24 horas con una propuesta inicial sin costo ni compromiso.
            </p>

            <div className="space-y-5">
              {[
                { icon: Mail, label: CONTACT_EMAIL },
                { icon: Phone, label: CONTACT_PHONE },
                { icon: MapPin, label: "Colombia" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-primary" />
                  </div>
                  <span className="text-sm text-foreground font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <form
            className="bg-card border border-border rounded-xl p-8 space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const formData = new FormData(form);
              const nombre = formData.get('nombre')?.toString() || '';
              const empresa = formData.get('empresa')?.toString() || '';
              const correo = formData.get('correo')?.toString() || '';
              const tipo = formData.get('tipo')?.toString() || '';
              const detalles = formData.get('detalles')?.toString() || '';

              // 1. Abrir WhatsApp de forma síncrona (antes del await para evitar que el navegador bloquee el popup)
              const text = `Hola, me llamo ${nombre} de la empresa ${empresa}. Mi correo es ${correo}. Me interesa el servicio de: ${tipo}. Detalles: ${detalles}`;
              const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
              window.open(whatsappUrl, '_blank');
              form.reset();

              // 2. Guardar en la base de datos o API configurada
              guardarSolicitud({
                nombre,
                empresa,
                correo,
                tipo,
                detalles,
                fecha: new Date().toISOString(),
              });
            }}
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  required
                  placeholder="Tu nombre"
                  className="w-full bg-input-background border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">Empresa</label>
                <input
                  type="text"
                  name="empresa"
                  placeholder="Tu empresa"
                  className="w-full bg-input-background border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">Correo electrónico</label>
              <input
                type="email"
                name="correo"
                required
                placeholder="tu@correo.com"
                className="w-full bg-input-background border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">¿Qué tipo de proyecto necesitas?</label>
              <div className="relative">
                <select name="tipo" className="w-full appearance-none bg-input-background border border-border rounded-md px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition pr-10">
                  <option value="">Selecciona una opción</option>
                  <option>Sitio web corporativo</option>
                  <option>Tienda en línea</option>
                  <option>Aplicación web</option>
                  <option>Rediseño de sitio existente</option>
                  <option>Otro</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">Cuéntanos más</label>
              <textarea
                name="detalles"
                rows={4}
                required
                placeholder="Describe brevemente tu proyecto, objetivos y cualquier detalle relevante..."
                className="w-full bg-input-background border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white font-semibold py-3.5 rounded-md hover:bg-violet-800 transition-colors flex items-center justify-center gap-2 text-sm"
            >
              Enviar solicitud <ArrowRight size={16} />
            </button>
            <p className="text-xs text-center text-muted-foreground">
              Sin spam. Respondemos en menos de 24 horas.
            </p>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-foreground text-white py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="font-[Plus_Jakarta_Sans,sans-serif] text-xl font-extrabold tracking-tight">
              Maker<span className="text-violet-400">Web</span>
            </span>
            <p className="text-sm text-white/50 mt-1">Diseñando el futuro digital, un proyecto a la vez.</p>
          </div>
          <div className="flex gap-6 text-sm text-white/60">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(sectionIds[link])}
                className="hover:text-white transition-colors"
              >
                {link}
              </button>
            ))}
          </div>
          <p className="text-xs text-white/40">© 2026 MakerWeb. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
