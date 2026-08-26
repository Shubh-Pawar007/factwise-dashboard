# People Dashboard — AG Grid React

A modern employee analytics dashboard built with **React** and **AG Grid** (client-side rendering).

## Features

- **AG Grid Integration** — Full-featured data grid with sorting, filtering, pagination, and CSV export
- **Custom Cell Renderers** — Avatar initials, department badges, rating bars, status indicators, and skill tags
- **Quick Search** — Global text search across all columns
- **Department Filtering** — Filter employees by department with a single click
- **Floating Filters** — Per-column inline filters for precise data querying
- **Responsive Design** — Works seamlessly across desktop and tablet viewports
- **Dark Theme** — Premium dark UI with glassmorphism and subtle animations

## Tech Stack

- React 18
- AG Grid Community v36
- Vite 5
- Vanilla CSS (no external UI library)

## Getting Started

```bash
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

## Project Structure

```
src/
├── components/
│   ├── EmployeeGrid.jsx   # AG Grid with custom renderers
│   ├── EmployeeGrid.css   # Grid theme overrides
│   ├── StatsBar.jsx        # Summary stat cards
│   └── StatsBar.css
├── data/
│   └── employees.js        # Employee dataset (20 records)
├── utils/
│   └── formatters.js       # Currency, date, color utilities
├── App.jsx
├── App.css
├── index.css               # Global reset & dark theme
└── main.jsx
```

## Build for Production

```bash
npm run build
npm run preview
```
