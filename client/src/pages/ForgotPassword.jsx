import React from "react";
import { useState} from "react";
import { useParams} from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import forgot from "../assets/forgot.png";

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    password: "",
  });
  const { id, token } = useParams();
  const ChangePass = async (e) => {
    // not to automatically load
    e.preventDefault();
    const { password } = data;
    try {
      const { data } = await axios.patch(`/ForgotPassword/${id}/${token}`, {
        password,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        // empty object reset input field
        setData({});
        toast.success(data.success);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Navbar links={[{ button: true, path: "/login", btn_name: "Login" }]} />
      <section className="py-4 py-md-5 mt-5">
        <div className="container py-md-5">
          <div className="row d-flex align-items-center">
            <div className="col-md-6 text-center">
              <img className="img-fluid w-100" src={forgot} />
            </div>
            <div className="col-md-5 col-xl-4 text-center text-md-start">
              <h2 className="display-6 fw-bold mb-4">
                Change your <span className="underline">password</span>?
              </h2>
              <p className="text-muted">
                Enter a new password for your account.
              </p>
              <form method="post" onSubmit={ChangePass}>
                <div className="mb-3">
                  <input
                    className="shadow form-control"
                    type="password"
                    name="password"
                    placeholder="New Password"
                    value={data.password}
                    onChange={(e) => setData({ ...data, password: e.target.value })}
                  />
                </div>
                <div className="mb-5">
                  <button className="btn btn-primary shadow" type="submit">
                    Change password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForgotPassword;