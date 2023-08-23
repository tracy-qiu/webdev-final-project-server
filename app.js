import express from "express";
import cors from "cors";
import UserController from "./controllers/users/users-controller.js";
import session from "express-session";
import AuthController from "./controllers/users/auth-controller.js";
import "dotenv/config";
import mongoose from "mongoose";
import EventsController from "./controllers/events/events-controller.js";
const CONNECTION_STRING =
  process.env.DB_CONNECTION_STRING || "mongodb://127.0.0.1:27017/travel-app";
mongoose.connect(CONNECTION_STRING);

const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);

const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}
app.use(
  session({
    secret: "any string",
    resave: false,
    proxy: true,
    saveUninitialized: false,
    cookie: {
      sameSite: "none",
      secure: true,
    },
  })
);

app.use(express.json());
const port = process.env.PORT || 4000;
UserController(app);
AuthController(app);
EventsController(app);
app.listen(process.env.PORT || 4000);
