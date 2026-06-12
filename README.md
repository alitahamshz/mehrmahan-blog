# Blog Application

A modern and SEO-friendly blog application built with Next.js 16, TypeScript, and Tailwind CSS.

## Features

- Next.js 16 App Router
- TypeScript
- Tailwind CSS
- Responsive Design
- Dynamic Pagination
- Category Filtering
- Search Functionality
- SEO Optimized
- Dynamic Metadata
- Open Graph Support
- Structured Data (JSON-LD)
- Dynamic Sitemap
- Robots Configuration
- Server Components
- Feature-Based Architecture

## Tech Stack

- Next.js 16
- React
- TypeScript
- Tailwind CSS

## Getting Started

### Clone the repository

```bash
git clone <repository-url>
cd project-name
```

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_URL=https://your-api-url.com
```

### Run development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

### Build for production

```bash
npm run build
```

### Start production server

```bash
npm start
```

## Project Structure

```text
src
├── app
├── features
│   └── blog
│       ├── components
│       ├── services
│       ├── types
│       └── utils
├── shared
│   ├── components
│   ├── constants
│   ├── hooks
│   ├── lib
│   └── types
└── styles
```

## Architecture

The project follows a feature-based architecture to improve scalability,
maintainability, and separation of concerns.

## SEO

This project includes:

- Dynamic Metadata
- Canonical URLs
- Open Graph Metadata
- JSON-LD Structured Data
- Dynamic Sitemap
- Robots.txt
- Search Page NoIndex

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## License

MIT
