# Contributing to RaceTable

## Development Setup

1. Clone the repo
2. Run `npm install`
3. Run `cd ios && pod install && cd ..`
4. Run `npm run ios`

## Code Style

- ESLint + Prettier (pre-configured)
- 2-space indentation
- TypeScript strict mode

## Branch Strategy

- `main` — production-ready code
- `develop` — integration branch
- Feature branches: `feature/[name]`

## Pull Requests

1. Fork and create a feature branch
2. Make changes
3. Submit PR against `develop`
4. CI must pass before merge
