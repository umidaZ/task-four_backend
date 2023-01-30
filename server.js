import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "./db/db.js";
import moment from "moment";

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
dotenv.config();

app.post("/create_user", async (req, res) => {
  console.log("kirdiii");
  try {
    console.log(req.body);
    const user = await User(req.body);
    user.save((e) => console.log(e));
    res.json("user created");
  } catch (err) {
    console.log(err);
  }
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log("server is running on port " + port);
});

app.post("/login", async (req, res) => {
  console.log("res is comeing");
  try {
    let user = await User.find({
      email: req.body.email,
    });

    console.log({ user });
    console.log({ body: req.body });
    if (
      user[0].email === req.body.email &&
      user[0].password === req.body.password
    ) {
      console.log("if 1");
      if (user[0].status === true) {
        console.log("if 2");
        res.json(user[0]);
      } else if (user[0].status === false) {
        console.log("if 3");
        res.json(user[0]);
      }
    } else {
      console.log("if 4");
      res.json({ status: "login" });
    }
  } catch (err) {
    console.log(err);
  }

  console.log("nimadir");
});

app.post("/delete_user", async function (req, res) {
  res.json({ response: "user has been deleted successfully" });
  try {
    await User.remove({ _id: req.body.id });

    console.log("deleted");
  } catch (error) {
    console.log(error);
  }
});

app.post("/delete_all_users", async function (req, res) {
  res.json({ response: "user has been deleted successfully" });
  try {
    await User.deleteMany({});

    console.log("deleted");
  } catch (error) {
    console.log(error);
  }
});

app.post("/lastLoginUpdate", async function (req, res) {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      console.log(err);
    } else {
      user.lastLogin = moment().format("lll");
      user.save();
      console.log(user);
    }
  });
});

app.post("/delete_selected_users", async function (req, res) {
  res.json({ response: "users have been deleted successfully" });
  try {
    await User.deleteMany({ _id: { $in: req.body.id } });
    console.log("deleted");
  } catch (error) {
    console.log(error);
  }
});

app.post("/delete_selected_users", async function (req, res) {
  res.json({ response: "users have been deleted successfully" });
  try {
    await User.deleteMany({ _id: { $in: req.body.selectedUsers } });
    console.log("deleted");
  } catch (error) {
    console.log(error);
  }
});

app.get("/blocked_users", async function (req, res) {
  try {
    const users = await User.find({ status: false });
    res.json(users);
  } catch (error) {
    console.log(error);
  }
});

app.post("/block_user", async function (req, res) {
  try {
    const user = await User.updateOne(
      {
        _id: req.body.id,
      },
      {
        $set: { status: !req.body.status },
      }
    );
    console.log(user);
    res.json(user);
  } catch (error) {
    console.log(error);
  }
});

app.get("/users", async function (req, res) {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.log(error);
  }
});
