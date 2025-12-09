const mongoose = require('mongoose')
const {Schema} = mongoose

const notificationSchema = new Schema({
    notificationMessage:{
        type:String,
        required:true
    },
    jobNotification:{
        type:Schema.Types.ObjectId,
        ref:"JobPosting",
        required:true
    },
    readBy: [{ type: Schema.Types.ObjectId, ref: "User" }]

},{timestamps:true})

module.exports=mongoose.model('Notification',notificationSchema)