import express from 'express';
import { ingestLog, searchLogs } from '../controllers/logController';

const router = express.Router();

router.post('/logs', ingestLog);
router.post('/logs/search', searchLogs);

export default router;
