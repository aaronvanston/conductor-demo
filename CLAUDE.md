# CLAUDE.md

This file provides guidance for Claude Code when working with this repository.

## Project Overview

This is a Conductor demo monorepo built with Turborepo, showcasing workspace management features. It contains three Next.js applications with different typographic styles and shared UI components.

## Architecture

### Apps

- **crux** - Sans-serif app using Geist font
- **carina** - Serif app using Source Serif 4 font
- **hydrus** - Monospace app using Geist Mono font

Each app displays its name centered on screen with a light/dark theme toggle in the top-right corner.

### Packages

- **@repo/ui** - Shared UI components (ThemeProvider, ThemeToggle, WorkingBranchIndicator, Button, theme.css)

## Key Files

- `conductor.json` - Conductor workspace configuration
- `scripts/conductor-setup.sh` - Workspace setup script (env copying, dependency install)
- `scripts/conductor-run.sh` - Development server script with workspace name export
- `packages/ui/src/theme.css` - CSS variables for light/dark theming (oklch color space)
- `packages/ui/src/theme-toggle.tsx` - Sun/moon toggle component
- `packages/ui/src/working-branch-indicator.tsx` - Branch name indicator for dev/preview

## Common Commands

```bash
# Install dependencies
bun install

# Run all apps in development
bun dev

# Run specific app
bun turbo dev --filter=crux
bun turbo dev --filter=carina
bun turbo dev --filter=hydrus

# Build all apps
bun build

# Lint
bun lint
```

## Development Notes

### Theming

- Uses `next-themes` for theme management
- CSS variables defined in `packages/ui/src/theme.css`
- Colors use oklch color space for perceptual uniformity
- Theme is applied via `class` attribute on `<html>` element

### Fonts

- Fonts are loaded via `next/font/google`
- Each app has its own font configuration in `layout.tsx`
- Font CSS variables are set per-app to allow different font families

### Working Branch Indicator

- Shows in development mode and Vercel preview deployments
- Reads from multiple environment variables: `NEXT_PUBLIC_WORKSPACE_NAME`, `NEXT_PUBLIC_GIT_BRANCH`, etc.
- Can be dismissed (persisted in localStorage)

## Conductor Integration

The repo is configured for Conductor with setup and run scripts. When used with Conductor:
1. Setup script copies env files and installs deps
2. Run script exports `NEXT_PUBLIC_WORKSPACE_NAME` from git branch name
3. Working branch indicator displays the workspace name
