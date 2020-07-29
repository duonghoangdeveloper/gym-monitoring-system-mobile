import moment from 'moment';

// import { today } from '../constants/date';

export function getCurrentDayString() {
  return moment().format('YYYY-MM-DD');
}

export function formatDate(date) {
  return date
    ? moment(date).format('DD/MM/YYYY')
    : moment().format('DD/MM/YYYY');
}

export function formatDateShort(date) {
  return date ? moment(date).format('DD/MM') : moment().format('DD/MM');
}

export function getTimeDiff(date, format = true) {
  const secondDiff = moment().diff(date, 'seconds');
  const days = Math.floor(secondDiff / 86400);
  const hours = Math.floor((secondDiff - days * 86400) / 3600);
  const minutes = Math.floor((secondDiff - days * 86400 - hours * 3600) / 60);
  const seconds = Math.floor(
    secondDiff - days * 86400 - hours * 3600 - minutes * 60
  );
  if (format) {
    return getDayString({ days, hours, minutes, seconds });
  }
  return { days, hours, minutes, seconds };
}

export function diffDates(fromDate, toDate = new Date()) {
  return moment(toDate).diff(fromDate, 'd');
}

export function getDayString({ days, hours, minutes, seconds }) {
  return {
    days,
    hours: hours < 10 ? `0${hours}` : `${hours}`,
    minutes: minutes < 10 ? `0${minutes}` : `${minutes}`,
    seconds: seconds < 10 ? `0${seconds}` : `${seconds}`,
  };
}

export function getDayAndHour(time) {
  const hourDiffs = moment().diff(time, 'h');
  return {
    days: Math.floor(hourDiffs / 24),
    hours: hourDiffs - Math.floor(hourDiffs / 24) * 24,
  };
}

export function substractDate(fromDate, toDate) {
  return moment(toDate).diff(fromDate, 'days');
}

export function parseUTCDate(origin) {
  const utc = origin ?? new Date();
  const date = new Date(utc.valueOf());
  utc.setUTCHours(0, 0, 0, 0);
  if (utc.getDate() !== date.getDate()) {
    utc.setDate(date.getDate());
  }
  return utc;
}

export function getDayRange(fromDate: Date, toDate: Date): [Date] {
  const result = [];
  const currentDay = new Date(fromDate.valueOf());
  while (currentDay <= toDate) {
    result.push(new Date(currentDay.valueOf()));
    const increaseDate = currentDay.getDate() + 1;
    currentDay.setDate(increaseDate);
  }
  return result;
}

export function getPostDisplay(date: String) {
  const diff = getTimeDiff(date, false);
  if (diff.days === 0) {
    if (diff.hours === 0) {
      return `${diff.minutes} phút trước`;
    }
    return `${diff.hours} giờ trước`;
  }

  if (diff.days > 7) {
    return formatDate(date);
  }

  return `${diff.days} ngày trước`;
}
