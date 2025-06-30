const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    development: {
        username: process.env.PG_USERNAME,
        password: process.env.PG_PASSWORD,
        database: process.env.DATABASE_NAME,
        host: process.env.PG_HOST,
        dialect: process.env.PG_DIALECT,
    },
    test: {
        username: 'root',
        password: null,
        database: 'database_test',
        host: '127.0.0.1',
        dialect: 'mysql',
    },
    production: {
        username: 'root',
        password: null,
        database: 'database_production',
        host: '127.0.0.1',
        dialect: 'mysql',
    },
}

