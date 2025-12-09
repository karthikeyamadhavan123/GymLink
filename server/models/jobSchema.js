const mongoose = require("mongoose");
const { Schema } = mongoose;
const Notification = require("../models/notificationSchema");
const jobApplication = require("./jobApplicationSchema");

const jobSchema = new Schema(
  {
    jobTitle: {
      type: String,
      required: true,
    },
    requirements: {
      type: String,
      required: true,
    },
    jobDetails: {
      type: String,
      required: true,
    },
    experienceRequired: {
      type: Number,
      required: true,
      min: 0,
    },
    postedBy: {
      type: Schema.Types.ObjectId,
      ref: "Gym",
      required: true,
    },
    salary: {
      type: Number,
      required: true,
      min: 0,
    },
    appliedJobApplicants: [
      {
        type: Schema.Types.ObjectId,
        ref: "JobApplication",
        default: [],
      },
    ],
  },
  { timestamps: true }
);


jobSchema.post("findOneAndDelete", async function (doc) {
  try {
    const jobId = doc._id;
    await jobApplication.deleteMany({ jobId: jobId });
    await Notification.deleteMany({ jobNotification: jobId });
  } catch (error) {
    console.error("Error creating notification:", error);
    next(error);
  }
});

module.exports = mongoose.model("JobPosting", jobSchema);
