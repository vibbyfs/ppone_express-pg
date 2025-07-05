const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const { User } = require('../models');
const GoogleStrategy = require('passport-google-oauth20').Strategy
const dotenv = require('dotenv')

dotenv.config()

passport.use('local', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        if (!email || !password) {
            return done(null, false, { message: 'Email or password required' });
        }
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return done(null, false, { message: 'Email not found' });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return done(null, false, { message: 'Incorrect password' });
        }
        return done(null, user);
    } catch (err) {
        return done(err)
    }
}))

passport.use('google', new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'https://hck.vibbyfs.web.id/auth/google/accounts',
    userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({
            where: { email: profile.emails[0].value }
        });

        if (!user) {
            user = await User.create({
                username: profile.displayName,
                email: profile.emails[0].value,
                password: 'Login from google',
            })
        }
        return done(null, user)
    } catch (err) {
        return done(err)
    }

}))

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findByPk(id)
        done(null, user)
    } catch (err) {
        done(err)
    }
})

module.exports = passport
