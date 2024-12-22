import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  setHours,
  setMinutes,
  setSeconds,
  setMilliseconds
} from 'date-fns'

// export function formatTimeDifference(targetDate: Date, selectedStartHour: number | null) {
//   const now = new Date()

//   let normalizedDate = setHours(targetDate, 0)
//   normalizedDate = setMinutes(normalizedDate, 0)
//   normalizedDate = setSeconds(normalizedDate, 0)
//   normalizedDate = setMilliseconds(normalizedDate, 0)

//   if (selectedStartHour !== null) {
//     normalizedDate = setHours(normalizedDate, selectedStartHour)
//   }

//   if (normalizedDate <= now) {
//     return 'Now'
//   }

//   const days = differenceInDays(normalizedDate, now)
//   const hours = differenceInHours(normalizedDate, now) % 24
//   const minutes = differenceInMinutes(normalizedDate, now) % 60

//   let timeString = 'In '

//   if (days > 0) {
//     timeString += `${days} ${days === 1 ? 'day' : 'days'}`
//   }

//   if (hours > 0) {
//     if (days > 0) timeString += ', '
//     timeString += `${hours} ${hours === 1 ? 'hour' : 'hours'}`
//   }

//   if (minutes > 0) {
//     if (days > 0 || hours > 0) timeString += ' and '
//     timeString += `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`
//   }

//   return timeString
// }

export function formatTimeDifference(
  targetDate: Date,
  selectedStartHour: number | null
): string {
  const now = new Date();

  let normalizedDate = setHours(targetDate, 0);
  normalizedDate = setMinutes(normalizedDate, 0);
  normalizedDate = setSeconds(normalizedDate, 0);
  normalizedDate = setMilliseconds(normalizedDate, 0);

  if (selectedStartHour !== null) {
    normalizedDate = setHours(normalizedDate, selectedStartHour);
  }

  const isPast = normalizedDate <= now;

  // Calculate differences
  const days = Math.abs(differenceInDays(normalizedDate, now));
  const hours = Math.abs(differenceInHours(normalizedDate, now) % 24);
  const minutes = Math.abs(differenceInMinutes(normalizedDate, now) % 60);

  let timeString = isPast ? '' : 'In ';

  if (days > 0) {
    timeString += `${days} ${days === 1 ? 'day' : 'days'}`;
  }

  if (hours > 0) {
    if (days > 0) timeString += isPast ? ', ' : ', ';
    timeString += `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
  }

  if (minutes > 0) {
    if (days > 0 || hours > 0) timeString += ' and ';
    timeString += `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
  }

  if (isPast) {
    timeString += ' ago';
  }

  return timeString;
}

export function formatTimeDifferenceHours(
  targetDate: Date,
  selectedStartTime: string | null
): string {
  const now = new Date()

  let normalizedDate = setHours(targetDate, 0)
  normalizedDate = setMinutes(normalizedDate, 0)
  normalizedDate = setSeconds(normalizedDate, 0)
  normalizedDate = setMilliseconds(normalizedDate, 0)

  if (selectedStartTime) {
    const [hour, minute] = selectedStartTime.split(':').map(Number)
    if (!isNaN(hour) && !isNaN(minute)) {
      normalizedDate = setHours(normalizedDate, hour)
      normalizedDate = setMinutes(normalizedDate, minute)
    } else {
      throw new Error("Invalid time format. Expected 'HH:mm'.")
    }
  }

  const isPast = normalizedDate <= now

  const days = Math.abs(differenceInDays(normalizedDate, now))
  const hours = Math.abs(differenceInHours(normalizedDate, now) % 24)
  const minutes = Math.abs(differenceInMinutes(normalizedDate, now) % 60)

  let timeString = isPast ? '' : 'In '

  if (days > 0) {
    timeString += `${days} ${days === 1 ? 'day' : 'days'}`
  }

  if (hours > 0) {
    if (days > 0) timeString += isPast ? ', ' : ', '
    timeString += `${hours} ${hours === 1 ? 'hour' : 'hours'}`
  }

  if (minutes > 0) {
    if (days > 0 || hours > 0) timeString += ' and '
    timeString += `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`
  }

  if (isPast) {
    timeString += ' ago'
  }

  return timeString
}
