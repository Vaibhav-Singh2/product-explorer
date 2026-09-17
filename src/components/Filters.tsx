"use client";

import { useEffect, useRef, useState } from "react";

interface FiltersProps {
  search: string;
  category: string;
  categories: string[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
}

export function Filters({
  search,
  category,
  categories,
  onSearchChange,
  onCategoryChange,
}: FiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const getCategoryLabel = (cat: string) => {
    return cat === "all" ? "All categories" : cat;
  };

  return (
    <div className="mb-2 flex flex-col gap-3 sm:flex-row">
      <input
        type="text"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search products…"
        className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none transition focus:border-slate-500 sm:max-w-xs"
      />

      <div ref={dropdownRef} className="relative w-full sm:w-56">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex w-full items-center justify-between rounded-lg border border-slate-300 bg-white px-4 py-2 text-left text-slate-800 outline-none transition hover:border-slate-400 focus:border-slate-500"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span className="truncate capitalize">{getCategoryLabel(category)}</span>
          <svg
            className={`ml-2 h-4 w-4 shrink-0 text-slate-500 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {isOpen && (
          <ul
            role="listbox"
            className="absolute left-0 right-0 top-full z-30 mt-1 max-h-60 w-full overflow-y-auto rounded-lg border border-slate-200 bg-white py-1 shadow-lg"
          >
            {categories.map((c) => {
              const isSelected = category === c;
              return (
                <li
                  key={c}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onCategoryChange(c);
                    setIsOpen(false);
                  }}
                  className={`cursor-pointer px-4 py-2.5 text-sm capitalize transition hover:bg-slate-100 ${
                    isSelected
                      ? "bg-slate-100 font-semibold text-slate-900"
                      : "text-slate-700"
                  }`}
                >
                  {getCategoryLabel(c)}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
