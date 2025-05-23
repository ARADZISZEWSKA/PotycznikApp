import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Potycznik',
  webDir: 'www',
  plugins: {
    BarcodeScannerPlugin: {
      mlkitBarcodeScannerVersion: "17.2.0" 
    }
  }
};

export default config;
