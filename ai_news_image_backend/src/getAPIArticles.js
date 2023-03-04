import axios from "axios";
import "dotenv/config";

const newsOptions = {
  method: "GET",
  url: "https://newsapi.org/v2/top-headlines",
  params: {
    sources: "bbc-news",
    totalResults: 8,
    apiKey: process.env.NEWS_API_KEY,
  },
};

export const getAPIArticles = async () => {
  var articleList = [];

  const newsResponse = await axios
    .request(newsOptions)
    .then(function (newsResponse) {
      // console.log(response.data);
      var articles = newsResponse.data.articles;
      articles.forEach((article) => {
        if (article["description"] != null && article["url"] != null) {
          articleList.push({
            title: article["title"],
            url: article["url"],
            description: article["description"],
          });
        }
      });
    })
    .catch(function (error) {
      console.error(error);
    });

  return articleList;
};
