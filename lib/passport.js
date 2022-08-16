const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/user');
const sequelize = require('../models/index');
const passport = require('passport');
const { QueryTypes } = require('sequelize');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await User.findOne({
          where: {
            id: profile.id,
          },
        });

        if (user) {
          done(null, user);
        } else {
          const newUser = await User.create({
            id: profile.id,
            name: profile.displayName,
            avatar: profile.photos[0].value,
          });
          done(null, newUser);
        }
      } catch (err) {
        console.error(err);
      }
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: '/auth/github/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await User.findOne({
          where: {
            id: profile.id,
          },
        });

        if (user) {
          done(null, user);
        } else {
          const newUser = await User.create({
            id: profile.id,
            name: profile.displayName,
            avatar: profile.photos[0].value,
          });
          done(null, newUser);
        }
      } catch (err) {
        console.error(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
