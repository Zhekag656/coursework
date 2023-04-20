const Router = require('express').Router
const userController = require('../controllers/userController')

const router = new Router()


router.post('/registration', userController.registration)
router.post('/login')
router.post('/logout')
router.get('/activate/:link')
router.get('/refresh')
router.get('/users')

module.exports = router