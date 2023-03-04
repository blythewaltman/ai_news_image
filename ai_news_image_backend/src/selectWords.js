//Shuffle comprehensions using Durten shuffle https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

//Choose a random word from the array
const get_random_word = (words) => {
  return words[Math.floor(Math.random() * words.length)];
};

//Returns reorganized queue to put most recently chosen article at the end
const reorganize_queue = (queue, index, queueSize) => {
  let newQueue = [];
  let newLastElement = queue[index];
  let currentIndex = 0;
  while (newQueue.length != queueSize - 1) {
    if (queue[currentIndex] != newLastElement) {
      newQueue.push(queue[currentIndex]);
    }
    currentIndex += 1;
  }
  newQueue.push(newLastElement);
  return newQueue;
};

const selectNewWordGroup = (comprehensions) => {
  //These are the word categories we are going to try to fill with the content from our articles
  let words = {
    people1: { type: "entities", category: "people", value: "" },
    people2: { type: "entities", category: "people", value: "" },
    verb: { type: "syntax", category: "verbs", value: "" },
    adj: { type: "syntax", category: "adjectives", value: "" },
    noun: { type: "syntax", category: "nouns", value: "" },
  };

  //create a shuffled queue of the comprehensions to ensure no article is favored for word selection
  var comprehensionQueue = [...comprehensions];
  shuffleArray(comprehensionQueue);
  let chosenArticlesInfo = []; //keep track of the article info of the articles we choose words from
  //Loop through our words categories to fill each one
  for (const word in words) {
    let wordFound = false; //keep track of whether a word has been found that fits the category
    let numToCheck = comprehensionQueue.length; //keep track of how many articles we have to check
    let nextToCheck = 0; //keep track of which article in the queue we want to check next
    let type = words[word]["type"]; //specifying what type of word we are looking for (entity or syntax)
    let category = words[word]["category"]; //specifying what category of word we are looking for (people, verb, etc.)
    //loop through our articles looking for a word that fits our category
    while (numToCheck != nextToCheck && wordFound == false) {
      //check if the current article has the current type of word we are searching for
      if (comprehensionQueue[nextToCheck][type][0][category]) {
        let title = comprehensionQueue[nextToCheck]["title"];
        let url = comprehensionQueue[nextToCheck]["url"];
        words[word]["value"] = get_random_word(
          comprehensionQueue[nextToCheck][type][0][category]
        ); //assign the word to the value in our words object
        wordFound = true;
        //move the current article to the end of the queue as it now has the lowest priority for choosing a word
        comprehensionQueue = reorganize_queue(
          comprehensionQueue,
          nextToCheck,
          comprehensionQueue.length
        );
        //make sure to add the chosen words article info to our array if it is not already in there
        if (chosenArticlesInfo.includes([title, url]) == false) {
          chosenArticlesInfo.push([title, url]);
        }
      } else {
        nextToCheck += 1;
      }
    }
  }
  return {
    wordGroup: words,
    chosenArticlesInfo: chosenArticlesInfo,
  };
};

//The AI image generator will sometimes fail if it deems the sentence to be against guidelines
//Returns a unique word group that has not been tried with the image generator yet
//Or throws an error if a unique word group cannot be found in a reasonable time
export const selectWords = async (comprehensions, failedWordGroups) => {
  let numTries = 0;
  do {
    numTries += 1;
    let chosenWordInfo = selectNewWordGroup(comprehensions); //all info on the words chosen (what they are and the article they came from)
    let chosenWords = chosenWordInfo.wordGroup; //just the chosen words
    if (failedWordGroups.includes(chosenWords) == false) {
      return chosenWordInfo;
    }
  } while (numTries < 30); //try at the most 30 times before giving up and throwing error
  throw new Error("Failed to find a suitable word group");
};
