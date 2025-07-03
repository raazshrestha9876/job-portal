import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
import { deleteJob, getAllJobsForRecruiter, getJobDetailsForRecruiter, postJob, updateJob } from '../controllers/job.controller.js';
import { deleteJobValidation, postJobValidation, updateJobValidation } from '../validators/job.validator.js';
import { validate } from '../middleware/validator.js';
import { authorizeRole } from '../middleware/authorizeRole.js';

const router = express.Router();

router.post('/post', postJobValidation, validate, verifyToken, authorizeRole('recruiter'), postJob);
router.get('/get-recruiter-jobs', verifyToken, authorizeRole('recruiter'), getAllJobsForRecruiter);
router.get('/get-recruiter-job/:id', verifyToken, authorizeRole('recruiter'), getJobDetailsForRecruiter);
router.put('/update/:id',updateJobValidation, validate, verifyToken, authorizeRole('recruiter'), updateJob);
router.delete('/delete/:id', deleteJobValidation, validate, verifyToken, authorizeRole('recruiter'), deleteJob);

export default router;