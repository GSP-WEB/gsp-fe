# fosp-fe

A Next.js frontend application for FOSP dashboard!

## Overview

This repository contains a React + Next.js app using the App Router. It is structured around dashboard and scorecard pages under `src/app`, with shared UI components in `src/components`.

## Key technologies

- Next.js 14
- React 18
- TypeScript
- Sass (`.scss` modules)
- Recharts
- @tanstack/react-query

## Getting Started

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

### Build for production

```bash
npm run build
```

### Start production server

```bash
npm run start
```

## Project structure

- `src/app` - route and page definitions
- `src/components` - reusable UI components
- `src/mock-data` - mock data used by app components
- `src/styles` - global and shared Sass styles

## Notes

- The app is configured with the default `next.config.js`.
- Pages use the Next.js App Router conventions.

## License

This project is private.
