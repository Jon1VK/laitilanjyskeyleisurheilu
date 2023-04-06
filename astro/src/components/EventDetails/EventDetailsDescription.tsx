import { useEventDetailsModifier } from './EventDetailsModifier';

const EventDetailsDescription = () => {
  const { event } = useEventDetailsModifier();
  return (
    <div
      // eslint-disable-next-line solid/no-innerhtml
      innerHTML={event().description || ''}
      class="prose prose-blue mx-auto mt-4 text-lg text-gray-600 prose-table:text-sm prose-table:shadow prose-table:ring-1 prose-table:ring-black/5 prose-th:bg-blue-600 prose-th:p-3 prose-th:text-white prose-td:p-3"
    />
  );
};

export default EventDetailsDescription;
