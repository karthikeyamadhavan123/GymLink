const express = require("express");
const tokenVerification = require("../jwt/tokenVerification");
const router = express.Router();

router.post("/follow/:recieverId", tokenVerification, followRequestController);
router.post("/follow/:recieverId",tokenVerification,followAcceptController)
router.post("/follow/:senderId",tokenVerification,followBackController)


module.exports = router;
