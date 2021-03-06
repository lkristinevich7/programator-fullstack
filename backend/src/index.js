// import dotenv from 'dotenv';
// dotenv.config({path: __dirname + '../.env'}); /// load from './.env' file

import express from "express";
import cors from "cors";
import morgan from "morgan";
import errorhandler from "errorhandler";
import session from "express-session";
import passport from 'passport'
import "./config/mongo.js";
import './config/passport.js'
import routes from "./routes/index.js";

const app = express();
app.set("trust proxy", 1); // trust first proxy

app.use(errorhandler());
// https://medium.com/zero-equals-false/using-cors-in-express-cac7e29b005b
app.options("*", cors()); // cors preflight
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
    // origin: (origin, callback) => callback(null, [origin]),
  })
);
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.use(
  session({
    secret: "placki keyboard cat",
    resave: true,
    saveUninitialized: true,
    // cookie: { secure: false, sameSite: "none", httpOnly: false },
  })
);
// Passport.js
app.use(passport.initialize());
app.use(passport.session());

// Forms
app.use(express.urlencoded({ extended: true }));

// JSON
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.use("/api/", routes);

const PORT = process.env.PORT;
const HOST = process.env.HOST;

app.listen(PORT, HOST, () => {
  console.log(`Listening on http://${HOST}:${PORT}/`);
});

export default routes;
