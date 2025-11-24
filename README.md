# Mental Health Journal (React/Vite Local Development)

This document outlines the setup and structure for the Mental Health Journal application. This is a single-file React component utilizing **Local Storage** for data persistence. This version operates **without** a dedicated backend, authentication, or cloud database.

---

## Prerequisites and Quick Start

### Dependencies

To run this project, ensure you have the following installed:

- **Runtime:** Node.js (Version **18+** required, **20+** recommended)  
- **Package Manager:** npm (or yarn/pnpm)

**Project Dependencies** (installed by `npm install`):
- `react`, `react-dom` — Core libraries
- `tailwindcss`, `postcss`, `autoprefixer` — Styling and build pipeline
- `vite`, `@vitejs/plugin-react` — Development and build tools

### Setup Instructions

Follow these steps to initialize and run the application locally:

1) **Install dependencies**
```bash
npm install
```

2) **Start the development server**
```bash
npm run dev
```

3) **Access**
Open the printed local address (e.g., `http://localhost:5173`) in your browser to begin.

---

## Technical Stack Overview

| Category          | Technology      | Purpose                                                |
|-------------------|-----------------|--------------------------------------------------------|
| Runtime           | Node 18+        | Execution environment for the development server       |
| Framework         | React + Vite    | Component-based UI with fast HMR and bundling          |
| Styling           | Tailwind CSS    | Utility-first framework for responsive styling         |
| Data Persistence  | Local Storage   | Browser-based storage for local development/testing    |

---

## Project Structure and Key Files

The entire application logic, including local data management, is contained within a single main file for simplified review and maintenance.

```
mental-journal-react-vite-nofirebase/
├─ package.json
├─ tailwind.config.js
└─ src/
   ├─ main.jsx
   ├─ index.css
   └─ App.jsx   # Contains all UI components, logic, and the local data layer
```

---

## Data Model and Storage

All application state is managed locally in the browser via the **localStorage** API.

**Storage Keys**
- Entries are stored under: `journal_store_v1`

**Data Object (Journal)**
- `id` *(string)* — Unique identifier  
- `title` *(string)* — Optional entry title  
- `content` *(string)* — Required journal text  
- `createdAt` *(string)* — ISO timestamp for creation time  
- `updatedAt` *(string, optional)* — ISO timestamp updated upon edit  

**Data Flow and Features**
- **Retrieval:** Data is loaded from `localStorage` on component mount and parsed from JSON  
- **Sorting:** Entries are sorted newest-first based on the `createdAt` timestamp  
- **Synchronization:** A `storage` event listener keeps multiple tabs/windows in sync  

---

## Data Troubleshooting

To manually clear all stored journal entries during development:

1. Open your browser’s **DevTools**  
2. Navigate to **Application** → **Local Storage**  
3. Remove keys beginning with `journal_` (e.g., `journal_store_v1`)

---
