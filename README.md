# Letshang - Event Creation Platform

A modern, responsive event creation platform built with React, TypeScript, and Tailwind CSS. Create beautiful event pages with real-time preview, drag-and-drop modules, and seamless customization.

## Features

- **Two-Column Layout**: Live preview card on the left, form controls on the right for instant visual feedback
- **Drag & Drop Modules**: Reorder event components (RSVP, Polls, Gallery, Co-hosts, Text Blocks)
- **Real-time Preview**: See changes instantly as you fill out the form
- **Auto-Save**: Automatic saving every 30 seconds with visual indicators
- **Media Uploads**: Support for event flyers and custom backgrounds
- **Progress Tracking**: Visual stepper showing completion status
- **Mobile Responsive**: Optimized for all screen sizes

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Component library
- **Recoil** - State management
- **@hello-pangea/dnd** - Drag and drop
- **React Hook Form** - Form handling
- **Zod** - Schema validation

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or bun

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd letshang

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── create-event/     # Event creation components
│   │   ├── EventForm.tsx
│   │   ├── EventPreviewCard.tsx
│   │   ├── ModuleList.tsx
│   │   └── ...
│   └── ui/               # Reusable UI components (shadcn)
├── hooks/
│   ├── useAutoSave.ts    # Auto-save functionality
│   └── use-mobile.tsx    # Mobile detection
├── pages/
│   ├── CreateEvent.tsx   # Main event creation page
│   └── Index.tsx         # Landing page
├── state/
│   ├── eventState.ts     # Recoil atoms & selectors
│   └── mockApi.ts        # Mock API for development
└── lib/
    └── utils.ts          # Utility functions
```

## Key Architecture Decisions

- **Recoil State Management**: Granular atoms for event details, modules, and UI state with selectors for derived data
- **Mock API Pattern**: Simulated async operations that can be swapped for real backend with minimal changes
- **CSS Custom Properties**: Theming via CSS variables for easy customization
- **Modular Components**: Backend-configurable module system for extensibility

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Documentation

See the [docs/](./docs) folder for additional documentation:
- [Presentation Script](./docs/presentation-script.md) - Detailed walkthrough and evaluation

## License

MIT
