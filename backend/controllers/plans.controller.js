  import Plan from "../models/plan.model.js";

  // Add a New Plan
  export const addPlan = async (req, res) => {
    const { name, price, duration, dailyProfit, totalProfit, startDate, endDate } = req.body;
  
    try {
      if (!name || !price || !duration) {
        return res.status(400).json({
          message: "Missing required fields",
        });
      }
  
      const calculatedEndDate = endDate ? new Date(endDate) : new Date(startDate);
      calculatedEndDate.setDate(calculatedEndDate.getDate() + duration);
  
      const newPlan = await Plan.create({
        name,
        price,
        duration,
        dailyProfit,
        totalProfit,
        startDate: new Date(startDate),
        endDate: calculatedEndDate,
      });
  
      res.status(201).json({
        message: "Plan added successfully.",
        plan: newPlan,
      });
    } catch (error) {
      console.error(error);  // Log the error on the server for debugging
      res.status(500).json({
        message: "Error adding plan.",
        error: error.message,
      });
    }
  };
  
export const fetchAllPlans = async (req, res) => {
  try {
    const plans = await Plan.find(); // Retrieve all plans from the database
    res.status(200).json({
      message: "Plans fetched successfully.",
      plans,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching plans.",
      error: error.message,
    });
  }
};



// Delete a Plan
export const deletePlan = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPlan = await Plan.findByIdAndDelete(id);

    if (!deletedPlan) {
      return res.status(404).json({ message: "Plan not found." });
    }

    res.status(200).json({
      message: "Plan deleted successfully.",
      plan: deletedPlan,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting plan.",
      error: error.message,
    });
  }
};
