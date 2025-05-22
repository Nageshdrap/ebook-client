import React, { useEffect, useState } from 'react';
import './ContactUs.css';
import { useUser } from './contextApi/UserContext';

const ContactUs = () => {


    const {userData} = useUser();
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  const validate = () => {
    let tempErrors = {};
    if (!form.name.trim()) tempErrors.name = 'Name is required';
    if (!form.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      tempErrors.email = 'Email is invalid';
    }
    if (!form.message.trim()) tempErrors.message = 'Message is required';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSuccess('Message sent successfully!');
        setForm({ name: '', email: '', subject: '', message: '' });
        setErrors({});
      } else {
        alert('Failed to send message.');
      }
    } catch (err) {
      alert('Server error. Try again later.');
    }
  };

  useEffect(()=>{
    window.scrollTo({top:0 , behavior:'smooth'});
  },[])

  return (
    <div className="contact-wrapper">
      <div className="contact-info">
        <h2>Get in Touch</h2>
        <p>We'd love to hear from you. Fill out the form and our team will get back to you shortly.</p>
        <div className="contact-detail">
          <p><strong>📞 Phone:</strong> (+91) 9692331146</p>
          <p><strong>📧 Email:</strong> nageshachary2@gmail.com</p>
          <p><strong>📍 Office:</strong><br />Old Berhampur<br />Mentu chaka, 760009</p>
        </div>
        <div className="social-icons">
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
          <a href="#"><i className="fab fa-linkedin"></i></a>
        </div>
      </div>

      <div className="contact-form">
        <h2>Send us a message</h2>
        <form onSubmit={handleSubmit}>
            <div className="input-group">
          <label>Full Name</label>
          <input type="text" name="name" value={userData ? userData.name : form.name} onChange={handleChange} placeholder="Your name" />
          {errors.name && <span className="error m-0">{errors.name}</span>}
            </div>

           <div className="input-group">
          <label>Email Address</label>
          <input type="email" name="email" value={userData? userData.email : form.email} onChange={handleChange} placeholder="you@example.com" />
          {errors.email && <span className="error m-0">{errors.email}</span>}
            </div> 

            <div className="input-group">
          <label>Subject (Optional)</label>
          <input type="text" name="subject" value={form.subject} onChange={handleChange} placeholder="How can we help you?" />
            </div>

            
            <div className="input-group">
          <label>Message</label>
          <textarea name="message" value={form.message} onChange={handleChange} placeholder="Your message here..." />
          {errors.message && <span className="error m-0">{errors.message}</span>}
            </div>

          <button type="submit">Send Message</button>
          {success && <p className="success">{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
