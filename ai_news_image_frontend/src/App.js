import loadingGif from "./loading.gif";
import "./App.css";
import { useState, useEffect } from "react";
import ArticleInfoList from "./ArticleInfoList";
import axios from "axios";

function App() {
  const [image, setImage] = useState(loadingGif);
  const [articleInfo, setArticleInfo] = useState([]);
  const [sentence, setSentence] = useState("");
  const [cardTurnEnabled, setCardTurnEnabled] = useState(
    "flip-card-inner-disabled"
  );
  useEffect(() => {
    const loadImage = async () => {
      const response = await axios.get(`api/getImg`);
      if (response.data["image"] !== "") {
        setImage(response.data["image"]);
        setCardTurnEnabled("flip-card-inner");
      } else {
        setCardTurnEnabled("flip-card-inner-disabled");
      }
      setArticleInfo(response.data["articleInfo"]);
      setSentence(response.data["sentence"]);
    };
    loadImage();
  }, []);

  // console.log(`articleInfo: ${articleInfo[0][1]}`);
  return (
    <div className="App">
      <header className="App-header">
        {/* <Route path="/about-page" element={<AboutPage />} s /> */}
        <div class="flip-card">
          <div class={cardTurnEnabled}>
            <div class="flip-card-front">
              <img class="ai-image" src={image} alt="logo" />
            </div>
            <div class="flip-card-back">
              <ArticleInfoList articleInfo={articleInfo} />
            </div>
          </div>
        </div>
        <p>{sentence}</p>
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React With Blythe
        </a> */}
      </header>
    </div>
  );
}

export default App;
