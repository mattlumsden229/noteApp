const express = require('express')
const router = express.Router()
const homeController = require('../controller/homeContoller')
const authController = require('../controller/authController') 
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', homeController.homePage)
router.get('/login', authController.getLogin)
router.get('/signup', authController.getSignup)
router.post('/login', authController.postLogin)
router.post('/signup', authController.postSignup)
module.exports = router