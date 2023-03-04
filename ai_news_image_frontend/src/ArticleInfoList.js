import React from "react";
import { Link } from "react-router-dom";

const ArticleInfoList = ({ articleInfo }) => (
  <>
    {articleInfo?.map((article, key) => (
      <>
        <script>console.log(`article:${article}`)</script>
        <div key={key}>
          <div>
            <a
              className="App-link"
              href={article[1]}
              target="_blank"
              rel="noopener noreferrer"
            >
              {article[0]}
            </a>
            {/* <Link className="article-list-item" to={url}>
              <h3>url</h3>
            </Link> */}
          </div>
        </div>
      </>
    ))}
  </>
);

export default ArticleInfoList;
