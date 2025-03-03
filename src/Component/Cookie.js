import React, { useState } from "react";
import { Container, Card, Button, Form } from "react-bootstrap";


const CookiePolicy = () => {
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  const handleChange = (event) => {
    const { name, checked } = event.target;
    setPreferences((prev) => ({ ...prev, [name]: checked }));
  };

  const acceptAll = () => {
    setPreferences({ necessary: true, analytics: true, marketing: true });
  };

  return (
    <Container className="cookie-container mt-5">
      <Card className="cookie-card p-4 shadow-lg">
        <Card.Body>
          <h2 className="text-center cookie-title">Cookie Preferences</h2>
          <p className="cookie-text">
            We use cookies to ensure you get the best experience on our blood donation portal.
            Manage your preferences below.
          </p>
          <Form>
            <Form.Check
              type="switch"
              id="necessary"
              label="Necessary Cookies (Required)"
              checked={preferences.necessary}
              disabled
              className="cookie-switch"
            />
            <Form.Check
              type="switch"
              id="analytics"
              label="Analytics Cookies"
              name="analytics"
              checked={preferences.analytics}
              onChange={handleChange}
              className="cookie-switch"
            />
            <Form.Check
              type="switch"
              id="marketing"
              label="Marketing Cookies"
              name="marketing"
              checked={preferences.marketing}
              onChange={handleChange}
              className="cookie-switch"
            />
          </Form>
          <div className="d-flex justify-content-between mt-3">
            <Button variant="secondary" className="cookie-button" onClick={() => setPreferences({ necessary: true, analytics: false, marketing: false })}>
              Reject All
            </Button>
            <Button variant="primary" className="cookie-button" onClick={acceptAll}>
              Accept All
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CookiePolicy;