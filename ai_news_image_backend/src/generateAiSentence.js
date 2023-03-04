import { Configuration, OpenAIApi, OpenAIApiAxiosParamCreator } from "openai";
import "dotenv/config";

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const generateAiSentence = async (words) => {
  let wordSentence = `${words.people1.value}, ${words.people2.value}, ${words.adj.value}, ${words.noun.value}, and ${words.verb.value}`; //var to fill the part of the prompt "using the words ${...}""
  let prompt = "Write a sentence using the words " + wordSentence;
  try {
    const davinci_response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 100,
      temperature: 0.5,
    });
    // console.log(davinci_response.data.choices[0].text);
    let sentence = davinci_response.data.choices[0].text; //retrieve sentence from the response
    sentence.replace(/(\r\n|\n|\r)/gm, "");
    return sentence;
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
