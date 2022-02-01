const process = require('process');

module.exports = {
    port: process.env.PORT || 3000,
    db: {
        database: process.env.DB_NAME || 'hometuts',
        user: process.env.DB_USER || 'hometuts',
        password: process.env.DB_PASSWORD || 'hometuts',
        options: {
            dialect: process.env.DIALECT || 'sqlite',
            host: process.env.HOST || 'localhost',
            storage: './../data/database.sqlite',
        }
    },
    authentication: {
        jwtSecret: process.env.JWT_SECRET || 'secret'
    }
};