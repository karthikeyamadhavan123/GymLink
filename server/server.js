const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoute');
const gymRoutes = require('./routes/gymRoute')
const trainerRoutes = require('./routes/trainerRoute')
const JobPostingRoutes = require('./routes/jobRoute')
const JobApplicantsRoutes = require('./routes/jobApplicationRoute')
require("dotenv").config();


main().catch(err => console.log(err));
async function main() {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Database Connected');

}
// middlewares
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));
app.use('/api/users', userRoutes);
app.use('/gym', gymRoutes);
app.use('/trainers', trainerRoutes);
app.use('/jobs', JobPostingRoutes);
app.use('/applicants', JobApplicantsRoutes);
app.listen(process.env.PORT, () => {
    console.log("Server running on port: " + process.env.PORT);
})