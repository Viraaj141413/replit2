# AI App Builder - Replit Clone

## Overview

This is a full-stack web application that replicates Replit's functionality, allowing users to create, edit, and deploy applications through an AI-powered interface. The system combines a React frontend with an Express backend, featuring real-time code generation, project management, and live preview capabilities.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for fast development
- **UI Library**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design system
- **State Management**: React hooks with TanStack Query for server state
- **Routing**: React Router for client-side navigation
- **Code Editor**: Custom implementation with syntax highlighting

### Backend Architecture
- **Runtime**: Node.js with Express server
- **Language**: TypeScript with ESM modules
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Replit Auth integration (optional for development)
- **AI Integration**: Anthropic Claude API for code generation
- **File Serving**: Express static file server for live previews

### Development Tools
- **Build System**: Vite for frontend, esbuild for backend
- **Type Checking**: TypeScript with strict configuration
- **CSS Processing**: PostCSS with Tailwind and Autoprefixer
- **Database Migrations**: Drizzle Kit for schema management

## Key Components

### 1. Landing Page (`/`)
- Project creation interface with AI prompt input
- Recent projects display with metadata
- Template selection and quick start options
- Clean, modern design with gradient backgrounds

### 2. IDE Interface (`/ide`)
- Three-panel layout: file explorer, code editor, preview/chat
- Real-time AI chat interface for code modifications
- Live file tree with folder expansion/collapse
- Integrated console for application output
- Preview pane for web applications

### 3. Chat Interface
- Streaming AI responses with typing animations
- Context-aware code generation based on project type
- File generation with syntax highlighting
- Progress tracking for complex operations
- Message history and conversation management

### 4. File System Management
- Virtual file system with in-memory storage
- Support for multiple file types (HTML, CSS, JS, TS, Python, etc.)
- File icons and syntax highlighting
- Create, edit, delete operations
- Folder structure management

### 5. Project Management
- Save/load projects to/from database
- Project metadata (name, description, language, framework)
- User-specific project isolation
- Export functionality for downloading projects

## Data Flow

### 1. Project Creation Flow
```
User Input → AI Analysis → Project Type Detection → File Generation → Project Storage
```

### 2. AI Chat Flow
```
User Message → Context Analysis → AI API Call → Code Generation → File Updates → UI Refresh
```

### 3. File Operations Flow
```
User Action → File System Update → Editor Refresh → Preview Update → Auto-save
```

### 4. Authentication Flow (Optional)
```
Login Request → Replit OAuth → Session Storage → User Context → Protected Routes
```

## External Dependencies

### Core Dependencies
- **React Ecosystem**: react, react-dom, react-router-dom
- **UI Components**: @radix-ui/* packages for accessible components
- **Styling**: tailwindcss, class-variance-authority, clsx
- **State Management**: @tanstack/react-query
- **Icons**: lucide-react
- **Form Handling**: react-hook-form, @hookform/resolvers

### Backend Dependencies
- **Server**: express with TypeScript support
- **Database**: @neondatabase/serverless, drizzle-orm
- **AI Integration**: @anthropic-ai/sdk
- **Authentication**: passport, express-session
- **Utilities**: memoizee, date-fns, nanoid

### Development Dependencies
- **Build Tools**: vite, esbuild, tsx
- **TypeScript**: typescript with strict configuration
- **Database Tools**: drizzle-kit for migrations
- **Replit Integration**: @replit/vite-plugin-* packages

## GitHub Integration & Deployment

### Deploying from GitHub to Replit

This project is fully configured for seamless GitHub → Replit deployment:

#### Quick Deploy
[![Deploy to Replit](https://replit.com/badge/github/your-username/your-repo)](https://replit.com/new/github/your-username/your-repo)

#### Manual Import Steps
1. Go to [replit.com/new](https://replit.com/new)
2. Click "Import from GitHub"  
3. Enter repository URL
4. Click "Run" - everything auto-configures!

#### Auto-Configuration Features
- ✅ **Environment Setup**: Node.js 20 + PostgreSQL 16
- ✅ **Dependencies**: Auto-install via `.replit` workflow
- ✅ **Database**: Auto-migration on startup
- ✅ **Build System**: Vite + esbuild configuration
- ✅ **Hot Reload**: Development with HMR
- ✅ **Production**: One-click deployment

#### Required Files for GitHub Import
- `.replit` - Main configuration
- `package.json` - Dependencies and scripts  
- `vite.config.ts` - Frontend build config
- `drizzle.config.ts` - Database config
- `tsconfig.json` - TypeScript config

See `REPLIT_DEPLOYMENT.md` for detailed deployment guide.

## Deployment Strategy

### Development Environment
- **Command**: `npm run dev`
- **Frontend**: Vite dev server with HMR
- **Backend**: tsx with file watching
- **Database**: PostgreSQL (local or Neon)
- **Port Configuration**: Frontend on 3000, backend integratedontend on 3000, backend integrated

### Production Build
- **Frontend Build**: `vite build` → static files in `dist/public`
- **Backend Build**: `esbuild` → bundled server in `dist/index.js`
- **Static Serving**: Express serves built frontend files
- **Database**: Production PostgreSQL connection

### Replit Deployment
- **Platform**: Replit Autoscale deployment
- **Build Command**: `npm run build`
- **Start Command**: `npm run start`
- **Environment**: Node.js 20 with PostgreSQL 16
- **Port Mapping**: Internal 3000 → External 80

### Environment Variables
- `DATABASE_URL`: PostgreSQL connection string
- `SESSION_SECRET`: Session encryption key
- `ANTHROPIC_API_KEY`: AI service API key (optional)
- `REPL_ID`: Replit environment identifier
- `NODE_ENV`: Environment flag (development/production)

## Changelog

```
Changelog:
- June 23, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```