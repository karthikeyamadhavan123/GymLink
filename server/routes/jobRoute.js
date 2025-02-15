const express = require('express');
const router = express.Router();
const tokenVerification=require('../jwt/tokenVerification')
const postJobController = require('../controllers/jobController.js');
router.post('/:gymId/new',tokenVerification,postJobController.createJobPosting)
router.get('/all',tokenVerification,postJobController.getJobPosting)
router.get('/my-gyms',tokenVerification,postJobController.getJobPostingByGym)
router.get('/:jobId',tokenVerification,postJobController.getJobPostingByGym)
router.put('/:jobId/edit',tokenVerification,postJobController.editJobPosting)
router.delete('/:jobId/delete',tokenVerification,postJobController.deleteJobPosting)
module.exports = router;