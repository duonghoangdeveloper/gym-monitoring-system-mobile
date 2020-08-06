import { Platform } from 'react-native';

export const PLAT_FORM: 'android' | 'ios' = Platform.OS;

export const URI =
  process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'
    ? 'http://192.168.0.104:7777'
    : 'https://gym-monitoring-system.herokuapp.com';

export const TOKEN_KEY = 'gym-monitoring-system-token';

export const CONNECTION_STATUSES = {
  CONNECTED: 'CONNECTED',
  CONNECTING: 'CONNECTING',
  DISCONNECTED: 'DISCONNECTED',
  RECONNECTING: 'RECONNECTING',
};

export const AUTH_ROLES = [
  'CUSTOMER',
  'TRAINER',
  'MANAGER',
  'GYM_OWNER',
  'SYSTEM_ADMIN',
];

export const ALL_ROLES = [
  'GUEST',
  'CUSTOMER',
  'TRAINER',
  'MANAGER',
  'GYM_OWNER',
  'SYSTEM_ADMIN',
];

const dataSelector = [
  {
    key: '1',
    label: 'Tommy Wiseau',
    value: 1,
  },
  {
    key: '2',
    label: 'Arnold Schwarzenneger',
    value: 2,
  },
  {
    key: '3',
    label: 'Donald Glover',
    value: 3,
  },
  {
    key: '4',
    label: 'Emma Stone',
    value: 4,
  },
];
export const USER_GENDERS = [
  { key: '1', label: 'MALE', value: 'MALE' },
  { key: '2', label: 'FEMALE', value: 'FEMALE' },
  { key: '3', label: 'OTHER', value: 'OTHER' },
];

export const DATE_FORMAT = 'DD/MM/YYYY';
