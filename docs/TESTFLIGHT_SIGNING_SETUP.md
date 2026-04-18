# RaceTable TestFlight — Signing Setup Guide

## The Blocker
Xcode can't sign the app without:
1. An Apple ID account added to Xcode (requires GUI auth)
2. A provisioning profile for `com.racetable.app`

These can't be done via command line — but here's the fastest path:

---

## Step 1: Add Apple ID to Xcode (5 min, one-time)
1. Open **Xcode** → **Settings** → **Accounts**
2. Click **+** → **Apple** → **Sign In**
3. Use your Apple ID (the one with the $99/year developer account)
4. Complete 2FA if prompted

This caches your credentials so xcodebuild can use them.

---

## Step 2: Create App Store Connect Entry (10 min)
1. Go to **appstoreconnect.apple.com**
2. Click **My Apps** → **+** → **New App**
3. Select **iOS** and fill in:
   - Name: **RaceTable**
   - Primary Language: **English**
   - Bundle ID: `com.racetable.app` (select "Register a new bundle ID" if prompted first)
   - SKU: `com.racetable.app`
4. Under **Pricing**, set it to Free or your preferred price
5. Under **App Privacy**, answer the questions (small app, no special data)
6. Under **iOS App**, create the App Store entry

This creates the app record in App Store Connect.

---

## Step 3: Create Provisioning Profile (5 min)
1. Go to **developer.apple.com** → **Certificates, Identifiers & Profiles**
2. Click **+** → **iOS App Development**
3. Select **com.racetable.app** as the bundle ID
4. Select your **Apple Development** certificate (or let it auto-select)
5. Add your **iPhone 16 Pro** as a test device (or any device you'll test on)
6. Name it: **RaceTable Dev Profile**
7. Download and double-click to install in Xcode

---

## Step 4: Build + Upload
After steps 1-3, this will work:

```bash
cd ~/RaceTable/ios
xcodebuild -workspace RaceTable.xcworkspace \
  -scheme RaceTable \
  -configuration Release \
  -destination 'generic/platform=iOS' \
  CODE_SIGN_STYLE=Automatic \
  DEVELOPMENT_TEAM=22SBGV5QX6 \
  PRODUCT_BUNDLE_IDENTIFIER=com.racetable.app \
  ENABLE_USER_SCRIPT_SANDBOXING=NO \
  archive
```

Then upload via **Transporter** app (Mac App Store).

---

## Why This Step Exists
React Native iOS apps require an Apple-signed binary for TestFlight. Unlike web apps, there's no绕过— the Apple ecosystem requires valid signing certificates and provisioning profiles for every device and for TestFlight distribution.

This setup is a one-time cost per app.
