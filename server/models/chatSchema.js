const mongoose = require("mongoose");

const { Schema } = mongoose;

const ConversationSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }, // User who initiated the conversation

    messages: [
        {
            prompt: {
                type: String,
                required: true
            }, // User's input prompt

            response: {
                type: String,
                required: true
            }, // AI's response to the prompt

            responseByAi: {
                type: Boolean,
                default: true // Default to true since AI generates the response
            },

            createdAt: {
                type: Date,
                default: Date.now
            } // Timestamp for each prompt-response
        }
    ],

}, { timestamps: true }); // Automatically adds `createdAt` and `updatedAt`

const Conversation = mongoose.model("Conversation", ConversationSchema);

module.exports = Conversation;
