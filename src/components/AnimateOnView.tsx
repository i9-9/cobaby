"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Variant = "fade-up" | "fade-in" | "fade-down" | "scale-in";

interface AnimateOnViewProps {
  children: React.ReactNode;
  /** Variante de animación */
  variant?: Variant;
  /** Retraso en ms antes de aplicar la animación (para stagger) */
  delay?: number;
  /** Porcentaje del elemento visible para considerar "in view" (0-1). Default 0.1 */
  threshold?: number;
  /** Margen del root para disparar antes/después. Ej: "0px 0px -80px 0px" */
  rootMargin?: string;
  /** Si debe animar solo una vez (true) o cada vez que entra (false). Default true */
  once?: boolean;
  /** Clases extra para el wrapper */
  className?: string;
  /** Tag del wrapper. Default "div" */
  as?: "div" | "section" | "article" | "header";
}

export function AnimateOnView({
  children,
  variant = "fade-up",
  delay = 0,
  threshold = 0.1,
  rootMargin = "0px 0px -40px 0px",
  once = true,
  className = "",
  as: Tag = "div",
}: AnimateOnViewProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleIntersect = useCallback<IntersectionObserverCallback>(
    (entries) => {
      const [entry] = entries;
      if (!entry?.isIntersecting) {
        if (!once) setInView(false);
        return;
      }
      if (once && hasAnimated) return;
      setHasAnimated(true);
      // Dos requestAnimationFrame para que el navegador pinte primero el estado inicial (opacity 0)
      // y así la transición CSS se vea al pasar a visible.
      const runAfterPaint = () => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (delay > 0) {
              timeoutRef.current = setTimeout(() => setInView(true), delay);
            } else {
              setInView(true);
            }
          });
        });
      };
      runAfterPaint();
    },
    [once, hasAnimated, delay]
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(handleIntersect, {
      threshold,
      rootMargin,
    });
    observer.observe(el);
    return () => {
      observer.disconnect();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [threshold, rootMargin, handleIntersect]);

  const visible = inView;
  const variantClass = `animate-on-view animate-${variant}`;

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      className={`${variantClass} ${visible ? "animate-on-view-visible" : ""} ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}
