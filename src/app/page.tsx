"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { IconClose, IconDroplet, IconMenu } from "@/components/HeroIcons";

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
      </div>
    </div>
  );
}
