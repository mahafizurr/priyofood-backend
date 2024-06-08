require("dotenv").config();

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

// Middleware
app.use(express.json()); // Built-in middleware for parsing JSON

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

const billingSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  district: { type: String, required: true },
  fullAddress: { type: String, required: true },
  transactionNumber: { type: String, required: true },
  country: { type: String, default: "Bangladesh" },
});

const Billing = mongoose.model("Billing", billingSchema);

app.post("/billingDetails", async (req, res) => {
  try {
    const billing = new Billing(req.body);
    await billing.save();
    res.status(201).send(billing);
  } catch (error) {
    console.error("Error saving billing details:", error);
    res.status(400).send({ error: "Failed to save billing details" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
