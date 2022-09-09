import createEvent from './create';
import deleteEvent from './delete';
import getAllEvents from './getAll';
import updateEvent from './update';

const eventsController = {
  getAll: getAllEvents,
  create: createEvent,
  update: updateEvent,
  delete: deleteEvent,
};

export default eventsController;
