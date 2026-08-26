# 📊 Factwise People Dashboard

A premium, highly interactive Employee Analytics and Management Dashboard built with a focus on cutting-edge aesthetics, liquid animations, and blazing-fast performance.

## ✨ Features

- **Liquid Parallax Background**: Immersive, glowing orbs dynamically follow your cursor for a 3D magnetic feel.
- **Frosted Glass Side-Drawer**: Click any employee to reveal a stunning glassmorphic profile panel complete with skill tags and custom animated performance bars.
- **Micro-Interactions**: Tactile button lifts, bounding animations, and satisfying visual feedback (e.g., the bouncy checkmark on the Export CSV button).
- **Advanced Grid Engine**: Powered by AG Grid, featuring quick search, floating column filters, customizable sorting, and CSV export.
- **Glassmorphic UI**: Extensive use of backdrop-blur, subtle gradients, and translucent borders for a highly premium, modern app feel.
- **Fully Responsive**: Optimized to look gorgeous and function perfectly across all device sizes.

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) for robust, type-safe architecture
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (The absolute latest styling engine)
- **Data Grid**: [AG Grid (Community Edition)](https://www.ag-grid.com/)

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Shubh-Pawar007/factwise-dashboard.git
   cd factwise-dashboard
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## 🏗️ Architecture
The codebase was recently refactored to adhere to enterprise React best practices:
- Strictly typed using dedicated interfaces (`src/types/index.ts`).
- Highly modularized cell renderers (`src/components/EmployeeGrid/renderers.tsx`) isolated from core logic.
- Pure Tailwind CSS utility classes eliminating legacy CSS file bloat.

---
*Crafted with precision for Factwise.*
