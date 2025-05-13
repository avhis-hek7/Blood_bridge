// import React, { useEffect, useState } from "react";

// // Helper function to truncate text
// const truncateWords = (text, maxWords) => {
//   if (!text) return "";
//   const words = text.split(" ");
//   return words.length > maxWords
//     ? words.slice(0, maxWords).join(" ") + "..."
//     : text;
// };

// const BloodNewsCard = () => {
//   const [news, setNews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchNews = async () => {
//       try {
//         const response = await fetch(
//           "https://newsapi.org/v2/everything?q=blood donation&apiKey=2cc22390140a40cead3a2799f4fd9fce"
//         );
//         const data = await response.json();
//         if (data.articles && data.articles.length > 0) {
//           // Keep only the latest article
//           setNews([data.articles[0]]);
//         }
//       } catch (err) {
//         setError("Failed to fetch news");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNews();
//   }, []);

//   if (loading) return <p>Loading blood donation news...</p>;
//   if (error) return <p className="text-danger">{error}</p>;

//   return (
//     <div className="container mt-4">
//       <h2 className="mb-4">Latest Blood Donation News</h2>
//       <div className="row">
//         {news.map((article, index) => (
//           <div key={index} className="col-12">
//             <div className="card shadow-sm mb-4">
//               {article.urlToImage && (
//                 <img
//                   src={article.urlToImage}
//                   className="card-img-top"
//                   alt="News"
//                   style={{ height: "300px", objectFit: "cover" }}
//                 />
//               )}
//               <div className="card-body d-flex flex-column">
//                 <h5 className="card-title">{truncateWords(article.title, 20)}</h5>
//                 <p className="card-text">{truncateWords(article.description, 25)}</p>
//                 <a
//                   href={article.url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="btn btn-primary mt-auto"
//                 >
//                   Read More
//                 </a>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BloodNewsCard;
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

// Helper function to truncate text
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
        if (data.articles && data.articles.length > 0) {
          // Keep only the latest article
          setNews([data.articles[0]]);
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
    <div className="container mt-4">
      <h2 className="mb-4">Latest Blood Donation News</h2>
      <div className="row">
        {news.map((article, index) => (
          <div key={index} className="col-md-12">
            <Card className="shadow-lg h-100 d-flex flex-column">
              {article.urlToImage && (
                <Card.Img
                  variant="top"
                  src={article.urlToImage}
                  alt="News"
                  style={{ height: "300px", objectFit: "cover" }}
                />
              )}
              <Card.Body className="d-flex flex-column">
                <Card.Title>{truncateWords(article.title, 20)}</Card.Title>
                <Card.Text>{truncateWords(article.description, 25)}</Card.Text>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary mt-auto"
                >
                  Read More
                </a>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BloodNewsCard;
