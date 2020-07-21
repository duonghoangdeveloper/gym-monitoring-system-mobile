import { Platform } from 'react-native';

export const PLAT_FORM: 'android' | 'ios' = Platform.OS;
export const APP_POLICY_URL =
  'https://app.termly.io/document/privacy-policy/952b68e6-4f59-4cc1-a5b2-d299d6bc9f5e';

export const navigationStatus = {
  AUTHENTICATING: 'Authenicating',
  HOME: 'Home',
  QUIZ: 'quiz',
  WALKTHROUGH: 'Walkthrough',
  WALKTHROUGH_SEPERATE: 'Walkthrough_Seperate',
};

export const DEFAULT_AVATAR =
  'https://znews-photo.zadn.vn/w660/Uploaded/pirr/2018_08_17/15.jpg';

export const GENDERS = [
  { label: 'Male', value: 'MALE' },
  { label: 'Female', value: 'FEMALE' },
  { label: 'Not specified', value: 'NOT_SPECIFIED' },
];

export const BADGE_IMAGE =
  'https://cdn4.iconfinder.com/data/icons/award-soft/512/stamp_seal_postage_certified_certificate_document_rubber-512.png';

export const FETCH_NOTIFICATION_INTERVAL = 50000;

export const CACHE_TIME = {
  // 6 hours
  goal: 86400000,
  journal: 21600000, // 1 day
  milestone: 259200000, // 3 days
  notification: 1800000, // 30 minutes
  postTopic: 604800000, // 7 days
  rollCall: 86400000,
};

export const PAGE_SIZE = {
  comment: 8,
  goal: 100,
  journal: 20,
  notification: 20,
  post: 4, // unlimited
};

export const HISTORY_DATE = '2000-06-26T04:44:43.892Z';
export const MAX_GOAL_POINT = 300;

export const IGNORE_REMINDING = 'ignore-reminding';
export const DAILY_REMINDER = {
  ignore: 'ignore-reminding',
  key: 'remindTime',
  options: [
    { label: '6 PM', value: '18' },
    { label: '7 PM', value: '19' },
    { label: '8 PM', value: '20' },
    { label: '9 PM', value: '21' },
    { label: '10 PM', value: '22' },
  ],
};

export const NOTIFICATIONS = {
  ids: {
    post: 'USER_POST',
    remind: 'REMIND_NOTIFICATION',
  },
};

export const DEFAULT_HEADER_HEIGHT = 40;
