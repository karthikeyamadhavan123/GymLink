const Gym = require("../models/gymSchema");
const cloudinary = require("cloudinary").v2;
const User = require("../models/userSchema");
const { sendGymCreationSuccessful } = require("../nodemailer/nodemailer");

const createGym = async (req, res) => {
  try {
    const { userId } = req.userId;
    if (!userId) {
      return res
        .status(403)
        .json({ message: "Please login to create your gym", success: false });
    }

    const { gymName, location, basePrice } = req.body;
    const equipments = req.body.equipments.split(",").map((e) => e.trim());

    if (!gymName) {
      return res
        .status(400)
        .json({ message: "Please enter gym name", success: false });
    }

    if (equipments.length === 0) {
      return res.status(400).json({
        message: "At least one equipment is required",
        success: false,
      });
    }

    if (!location) {
      return res
        .status(400)
        .json({ message: "Please enter location of gym", success: false });
    }

    if (basePrice < 0) {
      return res
        .status(400)
        .json({ message: "Please enter a valid base price", success: false });
    }

    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Image is required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "No user found with this ID" });
    }

    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ success: false, message: "Only admins can create a gym" });
    }

    let imageUrls = [];
    try {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "gym_images",
          resource_type: "image",
          allowed_formats: ["jpeg", "jpg", "png"],
        });
        imageUrls.push(result.secure_url);
      }
    } catch (uploadError) {
      return res
        .status(500)
        .json({ message: "Image upload failed", success: false });
    }

    const newGym = new Gym({
      gymName,
      location,
      owner: userId,
      equipments: equipments,
      basePrice,
      gymImages: imageUrls,
    });

    await newGym.save();
    await sendGymCreationSuccessful(user.email, gymName);
    return res.status(201).json({
      success: true,
      message: "Gym created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

const fetchAllGyms = async (req, res) => {
  try {
    const gyms = await Gym.find({}).select(
      "gymName location basePrice equipments"
    );

    if (!gyms.length) {
      return res.status(404).json({ success: false, message: "No gyms found" });
    }

    return res.status(200).json({
      success: true,
      message: "Gyms fetched successfully",
      gyms,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const fetchGymsById = async (req, res) => {
  try {
    const { gymId } = req.params;
    if (!gymId) {
      return res
        .status(400)
        .json({ success: false, message: "No gym id provided" });
    }
    const gym = await Gym.findById(gymId)
      .select("gymName location basePrice equipments gymImages")
      .populate({
        path: "owner",
        select: "firstName email phone_number age gender",
      });
    if (!gym) {
      return res.status(404).json({ message: "No gym Found", success: false });
    }
    return res.status(200).json({
      success: true,
      message: "Gyms fetched successfully",
      gym,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const editGyms = async (req, res) => {
  try {
    const { gymId } = req.params;
    const { userId } = req.userId; // Extract userId correctly

    if (!gymId) {
      return res
        .status(400)
        .json({ success: false, message: "No gym ID provided" });
    }
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "No user ID provided" });
    }

    const { editedgymName, editedlocation, editedbasePrice, editedequipments } =
      req.body;

    if (
      !editedgymName &&
      !editedlocation &&
      !editedbasePrice &&
      !editedequipments
    ) {
      return res.status(400).json({
        success: false,
        message: "At least one field is required to edit",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "No user found with this ID" });
    }

    const gym = await Gym.findById(gymId);
    if (!gym) {
      return res
        .status(404)
        .json({ success: false, message: "No gym found with this ID" });
    }

    // Check if user is the owner and an admin
    if (String(gym.owner._id) !== userId && user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to edit this gym",
      });
    }

    // Update fields only if they are provided
    if (editedgymName) gym.gymName = editedgymName;
    if (editedlocation) gym.location = editedlocation;
    if (editedbasePrice) gym.basePrice = editedbasePrice;
    if (editedequipments)
      gym.equipments = [
        ...gym.equipments,
        ...editedequipments.split(",").map((e) => e.trim()),
      ];

    await gym.save();

    return res.status(200).json({
      success: true,
      message: "Gym edited successfully",
      gym,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
const deleteGyms = async (req, res) => {
  try {
    const { gymId } = req.params;
    const { userId } = req.userId; // Extract userId correctly

    if (!gymId) {
      return res
        .status(400)
        .json({ success: false, message: "No gym ID provided" });
    }
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "No user ID provided" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "No user found with this ID" });
    }

    const gym = await Gym.findById(gymId);
    if (!gym) {
      return res
        .status(404)
        .json({ success: false, message: "No gym found with this ID" });
    }

    // Check if user is the owner and an admin
    if (String(gym.owner._id) !== userId && user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to edit this gym",
      });
    }
    await gym.deleteOne();
    return res.status(200).json({
      success: true,
      message: "Gym deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  createGym,
  fetchAllGyms,
  fetchGymsById,
  editGyms,
  deleteGyms,
};
