const { User } = require('../models');

const userData = [
    {
        username: 'Elton',
        email: 'Elton@gmail.com',
        password: 'Elton123',
    },
    {
        username: 'Andy',
        email: 'Andy@gmail.com',
        password: 'Andy123',
    },
    {
        username: 'AnTrinh',
        email: 'AnTrinh@gmail.com',
        password: 'AnTrinh123',
    },
    {
        username: 'Noreldin',
        email: 'Noreldin@gmail.com',
        password: 'Noreldin123'
    }
]

const userInfo = () => User.bulkCreate(userData);
module.exports = userInfo;