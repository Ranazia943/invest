import mongoose from "mongoose";

const withdrawalRequestSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed', 'rejected'],
      default: 'pending',
    },
    requestDate: { type: Date, default: Date.now },
    processedDate: { type: Date, default: null },
    balanceBeforeRequest: { type: Number, required: true },

    // Payment gateway information
    paymentGateway: {
      type: String,
      enum: ['JazzCash', 'EasyPaisa', 'Bank Transfer'],
      required: true,
    },
    gatewayAccountName: { type: String, required: true },
    gatewayAccountNumber: { type: String, required: true },

    // Admin response fields
    adminScreenshot: { type: String }, // URL or path to the uploaded screenshot
    adminSummary: { type: String },   // Summary added by admin
  },
  { timestamps: true }
);

const WithdrawalRequest = mongoose.model('WithdrawalRequest', withdrawalRequestSchema);

export default WithdrawalRequest;
