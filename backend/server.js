const express = require("express");
const path = require("path");
const mongoose =require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();

const app = express();
const taskRoutes = require("./routes/taskRoutes");


app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/tasks",taskRoutes);
app.use("/auth",authRoutes);

app.use((req, res) => {
  res.sendFile(require("path").join(__dirname, "public", "index.html"));
});

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB Connected");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch(err => console.log(err));

