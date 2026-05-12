import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../models/User.model.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findByGoogleId(profile.id);
        if (!user) {
          // Create new user if doesn't exist
          const email = profile.emails[0].value;
          const username = profile.displayName.replace(/\s/g, "").toLowerCase();
          const userId = await User.createOAuth({
            google_id: profile.id,
            username: username,
            email: email,
            name: profile.displayName,
            avatar: profile.photos[0]?.value,
          });
          user = await User.findById(userId);
        }
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    },
  ),
);

passport.serializeUser((user, done) => done(null, user.user_id));
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

export default passport;
