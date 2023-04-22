const express = require('express')
const adminRouter = express.Router()
const session = require('express-session')
const bodyParser = require('body-parser')

const { isLoggedIn, isLoggedOut } = require('../middlewares/adminAuth')
const { verifyLogin, logoutAdmin, adminDashboard, addUser } = require('../controllers/adminController')

adminRouter.use(bodyParser.json())
adminRouter.use(bodyParser.urlencoded({extended: true}))

adminRouter.post('/login',isLoggedOut, verifyLogin)

adminRouter.post('/logout', isLoggedIn, logoutAdmin)

adminRouter.get('/dashboard', isLoggedIn, adminDashboard)

adminRouter.post('/newUser', isLoggedIn, addUser)

module.exports = adminRouter