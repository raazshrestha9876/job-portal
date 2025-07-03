import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
import { getAllJobsForRecruiter, getJobDetailsForRecruiter, postJob } from '../controllers/job.controller.js';
import { postJobValidation } from '../validators/job.validator.js';
import { validate } from '../middleware/validator.js';
import { authorizeRole } from '../middleware/authorizeRole.js';

const router = express.Router();

router.post('/post', postJobValidation, validate, verifyToken, authorizeRole('recruiter'), postJob);
router.get('/get-recruiter-jobs', verifyToken, authorizeRole('recruiter'), getAllJobsForRecruiter);
router.get('/get-recruiter-job/:id', verifyToken, authorizeRole('recruiter'), getJobDetailsForRecruiter);

// router.get('/getadminjobs', verifyToken, getAdminJobs);

// router.put('/update/:id', verifyToken, updateJob);
// router.delete('/delete/:id', verifyToken, deleteJob);

export default router;