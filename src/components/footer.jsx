import './footer.css';
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useState } from 'react';
import { useUser } from './contextApi/UserContext';
import { useWishlist } from './contextApi/WishlistContext';
import Cart from './cart';

const Footer = () => {
  const navigate = useNavigate();
  const { fetchWishlist } = useWishlist();
  const { login } = useUser();

  const [userData, setUserData] = useState({
    bookname: '',
    deptname: '',
    number: ''
  });


  const UserInfo = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleUserInfo = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://ebook-server-4izu.onrender.com/api/send-email', userData);
      if (res.data.success) {
        toast.success('Message sent successfully', { autoClose: 2000 });
        setUserData({ bookname: '', deptname: '', number: '' });
      }
    } catch (error) {
      toast.error('Failed to send message', { autoClose: 2000 });
    }
  };

  return (
    <footer className="bg-dark text-white pt-4 mt-3">
      <div className="container">
        <div className="row g-4">
          {/* Brand and Social Links */}
          <div className="col-12 col-md-4 text-center text-md-start">
            <h1 className="fw-bold">BookTurn</h1>
            <div className="d-flex justify-content-center justify-content-md-start gap-3 mt-2" style={{ fontSize: '22px' }}>
              <Link to="https://www.facebook.com/profile.php?id=61576105416280" className="text-white"><FaFacebook /></Link>
              <Link to="https://www.instagram.com/bookturn_?utm_source=qr&igsh=MWxoYmE1ZTRrZ3RjNA==" className="text-white"><FaInstagram /></Link>
              <Link className="text-white"><FaTwitter /></Link>
            </div>
          </div>

          {/* Book Request Form */}
          <div className="col-12 col-md-8">
            <form onSubmit={handleUserInfo}>
              <label className="form-label fw-semibold mb-2">Need a specific book? Tell us here:</label>
              <div className="row g-2">
                <div className="col-12 col-md-4">
                  <input
                    type="text"
                    name="bookname"
                    value={userData.bookname}
                    onChange={UserInfo}
                    className="form-control"
                    placeholder="Book name..."
                  />
                </div>
                <div className="col-12 col-md-4">
                  <input
                    type="text"
                    name="deptname"
                    value={userData.deptname}
                    onChange={UserInfo}
                    className="form-control"
                    placeholder="Department / Stream / Year"
                  />
                </div>
                <div className="col-12 col-md-4">
                  <input
                    type="text"
                    name="number"
                    value={userData.number}
                    onChange={UserInfo}
                    className="form-control"
                    placeholder="Mobile or WhatsApp number"
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-success mt-3 w-100 w-md-auto">Submit Request</button>
            </form>
          </div>
        </div>

        {/* Links */}
        <div className="row mt-4">
          <div className="col-12 col-md-4">
            <h5>Links</h5>
            <hr className="text-light hor" />
            <ul className="list-unstyled d-flex flex-wrap gap-3" >
              <li><Link to="/" className="text-light text-decoration-none">Home</Link></li>
              <li><Link to="/wishlist" className="text-light text-decoration-none">Wishlist</Link></li>
              
              <li><Link to="/blog" className="text-light text-decoration-none">Blog</Link></li>
              <li><Link to="/contact" className="text-light text-decoration-none">Contact Us</Link></li>
            </ul>
          </div>

          {/* Accordion Section */}
          <div className="col-12 col-md-8">
            <div className="accordion" id="accordionExample">
              {[{
                id: 1,
                title: 'What is Bookturn?',
                body: 'Bookturn is an online bookstore offering a curated selection of books across genres with secure checkout and fast delivery.'
              }, {
                id: 2,
                title: 'How Bookturn helps readers?',
                body: 'Bookturn helps readers find books easily, offering personalized recommendations and detailed descriptions.'
              }, {
                id: 3,
                title: 'Why choose Bookturn?',
                body: 'Bookturn offers quality, affordability, and convenience, backed by reliable support and quick delivery.'
              }].map(({ id, title, body }) => (
                <div className="accordion-item" key={id}>
                  <h2 className="accordion-header">
                    <button className="accordion-button bg-dark text-white collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${id}`} aria-expanded="false" aria-controls={`collapse${id}`}>
                      {title}
                    </button>
                  </h2>
                  <div id={`collapse${id}`} className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                      {body}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center py-3 mt-4 border-top border-secondary">
          <div className="fw-bold" style={{ fontSize: '1.2rem', color: '#55e11a' }}>BookTurn</div>
          <Link to='/term' className="text-light text-decoration-none d-block mt-1">
            <span>Terms & Conditions / Policy</span>
          </Link>
          <div style={{ fontSize: 'smaller' }} className="mt-1">&copy; 2025 All rights reserved</div>
        </div>
      </div>
      
    </footer>
  );
};

export default Footer;
