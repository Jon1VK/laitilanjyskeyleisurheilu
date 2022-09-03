const timeStyle = (date: Date) =>
  new Date().toDateString() === date.toDateString()
    ? '-ml-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 font-semibold text-white'
    : '';

const EventCalendarDateNumber = (props: { date: Date }) => (
  <time
    class={timeStyle(props.date)}
    datetime={props.date.toLocaleDateString('sv')}
  >
    {props.date.getDate()}
  </time>
);

export default EventCalendarDateNumber;
