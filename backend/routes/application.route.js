import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from '../controllers/application.controller.js';

const router = express.Router();

router.post('/apply/:id', verifyToken, applyJob);
router.get('/get', verifyToken, getAppliedJobs);
router.get('/:id/applicants', verifyToken, getApplicants);
router.put('/status/:id/update', verifyToken, updateStatus);

export default router;