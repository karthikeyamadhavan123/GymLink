const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoute');
const gymRoutes = require('./routes/gymRoute')
require("dotenv").config();


main().catch(err => console.log(err));
async function main() {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Database Connected');

}
// middlewares
app.use(express.json());
app.use(cors())
app.use('/api/users', userRoutes);
app.use('/gym', gymRoutes);
app.listen(process.env.PORT, () => {
    console.log("Server running on port: " + process.env.PORT);
})