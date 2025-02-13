const Trainer = require("../models/TrainerSchema");
const Gym = require("../models/gymSchema");
const cloudinary = require("cloudinary").v2;

const addTrainer = async (req, res) => {
  try {
    const { userId } = req.userId; // Extract userId from tokenVerification middleware
    const { gymId } = req.params; // Extract gymId from URL params

    if (!userId) {
      return res.status(403).json({
        message: "Please log in to add a trainer",
        success: false,
      });
    }

    // Extract trainer details from request body
    const { trainerName, expertise, experience, contactNumber, description } =
      req.body;

    if (
      !trainerName ||
      !expertise ||
      !experience ||
      !contactNumber ||
      !description
    ) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    // Ensure expertise is an array
    const expertiseArray = expertise.split(",").map((e) => e.trim());

    // Check if gym exists
    const gym = await Gym.findById(gymId);
    if (!gym) {
      return res.status(404).json({
        message: "Gym not found",
        success: false,
      });
    }

    // Ensure user is the gym owner
    if (String(gym.owner._id) !== userId) {
      return res.status(403).json({
        message: "Only the gym owner can add trainers",
        success: false,
      });
    }

    // Handle image upload with Cloudinary
    let trainerImageUrl = "";

    if (req.file) {
      const imageUpload = await cloudinary.uploader.upload(req.file.path, {
        folder: "trainer_images",
        resource_type: "image",
        allowed_formats: ["jpeg", "jpg", "png"],
      });
      trainerImageUrl = imageUpload.secure_url;
    } else {
      return res.status(400).json({
        message: "Trainer image is required",
        success: false,
      });
    }

    // Create new trainer
    const newTrainer = new Trainer({
      trainerName,
      expertise: expertiseArray,
      experience,
      contactNumber,
      trainerImage: trainerImageUrl,
      gymId,
      description,
    });

    await newTrainer.save();
    gym.trainers.push(newTrainer._id);
    await gym.save();
    return res.status(201).json({
      success: true,
      message: "Trainer added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

const addCertification = async (req, res) => {
  try {
    const { userId } = req.userId; // Extract userId from tokenVerification middleware
    const { gymId, trainerId } = req.params; // Extract gymId from URL params

    if (!userId) {
      return res.status(403).json({
        message: "Please log in to add a trainer",
        success: false,
      });
    }

    // Check if gym exists
    const gym = await Gym.findById(gymId);
    if (!gym) {
      return res.status(404).json({
        message: "Gym not found",
        success: false,
      });
    }

    // Ensure user is the gym owner
    if (String(gym.owner._id) !== userId) {
      return res.status(403).json({
        message: "Only the gym owner can add trainers",
        success: false,
      });
    }
    if (!trainerId) {
      return res.status(403).json({
        message: "Please provide a valid  trainerId",
        success: false,
      });
    }
    const trainer = await Trainer.findById(trainerId);
    if (!trainer) {
      return res.status(404).json({
        message: "Trainer not found",
        success: false,
      });
    }

    // Handle image upload with Cloudinary
    let trainerCertification = "";

    if (req.file) {
      const imageUpload = await cloudinary.uploader.upload(req.file.path, {
        folder: "trainer_certifications",
        resource_type: "raw",
      });
      trainerCertification = imageUpload.secure_url;
    } else {
      return res.status(400).json({
        message: "Trainer certificate is required",
        success: false,
      });
    }

    // Create certificate routes
    trainer.certifications=trainerCertification

    await trainer.save();
    return res.status(201).json({
      success: true,
      message: "Trainer certificate added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};
module.exports = { addTrainer,addCertification };
