import createEvent from './create';
import deleteEvent from './delete';
import deleteEventResults from './deleteResults';
import deleteEventTimetable from './deleteTimetable';
import getAllEvents from './getAll';
import promoteEvent from './promote';
import updateEvent from './update';

const eventsController = {
  getAll: getAllEvents,
  create: createEvent,
  update: updateEvent,
  promote: promoteEvent,
  delete: deleteEvent,
  deleteTimetable: deleteEventTimetable,
  deleteResults: deleteEventResults,
};

export default eventsController;
