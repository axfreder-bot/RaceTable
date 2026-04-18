# RaceTable

A daily nutrition companion app for marathon trainers who eat out frequently.
Built with React Native 0.74.x + TypeScript.

## App Overview

RaceTable helps marathon trainers manage their nutrition on the go. Whether you're traveling for work or just eating out often, RaceTable gives you personalized meal recommendations based on your training load, goals, and dietary preferences. Start each day with a quick morning check-in, get a full nutrition plan tailored to your training, and lookup restaurant dishes with training fit scores so you can make smart choices even when you're eating out.

## Features

- **Morning Check-in**: Log your planned workout and how you're feeling to get a personalized nutrition recommendation for the day
- **Full Day Nutrition Plan**: Get macronutrient targets (carbs, protein, fat) and meal timing recommendations based on your training schedule
- **Restaurant Dish Lookup**: Look up common restaurant dishes and see how they fit your training goals with a training fit score (1-5 paws 🐾)
- **Supplement Timing Recommendations**: Know exactly when to take your supplements (caffeine, electrolytes, beta-alanine, etc.) for maximum benefit
- **Race Countdown + Training Plan**: See days until your next race and follow a structured training plan with nutrition windows built in

## Tech Stack

- React Native 0.74.x
- TypeScript
- React Navigation 6
- Hermes engine

## Screenshots

(TODO: add screenshots later)

## Getting Started

```bash
git clone https://github.com/axfreder-bot/RaceTable.git
cd RaceTable
npm install
cd ios && pod install && cd ..
npm run ios
```

## Architecture

```
src/
├── components/     # Reusable UI components (MealCard, FitScoreBadge, etc.)
├── data/           # Seed data: dishes, restaurants, supplements
├── hooks/          # Custom hooks (useNutrition, useRaceCountdown, etc.)
├── navigation/     # React Navigation setup and route types
├── screens/         # Main app screens (Home, RestaurantLookup, etc.)
├── theme/          # Colors, typography, spacing constants
├── types/          # TypeScript interfaces for data models
└── utils/          # Helper functions (nutrition math, date utils)
```

Data flows from seed data through hooks into screens. Navigation is handled by React Navigation 6 with a bottom tab structure. Local seed data is used first to keep the app functional offline; Firebase is planned for future sync and cloud storage.

## License

MIT
