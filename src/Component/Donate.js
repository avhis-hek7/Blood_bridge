import React from 'react';

function Donate() {
  return (
    <div>
      <header>
        <h1>Donate Blood, Save Lives</h1>
      </header>
      <section className="donation-info">
        <h2>Why Donate Blood?</h2>
        <p>
          Blood donation is a simple, safe, and lifesaving act that helps those in need. 
          Your contribution can save multiple lives.
        </p>
      </section>
      <section className="donation-form">
        <h2>Register to Donate</h2>
        <form>
          <label htmlFor="name">First Name:</label>
          <input type="text" id="fname" name="fname" required /> <br /><br />
          <label htmlFor="name">Last Name:</label>
          <input type="text" id="lname" name="lname" required /> <br /><br />

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required /><br /><br />

          <label htmlFor="blood-type">Blood Type:</label>
          <select id="blood-type" name="blood-type" required>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>

          <label htmlFor="location">Location:</label>
          <input type="text" id="location" name="location" required />

          <button type="submit">Donate Now</button>
        </form>
      </section>
    </div>
  );
}

export default Donate;
