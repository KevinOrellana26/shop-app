"use client";

import { cn } from "@/src/lib/utils";
import { CircleXIcon, SearchIcon } from "lucide-react";
import { parseAsString, useQueryState } from "nuqs";
import {
  ComponentProps,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { useDebouncedCallback } from "use-debounce";
import { DEBOUNCED_MS } from "../config/main.config";
import { PARAMS } from "../config/params.config";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Kbd } from "./ui/kbd";

type SearchInputWithKbdProps = ComponentProps<"div"> & {
  label?: string;
  placeholder?: string;
  searchParamValue?: string;
  debounceMs?: number;
  showLabel?: boolean;
  onClear?: () => void;
};

export default function SearchInputWithKbd({
  className,
  placeholder = "Buscar...",
  searchParamValue = PARAMS.query,
  debounceMs = DEBOUNCED_MS,
  ...props
}: SearchInputWithKbdProps) {
  const [isPending, startTransition] = useTransition();

  const [query, setQuery] = useQueryState(
    searchParamValue,
    parseAsString.withDefault("").withOptions({
      shallow: false, //Recarga SSR
      history: "replace", //No llena back/forward
      clearOnDefault: true, // URL Limpia cuando está vacío
    })
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState(query);

  // Detecta Ctrl+K o ⌘+K
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault(); // evita abrir la búsqueda del navegador
        inputRef.current?.focus(); // pone el foco en el input
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setQuery(inputValue); // sincroniza URL
      // Aquí podrías hacer fetch al backend:
      // fetchResults(inputValue);
    }, debounceMs);

    return () => clearTimeout(handler);
  }, [inputValue, debounceMs, setQuery]);

  return (
    <div
      className={cn(
        "relative w-full max-w-sm transition-all duration-300 transform",
        isFocused ? "scale-105 opacity-100" : "scale-100 opacity-90",
        className
      )}
      {...props}
    >
      {/* Icono de búsqueda */}
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
        <SearchIcon className="h-4 w-4" />
        <span className="sr-only">Search</span>
      </div>

      {/* Input */}
      <Input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.currentTarget.value);
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="pl-10 pr-16 transition-all duration-300
               focus:ring-2 focus:ring-blue-500
               focus:outline-none focus:shadow-md rounded-md"
      />

      {/* Kbd o Botón borrar */}
      <div className={cn("absolute inset-y-0 right-0 flex items-center")}>
        {query ? (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onMouseDown={() => {
              setInputValue(""); // limpia input
              setQuery(""); // limpia URL
            }}
            className="text-muted-foreground hover:bg-transparent hover:cursor-pointer"
            aria-label="Clear search"
          >
            <CircleXIcon className="size-4" />
          </Button>
        ) : (
          <Kbd className="mr-3">Ctrl+K</Kbd>
        )}
      </div>
    </div>
  );
}
