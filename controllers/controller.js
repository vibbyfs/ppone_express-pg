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
            const user = await User.create({
                username,
                email,
                password: hashedPassword
            })
            req.login(user, (err) => {
                if (err) {
                    return res.send(err)
                }
                res.redirect('/dashboard')
            })
        } catch (error) {
            res.send(error)
        }
    }

    static async getLogin(req, res) {
        try {
            const { message } = req.query
            res.render('login', { message })
        } catch (error) {
            res.send(error)
        }
    }

    static async getDashboard(req, res) {
        try {
            if (req.isAuthenticated()) {
                res.render('dashboard')
            } else {
                res.redirect('/login')
            }
        } catch (error) {
            res.send(error)
        }
    }

    static async transactions(req, res) {
        try {
            res.render('transactions')
        } catch (error) {
            res.send(error)
        }
    }

    static async userProfiles(req, res) {
        try {
            res.render('userProfile')
        } catch (error) {
            res.send(error)
        }
    }

}

module.exports = Controller