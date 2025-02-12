const mongoose = require("mongoose");
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
      type: String,
      required: true,
      trim: true,
    },
    basePrice: {
      type: Number,
      required: true,
      default: 0,
      min: [0, "Base price cannot be negative"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Gym", gymSchema);
