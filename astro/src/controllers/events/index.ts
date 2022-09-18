import createEvent from './create';
import deleteEvent from './delete';
import deleteEventResults from './deleteResults';
import deleteEventTimetable from './deleteTimetable';
import getAllEvents from './getAll';
import updateEvent from './update';

const eventsController = {
  getAll: getAllEvents,
  create: createEvent,
  update: updateEvent,
  delete: deleteEvent,
  deleteTimetable: deleteEventTimetable,
  deleteResults: deleteEventResults,
};

export default eventsController;
