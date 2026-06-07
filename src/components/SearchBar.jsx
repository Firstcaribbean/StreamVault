import { Search, X } from "lucide-react";
import { useEffect, useId, useState } from "react";

export default function SearchBar({
  value,
  onChange,
  onDebouncedChange,
  onFocus,
  placeholder = "Search titles",
  large = false,
  autoFocus = false,
}) {
  const id = useId();
  const [localValue, setLocalValue] = useState(value ?? "");

  useEffect(() => {
    setLocalValue(value ?? "");
  }, [value]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      onDebouncedChange?.(localValue.trim());
    }, 300);

    return () => window.clearTimeout(timer);
  }, [localValue, onDebouncedChange]);

  const updateValue = (nextValue) => {
    setLocalValue(nextValue);
    onChange?.(nextValue);
  };

  return (
    <label
      htmlFor={id}
      className={`group flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.08] text-white/85 shadow-lg shadow-black/20 backdrop-blur-xl transition-all duration-300 focus-within:border-vault/70 focus-within:bg-white/[0.12] focus-within:shadow-glow ${
        large ? "h-14 w-full px-5" : "h-10 w-full px-3 md:w-44 md:focus-within:w-72"
      }`}
    >
      <Search className={`${large ? "h-5 w-5" : "h-4 w-4"} shrink-0 text-vault-light`} aria-hidden="true" />
      <span className="sr-only">{placeholder}</span>
      <input
        id={id}
        value={localValue}
        onChange={(event) => updateValue(event.target.value)}
        onFocus={onFocus}
        autoFocus={autoFocus}
        type="search"
        placeholder={placeholder}
        className={`min-w-0 flex-1 bg-transparent font-body text-white placeholder:text-white/45 focus:outline-none ${
          large ? "text-base" : "text-sm"
        }`}
      />
      {localValue ? (
        <button
          type="button"
          onClick={() => updateValue("")}
          className="rounded-full p-1 text-white/55 transition hover:bg-white/10 hover:text-white focus-visible:focus-ring"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      ) : null}
    </label>
  );
}
