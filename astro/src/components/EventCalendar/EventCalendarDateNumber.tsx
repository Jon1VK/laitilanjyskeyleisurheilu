import { date } from 'zod';

const isCurrentDate = (date: Date) =>
  new Date().getFullYear() === date.getFullYear() &&
  new Date().getMonth() === date.getMonth() &&
  new Date().getDate() === date.getDate();

const timeStyle = (date: Date) =>
  isCurrentDate(date)
    ? '-ml-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 font-semibold text-white'
    : '';

const EventCalendarDateNumber = (props: { date: Date }) => (
  <time
    class={timeStyle(props.date)}
    datetime={props.date.toISOString().slice(0, 10)}
  >
    {props.date.getDate()}
  </time>
);

export default EventCalendarDateNumber;
