import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    referrals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    referredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    referralCode: { type: String, unique: true },
    image: { type: String, default: null },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
