const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/userModel");
const Artist = require("../models/artistModel");

const validatePassword = require("../lib/passportUtils").validatePassword;

const verifyCallback = async (username, password, done) => {
    let user = await User.findOne({ username: username });

    if (!user) {
        user = await Artist.findOne({ username: username });

        if (!user) {
            return done(null, false);
        }
    }

    const isValid = validatePassword(password, user.hash, user.salt);

    if (isValid) {
        user.type = user instanceof User ? "user" : "artist";
        return done(null, user);
    }
    else {
        return done(null, false);
    }
};

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, { id: user.id, type: user.type});
})

passport.deserializeUser(async (user, done) => {
    try {
        let temp;

        if (user.type === "user") {
            temp = await User.findById(user.id);
            temp.type = "user";
        }
        else if (user.type === "artist") {
            temp = await Artist.findById(user.id);
            temp.type = "artist";
        }

        if (!temp) return done(null, false);
        done(null, temp);
    }
    catch (err) {
        done(err);
    }
})