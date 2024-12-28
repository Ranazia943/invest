import mongoose from 'mongoose';

const planSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: Number, required: true }, // Duration in days
    dailyProfit: { type: Number, required: true }, // Daily profit from this plan
    totalProfit: { type: Number, required: true },
    startDate: { type: Date },
    endDate: { type: Date }, // Total profit from this plan
  
  },
  { timestamps: true }
);

const Plan = mongoose.model('Plan', planSchema);

export default Plan;
