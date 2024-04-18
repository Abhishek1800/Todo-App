require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const todoRoutes = require("./routes/todoRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/todos", todoRoutes);
app.use("/api/users", userRoutes);
const dbURI = 'mongodb://localhost:27017/todo';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log("Server is running on port", PORT);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
