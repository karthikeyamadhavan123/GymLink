const mongoose = require('mongoose');
const { Schema } = mongoose;

const jobSchema = new Schema({
    jobTitle: {
        type: String,
        required: true
    },
    requirements: {
        type: String,
        required: true
    },
    jobDetails: {
        type: String,
        required: true
    },
    experienceRequired: {
        type: Number,
        required: true,
        min: 0
    },
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: "Gym",
        required: true
    },
    salary:{
        type:Number,
        required:true,
        min:0
    },
    appliedJobApplicants:[{
        type: Schema.Types.ObjectId,
        ref: "JobApplication",
        default:[]
    }]
}, { timestamps: true });

module.exports = mongoose.model('JobPosting', jobSchema);
