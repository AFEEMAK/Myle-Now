import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `/api/user/users/${params.id}/verify/${params.token}`; // Note the relative URL
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Invalid link');
        }

        const data = await response.json();
        console.log('data', data);
        setValidUrl(true);
    
        setTimeout(() => {
          navigate('/Login');
        }, 5000); // Redirect after 5 seconds
      } catch (error) {
        console.log(error);
   
      }
    };
    verifyEmailUrl();
    if(validUrl){
      toast.success('Email Verified! Redirecting to login...', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    if (!validUrl) {
      toast.error('Invalid Link', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [params, validUrl, navigate]);

  return (
    <div>
      <ToastContainer />
      {validUrl ? null : <h1>Invalid Link</h1>}
    </div>
  );
};

export default EmailVerify;
