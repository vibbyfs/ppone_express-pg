const { User, UserProfile, Account, Transaction } = require('../models')
const { Op } = require('sequelize')
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
            res.render('register')
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async postRegister(req, res) {
        try {
            const { username, email, password } = req.body

            const usernameExist = await User.findOne({ where: { username } });
            if (usernameExist) {
                return res.render('register', { errors: ["Username already exists"] });
            }

            const emailExist = await User.findOne({ where: { email } });
            if (emailExist) {
                return res.render('register', { errors: ["Email already exists"] });
            }

            const user = await User.create({
                username,
                email,
                password
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
                const messages = error.errors.map(el => el.message);
                res.render('register', { errors: messages });
            } else {
                res.send(error);
            }
        }
    }

    static async getLogin(req, res) {
        try {
            const messages = res.locals.errors
            res.render('login', { errors: messages })
        } catch (error) {
            res.send(error);
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
            res.render('formCreateProfile', { errors: [] })
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
            res.redirect('/dashboard');

        } catch (error) {
            if (error.name === "SequelizeValidationError") {
                const messages = error.errors.map(el => el.message)
                res.render('formCreateProfile', { errors: messages })
            } else {
                res.send(error);

            }
        }
    }

    static async getTransaction(req, res) {
        try {
            const userId = req.user.id;
            const { search } = req.query;

            const accounts = await Account.findAll({
                where: { user_id: userId },
                attributes: ['id']
            });

            const accountIds = accounts.map(acc => acc.id);

            let whereClause = { account_id: accountIds };
            if (search) {
                whereClause.description = { [Op.iLike]: `%${search}%` };
            }

            const transactions = await Transaction.findAll({
                where: whereClause,
                order: [['date', 'DESC']]
            });

            res.render('transaction', { data: transactions, search });
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }

    static async getAccount(req, res) {
        try {
            res.render('account', { formatCurrency: Account.formatCurrency });
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async dashboard(req, res) {
        try {
            const id = req.user
            let data = await UserProfile.findOne({ user_id: id })
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