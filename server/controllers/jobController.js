const Gym = require("../models/gymSchema");
const JobPosting = require("../models/jobSchema"); // Import JobPosting model
const User = require("../models/userSchema");
const Notification = require("../models/notificationSchema");
const createJobPosting = async (req, res) => {
  try {
    const { userId } = req.userId; // Extract userId from request (Ensure it's passed via middleware)
    if (!userId) {
      return res.status(400).json({ message: "Please login to continue." });
    }

    // Fetch user details
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found. Please register first." });
    }

    // Extract gymId from request parameters
    const { gymId } = req.params;
    if (!gymId) {
      return res.status(400).json({ message: "gymId is required." });
    }

    // Check if the gym exists
    const postedGym = await Gym.findById(gymId);
    if (!postedGym) {
      return res
        .status(404)
        .json({ message: "Please check whether you have registered a gym!" });
    }

    // Extract job details from request body
    const { jobTitle, requirements, jobDetails, experienceRequired, salary } =
      req.body;
    if (
      !jobTitle ||
      !requirements ||
      !jobDetails ||
      experienceRequired === undefined ||
      salary === undefined
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Create and save the new job posting
    if (
      String(postedGym.owner._id) !== String(userId) ||
      user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ message: "You are not allowed to create a job." });
    }
    const newJob = new JobPosting({
      jobTitle,
      requirements,
      jobDetails,
      experienceRequired,
      postedBy: gymId,
      salary: salary,
    });

    await newJob.save();

    // Update the gym document to include this job posting
    // create a new notification
    postedGym.jobs.push(newJob._id);
    await postedGym.save();

    return res.status(201).json({ message: "Job posted successfully!" });
  } catch (error) {
    console.error("Error posting job:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const getJobPosting = async (req, res) => {
  try {
    const jobs = await JobPosting.find({})
      .populate({
        path: "postedBy",
        select: "gymName location",
        populate: {
          path: "owner",
          select: "firstName",
        },
      })
      .select("jobTitle requirements jobDetails experienceRequired salary");

    return res
      .status(200)
      .json({ message: "Job fetched successfully!", job: jobs });
  } catch (error) {
    console.error("Error posting job:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const getJobPostingByGym = async (req, res) => {
  try {
    const { userId } = req.userId;
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "Please Login and try again!!" });
    }
    const jobs = await Gym.find({ owner: userId })
      .populate({
        path: "jobs",
        select: "jobTitle requirements jobDetails experienceRequired salary",
      })
      .select(
        "-gymName -owner -equipments -gymImages -basePrice -trainers -owner -_id"
      );
    if (jobs.length === 0) {
      res.status(400).json({ message: "You have no jobs posted!", job: jobs });
    }
    return res
      .status(200)
      .json({ message: "My jobs fetched successfully!", job: jobs });
  } catch (error) {
    console.error("Error posting job:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const editJobPosting = async (req, res) => {
  try {
    const { userId } = req.userId;
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "Please Login and try again!!" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not exist!!" });
    }

    const { jobId } = req.params;
    if (!jobId) {
      return res.status(400).json({
        success: false,
        message: "Please provide particular job to edit!!!",
      });
    }
    const editjob = await JobPosting.findById(jobId).populate({
      path: "postedBy",
      populate: { path: "owner" }, // Gym's owner reference
    });
    if (!editjob) {
      return res.status(404).json({
        success: false,
        message: "Job you trying to edit does not exist!!",
      });
    }
    const { jobTitle, jobDetails, requirements, experienceRequired, salary } =
      req.body;
    if (
      !jobTitle &&
      !requirements &&
      !jobDetails &&
      experienceRequired === undefined &&
      salary === undefined
    ) {
      return res
        .status(400)
        .json({ message: "Atleast one field is required." });
    }

    if (
      String(editjob.postedBy.owner._id) !== String(userId) ||
      user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ message: "You are not authorized to edit this job!!" });
    }

    if (jobTitle) {
      editjob.jobTitle = jobTitle;
    }
    if (jobDetails) {
      editjob.jobDetails = jobDetails;
    }
    if (requirements) {
      editjob.requirements = requirements;
    }
    if (experienceRequired) {
      editjob.experienceRequired = experienceRequired;
    }
    if (salary) {
      editjob.salary = salary;
    }
    await editjob.save();
    return res
      .status(200)
      .json({ message: "Job edited successfully!", success: true });
  } catch (error) {
    console.error("Error posting job:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const deleteJobPosting = async (req, res) => {
  try {
    const { userId } = req.userId;
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "Please Login and try again!!" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not exist!!" });
    }

    const { jobId } = req.params;
    if (!jobId) {
      return res.status(400).json({
        success: false,
        message: "Please provide particular job to edit!!!",
      });
    }
    const gym = await Gym.findOne({ jobs: jobId });
    if (!gym) {
      return res.status(404).json({
        success: false,
        message: "Job you trying to find does not exist!!",
      });
    }
    const deletejob = await JobPosting.findById(jobId).populate({
      path: "postedBy",
      populate: { path: "owner" }, // Gym's owner reference
    });
    if (!deletejob) {
      return res.status(404).json({
        success: false,
        message: "Job you trying to delete does not exist!!",
      });
    }
    if (
      String(deletejob.postedBy.owner._id) !== String(userId) ||
      user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this job!!" });
    }
    gym.jobs.pull(jobId);
    await gym.save();
    await JobPosting.findByIdAndDelete(jobId);
    return res
      .status(200)
      .json({ message: "Job deleted successfully!", success: true });
  } catch (error) {
    console.error("Error posting job:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({}).populate({
      path: "jobNotification",
      select: "createdAt updatedAt",
      populate: {
        path: "postedBy",
        select: "gymName -_id",
      },
    });
    if (!notifications.length) {
      return res.status(200).json({
        message:
          "There no upcoming alerts we will send you notification when a new  job is posted",
      });
    }
    return res.status(200).json({
      message: "Notifications fetched successfully!",
      notifications: notifications,
    });
  } catch (error) {
    console.error("Error posting job:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
module.exports = {
  createJobPosting,
  getJobPosting,
  getJobPostingByGym,
  editJobPosting,
  deleteJobPosting,
  getNotifications,
};
