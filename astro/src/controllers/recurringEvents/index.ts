import createRecurringEvent from './create';
import deleteRecurringEvent from './delete';
import updateRecurringEventOccurrences from './updateOccurrences';

const recurringEventsController = {
  create: createRecurringEvent,
  updateOccurrences: updateRecurringEventOccurrences,
  delete: deleteRecurringEvent,
};

export default recurringEventsController;
