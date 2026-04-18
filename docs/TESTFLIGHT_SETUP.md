# TestFlight Setup Guide

## Status (2026-04-18): BLOCKED - Needs Xcode Account Configuration

---

## What Works ✅
- Simulator build compiles successfully (Debug configuration)
- All code and dependencies are valid
- Xcode 26.4.1, iOS 26.4 SDK available

## What's Missing ❌
1. **Xcode Apple Developer account not configured** — "No Accounts" error
2. **No provisioning profile** for `com.racetable.app`
3. **No App Store Connect entry** created yet

---

## Step 1: Configure Xcode Account (MANUAL - Required First)

1. Open **Xcode → Preferences → Accounts**
2. Click **+** → Add Apple Developer account: `alex@frederick.com`
3. Sign in and complete any 2FA prompts
4. Once added, Xcode will be able to create provisioning profiles automatically

**This is the blocker.** Without this, no device/archive build is possible.

---

## Step 2: Create Provisioning Profile

After adding the account, Xcode can auto-generate the profile:

```bash
cd ~/RaceTable/ios
xcodebuild -workspace RaceTable.xcworkspace \
  -scheme RaceTable \
  -configuration Release \
  -destination 'generic/platform=iOS' \
  -derivedDataPath ~/tmp/racetable-archive \
  archive \
  DEVELOPMENT_TEAM=22SBGV5QX6 \
  -allowProvisioningUpdates
```

This will create the "RaceTable AppStore" provisioning profile automatically.

---

## Step 3: Create App Store Connect Entry (Manual)

Go to [appstoreconnect.apple.com](https://appstoreconnect.apple.com):
1. Click **My Apps** → **+** → **New App**
2. Select **iOS**, enter:
   - **Platforms:** iOS
   - **Name:** RaceTable
   - **Primary Language:** English
   - **Bundle ID:** `com.racetable.app` (ensure it matches exactly)
3. Fill in required metadata:
   - App Privacy policy
   - Age Rating (set to 4+)
   - Content Rights

---

## Step 4: Build + Upload IPA

### 4a. Archive Build
```bash
cd ~/RaceTable/ios
rm -rf ~/Library/Developer/Xcode/DerivedData/RaceTable-*
rm -rf ~/tmp/racetable-archive ~/tmp/racetable-ipa

xcodebuild -workspace RaceTable.xcworkspace \
  -scheme RaceTable \
  -configuration Release \
  -destination 'generic/platform=iOS' \
  -derivedDataPath ~/tmp/racetable-archive \
  archive \
  DEVELOPMENT_TEAM=22SBGV5QX6 \
  -allowProvisioningUpdates
```

### 4b. Export IPA
```bash
mkdir -p ~/tmp/racetable-ipa

xcodebuild -exportArchive \
  -archivePath ~/tmp/racetable-archive/Archive.xcarchive \
  -exportPath ~/tmp/racetable-ipa \
  -exportOptionsPlist /tmp/export_options.plist
```

Create `/tmp/export_options.plist`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>method</key>
    <string>app-store</string>
    <key>signingCertificate</key>
    <string>Apple Distribution: Alex Frederick</string>
    <key>signingStyle</key>
    <string>manual</string>
    <key>teamId</key>
    <string>22SBGV5QX6</string>
</dict>
</plist>
```

### 4c. Upload via Transporter
- Download **Transporter** from Mac App Store (free)
- Open Transporter, drag `~/tmp/racetable-ipa/RaceTable.ipa` to upload
- App Store Connect will process and make it available in TestFlight

---

## Certificate Notes

- **Current identity:** "Apple Development: Alex Frederick (22SBGV5QX6)" — this is a *development* cert, not for distribution
- **Apple Distribution certificate** will need to be created (either by Xcode auto-signing or manually at developer.apple.com) for TestFlight submission
- Xcode auto-signing with -allowProvisioningUpdates can handle this after account is added

---

## CI/CD

GitHub Actions workflow at `.github/workflows/ios-ci.yml` builds the app on every push to main/develop and on PRs. For CI to work properly, secrets need to be configured:
- `APPLE_API_KEY` — App Store Connect API key for upload
- `APPLE_API_ISSUER` — API key issuer ID
- `APPLE_API_KEY_ID` — API key ID

For now: manual upload via Transporter is the simplest path.
