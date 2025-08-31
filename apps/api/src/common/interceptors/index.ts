export * from './api-response.interceptor';
export * from './serializer.interceptor';

export interface DeviceInfo {
  browser: string;
  device: string;
  location: string;
}