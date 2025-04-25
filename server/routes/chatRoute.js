const express = require('express');
const router = express.Router();
const tokenVerification=require('../jwt/tokenVerification')
const AiChatController = require('../controllers/AIChatController');

router.post(['/new', '/:chatId/new'],tokenVerification,AiChatController.newChat)
module.exports=router