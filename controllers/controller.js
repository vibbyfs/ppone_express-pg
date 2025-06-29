const { User } = require('../models')

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
            res.render('register')
        } catch (error) {
            res.send(error)
        }
    }

    static async postRegister(req, res) {
        try {
            const { username, email, password } = req.body
            await User.create({
                username,
                email,
                password
            })
            res.redirect('/')
            
        } catch (error) {
            res.send(error)
        }
    }

    static async getLogin(req, res) {
        try {
            res.render('login')
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = Controller