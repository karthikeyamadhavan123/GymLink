const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
            minLength: [4, "Firstname should be at least 4 characters."],
            maxLength: [50, "Firstname should not be more than 50 characters."]
        },
        lastName: {
            type: String,
            default:"",
            required:false
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function (value) {
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                },
                message: (props) => `${props.value} is not a valid email address.`
            },
            index: true
        },
        password: {
            type: String,
            required: true,
            validate: {
                validator: function (value) {
                    return /^(?=.{10,}$)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?\W).*$/.test(value);
                },
                message:
                    "Password must be at least 10 characters long and include at least one lowercase letter, one uppercase letter, one number, and one special character."
            },
            select: false
        },
        avatar: {
            type: String,
            default:""
        },
        phone_number: {
            type: String,
            required: true,
            validate: {
                validator: function (value) {
                    return /^\d{10}$/.test(value); // Exactly 10 digits
                },
                message: "Phone number must be exactly 10 digits."
            }
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
        location: {
            type: String, // Stores only the state
            required: true, // State must be provided at signup
            trim: true
        },
        age:{
            type: Number,
            required: true,
            min:[18,"Minimum  age is 18"]
        },
        gender: {
            type: String,
            enum: ['Male', 'Female'],
            required:true
        },
        resetPasswordToken: String,
        resetPasswordExpiresAt: Date,
        verificationToken: String,
        verificationTokenExpiresAt: Date
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
