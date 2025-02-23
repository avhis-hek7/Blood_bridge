import React from "react";
import { useEffect, useState } from "react";

const BloodNewsCard = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to truncate text after a specified number of characters.
  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=blood donation&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
        );
        const data = await response.json();
        if (data.articles) {
          setNews(data.articles.slice(0, 6));
        }
      } catch (err) {
        setError("Failed to fetch news");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <p className="pevent">Loading blood donation news...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="row">
      {news.map((article, index) => (
        <div key={index} className="col-12 col-md-6 col-lg-4 d-flex">
          <div className="card h-100 shadow-lg w-100">
            {article.urlToImage && (
              <img
                src={article.urlToImage}
                className="card-img-top"
                alt="News"
                style={{ height: "200px", objectFit: "cover" }}
              />
            )}
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">{truncateText(article.title, 60)}</h5>
              <p className="card-text">
                {truncateText(article.description, 100)}
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
  );
};

function Events() {
  return (
    <div>
      <header>
        <div className="hero-container">
          <h1>Save Lives: Donate Blood</h1>
          <p className="pevent">Join us in making a difference!</p>
          <a href="#register" className="btn-main">
            Register Now
          </a>
        </div>
      </header>
      <main>
        <section className="event-details">
          <div className="section-title">
            <h2>Event Details</h2>
          </div>
          <div className="details-grid">
            <div className="details-item">
              <strong>Date:</strong>
              <p className="pevent">February 25, 2025</p>
            </div>
            <div className="details-item">
              <strong>Time:</strong>
              <p className="pevent">9:00 AM - 3:00 PM</p>
            </div>
            <div className="details-item">
              <strong>Location:</strong>
              <p className="pevent">City Community Center, 123 Main St</p>
            </div>
          </div>
          <div className="cta">
            <a href="#register" className="btn-register">
              Register Now
            </a>
          </div>
        </section>

        <section className="why-donate">
          <div className="cards">
            <div className="card Ecard">
              <h3>Save Lives</h3>
              <p className="pevent">Each donation can save up to 3 lives.</p>
            </div>
            <div className="card Ecard">
              <h3>Quick & Easy</h3>
              <p className="pevent">Donating blood takes only 30 minutes.</p>
            </div>
            <div className="card Ecard">
              <h3>Urgent Need</h3>
              <p className="pevent">Your blood is needed every day in emergencies.</p>
            </div>
          </div>
        </section>

        <section className="preparation">
          <div className="section-title">
            <h2>How to Prepare</h2>
          </div>
          <ul>
            <li>Eat a healthy meal before donating.</li>
            <li>Drink plenty of water.</li>
            <li>Bring your ID for registration.</li>
            <li>Wear comfortable clothing with sleeves that roll up.</li>
          </ul>
        </section>
        <BloodNewsCard />
      </main>
      <div className="blood">
        <h2>Donate Outside the Kathmandu Valley</h2>
        <p className="pevent">
          To donate outside Kathmandu Valley, please contact one of the Regional
          Blood Transfusion Centres in Biratnagar, Pokhara, Nepalgunj, and
          Chitwan, or the nearest District Blood Bank or Hospital unit.
        </p>
        <table>
          <thead>
            <tr>
              <th>Blood Center</th>
              <th>Focal Person</th>
              <th>Contact No</th>
              <th>District</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Baglung</td>
              <td>Gunodatta Sharma</td>
              <td>068-320273</td>
              <td>Baglung</td>
            </tr>
            <tr>
              <td>Banepa</td>
              <td>Radha Thapa</td>
              <td>011-661431</td>
              <td>Kavre</td>
            </tr>
            <tr>
              <td>Bhadrapur</td>
              <td>Toma Bikram Karki</td>
              <td>023-520814</td>
              <td>Jhapa</td>
            </tr>
            <tr>
              <td>Bhaktapur</td>
              <td>Uttam Kusma</td>
              <td>01-6612266</td>
              <td>Bhaktapur</td>
            </tr>
            <tr>
              <td>Bharatpur</td>
              <td>Ramesh Kanta Poudel</td>
              <td>065-208880</td>
              <td>Chitwan</td>
            </tr>
            <tr>
              <td>Birgunj</td>
              <td>Saurab</td>
              <td>051-522048</td>
              <td>Parsa</td>
            </tr>
            <tr>
              <td>Butwal</td>
              <td>Jogbahadur Gurung</td>
              <td>071-540404</td>
              <td>Butwal</td>
            </tr>
            <tr>
              <td>Damak</td>
              <td>Siddhartha Dahal</td>
              <td>023-580176</td>
              <td>Jhapa</td>
            </tr>
            <tr>
              <td>Dhangadi</td>
              <td>Dharani Prasad Pant</td>
              <td>081-321600</td>
              <td>Kailali</td>
            </tr>
            <tr>
              <td>Dharan</td>
              <td>Subash Chandra Singh</td>
              <td>025-520268</td>
              <td>Dharan</td>
            </tr>
            <tr>
              <td>Ghorahi</td>
              <td>Dilip Kumar Neupane</td>
              <td>082-61466</td>
              <td>Dang</td>
            </tr>
            <tr>
              <td>Pokhara</td>
              <td>DhurbaNath Lamichhane</td>
              <td>061-320191</td>
              <td>Kaski</td>
            </tr>
            <tr>
              <td>Rajbiraj</td>
              <td>Nabin Kumar Jha</td>
              <td>031-521121</td>
              <td>Saptari</td>
            </tr>
            <tr>
              <td>Surkhet</td>
              <td>Prakash Shrestha</td>
              <td>083-320130</td>
              <td>Surkhet</td>
            </tr>
            <tr>
              <td>NRCs Kawasoti</td>
              <td>Saraswoti Bhusal</td>
              <td>078-540418</td>
              <td>Nawalpur</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Events;
