import { DateTime } from 'luxon';

export function getUtcDateTime(): DateTime {
  return DateTime.now().toUTC();
}

export function getLocalDateTime(): DateTime {
  return DateTime.now();
}

export function getUtcDate(): Date {
  return getUtcDateTime().toJSDate();
}

export function getLocalDate(): Date {
  return getLocalDateTime().toJSDate();
}

export function getUtcDateToIso(): string {
  return DateTime.now().toISO();
}
