# Notes

> Fill this in as you work. This document is assessed alongside your code.

## Bugs I found

For each: what was wrong, **why** it was wrong, and how I fixed it.

1. **Infinite Fetch Loop in `useProducts` Hook**
   - **What was wrong:** The application made an endless stream of HTTP GET requests to `https://fakestoreapi.com/products`.
   - **Why it was wrong:** The `useEffect` hook in `src/hooks/useProducts.ts` included `products` in its dependency array `[products]`. When `setProducts(data)` updated state, it triggered a re-render and re-executed the effect infinitely.
   - **How I fixed it:** Changed the dependency array to `[]` so the fetch effect only runs once when the component mounts.

2. **TypeScript Typing (`any` in `useProducts`)**
   - **What was wrong:** The API response was assigned the `any` type in `const data: any = await res.json()`.
   - **Why it was wrong:** It bypassed TypeScript type-safety guarantees and violated the assignment's "No `any`" ground rule.
   - **How I fixed it:** Imported the existing `Product` interface from `@/types/product` and typed the response as `const data: Product[] = await res.json()`.

3. **Broken Search & Category Filter Composition & Case Sensitivity**
   - **What was wrong:** Filtering by category bypassed search filtering, and search was case-sensitive.
   - **Why it was wrong:** The filtering callback returned early when `category !== "all"`, bypassing the search filter entirely. Additionally, `product.title.includes(search)` failed for case mismatches.
   - **How I fixed it:** In `src/app/page.tsx`, updated the filter condition so both criteria must match: `(category === "all" || product.category === category) && (product.title.toLowerCase().includes(query) || product.description.toLowerCase().includes(query))`. Memoized the calculation with `useMemo`.

4. **Unstable Array Index Keys in `ProductGrid`**
   - **What was wrong:** `ProductGrid.tsx` rendered list items using `key={index}`.
   - **Why it was wrong:** Using array index as a React key causes incorrect DOM reconciliation and breaks Framer Motion's layout/exit animations when items are filtered or reordered.
   - **How I fixed it:** Changed `key={index}` to the stable and unique identifier `key={product.id}` on the `motion.div` wrapper.

5. **Direct Timestamp Invocation Causing Hydration / Re-render Issues**
   - **What was wrong:** `new Date().toLocaleTimeString()` was invoked directly during JSX render in `src/app/page.tsx`.
   - **Why it was wrong:** Calling time methods directly during render can produce Next.js hydration mismatches between SSR and client, as well as changing the displayed timestamp on every arbitrary re-render.
   - **How I fixed it:** Stored `lastUpdated` timestamp in component state, updating it only once via `useEffect` after products successfully finish loading.

6. **Premature "No products match" Flash During Initial Load**
   - **What was wrong:** `ProductGrid` briefly showed "No products match your filters." before products finished fetching.
   - **Why it was wrong:** The `products` array starts empty (`[]`) while `loading` is true.
   - **How I fixed it:** Passed `loading` to `ProductGrid` and guarded the empty state message with `!loading && products.length === 0`.

## Features I completed

- **Error State UI (`src/components/error-alert.tsx`, `src/app/page.tsx`):**
  - Created a dedicated `ErrorAlert` component with proper accessibility role (`role="alert"`).
  - Wired up error rendering in `HomePage` whenever `error` from `useProducts` is populated.
- **Animated Product Modal (`src/components/ProductModal.tsx`):**
  - Wrapped modal in Framer Motion's `AnimatePresence`.
  - Added smooth fade transition on the backdrop (`opacity: 0 -> 1 -> 0`) and scale/slide-up transition on the modal container (`opacity`, `scale: 0.95 -> 1`, `y: 16 -> 0`) on open and close.
- **Skeleton Shimmer Loading Grid (`src/components/ProductGrid.tsx`):**
  - Added an animated 6-card pulsing skeleton grid matching the responsive layout during initial product fetch to provide smooth loading feedback without jarring content shifts.

## Decisions

- **Modal Animation Strategy:** Implemented `AnimatePresence` inside `ProductModal` around `product && (...)`, allowing the parent to control `selected` state without needing additional conditional guards or wrapper logic.
- **Modular Error Component:** Kept `ErrorAlert` isolated in its own component file to ensure modularity, styling consistency, and ease of unit testing.
- **Modal Layout Shift Prevention:** Assigned a fixed height container (`h-48 w-full`) around the product image in `ProductModal` matching `max-h-48` to prevent layout shifts / height jumps while image assets load.
- **Custom Responsive Dropdown:** Built a fully responsive, accessible dropdown in `Filters.tsx` to replace the native `<select>`, preventing OS menu popups from overflowing narrow viewports and providing consistent cross-platform styling.
- **Memoized Filtering:** Used `useMemo` for calculating `categories` and `visibleProducts` to avoid re-filtering operations on unrelated parent renders.

## With more time

- **Modal Accessibility & Focus Trap:** Add `Escape` key listener, focus trapping (`Tab` cycling), and background scroll lock to allow full keyboard accessibility in the modal.
- **Search Debounce:** Add a debounce hook to the search input to avoid recalculating filters on every keystroke in large product catalogs.
- **Pagination & Infinite Scroll:** Support cursor/page-based pagination or virtualized list scrolling for large catalog datasets.
- **Next.js Image Optimization:** Configure `next/image` with remote domains to serve optimized WebP/AVIF formats with responsive srcsets.
- **Automated Tests:** Add component and hook unit tests using Vitest and React Testing Library to test filtering, data-fetching, and error scenarios.
