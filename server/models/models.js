const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, required: true},
    password: {type: DataTypes.STRING, required: true},
    isActivated: {type: DataTypes.BOOLEAN, default: false},
    activationLink: {type: DataTypes.STRING},
})

const Token = sequelize.define('token', {
    refreshToken: {type: DataTypes.STRING, required: true},
    userId: {type: DataTypes.INTEGER, required: true, references: {
        model: 'Users',
            key: 'id'
        }}
})


Token.belongsTo(User)

module.exports = {
    User,
    Token
}