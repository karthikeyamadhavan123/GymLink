const User = require("../models/userSchema");
const cloudinary = require("cloudinary").v2;
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("../jwt/jwt");
const {
  welcomeEmail,
  sendVerificationEmail,
  sendResetEmailSuccessful,
} = require("../nodemailer/nodemailer");
const Intrests = require("../models/InterestsModel");
// register functionality

const Register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      avatar,
      phone_number,
      role,
      location,
      age,
      gender,
    } = req.body;
    if (!firstName) {
      return res
        .status(400)
        .json({ message: "Please enter first name", success: false });
    }
    if (!email) {
      return res
        .status(400)
        .json({ message: "Please enter email", success: false });
    }
    if (!password) {
      return res
        .status(400)
        .json({ message: "Please enter password", success: false });
    }
    if (!phone_number) {
      return res
        .status(400)
        .json({ message: "Please enter phone_number", success: false });
    }
    if (!location) {
      return res
        .status(400)
        .json({ message: "Please enter location", success: false });
    }
    if (!age) {
      return res
        .status(400)
        .json({ message: "Please enter age", success: false });
    }
    if (!gender) {
      return res
        .status(400)
        .json({ message: "Please enter gender", success: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationToken = crypto.randomBytes(16).toString("hex");
    let imageUrl;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "user_images", // You can adjust the folder as per your need
        resource_type: "image", // Specify the resource type as image
        allowed_formats: ["jpeg", "jpg", "png"], // Allow only image formats
      });
      if (result) {
        imageUrl = result.secure_url;
      }
    }
    const newUser = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
      gender: gender,
      phone_number: phone_number,
      location: location,
      age: age,
      avatar: avatar || imageUrl,
      role: role,
      verificationToken: verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });
    await newUser.save();
    await welcomeEmail(email);
    return res.status(201).json({
      success: true,
      message: "User registered Successfully",
      userId: newUser._id,
    });
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required." });
    }
    const user = await User.findOne({ email }).select(
      "+ password firstName avatar role location phone_number gender"
    );
    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res.status(403).json({ message: "Passwords Not Matched." });
    }
    const userId = user._id;
    const token = jwt.createToken({ userId });
    const firstName = user.firstName;
    const avatar = user.avatar;
    const role = user.role;
    const location = user.location;
    const phone_number = user.phone_number;
    const gender = user.gender;
    res.cookie("login", token, {
      httpOnly: true,
      maxAge: 2 * 60 * 60 * 1000,
      path: "/",
      sameSite: "none", // Important for cross-site requests
      secure: true,
    });
    return res.status(200).json({
      success: true,
      message: "Login successful",
      details: {
        firstName,
        avatar,
        role,
        location,
        phone_number,
        email,
        userId,
        gender,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

const Logout = async (req, res) => {
  try {
    res.clearCookie("login");
    return res
      .status(200)
      .json({ success: true, message: "Logout successful!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ message: "Please enter Email", success: false });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User Not Exist", success: false });
    }
    const token = crypto.randomBytes(17).toString("hex");
    const resetPasswordTokenexpires = Date.now() + 1 * 60 * 60 * 1000; // 1 hr expiry
    user.resetPasswordToken = token;
    user.resetPasswordExpiresAt = resetPasswordTokenexpires;
    await user.save();
    await sendVerificationEmail(user.email, token);
    return res.status(200).json({
      message: "Reset Password Email Successfully sent",
      success: true,
      resetToken: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    if (!token) {
      return res
        .status(400)
        .json({ message: "Please provide token", success: false });
    }
    const { password } = req.body;
    if (!password) {
      return res
        .status(400)
        .json({ message: "Please enter password", success: false });
    }
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();
    await sendResetEmailSuccessful(user.email);
    return res
      .status(200)
      .json({ success: true, message: "Password Reset Successful" });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

const getInterests = async (req, res) => {
  try {
    const allInterests = await Intrests.find({}).select("-_id");

    return res.status(200).json({
      success: true,
      message: "Interests fetched successfully",
      allInterests,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const submitInterests = async (req, res) => {
  try {
    const { interests, userId } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Please login to submit interests",
      });
    }

    if (!Array.isArray(interests)) {
      return res.status(400).json({
        success: false,
        message: "Interests must be an array",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    for (let i = 0; i < interests.length; i++) {
      user.interests.push(interests[i]);
    }
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Interests submitted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  Register,
  Login,
  Logout,
  forgotPassword,
  resetPassword,
  getInterests,
  submitInterests,
};
