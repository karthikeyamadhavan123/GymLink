const express = require('express');
const router = express.Router();
const tokenVerification=require('../jwt/tokenVerification')
const gymController = require('../controllers/gymController.js');
const {upload} = require('../util/cloudinary.js');
router.post('/new',tokenVerification, upload.array('gymImages',5),gymController.createGym)
router.get('/all',tokenVerification,gymController.fetchAllGyms)
router.get('/search',tokenVerification,gymController.filterBySearch)
router.get('/:gymId',tokenVerification,gymController.fetchGymsById)
router.put('/:gymId/edit',tokenVerification,gymController.editGyms)
router.delete('/:gymId/delete',tokenVerification,gymController.deleteGyms)
module.exports = router;