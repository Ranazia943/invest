import express from "express";
import {
  addPlan,
  fetchAllPlans,
  deletePlan, 
} from "../controllers/plans.controller.js";

const router = express.Router();

// Route to Add a New Plan
router.post("/add", addPlan);

// Route to Fetch All Plans
router.get("/all", fetchAllPlans);

// Route to Update a Plan

// Route to Delete a Plan
router.delete("/delete/:id", deletePlan);

export default router;
