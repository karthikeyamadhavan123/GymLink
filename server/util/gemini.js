const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const handleResponse = async (prompt) => {
  try {
    const  maxTokens = 200, temperature = 0.7, topP = 1.0  // Default values

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }], // Correct request format
      generationConfig: {
        maxOutputTokens: maxTokens, // Limit response length
        temperature: temperature, // Control randomness
        topP: topP, // Control diversity
      },
    });
 // Log AI response
    return result.response.text();
  } catch (error) {
    console.error("Error generating response:", error);
    return null;
  }
};

module.exports = { handleResponse };

