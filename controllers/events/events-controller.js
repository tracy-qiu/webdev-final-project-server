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

  const findEvents = async (req, res) => {
    // await fetchEvents();
    const events = await eventsDao.findEvents();
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

  const fetchEvents = async () => {
    let response = await fetch(
      "https://test.api.amadeus.com/v1/shopping/activities?latitude=41.397158&longitude=2.160873&radius=1",
      {
        headers: { Authorization: "Bearer skoDoxivr1Gfi7j5bf3tj3AaXGTV" },
      }
    );
    let resJson = await response.json();
    let events = resJson.data;
    let numEvents = Object.keys(events).length;
    console.log(numEvents);
    for (let i = 0; i < numEvents; i++) {
      console.log(events[i]);
      let newEvent = {};
      newEvent.title = events[i].name;
      newEvent.desc = events[i].description;
      newEvent.image = events[i].pictures[0];
      newEvent.likes = 0;
      newEvent.liked = false;
      newEvent.attending = false;
      newEvent.wishlist = false;
      newEvent.past = false;
      await eventsDao.createEvent(newEvent);
    }
  };

  app.post("/api/events", createEvent);
  app.get("/api/events", findEvents);
  app.put("/api/events/:eid", updateEvent);
  app.delete("/api/events/:eid", deleteEvent);
  app.get("/api/events/fetch", fetchEvents);
};

export default EventsController;
