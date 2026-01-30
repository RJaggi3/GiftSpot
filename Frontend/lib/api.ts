import axios from 'axios';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

function getDefaultDevHost(): string {
  // Expo dev server host, e.g. "192.168.1.10:8083"
  const hostUri =
    (Constants.expoConfig as any)?.hostUri ??
    (Constants as any)?.manifest2?.extra?.expoClient?.hostUri ??
    (Constants as any)?.manifest?.hostUri;

  if (typeof hostUri === 'string' && hostUri.length > 0) {
    const host = hostUri.split(':')[0];
    // Android emulator cannot reach your PC via "localhost"
    if (Platform.OS === 'android' && (host === 'localhost' || host === '127.0.0.1')) {
      return '10.0.2.2';
    }
    return host;
  }

  // Android emulator uses 10.0.2.2 to reach the host machine
  if (Platform.OS === 'android') return '10.0.2.2';

  return 'localhost';
}

// You can override this with an env var:
// EXPO_PUBLIC_API_URL=http://192.168.1.10:4000

export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ?? `http://${getDefaultDevHost()}:4000`;
  
console.log('API_BASE_URL =', API_BASE_URL);

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

