import createEvent from './create';
import getAllEvents from './getAll';

const eventsController = {
  getAll: getAllEvents,
  create: createEvent,
};

export default eventsController;
