const models = require('../models/models')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('../service/mailService')
const tokenService = require('../service/tokenService')
const UserDto = require('../dtos/userDto')

class UserService{
    async registration(email, password){
        const candidate = await models.User.findOne({email})

        if (candidate){
            throw new Error(`User with ${email} already exists`)
        }

        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink = uuid.v4()
        const user = await models.User.create({
            email,
            password: hashPassword,
            activationLink})
        await mailService.sendActivationMail(email, activationLink)

        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens, user: userDto}
    }
}

module.exports = new UserService()