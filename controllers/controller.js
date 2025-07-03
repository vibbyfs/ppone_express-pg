const { User, UserProfile, Account, Transaction } = require('../models')
const bcrypt = require('bcrypt');
const { render } = require('ejs');
const { Op, where } = require('sequelize')
const { timeAgoDetail } = require('../helper/helper')

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
            if (error.name === 'SequelizeValidationError') {
                const messages = error.errors.map(e => e.message);
                console.log(messages);

                res.render('register', { messages });
            } else {
                res.send(error);
            }
        }
    }

    static async getLogin(req, res) {
        try {
            const { message } = req.query
            res.render('login', { message })
        } catch (error) {
            if (error.name === 'SequelizeValidationError') {
                const messages = error.errors.map(e => e.message);
                res.render('login', { messages });
            } else {
                res.send(error);
            }
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
            const user_id = req.user.id;
            const existingProfile = await UserProfile.findOne({ where: { user_id } });
            if (existingProfile) {
                return res.redirect('/dashboard');
            }
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
            });

            const account = await Account.findOne({ where: { user_id } });
            if (!account) {
                await Account.create({
                    balance: 0,
                    account_type: 'main_wallet',
                    user_id
                });
            }

            res.redirect('/accounts');
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }

    static async getTransaction(req, res) {
        try {
            const userId = req.user.id;

            const accounts = await Account.findAll({
                where: { user_id: userId },
                attributes: ['id']
            });

            const accountIds = accounts.map(acc => acc.id);

            const transactions = await Transaction.findAll({
                where: {
                    account_id: accountIds
                },
                order: [['date', 'DESC']]
            });

            res.render('transaction', { data: transactions });
        } catch (error) {
            console.log(error);
            res.send(error);
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
            const id = req.user
            let data = await UserProfile.findOne({ user_id: id })
            console.log(req.user);

            res.render('dashboard', { data })
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async getEditUserProfile(req, res) {
        try {
            const userId = req.user.id;
            const data = await UserProfile.findOne({ where: { user_id: userId } });
            res.render('editUser', { data })
        } catch (error) {
            res.send(error)
        }
    }

    static async postEditUserProfile(req, res) {
        try {
            const userId = req.user.id
            const { fullname, date_of_birth, adress, phone_number, image } = req.body;

            await UserProfile.update(
                { fullname, date_of_birth, adress, phone_number, image },
                { where: { user_id: userId } }
            )

            res.redirect('/userprofiles')
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async getUserProfile(req, res) {
        try {
            const data = await UserProfile.findOne({ where: { user_id: req.user.id } });
            res.render('userProfile', { data, timeAgoDetail });
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }

    static async deleteTransaction(req, res) {
        try {
            const { id } = req.params;
            await Transaction.destroy({ where: { id } });
            res.redirect('/transactions');
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }

}

module.exports = Controller