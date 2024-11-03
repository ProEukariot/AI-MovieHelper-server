import express from "express";
import passport from "passport";
import User from "../schemas/User.js";
import tryCatch from "../utils/tryCatch.js";
import { getOrSetCache } from "../utils/getOrSetCache.js";

const router = express.Router();

router
  .use(passport.authenticate("jwt", { session: false }))

  .route("/user/avoid-movies")
  .get(
    tryCatch(async (req, res) => {
      const movies = await getOrSetCache(
        `user-movies:${req.user.id}`,
        async () =>
          await User.findOne({ _id: req.user.id }).select("avoidMovies -_id")
      );

      res.json({ movies });
    })
  )
  .put(
    tryCatch(async (req, res) => {
      const newList = req.body.movies;
      if (!newList) return res.status(400).send();
      console.log(newList);

      const user = await User.findOne({ _id: req.user.id });

      user.avoidMovies = newList;
      await user.save();

      res.status(204).send();
    })
  );

export default router;
