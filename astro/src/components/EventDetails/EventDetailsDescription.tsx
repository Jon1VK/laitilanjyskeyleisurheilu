import { useEventDetailsModifier } from './EventDetailsModifier';

const EventDetailsDescription = () => {
  const { event } = useEventDetailsModifier();
  return (
    <div
      // eslint-disable-next-line solid/no-innerhtml
      innerHTML={event().description || ''}
      class="prose prose-blue prose-table:text-sm prose-table:shadow prose-table:ring-1 prose-table:ring-black/5 prose-td:p-3 prose-th:p-3 prose-th:bg-blue-600 prose-th:text-white mx-auto mt-4 text-lg text-gray-600"
    />
  );
};

export default EventDetailsDescription;
