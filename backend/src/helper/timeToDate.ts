import { subHours } from 'date-fns';

function timeToDate(str: string): Date {
  try {
    const [hour, minute] = str.split(':');

    const time = subHours(
      new Date(
        `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()} ${hour}:${minute}`,
      ),
      3,
    );

    return time;
  } catch (error) {
    throw new Error('Invalid time format');
  }
}

export { timeToDate };
