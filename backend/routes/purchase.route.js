import express from 'express';
import { 
  purchasePlan, 
  getUserProfitAndPlans,
  updateEarnings ,
  getUserDetails,
  getReferralDetails,getAllUsers,getUserById,getAllPurchasedPlans,updatePlanState
} from '../controllers/purchase.controller.js';
import protect from '../utils/protectroute.js';

const router = express.Router();

router.get('/referral-details/:id', protect, getReferralDetails);

// Updated route without authentication check
router.post('/purchase/:userId', purchasePlan);

router.get('/profits-plans',protect, getUserProfitAndPlans);

router.patch('/update-earnings', protect, updateEarnings);
router.get("/user/:id", getUserDetails);
router.get("/alluser", getAllUsers); // Fetch all users
router.get("/:id", getUserById); // Fetch user details by ID
router.get('/users/plans', getAllPurchasedPlans);
router.patch('/updateState', updatePlanState);

export default router;
