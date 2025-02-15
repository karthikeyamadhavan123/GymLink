const express = require('express');
const router = express.Router();
const tokenVerification=require('../jwt/tokenVerification')
const postJobApplicationController = require('../controllers/jobApplicatonController');
const {uploadResume}=require('../util/cloudinary')
router.post('/:jobId/apply',tokenVerification,uploadResume.single('userResume'),postJobApplicationController.applyforJobPosting)
router.get('/all',tokenVerification,postJobApplicationController.getJobApplicationofCurrentUser)
router.get('/:jobId/all/admins',tokenVerification,postJobApplicationController.getApplicationsOfGym)
router.delete('/:jobId/:applicationId/delete',tokenVerification,postJobApplicationController.deleteForUser)
router.put("/accept/:jobId/:applicationId", tokenVerification, postJobApplicationController.AcceptjobApplication);
router.put("/reject/:jobId/:applicationId", tokenVerification, postJobApplicationController.RejectjobApplication);
module.exports = router;