const { User } = require('../models')
const bcrypt = require('bcrypt')

class Controller {

    static async home(req, res) {
        try {
            res.render('home')
        } catch (error) {
            res.send(error)
        }
    }

    static async getRegister(req, res) {
        try {
            const { errors } = req.query
            res.render('register', { errors })
        } catch (error) {
            res.send(error)
        }
    }

    static async postRegister(req, res) {
        try {
            const { username, email, password } = req.body
            const saltRounds = 10

            const usernameRegistered = await User.findOne({ where: { username } })
            if (usernameRegistered) {
                return res.render('register', {
                    errors: { username: 'Username sudah terdaftar' }
                })
            }

            const emailRegistered = await User.findOne({
                where: { email }
            })
            if (emailRegistered) {
                return res.render('register', { errors: { email: 'Email sudah terdaftar' } })
            }

            const hashedPassword = await bcrypt.hash(password, saltRounds)
            await User.create({
                username,
                email,
                password: hashedPassword
            })
            res.redirect('/')

        } catch (error) {
            res.send(error)
        }
    }

    static async getLogin(req, res) {
        try {
            const { errors } = req.query
            res.render('login', { errors })
        } catch (error) {
            res.send(error)
        }
    }

    static async postLogin(req, res) {
        try {
            const { email, password } = req.body

            const user = await User.findOne({
                where: { email }
            })

            if (!user) {
                return res.render('login', { errors: { email: 'Email tidak ditemukan' } })
            }

            const passMatch = await bcrypt.compare(password, user.password)

            if (!passMatch) {
                return res.render('login', { errors: { password: 'Passwords salah' } })
            }

            res.redirect('/')

        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = Controller