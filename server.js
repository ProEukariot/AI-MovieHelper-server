import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import passport from "passport";
import googleAuthStrategy from "./strategies/google-strategy.js";

import authRoute from "./routes/auth.js";
import moviesRoute from "./routes/movies.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

const corsOptions = {
  origin: ["http://localhost:5173"],
};

app.use(cors(corsOptions));

passport.use(googleAuthStrategy);
app.use(passport.initialize());

app.use("/api/auth", authRoute);
app.use("/api", moviesRoute);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION);

    app.listen(PORT, () => {
      console.log("Server started");
    });
  } catch (err) {
    console.error(err);
  }
}

main();
