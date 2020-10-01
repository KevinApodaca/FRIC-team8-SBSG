const eventBuilder = require('../controllers/eventListController');

module.exports = app => {
  app
    .route('/events/')
    .get(eventBuilder.list_all_events)
    .post(eventBuilder.create_event);

  app
    .route('/events/:eventId')
    .get(eventBuilder.read_event)
    .put(eventBuilder.update_event)
    .delete(eventBuilder.delete_event);
};
