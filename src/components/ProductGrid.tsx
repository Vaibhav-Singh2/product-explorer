"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  loading: boolean;
  onSelect: (product: Product) => void;
}

function ProductSkeletonGrid() {
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-label="Loading products">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="flex h-full w-full animate-pulse flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
        >
          <div className="flex h-40 items-center justify-center rounded-lg bg-slate-100" />
          <div className="mt-3 space-y-2">
            <div className="h-4 w-3/4 rounded bg-slate-100" />
            <div className="h-4 w-1/2 rounded bg-slate-100" />
          </div>
          <div className="mt-auto flex items-center justify-between pt-4">
            <div className="h-3 w-16 rounded bg-slate-100" />
            <div className="h-4 w-12 rounded bg-slate-100" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ProductGrid({ products, onSelect, loading }: ProductGridProps) {
  if (loading) {
    return <ProductSkeletonGrid />;
  }

  if (products.length === 0) {
    return (
      <p className="mt-8 text-slate-500">No products match your filters.</p>
    );
  }

  return (
    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <AnimatePresence>
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, delay: index * 0.03 }}
          >
            <ProductCard product={product} onClick={() => onSelect(product)} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
