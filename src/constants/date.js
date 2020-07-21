import { parseUTCDate } from '../utils/date';

const today = parseUTCDate();
const tomorrow = parseUTCDate();
const yesterday = parseUTCDate();

tomorrow.setDate(new Date().getDate() + 1);
yesterday.setDate(new Date().getDate() - 1);
export { today, tomorrow, yesterday };
