const mongoose = require("mongoose");
const { Schema } = mongoose;

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

jobSchema.post("save", async function (doc, next) {
  try {
    const Notification = mongoose.model("Notification");

    // Create a notification when a job is posted
    const notification = new Notification({
      notificationMessage: `New job posted: ${doc.jobTitle}`,
      postedBy: doc._id, // Associate the notification with the job
    });

    await notification.save();
    next();
  } catch (error) {
    console.error("Error creating notification:", error);
    next(error);
  }
});
module.exports = mongoose.model("JobPosting", jobSchema);
