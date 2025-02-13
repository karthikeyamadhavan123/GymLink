const express = require('express');
const router = express.Router();
const ExistingUser = require('../Middleware/ExistingUser.js');
const registerController = require('../controllers/userController.js');
const {upload} = require('../util/cloudinary.js');
const tokenVerification=require('../jwt/tokenVerification')
router.post('/register', upload.single('avatar'),ExistingUser.existingUser,registerController.Register)
router.post('/login',registerController.Login)
router.post('/logout',tokenVerification,registerController.Logout)
router.post('/forgot-password',registerController.forgotPassword)
router.post('/reset-password/:token',registerController.resetPassword)

module.exports = router;