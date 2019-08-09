let passport = require('passport');
let GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
let Ugc = require('../database/models/ugc');

passport.use(new GoogleStrategy({
        clientID: "591307876438-4nmmm817vks785u467lo22kss40kqno2.apps.googleusercontent.com",
        clientSecret: "BagENe4LxG_PZ_qz2oFX7Aok",
        callbackURL: "http://127.0.0.1:3000/auth/google/callback"
    },
    function (accessToken, refreshToken, profile, done) {
        console.log(profile)
    }
));

module.exports = passport;