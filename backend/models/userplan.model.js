import mongoose from 'mongoose';

const userPlanSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    planId: { type: mongoose.Schema.Types.ObjectId, ref: 'Plan', required: true },
    state: { 
      type: String, 
      enum: ['active', 'pending', 'rejected', 'completed'], 
      default: 'pending' 
    },
    startDate: { type: Date },
    endDate: { type: Date },
    dailyProfit: { type: Number, required: true },
    totalProfit: { type: Number, required: true },
    paymentGateway: { 
      type: String, 
      required: true, 
      enum: ['EasyPaisa', 'JazzCash', 'Bank Transfer'], // Enforcing payment methods
    },
    paymentScreenshot: { type: String, required: true }, // This should be defined in the schema
    taxId: { type: String, required: true }, // This should be defined in the schema
  },
  { timestamps: true }
);

const UserPlan = mongoose.model('UserPlan', userPlanSchema);

export default UserPlan;
