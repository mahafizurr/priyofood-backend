const mongoose = require("mongoose");

const billingDetailsSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  fullAddress: {
    type: String,
    required: true,
  },
  transactionNumber: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    default: "Bangladesh",
    required: true,
  },
});

const BillingDetails = mongoose.model("BillingDetails", billingDetailsSchema);

module.exports = BillingDetails;
