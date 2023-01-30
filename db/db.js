import { connect, model, mongoose } from "mongoose";

const { Schema } = mongoose;
import moment from "moment/moment.js";

mongoose.set("strictQuery", false);

mongoose.connect("mongodb://127.0.0.1:27017/myapp");

export const Users = new Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
    require: true,
  },
  surname: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  confirmPassword: {
    type: String,
    require: true,
  },
  status: {
    type: Boolean,
    require: true,
    default: true,
  },
  time: {
    type: String,
    require: true,
    default: moment().format("LLL"),
  },
  lastLogin: {
    type: String,
    require: true,
    default: "----",
  },
});

export const User = mongoose.model("User", Users);
