import express from "express";
import passport from "passport";
import User from "../schemas/User.js";
import tryCatch from "../utils/tryCatch.js";

const router = express.Router();

router
  .use(passport.authenticate("jwt", { session: false }))

  .route("/user/avoid-movies")
  .get(
    tryCatch(async (req, res) => {
      const movies = await User.findOne({ _id: req.user.id }).select(
        "avoidMovies -_id"
      );

      res.json({ movies });
    })
  )
  .put(
    tryCatch(async (req, res) => {
      const newList = req.body.movies;

      const user = await User.findOne({ _id: req.user.id });

      user.avoidMovies = newList;
      await user.save();

      res.status(204).send();
    })
  );

export default router;
