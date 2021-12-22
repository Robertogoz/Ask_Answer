const Sequelize = require('sequelize');
const connection = require('./database');

const Answers = connection.define('answers', {
    name:{
        type: Sequelize.STRING,
        allowNull:false
    },
    body:{
        type: Sequelize.TEXT,
        allowNull:false
    },
    question_id:{
        type: Sequelize.INTEGER,
        allowNull:false
    }
});

Answers.sync({force:false});

module.exports = Answers