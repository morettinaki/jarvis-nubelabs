import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Zap, Shield, BarChart3, Bot, Clock,
  Check, Menu, X, ArrowRight, Phone, MapPin,
  Users, Video, Package,
  Calendar, Quote, FileText, Brain
} from "lucide-react";

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

const Section = ({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) => {
  const { ref, visible } = useInView();
  return (
    <section id={id} ref={ref} className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}>
      {children}
    </section>
  );
};

const capabilities = [
  { icon: Package, title: "Ejecución autónoma 24/7", desc: "Programa cualquier tarea recurrente — por compleja que sea — y olvídate. Jarvis la ejecuta sola mientras duermes, estás en reuniones o lo que sea que tengas que hacer." },
  { icon: Video, title: "De reunión a entregables", desc: "Cada reunión termina con entregables claros y tareas ya asignadas a cada persona del equipo. Automáticamente. Sin que tú levantes un dedo." },
  { icon: BarChart3, title: "P&Ls y reportes financieros", desc: "Prepara estados de pérdidas y ganancias, proyecciones y análisis de negocio de forma autónoma. Datos reales, siempre actualizados." },
  { icon: Clock, title: "Aprende y ejecuta solo", desc: "Si ya aprendió cómo hacer algo, lo ejecuta sin que se lo pidas. Se vuelve más autónomo con el tiempo — dentro del margen que tú defines." },
  { icon: Brain, title: "Data Analysis", desc: "Analiza datos de tu negocio, genera insights accionables y detecta patrones que a simple vista no ves. Desde métricas de ventas hasta comportamiento de clientes." },
  { icon: Zap, title: "Briefing de tu día, listo al despertar", desc: "Antes de que abras el portátil, Jarvis ya tiene preparada tu agenda, tus prioridades críticas y todo lo que está pendiente." },
  { icon: Users, title: "Coordinación con tu equipo", desc: "Se coordina con tu equipo cuando se lo indicas. Asigna, recuerda, hace seguimiento. Tú defines qué delegar — Jarvis cierra el bucle." },
  { icon: FileText, title: "Bandeja de entrada gestionada", desc: "Lee, clasifica y redacta respuestas en tu nombre. Tú solo apruebas lo que merece tu atención — el resto ya está gestionado." },
  { icon: Bot, title: "Creación de contenido", desc: "Genera borradores, posts, reportes a clientes e inversores y emails de brief. Todo alineado con tu tono, tu marca y tus estándares." },
];

const testimonials = [
  {
    body: "Muy contenta, la integración que me prepararon a partir del mapa operativo ha sido increíble. Trabajo con Manus a diario gracias a ellos y está 100% en mi operativa.",
    company: "Nexus Agency",
  },
  {
    body: "Me integraron con Claude, tengo todos los reportes a cliente automatizados semanalmente además de las posibilidades de delegar tareas a través de ClickUp, emails... Buen trabajo de Iñaki y su equipo.",
    company: "Lolygrafic C.A.",
  },
  {
    body: "Llevo toda mi operativa gracias a su levantamiento de procesos y la integración de Claude.",
    company: "Marketing Generation",
  },
  {
    body: "Hablamos con Jarvis todos los días y es como en Iron Man: hace tareas complejas de forma autónoma, revisa nuestra contabilidad, prepara proyecciones, monta P&Ls.",
    company: "Impulsain",
  },
];

const BOOKING_URL = "https://api.leadconnectorhq.com/widget/booking/0wq6f1mORfcJYQRsuY8w";

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Capacidades", href: "#capabilities" },
    { label: "Testimonios", href: "#testimonials" },
    { label: "Precios", href: "#pricing" },
    { label: "Contacto", href: "#contact" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/80 backdrop-blur-lg shadow-sm border-b border-border" : "bg-transparent"}`}>
        <div className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
          <a href="#" className="font-heading text-xl font-bold text-foreground tracking-tight">
            <span className="text-primary">Jarvis</span> <span className="text-muted-foreground text-sm font-normal">by Nubelabs</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">{l.label}</a>
            ))}
            <Button size="sm" asChild><a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">Reservar llamada</a></Button>
          </div>
          <button className="md:hidden text-foreground" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-lg border-b border-border px-4 pb-4 animate-fade-in-up">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="block py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">{l.label}</a>
            ))}
            <Button size="sm" className="w-full mt-2" asChild><a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>Reservar llamada</a></Button>
          </div>
        )}
      </nav>

      {/* Garantía — FIRST section */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary mb-6">
              <Shield size={14} /> Garantía de resultado
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight mb-4">
              Si no recuperas 8 horas a la semana, <span className="text-primary italic">seguimos trabajando gratis.</span>
            </h1>
            <p className="text-muted-foreground text-lg">Sin límite de tiempo. Sin preguntas. El riesgo lo asumimos nosotros.</p>
          </div>
          <div className="grid grid-cols-3 gap-px bg-primary/20 border border-primary/20 rounded-2xl overflow-hidden mb-10">
            {[
              { val: "30", label: "días laborales de prueba real" },
              { val: "8h", label: "semanales recuperadas mínimo" },
              { val: "∞", label: "tiempo sin cobrarte si no lo consigues" },
            ].map((s) => (
              <div key={s.val} className="bg-primary/5 py-10 px-4 hover:bg-primary/10 transition-colors text-center">
                <div className="font-heading text-4xl sm:text-5xl font-bold text-primary mb-2">{s.val}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider leading-snug">{s.label}</div>
              </div>
            ))}
          </div>
          <Card className="border-border/50 bg-card text-left">
            <CardContent className="p-8">
              <p className="text-muted-foreground leading-relaxed">
                Instalamos Jarvis en tu operativa en <span className="text-primary font-semibold">3 semanas</span>. Si en los primeros <span className="text-primary font-semibold">30 días laborales</span> no recuperas al menos <span className="text-primary font-semibold">8 horas semanales</span> de trabajo operativo, seguimos trabajando contigo sin cobrarte el mantenimiento hasta que lo consigues. <span className="text-primary font-semibold">Sin límite de tiempo. Sin preguntas.</span>
              </p>
              <p className="text-sm text-muted-foreground/60 mt-6 pt-6 border-t border-border">
                No pedimos fe ciega. Pedimos 30 días para demostrártelo. El riesgo es nuestro.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Hero */}
      <Section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center space-y-8">
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1]">
            <span className="text-primary">Jarvis</span> trabaja<br className="hidden sm:block" />
            hasta cuando<br className="hidden sm:block" />
            tú no trabajas.
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Levantamos tus procesos, entendemos tus tareas repetitivas y las integramos con el LLM ideal para tu caso — Claude, Manus u otros — para que se ejecuten de forma autónoma.
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {["P&Ls", "Reportes a clientes", "Reportes a inversores", "Tareas post-reunión", "Status de proyectos", "Emails de brief", "Creación de contenido", "Data Analysis"].map((tag) => (
              <span key={tag} className="text-xs font-semibold text-primary bg-primary/10 border border-primary/20 rounded-full px-3 py-1.5">{tag}</span>
            ))}
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Ya no hay límites. Ni mientras duermes, ni mientras conduces, ni mientras comes. <strong className="text-foreground font-bold">Jarvis está trabajando ahí. Siempre.</strong>
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" className="text-base px-8" asChild>
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer"><Calendar size={18} className="mr-2" /> Reservar llamada gratuita</a>
            </Button>
            <Button size="lg" variant="outline" className="text-base px-8" asChild>
              <a href="#capabilities">Ver si Jarvis es para mí →</a>
            </Button>
          </div>
          <div className="flex gap-8 justify-center pt-6 border-t border-border">
            <div className="text-center">
              <div className="font-heading text-2xl font-bold text-primary">3 sem.</div>
              <div className="text-xs text-muted-foreground">Instalación</div>
            </div>
            <div className="text-center">
              <div className="font-heading text-2xl font-bold text-primary">24/7</div>
              <div className="text-xs text-muted-foreground">Ejecutando</div>
            </div>
            <div className="text-center">
              <div className="font-heading text-2xl font-bold text-primary">0</div>
              <div className="text-xs text-muted-foreground">Apps nuevas</div>
            </div>
          </div>
        </div>
      </Section>

      {/* Logos clientes */}
      <Section className="py-8 border-y border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <p className="text-center text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-6">Equipos que ya delegan en Jarvis</p>
          <div className="flex justify-center items-center flex-wrap gap-x-12 gap-y-3">
            {["Nexus Agency", "Lolygrafic", "Marketing Generation", "Impulsain", "Novabucal", "Planelect"].map((name) => (
              <span key={name} className="font-heading text-sm font-bold uppercase tracking-wider text-muted-foreground/50 hover:text-muted-foreground transition-colors">{name}</span>
            ))}
          </div>
        </div>
      </Section>

      {/* Capabilities */}
      <Section id="capabilities" className="py-20 lg:py-28 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary mb-4">
              <div className="w-5 h-0.5 bg-primary" /> Qué ejecuta Jarvis
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground tracking-tight">No sugiere. No recuerda.<br />Hace el trabajo.</h2>
            <p className="mt-4 text-muted-foreground text-lg max-w-xl">Programa las tareas una vez. Jarvis las ejecuta solo — siempre, a tiempo, con la complejidad que haga falta. Y esto es solo una parte de lo que puede hacer.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden border border-border">
            {capabilities.map((f, i) => (
              <div key={i} className="bg-card p-8 hover:bg-muted/50 transition-colors">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <f.icon size={22} className="text-primary" />
                </div>
                <h3 className="font-heading text-sm font-bold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Por qué es diferente */}
      <Section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary mb-4">
              <div className="w-5 h-0.5 bg-primary" /> No es lo que has probado antes
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground tracking-tight">Lo que probaste<br />te pedía esfuerzo a ti.</h2>
            <p className="mt-4 text-muted-foreground text-lg">El problema de todas las soluciones anteriores es el mismo: seguían dependiendo de que tú hicieras algo. Jarvis no. Jarvis ejecuta.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-5 mb-10">
            <Card className="border-border/50 bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Lo que probaste</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  "Apps de productividad que tú tienes que aprender, alimentar y mantener.",
                  "Asistentes humanos que hay que formar, coordinar, supervisar y motivar.",
                  "Chatbots que te responden preguntas. Útiles para buscar información. Inútiles para ejecutar.",
                ].map((text, i) => (
                  <div key={i} className="flex gap-3">
                    <X size={18} className="text-muted-foreground/40 shrink-0 mt-1" />
                    <p className="text-sm text-muted-foreground">{text}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card className="border-primary/30 bg-primary/5">
              <CardHeader className="pb-3">
                <CardTitle className="text-xs font-bold uppercase tracking-widest text-primary">Cómo funciona Jarvis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  "No te sugiere qué hacer. Lo hace directamente. Aprende tu operativa y la ejecuta de forma autónoma.",
                  "Se vuelve más autónomo con el tiempo — dentro del margen que tú defines.",
                  "Se integra en lo que ya usas. Sin curva de aprendizaje. Sin coordinación.",
                ].map((text, i) => (
                  <div key={i} className="flex gap-3">
                    <Check size={18} className="text-primary shrink-0 mt-1" />
                    <p className="text-sm text-foreground">{text}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          <Card className="border-primary/30 bg-primary/5 text-center p-10">
            <p className="font-heading text-xl sm:text-2xl font-bold text-foreground">
              Jarvis no te recuerda lo que hay que hacer. <span className="text-primary">Lo hace.</span>
            </p>
          </Card>
        </div>
      </Section>

      {/* Testimonials */}
      <Section id="testimonials" className="py-20 lg:py-28 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary mb-4">
              <div className="w-5 h-0.5 bg-primary" /> Lo que dicen
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground tracking-tight">Lo que dicen los que<br />ya trabajan con Jarvis.</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {testimonials.map((t, i) => (
              <Card key={i} className="border-border/50 bg-card hover:border-primary/20 hover:-translate-y-1 transition-all duration-300">
                <CardContent className="p-7">
                  <Quote size={24} className="text-primary/30 mb-4" />
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">{t.body}</p>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground/50">{t.company}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* Pricing */}
      <Section id="pricing" className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary mb-4">
              <div className="w-5 h-0.5 bg-primary" /> Inversión
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground tracking-tight">Elige tu plan</h2>
            <p className="mt-4 text-muted-foreground text-lg">Todos los precios incluyen IVA. Sin letra pequeña. Sin sorpresas.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <Card className="relative flex flex-col border-border/50 bg-card transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <CardHeader className="pb-2">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Individual</p>
                <CardTitle className="font-heading text-xl">Jarvis Individual</CardTitle>
                <CardDescription>Para 1 directivo. Puedes decir que sí ahora mismo, sin pedir aprobación a nadie.</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-5">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Setup único</p>
                  <p className="font-heading text-4xl font-bold text-foreground">1.000 €</p>
                  <p className="text-xs text-muted-foreground">pago único · IVA incluido</p>
                </div>
                <div>
                  <span className="font-heading text-xl font-bold text-foreground">200 €/mes</span>
                  <span className="text-xs text-muted-foreground ml-1">· IVA incluido</span>
                </div>
                <ul className="space-y-3">
                  {["Instalación completa en 3 semanas", "Conexión a tus herramientas actuales", "Mantenimiento y ajustes incluidos", "Garantía de resultado completa"].map((feat) => (
                    <li key={feat} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check size={16} className="text-primary shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <div className="p-6 pt-0">
                <Button className="w-full" variant="outline" asChild>
                  <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">Reservar llamada gratuita</a>
                </Button>
              </div>
            </Card>

            <Card className="relative flex flex-col border-primary shadow-md scale-[1.02] bg-card transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full">
                Más popular
              </div>
              <CardHeader className="pb-2">
                <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">Para equipos</p>
                <CardTitle className="font-heading text-xl">Jarvis Empresa</CardTitle>
                <CardDescription>El mismo Jarvis a precio reducido por unidad. Mínimo 3 directivos.</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-5">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Setup por directivo</p>
                  <p className="font-heading text-4xl font-bold text-foreground">750 €</p>
                  <p className="text-xs text-muted-foreground">por directivo · IVA incluido</p>
                </div>
                <div>
                  <span className="font-heading text-xl font-bold text-foreground">150 €/mes</span>
                  <span className="text-xs text-muted-foreground ml-1">por directivo · IVA incluido</span>
                </div>
                <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 text-sm text-muted-foreground">
                  <strong className="text-primary">Ejemplo:</strong> 3 directivos → 2.250 € setup + 450 €/mes
                </div>
                <ul className="space-y-3">
                  {["Todo lo del plan Individual", "Coordinación entre directivos activada", "Precio por unidad reducido (mín. 3)", "Garantía de resultado para cada directivo"].map((feat) => (
                    <li key={feat} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check size={16} className="text-primary shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <div className="p-6 pt-0">
                <Button className="w-full" asChild>
                  <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">Reservar llamada gratuita</a>
                </Button>
                <p className="text-xs text-muted-foreground/60 text-center mt-3">La opción que elige la mayoría de nuestros clientes.</p>
              </div>
            </Card>
          </div>
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" className="py-20 lg:py-28 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start max-w-5xl mx-auto">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary mb-2">
                <div className="w-5 h-0.5 bg-primary" /> Siguiente paso
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground tracking-tight">Reserva tu llamada<br />de 20 minutos</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Sin compromiso. En la llamada vemos si Jarvis tiene sentido para tu operativa.
              </p>
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Phone size={18} className="text-primary" /> +34 632 160 547
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <MapPin size={18} className="text-primary" /> Madrid, España
                </div>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden border border-border bg-card">
              <iframe
                src="https://api.leadconnectorhq.com/widget/booking/0wq6f1mORfcJYQRsuY8w"
                style={{ width: "100%", border: "none", overflow: "hidden", minHeight: "600px" }}
                scrolling="no"
                id="0wq6f1mORfcJYQRsuY8w_1776242553464"
                title="Reservar llamada"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="font-heading text-lg font-bold text-foreground tracking-tight">
              <span className="text-primary">Jarvis</span> <span className="text-sm font-normal text-muted-foreground">by Nubelabs</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#capabilities" className="hover:text-foreground transition-colors">Capacidades</a>
              <a href="#pricing" className="hover:text-foreground transition-colors">Precios</a>
              <a href="#contact" className="hover:text-foreground transition-colors">Contacto</a>
            </div>
          </div>
          <p className="text-center text-xs text-muted-foreground mt-8">
            © 2025 Nubelabs · Todos los derechos reservados<br />
            Servicio de integraciones de inteligencia artificial para directivos y empresas.<br />
            Todos los precios indicados incluyen IVA.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
