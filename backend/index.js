require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

// const userRoute = require("../backend/Route/userRoutes");
// const PORT = 2468;
app.use(cors());
app.use(express.json());
const PORT = 2468;

// app.get("/", (req, res) => {
//   res.send("welome to backend");
// });
//basic route or root route:http://localhost:2468

// Built-in middleware for parsing JSON
// app.use(express.json());
//JSON.stringify(converts to json)
//JSON.parse(converts to object)

//Connect to database or MongoDB // localhost
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log("MongoDB connection error:", err));

//Custom middleware
app.use((req, _res, next) => {
  console.log(`${req.method} request made to ${req.url}`);
  next(); // move to handler
});

//router
// const userRoute = require("../backend/Route/userRoutes");
const userRoute = require("./Route/userRoutes");
// const { config } = require("dotenv");
app.use("/users", userRoute);

const people = ["4k, Favour"];

// GET Route  //middleware
app.get("/", (_req, res) => {
  res.send("Welcome to Backend");
});

app.get("/about", (_req, res) => {
  res.send("Welcome to the about page of this website");
});

//POST REQUEST  : API
app.post("/login", (_req, res) => {
  res.send("You just submitted a login");
});

//app.listen means setting up a server
app.listen(PORT, () => {
  console.log(`App running on PORT ${PORT}`);
});
