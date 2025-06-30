const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const { User } = require('../models');


passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        const user = await User.findOne({ where: { email } })
        if (!user) {
            return done(null, false, { message: 'Email tidak ditemukan' })
        }

        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            return done(null, false, { message: 'Password salah' })
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
