import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/google", passport.authenticate("google"));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "http://localhost:5173/login/failure",
  }),
  (req, res) => {
    const tokenProps = { expiresIn: "1h" };

    const token = jwt.sign(
      { id: req.user.id, googleId: req.user.googleId },
      process.env.JWT_SECRET,
      tokenProps
    );

    const data = {
      token: token,
      user: req.user,
    };

    const encodedData = btoa(JSON.stringify(data));

    const url = `http://localhost:5173/login/success?data=${encodedData}`;

    return res.redirect(url);
  }
);

export default router;
