# Conductor Demo

A demonstration monorepo showcasing [Conductor](https://conductor.build) workspace management with Turborepo.

## Apps

This monorepo contains three Next.js applications, each showcasing a different typographic style:

| App | Font | Port |
|-----|------|------|
| **Crux** | Geist Sans | 3000 |
| **Carina** | Source Serif 4 | 3001 |
| **Hydrus** | Geist Mono | 3002 |

Each app features:
- Light/dark theme toggle
- Working branch indicator (visible in development/preview)
- Centered app name display

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) v1.2+
- [Conductor](https://conductor.build) (optional, for workspace management)

### Development

```bash
# Install dependencies
bun install

# Run all apps
bun dev

# Run a specific app
bun turbo dev --filter=crux
bun turbo dev --filter=carina
bun turbo dev --filter=hydrus
```

## Conductor Integration

This repo is configured for use with Conductor. The `conductor.json` file defines setup and run scripts for workspace management.

### Scripts

- **Setup** (`scripts/conductor-setup.sh`): Copies environment files and installs dependencies
- **Run** (`scripts/conductor-run.sh`): Starts the dev server with workspace name exported for the branch indicator

### Using with Conductor

1. Add this repository to Conductor
2. Create a workspace - Conductor will run the setup script automatically
3. Start development - Conductor will run the run script

## Project Structure

```
├── apps/
│   ├── crux/        # Sans-serif app (Geist)
│   ├── carina/      # Serif app (Source Serif 4)
│   └── hydrus/      # Monospace app (Geist Mono)
├── packages/
│   ├── ui/          # Shared UI components
│   ├── eslint-config/
│   └── typescript-config/
├── scripts/
│   ├── conductor-setup.sh
│   └── conductor-run.sh
└── conductor.json
```

## Packages

### @repo/ui

Shared UI components including:
- `ThemeProvider` - next-themes wrapper for light/dark mode
- `ThemeToggle` - Sun/moon toggle button
- `WorkingBranchIndicator` - Shows current branch/workspace name
- `Button` - Styled button component
- `theme.css` - CSS variables for theming

## Learn More

- [Conductor Documentation](https://docs.conductor.build)
- [Turborepo Documentation](https://turborepo.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
