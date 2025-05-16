import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import loadingAnimation from "../animation/cheake.json";
import './confirmpage.css';
import Spinner from "./spinner";

const Confirmpage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
     const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center mbWish" style={{ minHeight: '400px' }}>
            <Spinner />
        </div>
      ) : (
        <div className="container mbWish">
          <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: '500px', width: '100%' }}>
            <Lottie animationData={loadingAnimation} loop={false} style={{ height: '200px', width: '200px' }} />
            <div className="d-flex flex-column align-items-center gap-3 mt-3">
              <div className="fw-semibold fs-4 text-center">Your order has been placed successfully..!</div>
              <button className="btn btn-primary" onClick={() => navigate('/orders')}>Go to Order</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Confirmpage;
