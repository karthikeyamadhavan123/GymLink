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

    const {
      gymName,
      basePrice,
      streetName,
      area,
      landmark = "",
      city,
      state,
      pincode,
    } = req.body;
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

    if (!streetName) {
      return res
        .status(400)
        .json({ message: "Please enter streetName", success: false });
    }
    if (!area) {
      return res
        .status(400)
        .json({ message: "Please enter area", success: false });
    }
    if (!city) {
      return res
        .status(400)
        .json({ message: "Please enter city", success: false });
    }
    if (!state) {
      return res
        .status(400)
        .json({ message: "Please enter state", success: false });
    }
    if (!pincode) {
      return res
        .status(400)
        .json({ message: "Please enter valid pincode", success: false });
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
      location: {
        streetName: streetName,
        area: area,
        landmark: landmark,
        city: city,
        state: state,
        pincode: pincode,
      },
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
      "gymName location basePrice equipments gymImages"
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
    console.log(gymId);
    
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

const editGyms = async (req, res) => { // should change
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

    const { editedgymName, editedstreetName,editedarea,editedlandmark,editedcity,editedstate,editedpincode, editedbasePrice, editedequipments } =
      req.body;

    if (
      !editedgymName &&
      !editedstreetName &&
      !editedbasePrice &&
      !editedequipments&& !editedarea&&!editedlandmark && !editedcity
      &&!editedstate && !editedpincode
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
    if (String(gym.owner._id) !== userId || user.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: "You are not authorized to edit this gym",
      });
    }

    // Update fields only if they are provided
    if (editedgymName) gym.gymName = editedgymName;
    if (editedstreetName) gym.location.streetName = editedstreetName;
    if (editedarea) gym.location.area = editedarea;
    if (editedlandmark) gym.location.landmark = editedlandmark;
    if (editedcity) gym.location.city = editedcity;
    if (editedstate) gym.location.state = editedstate;
    if (editedpincode) gym.location.pincode = editedpincode;
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

    // Check if user is the owner and an admin BEFORE deleting
    if (String(gym.owner._id) !== userId || user.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: "You are not authorized to delete this gym",
      });
    }

    // Now delete the gym
    await Gym.findByIdAndDelete(gymId);

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

// fitering by  location, price,state
// after by ratings and trainers
const filterBySearch = async (req, res) => {
  try {
    const { city, state, price } = req.query;
    if (!city && !state && !price) {
      return res.status(400).json({
        success: false,
        message: "At least one parameter is required",
      });
    }
    let query = {};

    if (city) {
      query["location.city"] = city; // Use dot notation to query nested fields
    }
    if (state) {
      query["location.state"] = state;
    }
    if (price) {
      query.basePrice = price;
    }

    const filteredGyms = await Gym.find(query).select(
      "gymName location basePrice equipments"
    );
    if (!filteredGyms.length) {
      return res
        .status(200)
        .json({ success: true, message: "No Gyms Found with that filters" });
    }

    res.status(200).json({ success: true, gyms: filteredGyms });
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
  filterBySearch,
};
