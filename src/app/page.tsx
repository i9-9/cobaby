"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { IconClose, IconDroplet, IconHeart, IconMenu, IconStar } from "@/components/HeroIcons";
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

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const id = href.startsWith("#") ? href.slice(1) : href;
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      closeMenu();
    },
    [closeMenu]
  );

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
      {/* Header: ancho completo, contenido limitado */}
      <header className="sticky top-0 z-40 w-full flex items-center justify-between py-4 desktop:py-3 bg-[#f5f5f5]/80 backdrop-blur-sm shadow-[0_2px_12px_rgba(0,0,0,0.06)] border-t-0 border-b border-cobaby-dark/10">
        <div className="w-full max-w-[1600px] mx-auto px-[15px] desktop:px-[50px] flex items-center justify-between">
          <Link href="/" className="flex items-center shrink-0 cursor-pointer">
            <Image
              src="/logo/cobaby_logo.svg"
              alt="Cobaby"
              width={160}
              height={48}
              className="h-8 w-auto desktop:h-9"
              priority
            />
          </Link>
          <nav className="hidden desktop:flex items-center gap-8 font-body font-bold text-cobaby-dark" aria-label="Navegación principal">
            {navItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={(e) => handleNavClick(e, href)}
                className="hover:text-cobaby-green transition-colors cursor-pointer"
              >
                {label}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            className="desktop:hidden p-2 -m-2 text-cobaby-dark hover:text-cobaby-green transition-colors touch-manipulation cursor-pointer"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={menuOpen ? closeMenu : openMenu}
          >
            {menuOpen ? <IconClose /> : <IconMenu />}
          </button>
        </div>
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
                className="p-2 -m-2 text-cobaby-dark hover:text-cobaby-green transition-colors touch-manipulation cursor-pointer"
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
                      onClick={(e) => handleNavClick(e, href)}
                      className="block py-4 px-3 -mx-3 rounded-xl hover:bg-cobaby-mint/20 hover:text-cobaby-green active:bg-cobaby-mint/30 transition-colors text-lg text-center cursor-pointer"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>

      {/* Hero: contenido con max-width */}
      <div className="w-full max-w-[1600px] mx-auto px-[15px] desktop:px-[50px]">
        <div className="grid grid-cols-6 desktop:grid-cols-12 gap-x-4 desktop:gap-x-6">
          <section className="col-span-full desktop:col-span-12 grid grid-cols-1 desktop:grid-cols-12 place-items-center pt-6 desktop:pt-12 pb-12 desktop:pb-20">
          {/* Logo grande centrado por encima del título */}
          <div className="flex justify-center mb-6 desktop:mb-8 desktop:col-span-12">
            <Image
              src="/logo/cobaby_logo.svg"
              alt="Cobaby"
              width={500}
              height={150}
              className="h-32 w-auto desktop:h-[200px] desktop:w-auto"
            />
          </div>

          <h1
            className="font-heading w-full desktop:col-span-8 desktop:col-start-3 font-semibold text-cobaby-dark text-center hero-title-fluid"
            style={{ lineHeight: 0.753 }}
          >
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
          <div className="flex flex-row flex-wrap gap-3 desktop:gap-4 w-full max-w-md desktop:max-w-none justify-center mt-12 desktop:mt-16 desktop:col-span-12">
            <Link
              href="#unete"
              className="inline-flex items-center justify-center rounded-full bg-cobaby-mint px-6 py-3.5 text-white font-body font-bold hover:bg-cobaby-green transition-colors cursor-pointer shadow-md"
            >
              Comienza tu historia
            </Link>
            <Link
              href="#donar"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-cobaby-dark px-6 py-3.5 text-cobaby-mint font-body font-bold hover:bg-cobaby-green hover:text-white transition-colors cursor-pointer shadow-md [&_svg]:text-current"
            >
              <IconDroplet />
              Donar semen
            </Link>
          </div>
          </section>
        </div>
      </div>

      {/* Section 2: Únete a CoBaby — fondo ancho completo */}
      <section id="unete" className="w-full bg-white py-12 desktop:py-20 text-cobaby-dark">
        <div className="max-w-[1600px] mx-auto px-[15px] desktop:px-[50px] flex flex-col items-center">
            <header className="text-center max-w-2xl mb-8 desktop:mb-12">
              <h2 className="font-heading text-4xl desktop:text-5xl font-semibold mb-8 desktop:mb-10 text-cobaby-dark">
                Únete a <span className="text-cobaby-mint">CoBaby</span>
              </h2>
              <p className="font-body text-cobaby-dark/90 text-base desktop:text-lg leading-relaxed mb-6">
                Somos la primera plataforma en América Latina para mujeres que desean ser madres y quieren encontrar el camino que mejor se adapte a su vida.
              </p>
              <p className="font-body font-bold text-cobaby-mint text-lg desktop:text-xl mb-5 desktop:mb-7">
                Queremos entender mejor lo que necesitas.
              </p>
              <p className="font-body text-cobaby-dark/90 text-base desktop:text-lg leading-relaxed">
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
                    className="w-full px-4 py-3 rounded-xl border border-[#e5e0dc] bg-white text-cobaby-dark placeholder:text-cobaby-dark/50 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-cobaby-mint/50 focus:border-cobaby-mint"
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
                  className="w-full mt-2 py-3.5 rounded-full bg-cobaby-mint text-white font-body font-bold hover:bg-cobaby-green transition-colors touch-manipulation cursor-pointer"
                >
                  Hablar con una experta
                </button>
              </form>
            </div>
          </div>
        </section>

      {/* Section 3: ¿Qué es CoBaby? — fondo ancho completo */}
      <section id="que-es" className="w-full bg-[#fbfaf9] py-12 desktop:py-20 text-cobaby-dark">
        <div className="max-w-[1600px] mx-auto px-[15px] desktop:px-[50px]">
            <header className="text-center max-w-4xl mx-auto mb-8 desktop:mb-12">
              <h2 className="font-heading text-4xl desktop:text-5xl font-semibold mb-8 desktop:mb-10">
                ¿Qué es <span className="text-cobaby-mint">CoBaby?</span>
              </h2>
              <p className="font-body text-cobaby-dark/90 text-base desktop:text-lg leading-snug mt-4 desktop:mt-6 mb-8 desktop:mb-10">
                CoBaby es una comunidad digital dirigida a personas que quieren ser madres con un donante de semen, o mujeres y hombres que buscan un vínculo romántico para ser pareja y posteriormente padres, o simplemente coparentar sin vínculo romántico.
              </p>
            </header>

            <div className="grid grid-cols-1 desktop:grid-cols-2 gap-6 desktop:gap-8 max-w-4xl mx-auto">
              {[
                {
                  icon: "/tabs_cobaby/Background.png",
                  title: "Donantes de semen",
                  description: "Conecta con donantes dispuestos a ayudarte a cumplir tu sueño de ser madre.",
                },
                {
                  icon: "/tabs_cobaby/Background-1.png",
                  title: "Pareja para formar familia",
                  description: "Encuentra a alguien que comparta tu deseo de formar una familia y construir un vínculo romántico.",
                },
                {
                  icon: "/tabs_cobaby/Background-2.png",
                  title: "Co-parentalidad",
                  description: "Busca un co-padre o co-madre para criar juntos sin necesidad de una relación romántica.",
                },
                {
                  icon: "/tabs_cobaby/Background-3.png",
                  title: "Comunidad de apoyo",
                  description: "Únete a una red de personas que entienden tu camino y comparten tus sueños.",
                },
              ].map(({ icon, title, description }) => (
                <article
                  key={title}
                  className="bg-white rounded-2xl p-5 desktop:p-6 shadow-sm flex flex-col gap-4 desktop:gap-5 items-start text-left"
                >
                  <div className="shrink-0 w-12 h-12 desktop:w-14 desktop:h-14 rounded-[16px] overflow-hidden relative">
                    <Image
                      src={icon}
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-heading font-semibold text-cobaby-dark text-base desktop:text-lg mb-1.5">
                      {title}
                    </h3>
                    <p className="font-body text-cobaby-dark/80 text-sm desktop:text-base leading-relaxed">
                      {description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

      {/* Section 4: ¿Quiénes somos? — fondo ancho completo */}
      <section id="quienes-somos" className="w-full bg-white pt-24 pb-6 desktop:pt-32 desktop:pb-8 text-cobaby-dark overflow-x-hidden">
        <div className="max-w-[1600px] mx-auto px-[15px] desktop:px-[50px]">
            <header className="text-center max-w-2xl mx-auto mb-10 desktop:mb-14">
              <div className="flex justify-center mb-4 desktop:mb-6">
                <Image
                  src="/logo/cobaby_logo.svg"
                  alt="CoBaby"
                  width={480}
                  height={144}
                  className="h-24 w-auto desktop:h-36"
                />
              </div>
              <h2 className="font-heading text-4xl desktop:text-5xl font-semibold mb-4 text-cobaby-dark">
                ¿Quiénes <span className="text-cobaby-mint">somos?</span>
              </h2>
              <p className="font-body text-cobaby-dark/90 text-base desktop:text-lg leading-snug mt-6 desktop:mt-8 mb-8 desktop:mb-10">
                Dos mujeres unidas por la pasión de ayudar a otras personas a cumplir su sueño de formar una familia
              </p>
            </header>

            <div className="grid grid-cols-1 desktop:grid-cols-2 gap-6 desktop:gap-8 max-w-4xl mx-auto mb-16 desktop:mb-20">
              {[
                {
                  icon: IconHeart,
                  name: "Natalia",
                  description: "Madre sola a la que le hubiese encantado encontrar a su donante sin intermediarios.",
                },
                {
                  icon: IconStar,
                  name: "Giuliana",
                  description: "Psicóloga especializada en familias diversas desde hace más de 20 años.",
                },
              ].map(({ icon: IconComponent, name, description }) => (
                <article
                  key={name}
                  className="relative rounded-2xl desktop:rounded-3xl bg-[#fbfaf9] p-6 desktop:p-8 shadow-lg overflow-hidden text-left"
                >
                  <div className="absolute top-0 right-0 w-10 h-10 desktop:w-12 desktop:h-12 rounded-bl-2xl bg-cobaby-pink/15" aria-hidden />
                  <div className="relative flex flex-col items-start gap-4">
                    <div className="shrink-0 w-14 h-14 desktop:w-16 desktop:h-16 rounded-full bg-cobaby-mint flex items-center justify-center text-white">
                      <IconComponent />
                    </div>
                    <h3 className="font-heading font-semibold text-cobaby-dark text-lg desktop:text-xl">
                      {name}
                    </h3>
                    <p className="font-body text-cobaby-dark/80 text-sm desktop:text-base leading-relaxed">
                      {description}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <p className="text-center text-sm text-cobaby-dark/60 mb-20 desktop:mb-28">
              Hecho con{" "}
              <span className="inline-flex align-middle" aria-hidden>
                <svg className="w-4 h-4 text-cobaby-mint inline-block" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </span>{" "}
              en Latinoamérica
            </p>

            {/* Línea full viewport */}
            <div
              className="border-t border-cobaby-dark/10 w-[100vw] ml-[calc(50%-50vw)] py-2 desktop:py-2.5"
              aria-hidden
            />

            <footer className="min-h-0 py-2 desktop:py-2.5 flex flex-col items-center justify-center">
              <div className="flex flex-col desktop:flex-row desktop:items-center desktop:justify-between gap-2 w-full max-w-[1600px]">
                <Link href="/" className="flex items-center shrink-0 cursor-pointer">
                  <Image
                    src="/logo/cobaby_logo.svg"
                    alt="CoBaby"
                    width={160}
                    height={48}
                    className="h-10 w-auto"
                  />
                </Link>
                <p className="text-sm text-cobaby-dark/60 text-center desktop:text-right">
                  ©2026 CoBaby. Todos los derechos reservados.
                </p>
              </div>
            </footer>
        </div>
      </section>
    </div>
  );
}
