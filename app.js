const express = require('express')
const app = express()
const port = 3000
const router = require('./routes')
const session = require('express-session')
const passport = require('passport')
const { Strategy } = require('passport-local')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use(session({
    secret: 'DIMAS ADI',
    resave: false,
    saveUninitialized: true,
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/', router)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
