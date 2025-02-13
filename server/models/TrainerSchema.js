const mongoose = require("mongoose");
const { Schema } = mongoose;

const TrainerSchema = new Schema(
  {
    trainerName: {
      type: String,
      required: true,
    },
    expertise: {
      type: [String],
      required: true,
    },
    certifications: {
      type: String, // Cloudinary URL for certificate
      required: false,
      default:""
    },
    experience: {
      type: Number,
      required: true,
      default: 0,
    },
    contactNumber: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return /^\d{10}$/.test(value); // Exactly 10 digits
        },
        message: "Contact number must be exactly 10 digits.",
      },
    },
    gymId: {
      type: Schema.Types.ObjectId,
      ref: "Gym",
      required: true,
    },
    trainerImage: {
      type: String, // Cloudinary URL for trainer image
      required: true,
    },
    description: {
      type: String, // New field for trainer bio/description
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trainer", TrainerSchema);
