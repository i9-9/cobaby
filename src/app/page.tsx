"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { IconClose, IconDroplet, IconMenu } from "@/components/HeroIcons";
import { FormSelect, type SelectOption } from "@/components/FormSelect";

const features = [
  { src: "/tabs_images/perfil.png", label: "Crea tu perfil" },
  { src: "/tabs_images/match.png", label: "Encuentra tu match" },
  { src: "/tabs_images/conversa.png", label: "Conecta y conversa" },
  { src: "/tabs_images/juntos.png", label: "Construyan juntos" },
];

const navItems = [
  { href: "#que-es", label: "¿Qué es CoBaby?" },
  { href: "#unete", label: "Únete" },
  { href: "#quienes-somos", label: "¿Quiénes somos?" },
];

const formSelectOptions = {
  comoTeDefines: [
    { value: "mujer", label: "Mujer" },
    { value: "hombre", label: "Hombre" },
    { value: "otros", label: "Otros" },
  ] as SelectOption[],
  edad: [
    { value: "18-24", label: "18-24" },
    { value: "25-29", label: "25-29" },
    { value: "30-34", label: "30-34" },
    { value: "35-39", label: "35-39" },
    { value: "40-44", label: "40-44" },
    { value: "45-mas", label: "45 años o más" },
  ] as SelectOption[],
  pais: [
    { value: "argentina", label: "Argentina" },
    { value: "mexico", label: "México" },
    { value: "colombia", label: "Colombia" },
    { value: "chile", label: "Chile" },
    { value: "peru", label: "Perú" },
    { value: "espana", label: "España" },
    { value: "otro", label: "Otro" },
  ] as SelectOption[],
  ciudad: [
    { value: "buenos-aires", label: "Buenos Aires" },
    { value: "ciudad-de-mexico", label: "Ciudad de México" },
    { value: "bogota", label: "Bogotá" },
    { value: "santiago", label: "Santiago" },
    { value: "lima", label: "Lima" },
    { value: "madrid", label: "Madrid" },
    { value: "otra", label: "Otra" },
  ] as SelectOption[],
  momentoDeseo: [
    { value: "explorando", label: "Solo estoy explorando" },
    { value: "informando", label: "Me estoy informando" },
    { value: "proximos-12", label: "Quiero avanzar en los próximos 12 meses" },
    { value: "ahora", label: "Quiero empezar ahora" },
  ] as SelectOption[],
  queEsperas: [
    { value: "informacion-asesoramiento", label: "Información y asesoramiento para tener un hijo" },
    { value: "donante", label: "Encontrar un donante de semen" },
    { value: "pareja-estable", label: "Encontrar una pareja estable para formar familia" },
    { value: "co-padre", label: "Encontrar un co-padre" },
    { value: "co-madre", label: "Encontrar una co-madre" },
    { value: "otros", label: "Otros" },
  ] as SelectOption[],
  queAclarar: [
    { value: "ser-mama-por-mi-cuenta", label: "Quiero entender si realmente puedo ser mamá por mi cuenta" },
    { value: "opciones-reales", label: "Quiero conocer mis opciones reales" },
    { value: "tema-donante", label: "Me preocupa el tema del donante" },
    { value: "hablar-con-alguien", label: "Quiero hablar con alguien que me entienda" },
    { value: "no-tengo-claro", label: "Todavía no lo tengo claro" },
  ] as SelectOption[],
};

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const openMenu = useCallback(() => setMenuOpen(true), []);

  useEffect(() => {
    if (!menuOpen) return;
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", onEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onEscape);
      document.body.style.overflow = "";
    };
  }, [menuOpen, closeMenu]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="grid grid-cols-6 desktop:grid-cols-12 gap-x-4 desktop:gap-x-6 px-[15px] desktop:px-[50px] max-w-[1600px] mx-auto">
        {/* Header: logo + nav (desktop) / hamburger (mobile) */}
        <header className="col-span-full flex items-center justify-between py-4 desktop:py-8 bg-[#f5f5f5] -mx-[15px] desktop:-mx-[50px] px-[15px] desktop:px-[50px]">
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/logo/cobaby_logo.png"
              alt="Cobaby"
              width={120}
              height={36}
              className="h-8 w-auto desktop:h-9"
              priority
            />
          </Link>
          <nav className="hidden desktop:flex items-center gap-8 font-body font-bold text-cobaby-dark" aria-label="Navegación principal">
            {navItems.map(({ href, label }) => (
              <Link key={href} href={href} className="hover:text-cobaby-green transition-colors">
                {label}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            className="desktop:hidden p-2 -m-2 text-cobaby-dark hover:text-cobaby-green transition-colors touch-manipulation"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={menuOpen ? closeMenu : openMenu}
          >
            {menuOpen ? <IconClose /> : <IconMenu />}
          </button>
        </header>

        {/* Mobile menu: full screen */}
        <div
          id="mobile-menu"
          className="desktop:hidden fixed inset-0 z-50"
          aria-hidden={!menuOpen}
          style={{ pointerEvents: menuOpen ? "auto" : "none" }}
        >
          <aside
            className="fixed inset-0 w-full h-full bg-[#f5f5f5] flex flex-col transition-[transform] duration-300 ease-out will-change-transform"
            style={{ transform: menuOpen ? "translateX(0)" : "translateX(100%)" }}
          >
            <div className="flex items-center justify-end p-4 shrink-0">
              <button
                type="button"
                className="p-2 -m-2 text-cobaby-dark hover:text-cobaby-green transition-colors touch-manipulation"
                aria-label="Cerrar menú"
                onClick={closeMenu}
              >
                <IconClose className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex-1 flex items-center justify-center px-6 font-body font-bold text-cobaby-dark" aria-label="Menú de navegación">
              <ul className="flex flex-col gap-1 w-full max-w-sm">
                {navItems.map(({ href, label }, i) => (
                  <li
                    key={href}
                    className="transition-[opacity,transform] duration-300 ease-out"
                    style={{
                      opacity: menuOpen ? 1 : 0,
                      transform: menuOpen ? "translateY(0)" : "translateY(8px)",
                      transitionDelay: menuOpen ? `${120 + i * 60}ms` : "0ms",
                    }}
                  >
                    <Link
                      href={href}
                      onClick={closeMenu}
                      className="block py-4 px-3 -mx-3 rounded-xl hover:bg-cobaby-mint/20 hover:text-cobaby-green active:bg-cobaby-mint/30 transition-colors text-lg text-center"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>

        {/* Hero */}
        <section className="col-span-full desktop:col-span-12 grid grid-cols-1 desktop:grid-cols-12 place-items-center pt-6 desktop:pt-12 pb-12 desktop:pb-20">
          {/* Logo grande centrado por encima del título */}
          <div className="flex justify-center mb-6 desktop:mb-8 desktop:col-span-12">
            <Image
              src="/logo/cobaby_logo.png"
              alt="Cobaby"
              width={400}
              height={120}
              className="h-24 w-auto desktop:h-[140px] desktop:w-auto"
            />
          </div>

          <h1 className="font-heading text-5xl desktop:text-7xl w-full desktop:col-span-8 desktop:col-start-3 font-semibold text-cobaby-dark text-center" style={{ lineHeight: 0.753 }}>
            <span className="block">Todas las familias</span>
            <span className="block">
              nacen con un <span className="text-gradient-encuentro">encuentro</span>
            </span>
          </h1>
          <p className="mt-8 desktop:mt-10 text-base desktop:text-lg text-cobaby-dark max-w-xl font-body leading-snug text-center mx-auto desktop:col-span-12">
            La comunidad digital para personas que sueñan
            <br />
            con formar una familia en Latinoamérica.
          </p>

          {/* 4 features: 2x2 mobile, 1x4 desktop */}
          <div className="grid grid-cols-2 desktop:grid-cols-4 gap-4 desktop:gap-6 w-full max-w-4xl mt-10 desktop:mt-14 desktop:col-span-12">
            {features.map(({ src, label }) => (
              <div
                key={label}
                className="rounded-2xl border border-[#e5e0dc] bg-[#fbfaf9] p-3 desktop:p-4 flex flex-col items-center justify-center text-center"
              style={{ borderWidth: 1.08 }}
              >
                <div className="relative w-9 h-9 desktop:w-10 desktop:h-10 mb-1.5 desktop:mb-2 flex items-center justify-center shrink-0">
                  <Image
                    src={src}
                    alt=""
                    width={40}
                    height={40}
                    className="object-contain w-full h-full"
                  />
                </div>
                <span className="font-body font-bold text-cobaby-dark text-xs desktop:text-sm leading-tight">
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-row flex-wrap gap-3 desktop:gap-4 w-full max-w-md desktop:max-w-none justify-center mt-8 desktop:mt-12 desktop:col-span-12">
            <Link
              href="#comienza"
              className="inline-flex items-center justify-center rounded-full bg-cobaby-mint px-6 py-3.5 text-white font-body font-bold hover:bg-cobaby-green transition-colors"
            >
              Comienza tu historia
            </Link>
            <Link
              href="#donar"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-cobaby-dark px-6 py-3.5 text-cobaby-mint font-body font-bold hover:bg-cobaby-green hover:text-white transition-colors [&_svg]:text-current"
            >
              <IconDroplet />
              Donar semen
            </Link>
          </div>
        </section>

        {/* Section 2: Únete a CoBaby */}
        <section
          id="unete"
          className="col-span-full -mx-[15px] desktop:-mx-[50px] bg-white py-12 desktop:py-20 px-[15px] desktop:px-[50px] text-cobaby-dark"
        >
          <div className="max-w-[1600px] mx-auto flex flex-col items-center">
            <header className="text-center max-w-2xl mb-8 desktop:mb-12">
              <h2 className="font-heading text-3xl desktop:text-4xl font-semibold mb-4 text-cobaby-dark">
                Únete a <span className="text-cobaby-mint">CoBaby</span>
              </h2>
              <p className="font-body text-cobaby-dark/90 text-base desktop:text-lg leading-relaxed mb-6">
                Somos la primera plataforma en América Latina para mujeres que desean ser madres y quieren encontrar el camino que mejor se adapte a su vida.
              </p>
              <p className="font-body font-bold text-cobaby-green text-lg desktop:text-xl mb-3">
                Queremos entender mejor lo que necesitas.
              </p>
              <p className="font-body text-cobaby-dark/90 text-sm desktop:text-base leading-relaxed">
                Si te interesa explorar tus opciones para ser mamá, responde este breve cuestionario y una de nuestras expertas en acompañamiento a la maternidad se pondrá en contacto contigo para una conversación privada y confidencial.
              </p>
            </header>

            <div className="w-full max-w-xl rounded-2xl desktop:rounded-3xl bg-[#fbfaf9] text-cobaby-dark p-6 desktop:p-8 shadow-xl">
              <form
                className="flex flex-col gap-4 desktop:gap-5 font-body"
                onSubmit={(e) => e.preventDefault()}
              >
                <label className="flex flex-col gap-1.5 text-sm font-bold" id="label-como-te-defines">
                  <span>¿Cómo te defines?<span className="text-red-600">*</span></span>
                  <FormSelect
                    id="como-te-defines"
                    name="como_te_defines"
                    placeholder="Selecciona una opción"
                    options={formSelectOptions.comoTeDefines}
                    required
                  />
                </label>
                <label className="flex flex-col gap-1.5 text-sm font-bold">
                  <span>¿Cómo te llamas? <span className="font-normal text-cobaby-dark/70">(opcional)</span></span>
                  <input
                    type="text"
                    placeholder="Tu nombre de pila"
                    className="w-full px-4 py-3 rounded-xl border border-[#e5e0dc] bg-white text-cobaby-dark placeholder:text-cobaby-dark/50 focus:outline-none focus:ring-2 focus:ring-cobaby-mint/50 focus:border-cobaby-mint"
                  />
                </label>
                <label className="flex flex-col gap-1.5 text-sm font-bold" id="label-edad">
                  <span>Edad<span className="text-red-600">*</span></span>
                  <FormSelect
                    id="edad"
                    name="edad"
                    placeholder="Selecciona tu rango de edad"
                    options={formSelectOptions.edad}
                    required
                  />
                </label>
                <label className="flex flex-col gap-1.5 text-sm font-bold" id="label-pais">
                  <span>País en el que vives<span className="text-red-600">*</span></span>
                  <FormSelect
                    id="pais"
                    name="pais"
                    placeholder="Selecciona tu país"
                    options={formSelectOptions.pais}
                    required
                  />
                </label>
                <label className="flex flex-col gap-1.5 text-sm font-bold" id="label-ciudad">
                  <span>Ciudad<span className="text-red-600">*</span></span>
                  <FormSelect
                    id="ciudad"
                    name="ciudad"
                    placeholder="Selecciona tu ciudad"
                    options={formSelectOptions.ciudad}
                    required
                  />
                </label>
                <label className="flex flex-col gap-1.5 text-sm font-bold" id="label-momento">
                  <span>¿En qué momento de tu deseo de ser mamá estás hoy?<span className="text-red-600">*</span></span>
                  <FormSelect
                    id="momento-deseo"
                    name="momento_deseo"
                    placeholder="Selecciona una opción"
                    options={formSelectOptions.momentoDeseo}
                    required
                  />
                </label>
                <label className="flex flex-col gap-1.5 text-sm font-bold" id="label-que-esperas">
                  <span>¿Qué esperas de CoBaby?<span className="text-red-600">*</span></span>
                  <FormSelect
                    id="que-esperas"
                    name="que_esperas"
                    placeholder="Selecciona una opción"
                    options={formSelectOptions.queEsperas}
                    required
                  />
                </label>
                <label className="flex flex-col gap-1.5 text-sm font-bold" id="label-que-aclarar">
                  <span>¿Qué te gustaría que esta conversación te ayudara a aclarar?<span className="text-red-600">*</span></span>
                  <FormSelect
                    id="que-aclarar"
                    name="que_aclarar"
                    placeholder="Selecciona una opción"
                    options={formSelectOptions.queAclarar}
                    required
                  />
                </label>

                <p className="text-center text-sm text-cobaby-dark/80 py-2">
                  Tu información es confidencial.
                  <br />
                  Esta conversación es privada y sin compromiso.
                </p>

                <label className="flex gap-3 items-start cursor-pointer group">
                  <input
                    type="checkbox"
                    className="mt-1 w-5 h-5 rounded-full border-2 border-cobaby-dark/40 text-cobaby-mint focus:ring-cobaby-mint shrink-0 accent-cobaby-mint"
                    required
                  />
                  <span className="text-xs desktop:text-sm text-cobaby-dark/90 leading-relaxed">
                    He leído y acepto la política de protección de datos personales. Entiendo que mis datos serán tratados de acuerdo con la legislación vigente en materia de protección de datos personales en Latinoamérica (Ley de Habeas Data), y que puedo ejercer mis derechos de acceso, rectificación, cancelación y oposición en cualquier momento.<span className="text-red-600">*</span>
                  </span>
                </label>

                <button
                  type="submit"
                  className="w-full mt-2 py-3.5 rounded-full bg-cobaby-mint text-white font-body font-bold hover:bg-cobaby-green transition-colors touch-manipulation"
                >
                  Hablar con una experta
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
