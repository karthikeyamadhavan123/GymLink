const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoute");
const gymRoutes = require("./routes/gymRoute");
const trainerRoutes = require("./routes/trainerRoute");
const JobPostingRoutes = require("./routes/jobRoute");
const JobApplicantsRoutes = require("./routes/jobApplicationRoute");
const AichatRoutes = require("./routes/chatRoute");
require("dotenv").config();
const cookieParser = require("cookie-parser");

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("Database Connected");
}
// middlewares
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use("/api/users", userRoutes);
app.use("/gym", gymRoutes);
app.use("/trainers", trainerRoutes);
app.use("/jobs", JobPostingRoutes);
app.use("/applicants", JobApplicantsRoutes);
app.use("/chat", AichatRoutes);
app.listen(process.env.PORT, () => {
  console.log("Server running on port: " + process.env.PORT);
});
