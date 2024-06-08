require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const billingDetailsRoutes = require("./routes/billingDetails");

const app = express();
const port = process.env.PORT || 3000;

// Configure CORS
const corsOptions = {
  origin: "https://www.priyofruits.com", // Replace with your frontend URL
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/billingDetails", billingDetailsRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
