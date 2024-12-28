import express from 'express';
import { getUserStatistics } from '../controllers/totaldata.controller.js'; // Assuming the controller is in controllers folder

const router = express.Router();

// Define the route for getting user statistics
router.get('/user-statistics', getUserStatistics);

export default router;
