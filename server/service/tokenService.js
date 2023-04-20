const jwt = require('jsonwebtoken')
const models = require('../models/models')
const {where} = require("sequelize");

class TokenService{
    generateTokens(payload){
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
        return{
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken){
        const tokenData = await models.Token.findOne({where: { user: userId }})
        if (tokenData){
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }

        const token = await models.Token.create({userId: userId, refreshToken})
        return token
    }
}

module.exports = new TokenService()