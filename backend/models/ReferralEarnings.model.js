import mongoose from 'mongoose';

const referralEarningsSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Referring user
    referredUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User who purchased the plan
    dailyProfitShare: { type: Number, required: true }, // 10% of the referred user's daily profit (if needed)
    totalEarned: { type: Number, default: 0 }, // Total amount earned from referrals
  },
  { timestamps: true }
);

const ReferralEarnings = mongoose.model('ReferralEarnings', referralEarningsSchema);

export default ReferralEarnings;
