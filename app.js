const express = require('express')
const router = require('./routes')
const session = require('express-session')
const passport = require('passport')
const dotenv = require('dotenv')
const flash = require('connect-flash')

const app = express()
const port = 3000
dotenv.config();

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(session({
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))

// app.use((req, res, next) => {
//     console.log('Session:', req.session);
//     next();
// });

app.use(flash())
app.use((req, res, next) => {
    res.locals.errors = req.flash('error');
    res.locals.success = req.flash('success');
    next();
})

app.use(passport.initialize())
app.use(passport.session())

app.use('/', router)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
