const timeStyle = (date: Date) => {
  const localeDate = date.toLocaleDateString('sv', {
    timeZone: 'Europe/Helsinki',
  });
  const currentLocaleDate = new Date().toLocaleDateString('sv', {
    timeZone: 'Europe/Helsinki',
  });
  const isCurrentDate = localeDate === currentLocaleDate;
  return isCurrentDate
    ? '-ml-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 font-semibold text-white'
    : '';
};

const EventCalendarDateNumber = (props: { date: Date }) => (
  <time
    class={timeStyle(props.date)}
    datetime={props.date.toLocaleDateString('sv')}
  >
    {props.date.getDate()}
  </time>
);

export default EventCalendarDateNumber;
