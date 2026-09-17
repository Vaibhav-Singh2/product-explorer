"use client";

import { useEffect, useMemo, useState } from "react";
import { Filters } from "@/components/Filters";
import { ProductGrid } from "@/components/ProductGrid";
import { ProductModal } from "@/components/ProductModal";
import { Product } from "@/types/product";
import { ErrorAlert } from "@/components/error-alert";
import { useProducts } from "@/hooks/useProducts";

export default function HomePage() {
  const { products, loading, error } = useProducts();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [selected, setSelected] = useState<Product | null>(null);

  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && products.length > 0) {
      setLastUpdated(new Date().toLocaleTimeString());
    }
  }, [loading, products]);

  const categories = useMemo(() => {
    const unique = new Set(products.map((p) => p.category));
    return ["all", ...Array.from(unique)];
  }, [products]);

  const visibleProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory =
        category === "all" || product.category === category;
      const matchesSearch =
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [products, category, search]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Product Explorer</h1>
        <p className="text-sm text-slate-500">
          Last updated at {lastUpdated ? lastUpdated : "loading..."}
        </p>
      </header>

      <Filters
        search={search}
        category={category}
        categories={categories}
        onSearchChange={setSearch}
        onCategoryChange={setCategory}
      />

      {error && (
        <ErrorAlert
          className="mt-8"
          message={error || "An unexpected error occurred."}
        />
      )}

      <ProductGrid
        loading={loading}
        products={visibleProducts}
        onSelect={setSelected}
      />

      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </main>
  );
}
