# Firebase Setup Guide for RaceTable

**Manual Step Required** — Firebase project creation requires OAuth login at console.firebase.google.com, which subagents cannot perform.

---

## Step 1: Create Firebase Project

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Click **"Add project"**
3. Name it: **RaceTable**
4. Disable Google Analytics (optional, not needed for this app)
5. Click **Create project** — wait for provisioning (~30 seconds)

---

## Step 2: Add iOS App

1. In the Firebase console, click the **iOS** icon (or go to Project Settings → Your apps → Add app)
2. Enter:
   - **Bundle ID**: `com.racetable.app`
   - **App nickname**: `RaceTable iOS`
3. Click **Register app**
4. **Download** `GoogleService-Info.plist` — save this file
5. Place `GoogleService-Info.plist` in `~/RaceTable/ios/` folder (same level as Info.plist)
6. Click **Next** through the remaining steps (skip the Podfile step — we use npm, not CocoaPods)

---

## Step 3: Enable Authentication

1. In left sidebar: **Authentication** → **Get started**
2. Click **Email/Password** → toggle **Enable** → Save
3. Click **Google** → toggle **Enable** → Save
   - For Google sign-in, you'll need to configure the OAuth consent screen (Google handles most of this automatically)

---

## Step 4: Create Firestore Database

1. In left sidebar: **Firestore Database** → **Create database**
2. Choose **Start in test mode** (we'll add security rules later)
3. Select a region close to your users (e.g., `us-west2`)
4. Click **Create**

---

## Step 5: Add OpenClaw Integration (Optional)

If you want Clawdia (the AI assistant) to read/write Firestore data on your behalf:

1. Go to **Project Settings** → **Users and permissions**
2. Click **Add member**
3. Enter: `openclaw@alex-frederick.cloud`
4. Role: **Editor** (or **Owner** for full access)
5. Click **Add**

---

## Step 6: Update Firebase Config

Once you have the config values, update `src/firebase/config.ts`:

From `GoogleService-Info.plist`, extract these values:

| Plist Key | Config Key |
|-----------|-----------|
| `API_KEY` | `apiKey` |
| `AUTH_DOMAIN` | `authDomain` |
| `PROJECT_ID` | `projectId` |
| `STORAGE_BUCKET` | `storageBucket` |
| `GCM_SENDER_ID` | `messagingSenderId` |
| `APP_ID` | `appId` |

Replace the `TODO_FILL_IN` placeholders in `src/firebase/config.ts`.

---

## Step 7: Add GoogleService-Info.plist to Xcode

The file is already in `ios/` but you need to add it to your Xcode project:

1. Open `~/RaceTable/ios/RaceTable.xcworkspace` in Xcode
2. Right-click on **RaceTable** in the project navigator (left panel)
3. Click **Add files to "RaceTable"**
4. Select `GoogleService-Info.plist` — check **"Copy items if needed"** and **"Create groups"**
5. Make sure it's added to the **RaceTable** target (check the right panel under "Target Membership")

---

## Verify It Works

After setup, the app should:
- Show a login screen when launched
- Allow email/password and Google sign-in
- Save your supplement inventory to Firestore

---

## Troubleshooting

### "App not configured" error
- Make sure `GoogleService-Info.plist` is in `ios/` AND added to Xcode project
- Check the bundle ID matches exactly: `com.racetable.app`

### Google sign-in not working
- In Firebase Console → Authentication → Google → check that the Web SDK configuration exists
- The OAuth consent screen may need to be published (can use "testing" mode with specific test users)

### Firestore permissions denied
- Check that you're in **test mode** or have proper security rules
- Default test mode allows read/write to anyone — tighten rules before production
