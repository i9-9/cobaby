"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { IconChevronDown } from "@/components/HeroIcons";

export type SelectOption = { value: string; label: string };

export function FormSelect({
  options,
  placeholder,
  name,
  required,
  id,
  className = "",
}: {
  options: SelectOption[];
  placeholder: string;
  name: string;
  required?: boolean;
  id?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<SelectOption | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        close();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, close]);

  useEffect(() => {
    if (!open) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, close]);

  const displayValue = selected ? selected.label : placeholder;
  const isPlaceholder = !selected;

  const selectOption = (opt: SelectOption) => {
    setSelected(opt);
    close();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault();
        setOpen(true);
        setHighlightedIndex(0);
      }
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((i) => (i < options.length - 1 ? i + 1 : i));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((i) => (i > 0 ? i - 1 : i));
    } else if (e.key === "Enter" && options[highlightedIndex]) {
      e.preventDefault();
      selectOption(options[highlightedIndex]);
    } else if (e.key === "Escape") {
      close();
    }
  };

  useEffect(() => {
    if (!open || !listRef.current) return;
    const el = listRef.current.children[highlightedIndex] as HTMLElement;
    el?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [highlightedIndex, open]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <input
        type="hidden"
        name={name}
        value={selected?.value ?? ""}
        required={required}
        readOnly
        tabIndex={-1}
        aria-hidden
      />
      <button
        type="button"
        id={id}
        className="unete-custom-select w-full px-4 py-3 rounded-xl border border-[#e5e0dc] bg-white text-cobaby-dark focus:outline-none focus:ring-2 focus:ring-cobaby-mint/50 focus:border-cobaby-mint text-left flex items-center justify-between gap-2 touch-manipulation transition-colors hover:border-cobaby-dark/30 cursor-pointer"
        onClick={() => setOpen((o) => !o)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={id ? `${id}-label` : undefined}
      >
        <span className={isPlaceholder ? "text-cobaby-dark/50 font-normal" : "truncate"}>{displayValue}</span>
        <span className={open ? "rotate-180" : ""}>
          <IconChevronDown />
        </span>
      </button>
      <div
        role="listbox"
        aria-activedescendant={open ? `${id}-option-${highlightedIndex}` : undefined}
        className="absolute z-20 left-0 right-0 mt-1 rounded-xl border border-[#e5e0dc] bg-white shadow-lg overflow-hidden transition-[max-height,opacity] duration-200 ease-out"
        style={{
          maxHeight: open ? "min(20rem, 70vh)" : "0",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
        }}
      >
        <ul ref={listRef} className="py-1 max-h-[min(20rem,70vh)] overflow-y-auto overscroll-contain">
          {options.map((opt, i) => (
            <li
              key={opt.value}
              id={id ? `${id}-option-${i}` : undefined}
              role="option"
              aria-selected={selected?.value === opt.value}
              className={`px-4 py-3 cursor-pointer transition-colors select-none ${
                i === highlightedIndex
                  ? "bg-cobaby-mint/20 text-cobaby-green"
                  : "hover:bg-cobaby-mint/20 hover:text-cobaby-green text-cobaby-dark"
              }`}
              onClick={() => selectOption(opt)}
              onMouseEnter={() => setHighlightedIndex(i)}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
