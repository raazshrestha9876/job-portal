import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
import { postJob, getAllJobs, getJobById, getAdminJobs, updateJob, deleteJob } from '../controllers/job.controller.js';

const router = express.Router();

router.post('/post', verifyToken, postJob);
router.get('/get', verifyToken, getAllJobs);
router.get('/getadminjobs', verifyToken, getAdminJobs);
router.get('/get/:id', verifyToken, getJobById);
router.put('/update/:id', verifyToken, updateJob);
router.delete('/delete/:id', verifyToken, deleteJob);

export default router;