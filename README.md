
# Mental Journal (React + Vite + Tailwind) — Local Only

This version removes **all Firebase**. No auth, no cloud storage.  
Journal data is saved locally in your browser's `localStorage`.

## Run locally
```bash
npm i
npm run dev
# open the printed http://localhost:5173
```

## Notes
- Fake login: the button simply enters the app (no backend).
- Data path: `localStorage["journal_store_v1"]`.
- You can later add real auth/storage; the UI components are isolated.
