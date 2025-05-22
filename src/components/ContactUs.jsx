import React, { useState } from 'react';
import axios from 'axios';
import './ContactUs.css'; // import custom CSS

const ContactUs = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    try {
      await axios.post('/api/contact', form);
      setSuccess('Message sent successfully!');
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      alert('Failed to send message.');
    }
  };

  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          required
        />
        <button type="submit">Send Message</button>
        {success && <p className="success">{success}</p>}
      </form>
    </div>
  );
};

export default ContactUs;
