const express = require("express");
const mongoose =require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();

const app = express();
const taskRoutes = require("./routes/taskRoutes");

app.use(cors());
app.use(express.json());
app.use("/tasks",taskRoutes);
app.use("/auth",authRoutes);



mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));

 app.listen(5000,()=> console.log("Server running on port 5000"));