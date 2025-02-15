const jobApplication = require("../models/jobApplicationSchema");
const JobPosting = require("../models/jobSchema"); // Import JobPosting model
const User = require("../models/userSchema");
const cloudinary = require("cloudinary").v2;
const applyforJobPosting = async (req, res) => {
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
    if (user.role !== "user") {
      return res.status(400).json({ message: "Users can only apply" });
    }

    // Extract gymId from request parameters
    const { jobId } = req.params;
    if (!jobId) {
      return res.status(400).json({ message: "jobId is required." });
    }

    // Check if the gym exists
    const postedJob = await JobPosting.findById(jobId);
    if (!postedJob) {
      return res
        .status(404)
        .json({ message: "Please check whether you have registered a job!" });
    }

    // Extract job details from request body
    const { previousWork, previousExperience, invoiceDays } = req.body;
    if (
      !previousWork ||
      previousExperience === undefined ||
      invoiceDays === undefined
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }
    let application = "";

    if (req.file) {
      const imageUpload = await cloudinary.uploader.upload(req.file.path, {
        folder: "userResume",
        resource_type: "raw",
      });
      application = imageUpload.secure_url;
    } else {
      return res.status(400).json({
        message: "User Resume is required",
        success: false,
      });
    }
    const newJobApplication = new jobApplication({
      previousWork,
      previousExperience,
      invoiceDays,
      resume: application,
      appliedUser: userId,
    });

    await newJobApplication.save();

    // Update the gym document to include this job posting
    postedJob.appliedJobApplicants.push(newJobApplication._id);
    await postedJob.save();

    return res.status(201).json({ message: "Job Applied successfully!" });
  } catch (error) {
    console.error("Error posting job:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const getJobApplicationofCurrentUser = async (req, res) => {
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
    if (user.role !== "user") {
      return res.status(400).json({ message: "Users can only view" });
    }
    const myApplications = await jobApplication.find({ appliedUser: userId });
    if (!myApplications) {
      return res.status(400).json({ message: "You have no applications" });
    }
    return res.status(200).json({
      message: "Applications fetched successfully!",
      applications: myApplications,
    });
  } catch (error) {
    console.error("Error posting job:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const getApplicationsOfGym = async (req, res) => {
  try {
    const { userId } = req.userId;
    const { jobId } = req.params; // Extract userId from request (Ensure it's passed via middleware)
    if (!userId) {
      return res.status(400).json({ message: "Please login to continue." });
    }
    if (!jobId) {
      return res.status(400).json({ message: "Please provide a valid job" });
    }

    // Fetch user details
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found. Please register first." });
    }
    if (user.role !== "admin") {
      return res.status(400).json({ message: "Admins can only view" });
    }
    const myApplications = await JobPosting.findById(jobId)
      .populate({
        path: "appliedJobApplicants",
      })
      .select(
        "-jobTitle -requirements -jobDetails -experienceRequired -salary -_id -postedBy"
      );
    if (!myApplications) {
      return res.status(400).json({ message: "You have no applications" });
    }
    return res.status(200).json({
      message: "Applications fetched successfully!",
      applications: myApplications,
    });
  } catch (error) {
    console.error("Error posting job:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const deleteForUser = async (req, res) => {
  try {
    const { userId } = req.userId;
    const { applicationId, jobId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: "Please login to continue." });
    }
    if (!applicationId) {
      return res
        .status(400)
        .json({ message: "Please provide a valid application" });
    }
    if (!jobId) {
      return res.status(400).json({ message: "Please provide a valid job" });
    }
    const job = await JobPosting.findById(jobId);
    if (!job) {
      return res
        .status(404)
        .json({ success: false, message: "No job found with this ID" });
    }
    const deleteapplication = await jobApplication.findById(applicationId);
    if (!deleteapplication) {
      return res
        .status(404)
        .json({ success: false, message: "No application found with this ID" });
    }
    if (String(deleteapplication.appliedUser._id) !== String(userId)) {
      return res.status(401).json({
        success: false,
        message: "You are not authorized delete this application",
      });
    }
    job.appliedJobApplicants.pull(applicationId);
    await job.save();
    await deleteapplication.deleteOne();
    return res
      .status(200)
      .json({ message: "You have withdrawn your application", success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
const AcceptjobApplication = async (req, res) => {
  try {
    const { userId } = req.userId;
    const { applicationId, jobId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: "Please login to continue." });
    }

    if (!applicationId) {
      return res
        .status(400)
        .json({ message: "Please provide a valid application" });
    }
    if (!jobId) {
      return res.status(400).json({ message: "Please provide a valid job" });
    }
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
    const job = await JobPosting.findById(jobId).populate({
      path: "postedBy",
      populate: { path: "owner" }, // Gym's owner reference
    });
    if (!job) {
      return res
        .status(404)
        .json({ success: false, message: "No job found with this ID" });
    }
    const acceptApplication = await jobApplication.findById(applicationId);
    if (!acceptApplication) {
      return res
        .status(404)
        .json({ success: false, message: "No application found with this ID" });
    }
    if (
      String(job.postedBy.owner._id) !== String(userId) ||
      user.role !== "admin"
    ) {
      return res.status(401).json({
        success: false,
        message: "You are not authorized accept this application",
      });
    }
    acceptApplication.status = "Accepted";
    await acceptApplication.save();
    return res
      .status(200)
      .json({
        message: "The owner  has accepted your application",
        success: true,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
const RejectjobApplication = async (req, res) => {
  try {
    const { userId } = req.userId;
    const { applicationId, jobId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: "Please login to continue." });
    }

    if (!applicationId) {
      return res
        .status(400)
        .json({ message: "Please provide a valid application" });
    }
    if (!jobId) {
      return res.status(400).json({ message: "Please provide a valid job" });
    }
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
    const job = await JobPosting.findById(jobId).populate({
      path: "postedBy",
      populate: { path: "owner" }, // Gym's owner reference
    });
    if (!job) {
      return res
        .status(404)
        .json({ success: false, message: "No job found with this ID" });
    }
    const rejectApplication = await jobApplication.findById(applicationId);
    if (!rejectApplication) {
      return res
        .status(404)
        .json({ success: false, message: "No application found with this ID" });
    }
    if (
      String(job.postedBy.owner._id) !== String(userId) ||
      user.role !== "admin"
    ) {
      return res.status(401).json({
        success: false,
        message: "You are not authorized reject this application",
      });
    }
    rejectApplication.status = "Rejected";
    await rejectApplication.save();
    return res
      .status(200)
      .json({
        message: "The owner  has rejected your application",
        success: true,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};


module.exports = {
  applyforJobPosting,
  getJobApplicationofCurrentUser,
  getApplicationsOfGym,
  deleteForUser,
  AcceptjobApplication,
  RejectjobApplication
};
