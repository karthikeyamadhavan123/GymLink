const Conversation = require("../models/chatSchema");
const { handleResponse } = require("../util/gemini");

const newChat = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { userId } = req.userId; // Fix: Correctly extracting userId

    if (!userId) {
      return res
        .status(403)
        .json({ message: "Please login to chat", success: false });
    }

    const { prompt } = req.body;
    if (!prompt) {
      return res
        .status(400)
        .json({ message: "Please enter a prompt", success: false });
    }

    const response = await handleResponse(prompt);
    if (!response) {
      return res
        .status(500)
        .json({ message: "Please try again", success: false });
    }

    if (chatId) {
      let findChat = await Conversation.findById(chatId);
      if (!findChat) {
        return res
          .status(404)
          .json({ message: "Chat not found", success: false });
      }

      // Fix: Properly updating messages array
      findChat.messages.push({ prompt, response, responseByAi: true });
      await findChat.save();

      return res.status(200).json({ success: true, chat: findChat });
    } else {
      const chat = new Conversation({
        userId: userId,
        messages: [{ prompt, response, responseByAi: true }],
      });
      await chat.save();

      return res.status(200).json({
        success: true,
        chat: {
          Airesponse: chat.messages[0].response,
          prompt,
          id: chat._id,
        },
      });
    }
  } catch (error) {
    console.error("Error creating new chat:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const getChat = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { userId } = req.userId; // Fix: Correctly extracting userId

    if (!userId) {
      return res
        .status(403)
        .json({ message: "Please login to chat", success: false });
    }
    if(!chatId){
        return res
        .status(403)
        .json({ message: "Chat Id is required", success: false });
    }
    const getConversation=await Conversation.find({_id:chatId,userId:userId})
    if(!getConversation){
        return res
        .status(200)
        .json({ message: "Please intialize a chat", success: true });
    }
   const allMessages = getConversation.map((convo)=> convo.messages)
   if(allMessages.length === 0){
    return res
    .status(200)
    .json({ message: "Please intialize a chat", success: true });
   }
    return res.status(200).json({success:true,message:allMessages})
  } catch (error) {
    console.error("Error creating new chat:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

//socket at last
module.exports = { newChat,getChat };
