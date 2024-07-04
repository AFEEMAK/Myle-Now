import { useState, useEffect, Fragment } from "react";
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState(false);
  const params = useParams();

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `/api/user/users/${params.id}/verify/${params.token}`; // Note the relative URL
        const { data } = await axios.get(url);
        console.log(data);
        setValidUrl(true);
      } catch (error) {
        console.log(error);
        setValidUrl(false);
      }
    };
    verifyEmailUrl();
  }, [params]);

  return (
    <Fragment>
      {validUrl ? (
        <div>
          <h1>EMAIL VERIFIED</h1>
          <Link to='/login'>
            <p>Login</p>
          </Link>
        </div>
      ) : (
        <h1>404 Not Found</h1>
      )}
    </Fragment>
  );
};

export default EmailVerify;
