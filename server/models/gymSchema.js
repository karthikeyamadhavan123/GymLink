const mongoose = require("mongoose");
const jobApplication = require("./jobApplicationSchema");
const JobPosting = require("../models/jobSchema");
const Trainer = require('../models/TrainerSchema')
const { Schema } = mongoose;

const gymSchema = new Schema(
  {
    gymName: {
      type: String,
      required: true,
      minLength: [4, "Gym name should be at least 4 letters"],
      unique: true,
      trim: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    equipments: {
      type: [String],
      required: true,
      enum: [
        "Treadmill",
        "Elliptical Trainer",
        "Rowing Machine",
        "Stationary Bike",
        "Dumbbells",
        "Barbells",
        "Kettlebells",
        "Leg Press Machine",
        "Smith Machine",
        "Cable Crossover Machine",
        "Pull-up Bar",
        "Medicine Ball",
        "Resistance Bands",
        "Battle Ropes",
        "Punching Bag",
        "Plyometric Boxes",
      ],
      validate: {
        validator: function (v) {
          return v.length > 0;
        },
        message: "At least one equipment must be added",
      },
    },
    gymImages: {
      type: [String],
      required: true,
      validate: {
        validator: function (v) {
          return v.length > 0;
        },
        message: "At least one photo of your gym is required",
      },
    },
    location: {
      streetName: {
        type: String,
        required: true,
      },
      area: {
        // More specific subdivision within a district
        type: String,
        required: false,
      },
      landmark: {
        // Helps in better identification
        type: String,
        required: false,
      },
      city: {
        // Ensures proper address hierarchy
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },

      pincode: {
        type: String,
        required: true,
        validate: {
          validator: (v) => /^[0-9]{6}$/.test(v), // Ensures exactly 6 digits
          message: "Pincode must be exactly 6 digits and contain only numbers",
        },
      },
    },
    basePrice: {
      type: Number,
      required: true,
      default: 0,
      min: [0, "Base price cannot be negative"],
    },
    trainers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Trainer",
      },
    ],
    jobs: [
      {
        type: Schema.Types.ObjectId,
        ref: "JobPosting",
      },
    ],
  },
  {
    timestamps: true,
  }
);
gymSchema.post("findOneAndDelete", async function (doc) {

  const gymId = doc._id;
  await jobApplication.deleteMany({ gym: gymId });
  await JobPosting.deleteMany({ postedBy: gymId });
  await Trainer.deleteMany({gymId:gymId})
  
});

module.exports = mongoose.model("Gym", gymSchema);
