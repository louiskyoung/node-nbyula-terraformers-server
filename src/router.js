const router = require('express').Router()

const authController = require('./controllers/auth')
const { authMiddleware } = require('./middleware')

router.post('/register', authController.register)
router.post('/login', authController.login)
router.get('/getUserInfo', authMiddleware, authController.getUserInfo)

module.exports = router
