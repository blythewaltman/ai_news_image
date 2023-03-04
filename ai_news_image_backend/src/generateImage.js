import { selectWords } from "./selectWords.js";
import { generateAiSentence } from "./generateAiSentence.js";
import { generateAiImage } from "./generateAiImage.js";

export const generateImage = (numTries, failedWordGroups, comprehensions) => {
  if (numTries > 10) {
    throw new Error("Failed to generate image");
  }
  return new Promise(function (resolve) {
    selectWords(comprehensions, failedWordGroups).then(function (wordInfo) {
      console.log(wordInfo);
      generateAiSentence(wordInfo.wordGroup).then(function (sentence) {
        generateAiImage(sentence).then(function (image) {
          if (image == "failed") {
            failedWordGroups.push(wordInfo.wordGroup);
            resolve(
              generateImage((numTries += 1), failedWordGroups, comprehensions)
            );
          } else {
            resolve({
              sentence: sentence,
              image: image,
              articleInfo: wordInfo.chosenArticlesInfo,
            });
          }
        });
      });
    });
  });
};
