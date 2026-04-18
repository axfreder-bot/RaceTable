# TestFlight Setup Guide

## Prerequisites
- Apple Developer Account ($99/year)
- Xcode with valid signing certificates
- Bundle ID: `com.racetable.app`

## Step 1: Create App Store Connect Entry
1. Go to appstoreconnect.apple.com
2. Click "My Apps" → "+" → "New App"
3. Select iOS, enter:
   - Platforms: iOS
   - Name: RaceTable
   - Primary Language: English
   - Bundle ID: com.racetable.app

## Step 2: Configure App Information
- App Privacy (required since Jan 2021)
- Content Rights
- Age Rating (set to 4+)

## Step 3: Build and Upload
```bash
cd ~/RaceTable/ios
xcodebuild -workspace RaceTable.xcworkspace \
  -scheme RaceTable \
  -configuration Release \
  -destination 'generic/platform=iOS' \
  CODE_SIGN_STYLE=Manual \
  CODE_SIGN_IDENTITY="Apple Distribution" \
  PROVISIONING_PROFILE_SPECIFIER="RaceTable AppStore" \
  PRODUCT_BUNDLE_IDENTIFIER=com.racetable.app \
  archive
```

## Step 4: Upload via Transporter
Download Transporter from Mac App Store, upload the .ipa file.

## Step 5: TestFlight Testing
- Add internal testers (up to 100)
- Add external testers (up to 10,000, requires beta review)
- Share TestFlight link

## CI/CD
GitHub Actions workflow at `.github/workflows/ios-ci.yml` builds the app on every push to main/develop and on PRs.
