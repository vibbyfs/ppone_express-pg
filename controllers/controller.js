const { User, UserProfile, Account } = require('../models')
const bcrypt = require('bcrypt')

class Controller {

    static async home(req, res) {
        try {
            res.render('home')
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async getRegister(req, res) {
        try {
            const { errors } = req.query
            res.render('register', { errors })
        } catch (error) {
            console.log(error);
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

            await Account.create({
                balance: 0,
                account_type: 'main_wallet',
                user_id: user.id
            });

            req.login(user, (err) => {
                if (err) {
                    return res.send(err)
                }
                res.redirect('/userprofiles/create')
            })
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async getLogin(req, res) {
        try {
            const { message } = req.query
            res.render('login', { message })
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async getAccount(req, res) {
        try {
            if (req.isAuthenticated()) {
                res.render('account')
            } else {
                res.redirect('/login')
            }
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async getCreateUserProfile(req, res) {
        try {
            res.render('formCreateProfile')
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async postCreateUserProfile(req, res) {
        try {
            const { fullname, date_of_birth, adress, phone_number, image } = req.body
            const user_id = req.user.id;

            await UserProfile.create({
                fullname,
                date_of_birth,
                adress,
                phone_number,
                image,
                user_id
            })
            res.redirect('/accounts')
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }


    static async getTransaction(req, res) {
        try {
            res.render('transaction')
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async getAccount(req, res) {
        try {
            res.render('account');
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async dashboard(req, res) {
        try {
            res.render('dashboard')
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

}

module.exports = Controller