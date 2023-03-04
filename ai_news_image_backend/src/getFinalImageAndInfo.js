import { getComprehendPromises } from "./getComprehendPromises.js";
import { organizeComprehensions } from "./organizeComprehensions.js";
import { getAPIArticles } from "./getAPIArticles.js";
import { generateImage } from "./generateImage.js";

export const getFinalImageAndInfo = () => {
  return new Promise((resolve, reject) => {
    // 1) Pull news articles
    getAPIArticles()
      .then(function (articles) {
        console.log(`articles: ${articles}`);
        // 2) Create a Promise for each news article that we will get its comprehension data
        return getComprehendPromises(articles);
      })
      .then(function (comprehendPromises) {
        console.log(`comprehendPromises: ${comprehendPromises}`);
        // 3) Settle all Promises to get comprehension data
        let comprehensionData = Promise.allSettled(comprehendPromises);
        return comprehensionData;
      })
      .then(function (comprehensionData) {
        console.log(`comprehensionData: ${comprehensionData}`);
        // 4) Organize comprehension data
        return organizeComprehensions(comprehensionData);
      })
      .then(function (comprehensions) {
        // 5) Now that we have both entity and syntax comprehensions organized attempt to generate an image
        console.log(`organizedComprehensions: ${comprehensions}`);
        return generateImage(0, [], comprehensions);
      })
      .then(function (image_result) {
        console.log(image_result);
        resolve(image_result);
      })
      .catch((error) => {
        resolve(false); // 6) If we have failed to create an image return false
      });
  });
};
