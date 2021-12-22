const Sequelize = require('sequelize');

const connection = new Sequelize('ask_answer', 'root', 'your_password', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;