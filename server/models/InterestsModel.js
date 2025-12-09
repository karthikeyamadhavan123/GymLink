const mongoose = require("mongoose");
const { Schema } = mongoose;

const interestSchema = new Schema({
  interests: {
    type: [String],
  },
});

const Interests = mongoose.model("Interests", interestSchema);

module.exports = Interests;
