import * as eventsDao from "./events-dao.js";

const EventsController = (app) => {
  const createEvent = async (req, res) => {
    const newEvent = req.body;
    newEvent.likes = 0;
    newEvent.liked = false;
    newEvent.attending = false;
    newEvent.wishlist = false;
    newEvent.past = false;
    const insertedEvent = await eventsDao.createEvent(newEvent);
    res.json(insertedEvent);
  };

  const findEvent = async (req, res) => {
    const events = await eventsDao.findEvent();
    res.json(events);
  };

  const updateEvent = async (req, res) => {
    const eventIdToUpdate = req.params.tid;
    const updates = req.body;
    const status = await eventsDao.updateEvent(eventIdToUpdate, updates);
    res.json(status);
  };

  const deleteEvent = async (req, res) => {
    const eventIdToDelete = req.params.tid;
    const status = await eventsDao.deleteEvent(eventIdToDelete);
    res.json(status);
  };

  app.post("/api/events", createEvent);
  app.get("/api/events", findEvent);
  app.put("/api/events/:eid", updateEvent);
  app.delete("/api/events/:eid", deleteEvent);
};

export default EventsController;
