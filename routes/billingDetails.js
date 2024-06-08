const express = require("express");
const router = express.Router();
const BillingDetails = require("../models/billingDetails");

// Create new billing details
router.post("/", async (req, res) => {
  try {
    const billingDetails = new BillingDetails(req.body);
    await billingDetails.save();
    res.status(201).send(billingDetails);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Read all billing details
router.get("/", async (req, res) => {
  try {
    const billingDetails = await BillingDetails.find();
    res.status(200).send(billingDetails);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Read billing details by ID
router.get("/:id", async (req, res) => {
  try {
    const billingDetails = await BillingDetails.findById(req.params.id);
    if (!billingDetails) {
      return res.status(404).send();
    }
    res.status(200).send(billingDetails);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update billing details by ID
router.patch("/:id", async (req, res) => {
  try {
    const billingDetails = await BillingDetails.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!billingDetails) {
      return res.status(404).send();
    }
    res.status(200).send(billingDetails);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete billing details by ID
router.delete("/:id", async (req, res) => {
  try {
    const billingDetails = await BillingDetails.findByIdAndDelete(
      req.params.id
    );
    if (!billingDetails) {
      return res.status(404).send();
    }
    res.status(200).send(billingDetails);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
