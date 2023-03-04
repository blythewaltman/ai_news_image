import { get_entities, get_syntax } from "./amazonComprehend.js";

export const getComprehendPromises = (articles) => {
  let comprehendPromises = [];
  articles.forEach((article, index) => {
    comprehendPromises.push(
      get_entities(article.title, article.description, article.url, index)
    );
    comprehendPromises.push(
      get_syntax(article.title, article.description, article.url, index)
    );
  });
  return comprehendPromises;
};
