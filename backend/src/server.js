const express = require("express");
const cors =require("cors")
const dotenv = require("dotenv");
const noteRoute = require("./routes/noteRoutes");
const { connectDB } = require("./config/db");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

connectDB();


app.use(cors())

app.use(express.json())

app.use("/api/notes", noteRoute);


app.listen(PORT, () => {
  console.log("Server started on Port :", PORT);
});
