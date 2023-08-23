import eventsModel from "./events-model.js";
export const findEvents = () => eventsModel.find();
export const createEvent = (event) => eventsModel.create(event);
export const deleteEvent = (eid) => eventsModel.deleteOne({ _id: eid });
export const updateEvent = (eid, event) =>
  eventsModel.updateOne({ _id: eid }, { $set: event });
