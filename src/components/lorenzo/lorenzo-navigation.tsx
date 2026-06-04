"use client";

import { useEffect, useState } from "react";

const navItems = [
  { label: "Portfolio", href: "#portfolio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Sobre mi", href: "#sobre-mi" },
  { label: "Contacto", href: "#contacto" },
];

export function LorenzoNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 96);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <div
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-stone-950/40 transition-opacity duration-500 md:hidden ${
          isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeMenu}
      />

      <div
        className={`fixed left-0 top-0 z-50 w-full bg-white px-8 pb-12 pt-32 shadow-2xl transition-transform duration-500 ease-out md:hidden ${
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex flex-col gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className="font-heading text-4xl font-light uppercase tracking-[0.18em] text-stone-900"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="mt-20 border-t border-stone-100 pt-10">
          <div className="flex gap-8 text-[0.62rem] font-medium uppercase tracking-[0.24em] text-stone-400">
            <a href="#contacto" onClick={closeMenu} className="transition hover:text-stone-900">
              Instagram
            </a>
            <a href="#portfolio" onClick={closeMenu} className="transition hover:text-stone-900">
              Vogue
            </a>
            <a href="#contacto" onClick={closeMenu} className="transition hover:text-stone-900">
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      <nav
        className={`fixed left-0 top-0 z-[60] flex w-full items-center justify-between px-6 py-8 transition-all duration-500 sm:px-8 ${
          hasScrolled || isMenuOpen
            ? "bg-white/90 py-5 text-stone-900 shadow-sm backdrop-blur-md"
            : "text-white mix-blend-difference"
        }`}
      >
        <a
          href="#hero"
          className="font-heading text-xl font-light uppercase tracking-[0.24em] sm:text-2xl"
        >
          Lorenzo Bellucci
        </a>

        <div className="hidden items-center gap-10 text-sm font-light uppercase tracking-[0.22em] md:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="transition hover:opacity-50">
              {item.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          aria-label={isMenuOpen ? "Cerrar menu" : "Abrir menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((current) => !current)}
          className="relative z-[70] flex h-11 w-11 items-center justify-center md:hidden"
        >
          <span className="sr-only">{isMenuOpen ? "Cerrar menu" : "Abrir menu"}</span>
          <span
            className={`absolute h-px w-7 bg-current transition duration-300 ${
              isMenuOpen ? "rotate-45" : "-translate-y-2"
            }`}
          />
          <span
            className={`absolute h-px w-7 bg-current transition duration-300 ${
              isMenuOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute h-px w-7 bg-current transition duration-300 ${
              isMenuOpen ? "-rotate-45" : "translate-y-2"
            }`}
          />
        </button>
      </nav>
    </>
  );
}
