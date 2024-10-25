import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../schemas/User.js";

export default new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/api/auth/google/callback",
    scope: ["email", "profile"],
  },
  async (accessToken, refreshToken, profile, done) => {
    // console.log("CALLBACK");
    // console.log(accessToken, refreshToken, profile);

    try {
      let user = await User.findOne({ googleId: profile.id });

      if (!user) {
        user = new User({
          googleId: profile.id,
        });

        user = await user.save();
      }

      return done(null, {
        id: user._id,
        googleId: user.googleId,
        displayName: profile.displayName,
        picture: profile.photos,
      });
    } catch (err) {
      console.error(err);
      done(err);
    }
  }
);
