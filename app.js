const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// CORS configuration
app.use(
  cors({
    origin: "https://www.priyofruits.com", // Allow requests from this origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Allow cookies to be sent with requests
  })
);

app.use(express.json());

const billingSchema = new mongoose.Schema({
  fullName: String,
  mobileNumber: String,
  district: String,
  fullAddress: String,
  transactionNumber: String,
  country: { type: String, default: "Bangladesh" },
});

const Billing = mongoose.model("Billing", billingSchema);

app.post("/billingDetails", async (req, res) => {
  try {
    const billing = new Billing(req.body);
    await billing.save();
    res.status(201).send(billing);
  } catch (error) {
    res.status(400).send({ error: "Failed to save billing details" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
