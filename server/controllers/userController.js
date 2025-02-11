const User = require("../models/userSchema");
const cloudinary = require("cloudinary").v2;
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("../jwt/jwt")
// register functionality

const Register = async(req, res) => {
    try{
        const {firstName, lastName,email,password,avatar=null,phone_number,role,location,age,gender} = req.body;
        if(!firstName){
            return res.status(400).json({message:"Please enter first name",success:false});
        }
        if(!email){
            return res.status(400).json({message:"Please enter email",success:false});
        }
        if(!password){
            return res.status(400).json({message:"Please enter password",success:false});
        }
        if(!phone_number){
            return res.status(400).json({message:"Please enter phone_number",success:false});
        }
        if(!location){
            return res.status(400).json({message:"Please enter location",success:false});
        }
        if(!age){
            return res.status(400).json({message:"Please enter age",success:false});
        }
        if(!gender){
            return res.status(400).json({message:"Please enter gender",success:false});
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate a random token for email verification (if needed)
        const verificationToken = crypto.randomBytes(16).toString("hex");
        let imageUrl
        if(req.file){
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'user_images', // You can adjust the folder as per your need
                resource_type: 'image',  // Specify the resource type as image
                allowed_formats: ['jpeg', 'jpg', 'png'],  // Allow only image formats
            })
            if(result){
                imageUrl = result.secure_url;
            }
        }
        const newUser = new User({
            firstName:firstName,
            lastName:lastName,
            email:email,
            password:hashedPassword,
            gender:gender,
            phone_number:phone_number,
            location:location,
            age:age,
            avatar:avatar || imageUrl,
            role:role || "user",
            verificationToken:verificationToken,
            verificationTokenExpiresAt:Date.now() + 24*60*60*1000,
        })
        await newUser.save();
        const id = newUser._id
        const token = jwt.createToken({id})
        return res.status(201).json({
            token,
            newUser
        });
    }catch (e) {
        console.log(e)
        return res.status(400).json({message:"Internal Server Error",success:false});
    }
}

const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required." });
        }
        if (!password) {
            return res.status(400).json({ message: "Password is required." });
        }
        const user = await User.findOne({ email }).select("+ password firstName avatar");
        if (!user) {
            return res.status(400).json({ message: "User not found." });
        }
        const matchPassword = await bcrypt.compare(password, user.password)
        if (!matchPassword) {
            return res.status(403).json({ message: "Passwords Not Matched." });
        }

        const userId = user._id;
        const token = jwt.createToken({ userId });
        const username = user.firstName
        const avatar = user.avatar;

        return res.status(200).json({ username, userId, message: "Login successful",avatar,token });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, error: error.message });
    }
}

const Logout = async (req, res) => {
    try{
        return res.status(200).json({ success: true, message: "Logout successfull" });
    }catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, error: error.message });
    }
}

module.exports ={Register,Login,Logout}