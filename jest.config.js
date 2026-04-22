module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(@react-navigation|react-native|@react-native|@react-native-firebase|react-native-vector-icons)/)',
  ],
  moduleNameMapper: {
    '@react-native-firebase/app': '<rootDir>/__mocks__/@react-native-firebase/app.ts',
    '@react-native-firebase/auth': '<rootDir>/__mocks__/@react-native-firebase/auth.ts',
    '@react-native-firebase/firestore': '<rootDir>/__mocks__/@react-native-firebase/firestore.ts',
  },
};
