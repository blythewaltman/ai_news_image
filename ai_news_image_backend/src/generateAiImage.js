import { Configuration, OpenAIApi } from "openai";
import "dotenv/config";

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const generateAiImage = async (prompt) => {
  try {
    const dali_response = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });
    let image_url = dali_response.data.data[0].url;
    return image_url;
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
    return "failed";
  }
};
