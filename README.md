# SageCoin

A full-stack application built with Next.js (App Router), TypeScript, Tailwind CSS, and NestJS.

## Project Structure

```
SageCoin/
├── client/          # Next.js TypeScript frontend with Tailwind CSS
└── server/          # NestJS backend
```

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Installation

### Install all dependencies

```bash
npm run install:all
```

Or install manually:

```bash
# Install root dependencies
npm install

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

## Development

### Run both client and server

You'll need to run the client and server in separate terminals:

**Terminal 1 - Server:**
```bash
npm run dev:server
# or
cd server && npm run start:dev
```

The server will run on `http://localhost:3000`

**Terminal 2 - Client:**
```bash
npm run dev:client
# or
cd client && npm run dev
```

The client will run on `http://localhost:3001` (configured to avoid port conflict with server)

## Build

### Build both applications

```bash
npm run build:all
```

### Build individually

```bash
# Build server
npm run build:server

# Build client
npm run build:client
```

## Production

### Server
```bash
cd server
npm run build
npm run start:prod
```

### Client
```bash
cd client
npm run build
npm run start
```

## Features

- ✅ Next.js 14 with App Router
- ✅ React 18 with TypeScript
- ✅ Tailwind CSS with custom brand colors
- ✅ NestJS with TypeScript
- ✅ CORS enabled for client-server communication
- ✅ Responsive design with mobile navigation
- ✅ Accessibility features (focus rings, semantic HTML)
- ✅ ESLint and Prettier configured

## Design System

The application uses a custom color palette:
- **Brand Navy** (#0F172A) - Primary background
- **Brand Slate** (#334B5C) - Secondary accents and borders
- **Brand Gold** (#C0A062) - Primary action color
- **Text Colors** - White for headings, Light Gray for body text

## API Endpoints

- `GET /` - Hello message
- `GET /api/health` - Health check endpoint

