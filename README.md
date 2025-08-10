# 📺 TV Series App (Jobsity / TVMaze) — Expo + React Native

**This repository implements a TV series listing app built for the Jobsity Android challenge using the [TVMaze API](https://www.tvmaze.com/api).**  
The app is an **Expo-managed React Native** project (Expo SDK ≈ 53) using TypeScript, Expo Router and Redux Toolkit (RTK Query).

---

## ✅ Features (implemented)

### Mandatory features (from the challenge)

- List TV shows using the API pagination (TVMaze `shows?page={n}`).
- Search shows by name (search view).
- Show list and search display at least: **name** and **poster image**.
- Series detail view with:
  - Name
  - Poster
  - Air days & time
  - Genres
  - Summary
  - Episodes list grouped by season
- Episode detail view with:
  - Name
  - Number
  - Season
  - Summary
  - Image (if available)

### Bonus features implemented

- 🔐 **PIN protection** (setup & unlock screens). See `src/app/(auth)/setup.tsx`, `src/app/(auth)/unlock.tsx` and `src/storage/index.ts`.
- 🧭 **Biometric (fingerprint) unlock** when supported. See `src/app/(auth)/unlock.tsx` (`expo-local-authentication`).
- ⭐ **Favorites**: add/remove shows and browse favorites in alphabetical order. See `src/hooks/useFavorites.ts` and `src/app/(tabs)/favorites.tsx`.
- 👤 **People search & person detail**. See `src/redux/services/search.ts` and `src/app/people/[id].tsx`.

---

## 🧰 Tech stack

- **Framework:** React Native (Expo Managed)
- **Expo SDK:** ~53 (see `package.json`)
- **Language:** TypeScript
- **Routing:** `expo-router`
- **State & Data fetching:** Redux Toolkit + **RTK Query**
- **HTTP client:** Axios (wrapped in a RTK Query `axiosBaseQuery`)
- **Styling:** NativeWind (Tailwind for React Native)
- **Local storage:** `@react-native-async-storage/async-storage` (favorites), `expo-secure-store` (PIN)
- **Biometric:** `expo-local-authentication`
- **Images:** `expo-image` (when available)
- **Icons:** `phosphor-react-native`
- **Animations:** `react-native-reanimated`
- **Testing:** Jest + `@testing-library/react-native`
- **Bundler:** Metro (via Expo)

---

## ⚙️ Prerequisites (local)

- Node.js **24.x** or newer (recommended).
- Yarn (recommended) or npm.
- Git.
- **Android Studio** + Android SDK if you want to run on emulator or build locally.
- Expo CLI available via `npx expo` or install `npm install -g expo-cli`.
- (Optional) `eas-cli` if you want to create standalone APKs via EAS Build.

---

## 📥 Quick start — run locally (development)

1. Clone repo:

```bash
git clone https://github.com/eccianime/test-jobsity.git
cd test-jobsity
```

2. Install dependencies:

```bash
# Using yarn
yarn

# Or npm
npm install
```

3. Environment variable (already provided)

- A `.env` file is included with:

```
EXPO_PUBLIC_API_URL=https://api.tvmaze.com/
```

`src/redux/services/*` uses `process.env.EXPO_PUBLIC_API_URL`. The included `.env` points to TVMaze — **you don't need to change it** unless you want a different endpoint. If you find the variable missing at runtime, set it in your shell before starting (example below).

4. Start Metro (Expo):

```bash
# Start the dev server
yarn start
# or
npm run start
```

5. Open the app:

- Scan the QR with **Expo Go** (Android/iOS) to run in Expo Go (recommended for quick testing).
- Or press `a` to open Android emulator (if configured): `npm run android` runs `expo start --android -c`.

**Note:** Because this is an Expo-managed project, running in **Expo Go** should work for most features. If you add native modules not supported by Expo Go, you’ll need to use a dev client or build a custom dev client.

---

## 📦 Building a release (APK / AAB)

There are two common approaches:

### Option A — Recommended: **EAS Build** (cloud)

1. Install `eas-cli`:

```bash
npm install -g eas-cli
```

2. Login and configure:

```bash
eas login
eas build:configure
```

3. Build:

```bash
# Android (APK or AAB)
eas build -p android --profile preview
# or for production
eas build -p android --profile production
```

4. Download the artifact once the build completes from the EAS build URL.

> EAS is recommended for modern Expo SDK projects and handles credentials and signing for you.

### Option B — Local / Bare build (advanced)

1. Convert to native projects:

```bash
expo prebuild
```

2. Open the generated Android project in **Android Studio** and build a signed APK/AAB.

> This is more involved and usually only needed if you must modify native code locally.

---

## 🧪 Running tests

Unit and component tests are present. Run:

```bash
yarn test
# or
npm run test
```

This runs Jest in watch mode and generates coverage.

---

## 🗂 Project structure (high-level)

```
/src
  /app                 # expo-router routes & screens (setup, unlock, tabs, show, episode, people, search)
  /components          # UI components
  /config              # axios helper
  /redux               # store and RTK Query services (shows, episodes, people, search)
  /hooks               # custom hooks (useFavorites, usePinInput, etc.)
  /storage             # secure storage utils (PIN)
  /types               # TypeScript types/schemas
  /assets              # images
```

---

## 🔧 Environment variables & config notes

- `.env` contains `EXPO_PUBLIC_API_URL=https://api.tvmaze.com/`.
- The code reads `process.env.EXPO_PUBLIC_API_URL` inside the RTK Query baseQuery. If you ever deploy or build and the variable is not present, set it in your environment or via EAS secrets/config (for production builds).

---

## ⚠️ Known caveats / tips

- Building a standalone APK requires either EAS Build or converting to a bare workflow and building with Android Studio.
- If biometric auth or secure storage behaves differently on some emulators, test on a real device when possible.
- The repository includes unit tests and snapshot tests — run them before releasing.

---

## 📂 Where to look in the code (quick links)

- PIN & unlock: `src/app/(auth)/setup.tsx`, `src/app/(auth)/unlock.tsx`, `src/storage/index.ts`
- Favorites: `src/hooks/useFavorites.ts`, `src/app/(tabs)/favorites.tsx`
- API services & RTK Query: `src/redux/services/*.ts`
- Entry / splash / routing: `src/app/index.tsx`, `app.json`
