var passport = require('passport')
    , TwitterStrategy = require('passport-twitter').Strategy;
let Ugc = require('../database/models/ugc');

passport.serializeUser(function (user, fn) {
    fn(null, user);
});

passport.use(new TwitterStrategy({
        consumerKey: "nmbk1uqKB0rbWjBxrPv9iksEf",
        consumerSecret: "QeBlJHanPy232ZbOhyPisfI8hLLUVMujXjuI7Sz0Ym4o6m7eGF",
        callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
    },
    function (accessToken, refreshToken, profile, done) {

    }
));

module.exports = passport;