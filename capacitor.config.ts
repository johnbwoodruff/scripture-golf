import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ionicframework.scripturegolf455436',
  appName: 'Scripture Golf',
  webDir: 'dist/scripture-golf/browser',
  server: {
    url: 'http://192.168.1.209:4200',
    cleartext: true
  }
};

export default config;
