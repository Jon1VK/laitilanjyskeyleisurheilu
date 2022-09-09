import createRecurringEvent from './create';
import deleteRecurringEvent from './delete';

const recurringEventsController = {
  create: createRecurringEvent,
  delete: deleteRecurringEvent,
};

export default recurringEventsController;
