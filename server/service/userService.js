const models = require('../models/models')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('../service/mailService')
const tokenService = require('../service/tokenService')
const UserDto = require('../dtos/userDto')
const ApiError = require('../exceptions/apiError')

class UserService{
    async registration(email, password){
        const candidate = await models.User.findOne({where: {email}})

        if (candidate){
            throw ApiError.BadRequest(`User with ${email} already exists`)
        }

        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink = uuid.v4()
        const user = await models.User.create({
            email,
            password: hashPassword,
            activationLink})
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)

        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({userId: userDto.id})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens, user: userDto}
    }

    async activate(activationLink){
        const user = await models.User.findOne({where: {activationLink}})
        if (!user){
            throw ApiError.BadRequest('Invalid activation link')
        }
        user.isActivated = true
        await user.save()
    }
}

module.exports = new UserService()