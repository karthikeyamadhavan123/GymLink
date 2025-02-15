const mongoose = require("mongoose");
const { Schema } = mongoose;

const jobApplicationSchema = new Schema(
  {
    appliedUser: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    previousWork: {
      type: String,
      default: "No where",
      required:true
    },
    previousExperience: {
      type: Number,
      min: 0,
      default: 0,
      required:true
    },
    invoiceDays: {
      type: Number,
      min: 0,
      default: 0,
    },
    resume: {
      type: String,
      required: true,
    },
    status:{
      type:String,
      enum:["Pending","Rejected","Accepted"],
      default:"Pending"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("JobApplication", jobApplicationSchema);