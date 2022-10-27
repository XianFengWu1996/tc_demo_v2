import { DateTime } from 'luxon';

export const timeToStringFormat = (time: number) => {
  const hr = Math.floor(time / 60);
  const min = time % 60;

  const format_hour = hr < 10 ? `0${hr}` : `${hr}`;
  const format_minute = min < 10 ? `0${min}` : `${min}`;
  const format_am_pm = hr >= 0 && hr <= 12 ? 'AM' : 'PM';

  return `${format_hour}:${format_minute}${format_am_pm}`;
};

export const generateMenuTime = (time: MenuHour) => {
  return `${timeToStringFormat(time.start)} - ${timeToStringFormat(time.end)}`;
};

export const generateScheduleTime = (
  open: number,
  close: number,
  increment: number
) => {
  const scheduleTime: ScheduleTime[] = [];

  for (
    let index = open + increment;
    index <= close - increment;
    index += increment
  ) {
    const data: ScheduleTime = {
      displayTime: `${timeToStringFormat(index)}-${timeToStringFormat(
        index + increment
      )}`,
      numeric: index,
    };

    scheduleTime.push(data);
  }

  return scheduleTime;
};

export const getCurrentTime = () => {
  const hour = DateTime.now().hour;
  const minute = DateTime.now().minute;
  const currentTime = hour * 60 + minute;

  return currentTime;
};

// generate a local date time object
export const localTime = () => {
  return DateTime.now().setZone('UTC-4');
};
