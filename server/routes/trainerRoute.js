const express = require('express');
const router = express.Router();
const tokenVerification=require('../jwt/tokenVerification')
const trainerRoute = require('../controllers/TrainerController');
const { uploadTrainerImage,uploadCertification } = require('../util/cloudinary');
router.post('/:gymId/new',tokenVerification,uploadTrainerImage.single('trainerImage'),trainerRoute.addTrainer)
router.post('/:gymId/:trainerId/add',tokenVerification,uploadCertification.single('trainerCertificate'),trainerRoute.addCertification)
router.get('/:gymId/all',tokenVerification,trainerRoute.getTrainersByGym)
router.put('/:gymId/:trainerId/edit',tokenVerification,trainerRoute.editTrainerProfile)
module.exports=router