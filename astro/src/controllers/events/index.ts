import createEvent from './create';
import deleteEvent from './delete';
import getAllEvents from './getAll';

const eventsController = {
  getAll: getAllEvents,
  create: createEvent,
  delete: deleteEvent,
};

export default eventsController;
