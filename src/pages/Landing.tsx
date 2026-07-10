import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Shield, Check, Phone } from "lucide-react";

const CAL_LINK = "nubelabs-hey/30min";
const CAL_CONFIG = { layout: "month_view", useSlotsViewOnSmallScreen: "true" };
const preventCalNav = (e: React.MouseEvent) => e.preventDefault();

const Landing = () => {
  useEffect(() => {
    (function (C: any, A: string, L: string) {
      let p = function (a: any, ar: any) { a.q.push(ar); };
      let d = C.document;
      C.Cal = C.Cal || function () {
        let cal = C.Cal; let ar = arguments;
        if (!cal.loaded) {
          cal.ns = {}; cal.q = cal.q || [];
          d.head.appendChild(d.createElement("script")).src = A;
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api = function () { p(api, arguments); };
          const namespace = ar[1];
          api.q = api.q || [];
          if (typeof namespace === "string") {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, ["initNamespace", namespace]);
          } else p(cal, ar);
          return;
        }
        p(cal, ar);
      };
    })(window, "https://app.cal.com/embed/embed.js", "init");
    // @ts-ignore
    Cal("init", "30min", { origin: "https://app.cal.com" });
    // @ts-ignore
    Cal.config = Cal.config || {};
    // @ts-ignore
    Cal.config.forwardQueryParams = true;
    // @ts-ignore
    Cal.ns["30min"]("inline", {
      elementOrSelector: "#my-cal-inline-30min-landing",
      config: CAL_CONFIG,
      calLink: CAL_LINK,
    });
    // @ts-ignore
    Cal.ns["30min"]("ui", { hideEventTypeDetails: false, layout: "month_view" });
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Minimal Navbar */}
      <nav className="border-b border-border bg-background/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between h-14 px-4">
          <span className="font-heading text-lg font-bold text-foreground tracking-tight">
            <span className="text-primary">Jarvis</span>
          </span>
          <Button size="sm" asChild>
            <a href="#book" data-cal-link={CAL_LINK} data-cal-namespace="30min" data-cal-config={JSON.stringify(CAL_CONFIG)} onClick={preventCalNav}>Reservar llamada</a>
          </Button>
        </div>
      </nav>

      {/* Hero — focused */}
      <section className="flex-1 flex items-center py-16 lg:py-24">
        <div className="container mx-auto px-4 max-w-3xl text-center space-y-8">
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1]">
            <span className="text-primary">Jarvis</span> trabaja<br />
            hasta cuando tú no trabajas.
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Levantamos tus procesos, entendemos tus tareas repetitivas y las integramos con el LLM ideal para tu caso — para que se ejecuten de forma autónoma.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" className="text-base px-8" asChild>
              <a href="#book" data-cal-link={CAL_LINK} data-cal-namespace="30min" data-cal-config={JSON.stringify(CAL_CONFIG)} onClick={preventCalNav}><Calendar size={18} className="mr-2" /> Reservar llamada gratuita</a>
            </Button>
          </div>
          <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground">
            <Shield size={16} className="text-primary shrink-0" />
            <span>8 h/semana recuperadas en 30 días — o seguimos gratis.</span>
          </div>
        </div>
      </section>

      {/* Social proof strip */}
      <section className="border-y border-border py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center flex-wrap gap-x-10 gap-y-2">
            {["Nexus Agency", "Lolygrafic", "Marketing Generation", "Impulsain"].map((name) => (
              <span key={name} className="font-heading text-xs font-bold uppercase tracking-wider text-muted-foreground/40">{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing minimal */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground tracking-tight text-center mb-10">Inversión</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="border border-border rounded-xl p-6 bg-card space-y-4">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Individual</p>
              <p className="font-heading text-3xl font-bold text-foreground">1.000 €</p>
              <p className="text-sm text-muted-foreground">setup + 200 €/mes</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {["1 directivo", "Instalación en 3 semanas", "Garantía de resultado"].map(f => (
                  <li key={f} className="flex items-center gap-2"><Check size={14} className="text-primary" />{f}</li>
                ))}
              </ul>
            </div>
            <div className="border border-primary rounded-xl p-6 bg-primary/5 space-y-4 relative">
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-0.5 rounded-full">Popular</div>
              <p className="text-xs font-bold uppercase tracking-widest text-primary">Empresa</p>
              <p className="font-heading text-3xl font-bold text-foreground">750 €</p>
              <p className="text-sm text-muted-foreground">por directivo + 150 €/mes</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {["Mínimo 3 directivos", "Precio reducido por unidad", "Garantía por directivo"].map(f => (
                  <li key={f} className="flex items-center gap-2"><Check size={14} className="text-primary" />{f}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Calendar embed */}
      <section id="book" className="py-16 lg:py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-2xl text-center space-y-6">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground tracking-tight">Reserva tu llamada</h2>
          <p className="text-muted-foreground">20 minutos. Sin compromiso.</p>
          <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground mb-4">
            <Phone size={16} className="text-primary" /> +34 632 160 547
          </div>
          <div className="rounded-xl overflow-hidden border border-border bg-card">
            <div id="my-cal-inline-30min-landing" style={{ width: "100%", minHeight: "600px", overflow: "auto" }} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <p className="text-center text-xs text-muted-foreground">
          © 2025 Nubelabs · Todos los derechos reservados
        </p>
      </footer>
    </div>
  );
};

export default Landing;
