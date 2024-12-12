# Frontend - Real-Time Dashboard

## Overview
This is a Next.js-based frontend application for displaying real-time data with charts. The application uses **Socket.IO** for real-time updates, **Context API** for state management, and is styled using **ShadCN** components.

## Features
- Real-time updates with WebSocket (Socket.IO).
- Interactive bar and line charts.
- Timezone selection to adjust displayed data.
- Clean component-based architecture.

## Live Demo
- Backend URL: [https://zefanchart-793f33f5fbab.herokuapp.com/api/data]
- Frontend URL: [https://zefanchartfrontend.vercel.app]

---

## Steps to Run Locally
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.
