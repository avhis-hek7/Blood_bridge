import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Clock, Calendar } from "lucide-react";
import { Card } from "react-bootstrap";

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
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mt-4">
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

function Events() {
  const events = [
    {
      id: 1,
      title: "NRCS Central Blood Bank",
      time: "10:00 AM - 4:00 PM",
      date: "March 5, 2025",
      location: "Downtown Health Center",
      address: "Bhrikuti Mandap, Kathmandu",
    },
    {
      id: 2,
      title: "Charumati Bihar",
      time: "9:00 AM - 3:00 PM",
      date: "March 10, 2025",
      location: "State University Campus",
      address: "Chabahil, Kathmandu",
    },
    {
      id: 3,
      title: "Dirghayu Hospital",
      time: "8:00 AM - 2:00 PM",
      date: "March 15, 2025",
      location: "TechCorp Headquarters",
      address: "Bhugol Park",
    },
  ];
  return (
    <div>
      <header>
        <div className="hero-container">
          <h1>Save Lives: Donate Blood</h1>
          <p>Join us in making a difference!</p>
          <Link to="/egibility" className="btn-main">
            Register Now
          </Link>
        </div>
      </header>

      <main>
        <section className="event-details">
          <div className="section-title">
            <h2>Event Details</h2>
          </div>
          <div className=" mt-4">
            <div className="row">
              {events.map((event) => (
                <div key={event.id} className="col-md-4 mb-4">
                  <Card className="shadow-lg p-3 rounded">
                    <Card.Body>
                      <Card.Title>{event.title}</Card.Title>
                      <Card.Text>
                        <p className="text-muted d-flex align-items-center">
                          <Calendar className="me-2" /> {event.date}
                        </p>
                        <p className="text-muted d-flex align-items-center">
                          <Clock className="me-2" /> {event.time}
                        </p>
                        <p className="text-muted d-flex align-items-center">
                          <MapPin className="me-2" /> {event.location}
                        </p>
                        <p className="text-muted d-flex align-items-center">{event.address}</p>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              ))}
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
            <div className="card">
              <h3>Save Lives</h3>
              <p>Each donation can save up to 3 lives.</p>
            </div>
            <div className="card">
              <h3>Quick & Easy</h3>
              <p>Donating blood takes only 30 minutes.</p>
            </div>
            <div className="card">
              <h3>Urgent Need</h3>
              <p>Your blood is needed every day in emergencies.</p>
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

        {/* Blood Donation News Card */}
        <BloodNewsCard />
      </main>

      <div className="blood">
        <h2>Donate Outside the Kathmandu Valley</h2>
        <p>
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
