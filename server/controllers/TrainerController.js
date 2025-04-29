const Trainer = require("../models/TrainerSchema");
const gymSchema = require("../models/gymSchema");
const Gym = require("../models/gymSchema");
const userSchema = require("../models/userSchema");
const User = require("../models/userSchema");
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
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
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
    if (String(gym.owner._id) !== String(userId) || user.role !== "admin") {
      return res.status(403).json({
        message: "Only the gym admins or owners can add trainers",
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
    if (!gymId) {
      return res.status(403).json({
        message: "Please provide a valid gymId",
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
    trainer.certifications = trainerCertification;

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

const getTrainersByGym = async (req, res) => {
  try {
    const { gymId } = req.params;
    if (!gymId) {
      return res.status(403).json({
        message: "Please provide a valid gymId",
        success: false,
      });
    }
    const trainersofGym = await Gym.findById(gymId)
      .populate({
        path: "trainers",
        select:
          "trainerName expertise certifications experience contactNumber trainerImage description",
      })
      .select(
        "-location -_id -gymName -owner -equipments -gymImages -basePrice -createdAt -updatedAt"
      );
    if (!trainersofGym) {
      return res.status(400).json({
        success: false,
        message: "There are no gyms with the following id",
      });
    }
    if (trainersofGym.length === 0) {
      return res.status(400).json({
        success: false,
        message: "There are no trainers currently but we are recurting.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Trainers fetched successfully",
      trainer: trainersofGym,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};
const getAllTrainers = async (req, res) => {
  try {
    const alltrainers = await Trainer.find({})
      .populate({
        path: "gymId",
        select: "gymName location -_id",
      })
      .select(
        "certifications trainerName expertise experience contactNumber trainerImage description -_id"
      );
    if (!alltrainers) {
      return res.status(400).json({
        success: false,
        message: "There are no trainers currently but we are recurting.",
      });
    }
    if (alltrainers.length === 0) {
      return res.status(400).json({
        success: false,
        message: "There are no trainers currently but we are recurting.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Trainers fetched successfully",
      trainer: alltrainers,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

const getAllTrainersAdmin = async (req, res) => {
  try {
    const { userId } = req.userId;
    if (!userId) {
      return res.status(403).json({
        message: "Please log in to add a trainer",
        success: false,
      });
    }
    const user = await userSchema.findById(userId)
    if(!user){
      return res.status(404).json({
        message: "User not exists",
        success: false,
      });
    }
    if(user.role!=='admin'){
      return res.status(403).json({
        message: "You are not authorized to see",
        success: false,
      });
    }
    const alltrainers = await gymSchema
      .find({ owner: userId })
      .populate({
        path: "trainers",
        select:
          'trainerName expertise certifications experience contactNumber trainerImage description _id',
      })
      .select("gymName");
    if (alltrainers.length === 0) {
      return res.status(400).json({
        success: false,
        message: "There are no trainers add Trainers.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Trainers fetched successfully",
      trainer: alltrainers,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

const editTrainerProfile = async (req, res) => {
  try {
    const { userId } = req.userId;
    if (!userId) {
      return res.status(403).json({
        message: "Please log in to edit a trainer",
        success: false,
      });
    }
    const { trainerId, gymId } = req.params;

    const { trainerName, expertise, experience, contactNumber, description } =
      req.body;
    if (
      !trainerName &&
      !expertise &&
      !expertise &&
      !experience &&
      !contactNumber &&
      !description
    ) {
      return res.status(403).json({
        message: "Please provide a field to edit ",
        success: false,
      });
    }
    if (!gymId) {
      return res.status(403).json({
        message: "Please provide a valid gymId",
        success: false,
      });
    }
    const gym = await Gym.findById(gymId);
    if (!gym) {
      return res.status(404).json({
        message: "Gym not found please check for the gym you search!!",
        success: false,
      });
    }

    if (!trainerId) {
      return res.status(403).json({
        message: "Please provide a valid trainerId",
        success: false,
      });
    }
    const edittrainersDetails = await Trainer.findById(trainerId);
    if (!edittrainersDetails) {
      return res.status(404).json({
        message: "Trainer not found please check for the trainer you search!!",
        success: false,
      });
    }
    if (String(gym._id) !== String(edittrainersDetails.gymId)) {
      return res.status(401).json({
        message:
          "You are not authorized to edit the trainer as you are not the owner!!",
        success: false,
      });
    }
    if (String(gym.owner._id) !== String(userId)) {
      return res.status(401).json({
        message:
          "You are not authorized to edit the trainer as you are not the owner!!",
        success: false,
      });
    }
    if (trainerName) {
      edittrainersDetails.trainerName = trainerName;
    }
    if (expertise) {
      const expertiseArray = expertise.split(",").map((e) => e.trim());
      if (
        !edittrainersDetails.expertise.includes([
          "Chest and shoulders",
          "Legs",
          "Triceps",
          "Back and Biceps",
          "Cardio",
        ])
      ) {
        edittrainersDetails.expertise = [
          ...edittrainersDetails.expertise,
          ...expertiseArray,
        ];
      } else {
        return res
          .status(403)
          .json({ success: false, message: "Add an other expertise" });
      }
    }
    if (experience) {
      edittrainersDetails.experience = experience;
    }
    if (contactNumber) {
      edittrainersDetails.contactNumber = contactNumber;
    }
    if (description) {
      edittrainersDetails.description = description;
    }
    await edittrainersDetails.save();

    return res.status(200).json({
      success: true,
      message: "Trainers edited successfully",
      trainer: edittrainersDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

const deleteTrainerProfile = async (req, res) => {
  try {
    const { userId } = req.userId;
    if (!userId) {
      return res.status(403).json({
        message: "Please log in to delete a trainer",
        success: false,
      });
    }
    const { trainerId, gymId } = req.params;

    if (!gymId) {
      return res.status(403).json({
        message: "Please provide a valid gymId",
        success: false,
      });
    }
    const gym = await Gym.findById(gymId);
    if (!gym) {
      return res.status(404).json({
        message: "Gym not found please check for the gym you search!!",
        success: false,
      });
    }

    if (!trainerId) {
      return res.status(403).json({
        message: "Please provide a valid trainerId",
        success: false,
      });
    }
    const deletetrainer = await Trainer.findById(trainerId);
    if (!deletetrainer) {
      return res.status(404).json({
        message: "Trainer not found please check for the trainer you search!!",
        success: false,
      });
    }
    if (String(gym._id) !== String(deletetrainer.gymId)) {
      return res.status(401).json({
        message:
          "You are not authorized to delete the trainer as you are not the owner!!",
        success: false,
      });
    }
    if (String(gym.owner._id) !== String(userId)) {
      return res.status(401).json({
        message:
          "You are not authorized to delete the trainer as you are not the owner!!",
        success: false,
      });
    }
    await gym.trainers.pull(trainerId);
    await gym.save();
    await deletetrainer.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Trainers deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  addTrainer,
  addCertification,
  getTrainersByGym,
  editTrainerProfile,
  deleteTrainerProfile,
  getAllTrainers,
  getAllTrainersAdmin,
};
