import mongoose from 'mongoose';

const earningsSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    totalEarnings: { type: Number, default: 0 }, // Total amount earned
    dailyEarnings: [
      {
        date: { type: Date, required: true },
        amount: { type: Number, required: true },
      },
    ], // Tracks daily earnings
  },
  { timestamps: true }
);

const Earnings = mongoose.model('Earnings', earningsSchema);

export default Earnings;
