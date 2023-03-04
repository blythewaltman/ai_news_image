import express from "express";
import path from "path";
import { getFinalImageAndInfo } from "./getFinalImageAndInfo.js";

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "../build")));

app.get(/^(?!\/api).+/, (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

app.get("/api/getImg", (req, res) => {
  console.log("fetching image....");
  getFinalImageAndInfo().then(function (result) {
    if (result == false) {
      console.log("No appropriate image found today");
      res.send({
        sentence: "No image today come back tomorrow!",
        image: "",
        articleInfo: [],
      });
    } else {
      console.log(`result: ${result.image}`);
      res.send(result);
    }
  });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
});
