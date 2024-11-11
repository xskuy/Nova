import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.tuapp.id',
  appName: 'Nova',
  webDir: 'www',
  server: {
    androidScheme: 'https',
    cleartext: true,
    allowNavigation: ['*']
  },
  ios: {
    contentInset: 'always',
    scrollEnabled: true,
    limitsNavigationsToAppBoundDomains: false,
    preferences: {
      allowsBackgroundWebSocket: true,
      allowsInlineMediaPlayback: true
    }
  },
  plugins: {
    FirebaseAuthentication: {
      skipNativeAuth: false,
      providers: ['apple.com', 'google.com']
    }
  }
};

export default config;
