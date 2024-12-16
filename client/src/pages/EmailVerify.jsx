// EmailVerify.jsx
import { useEffect, useState, Fragment } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import axios from "axios";
import { Button } from "../components/ui/button"

const TIMEOUT = 10000; // Timeout in milliseconds (e.g., 10 seconds)

const EmailVerify = () => {
  const { id, expirationTimestamp } = useParams();
  const [validUrl, VerifyUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const { data } = await axios.get(`/verify/${id}/${expirationTimestamp}`, { timeout: TIMEOUT });
        if (data) {
          VerifyUrl(true);
        } else {
          setLoading(false);
        }
      } catch (error) {
        VerifyUrl(false);
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [id, expirationTimestamp]);

  return (
    <Fragment>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="loading-spinner"></div>
        </div>
      ) : validUrl ? (
        <section className="py-10 mt-10">
          <div className="container mx-auto py-10">
            <div className="flex justify-center">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Email Verified</h2>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-md">
                <div>
                  <form className="p-5 shadow-lg rounded-lg bg-white">
                    <div className="flex justify-center">
                      <Link to="/login">
                        <Button className="w-full">
                          Login
                        </Button>
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <Navigate to="/error" replace={true} />
      )}
    </Fragment>
  );
};

export default EmailVerify;