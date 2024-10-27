import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/google", passport.authenticate("google"));

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const tokenProps = { expiresIn: "1h" };

    const token = jwt.sign(
      { id: req.user.id, googleId: req.user.googleId },
      process.env.JWT_SECRET,
      tokenProps
    );

    return res.json({
      token: token,
      user: req.user,
    });
  }
);

export default router;
