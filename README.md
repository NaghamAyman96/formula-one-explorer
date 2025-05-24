# 🏁 Formula One Explorer

A modern, responsive React + TypeScript application to explore Formula 1 seasons, races, and results. Built by **Nagham Ayman** as part of a take-home assignment.

## 🔧 Tech Stack
- React 18 + TypeScript
- Vite for fast builds
- React Router v6 for routing
- Redux Toolkit for state management
- Material UI for UI components
- Recharts for data visualization
- Jest + React Testing Library for unit tests

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/NaghamAyman96/formula-one-explorer.git
cd formula-one-explorer
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the development server
```bash
npm run dev
```
Visit [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📁 Project Structure
```
src/
├── App.tsx
├── pages/
│   ├── SeasonList.tsx
│   ├── RaceList.tsx
│   ├── RaceDetails.tsx
│   ├── SeasonList.test.tsx
│   ├── RaceList.test.tsx
│   └── RaceDetails.test.tsx
├── services/
│   └── ergastApi.ts
├── store/
│   ├── index.ts
│   └── pinnedSlice.ts
├── setupTests.ts
├── main.tsx
```

---

## 🧪 Running Tests

### 1. Run all tests
```bash
npm test
```

### 2. Included test coverage:
- ✅ `RaceDetails.test.tsx`: Verifies table rendering + Recharts chart display.
- ✅ `RaceList.test.tsx`: Ensures races render, pinning works.
- ✅ `SeasonList.test.tsx`: Validates season listing + pagination.

> Note: ResizeObserver and TextEncoder are polyfilled in `setupTests.ts`.

---

## 📊 Features
- Browse all available F1 seasons
- View detailed race results and driver standings
- Pin races for easier access (stored in Redux)
- Interactive bar chart for driver points per race
- Fully responsive layout with Material UI

---

## ✨ Developed By
**Nagham Ayman**

For questions or feedback, feel free to reach out!
