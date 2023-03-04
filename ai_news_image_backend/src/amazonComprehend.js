import AWS from "aws-sdk";
import "dotenv/config";

AWS.config.loadFromPath("./src/config.json");

var comprehend = new AWS.Comprehend({
  apiVersion: "2017-11-27",
});

export const get_entities = (title, description, url, index) => {
  return new Promise((resolve, reject) => {
    comprehend.detectEntities(
      {
        LanguageCode: "en",
        Text: title,
      },
      function (err, data) {
        if (err) {
          console.log(err);
        } else {
          var entitiesInfo = {
            title: title,
            url: url,
            description: description,
            index: index,
            type: "entity",
            entities: [],
          };
          data.Entities.forEach((entity) => {
            var type = entity["Type"];
            var text = entity["Text"];
            switch (type) {
              case "EVENT":
                if (!entitiesInfo.entities.events) {
                  entitiesInfo.entities["events"] = [text];
                } else {
                  entitiesInfo.entities.events.push(text);
                }
                break;
              case "LOCATION":
                if (!entitiesInfo.entities.locations) {
                  entitiesInfo.entities["locations"] = [text];
                } else {
                  entitiesInfo.entities.locations.push(text);
                }
                break;
              case "ORGANIZATION":
                if (!entitiesInfo.entities.organizations) {
                  entitiesInfo.entities["organizations"] = [text];
                } else {
                  entitiesInfo.entities.organizations.push(text);
                }
                break;
              case "PERSON":
                if (!entitiesInfo.entities.people) {
                  entitiesInfo.entities["people"] = [text];
                } else {
                  entitiesInfo.entities.people.push(text);
                }
                break;
              case "QUANTITY":
                if (!entitiesInfo.entities.quantities) {
                  entitiesInfo.entities["quantities"] = [text];
                } else {
                  entitiesInfo.entities.quantities.push(text);
                }
                break;
              default:
                break;
            }
          });
          resolve(entitiesInfo);
        }
      }
    );
  });
};

export const get_syntax = (title, description, url, index) => {
  return new Promise((resolve, reject) => {
    comprehend.detectSyntax(
      {
        LanguageCode: "en",
        Text: title,
      },
      function (err, data) {
        if (err) {
          console.log(err);
        } else {
          var syntaxInfo = {
            title: title,
            url: url,
            description: description,
            index: index,
            type: "syntax",
            syntax: [],
          };
          data.SyntaxTokens.forEach((token) => {
            switch (token.PartOfSpeech.Tag) {
              case "ADJ":
                if (!syntaxInfo.syntax.adjectives) {
                  syntaxInfo.syntax["adjectives"] = [token.Text];
                } else {
                  syntaxInfo.syntax.adjectives.push(token.Text);
                }
                break;
              case "VERB":
                if (!syntaxInfo.syntax.verbs) {
                  syntaxInfo.syntax["verbs"] = [token.Text];
                } else {
                  syntaxInfo.syntax.verbs.push(token.Text);
                }
                break;
              case "NOUN":
                if (!syntaxInfo.syntax.nouns) {
                  syntaxInfo.syntax["nouns"] = [token.Text];
                } else {
                  syntaxInfo.syntax.nouns.push(token.Text);
                }
                break;
              default:
                break;
            }
          });
          resolve(syntaxInfo);
        }
      }
    );
  });
};
