import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.greentechcycle.app',
  appName: 'GreenTechCycle',
  webDir: 'out',
  server: {
    androidScheme: 'https'
  }
};

export default config;
