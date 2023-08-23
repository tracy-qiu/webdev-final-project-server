import mongoose from "mongoose";
const schema = mongoose.Schema(
  {
    username: String,
    profileImage: String,
    fname: String,
    lname: String,
    title: String,
    date: Date,
    desc: String,
    image: String,
    likes: Number,
    liked: Boolean,
    attending: Boolean,
    wishlist: Boolean,
    past: Boolean,
    type: String,
  },
  { collection: "events" }
);
export default schema;
