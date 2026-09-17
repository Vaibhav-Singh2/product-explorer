# Product Explorer

A responsive product catalogue web application built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**, consuming product data from the public [FakeStore API](https://fakestoreapi.com/).

🔗 **Live Demo:** [https://product-explorer-demo-live.vercel.app](https://product-explorer-demo-live.vercel.app)

---

## ✨ Features

- **Product Grid:** Responsive multi-column layout (1 col mobile, 2 col tablet, 3 col desktop) with fluid card animations.
- **Search & Category Filtering:** Instant, case-insensitive title and description search combined with category filtering.
- **Interactive Product Modal:** Smooth enter/exit transition animations powered by Framer Motion.
- **Zero Layout Shift (CLS):** Pre-allocated dimensions for modal assets to ensure stable rendering.
- **Skeleton Shimmer Loaders:** Clean pulsing skeleton cards during initial catalogue load.
- **Error Handling:** Graceful error alert and fallbacks in case of network or API failures.
- **Fully Typed:** Strict TypeScript without `any` types.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Data Source:** [FakeStore API](https://fakestoreapi.com/)

---

## 🚀 Getting Started

### Prerequisites

- **Node.js:** `18.17+` or later
- **npm** (or yarn / pnpm)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Vaibhav-Singh2/product-explorer.git
   cd product-explorer
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the local development server at `localhost:3000` |
| `npm run build` | Builds the optimized production build |
| `npm run start` | Starts the production server |
| `npm run typecheck` | Validates TypeScript types (`tsc --noEmit`) |
| `npm run lint` | Runs Next.js ESLint checks |

---

## 📝 Assessment Notes

For full details on bugs identified and resolved, technical architectural decisions, and future roadmap items, please see [**`NOTES.md`**](./NOTES.md).

