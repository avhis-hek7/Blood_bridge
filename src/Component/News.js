import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import styles from "./News.module.css"; // import CSS module

const truncateWords = (text, maxWords) => {
  if (!text) return "";
  const words = text.split(" ");
  return words.length > maxWords
    ? words.slice(0, maxWords).join(" ") + "..."
    : text;
};

const BloodNewsCard = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          "https://newsapi.org/v2/everything?q=blood donation&apiKey=2cc22390140a40cead3a2799f4fd9fce"
        );
        const data = await response.json();
        if (data.articles) {
          setNews(data.articles.slice(0, 3));
        }
      } catch (err) {
        setError("Failed to fetch news");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <p>Loading blood donation news...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className={`container mt-4 ${styles.containerBackground}`}>
      <h2 className="mb-4">Latest Blood Donation News</h2>
      <div className="row">
        {news.map((article, index) => (
          <div key={index} className="col-md-4">
            <div className="card shadow-lg h-100 d-flex flex-column">
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  className="card-img-top"
                  alt="News"
                  style={{ height: "200px", objectFit: "cover" }}
                />
              )}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">
                  {truncateWords(article.title, 20)}
                </h5>
                <p className="card-text">
                  {truncateWords(article.description, 20)}
                </p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary mt-auto"
                >
                  Read More
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BloodNewsCard;
