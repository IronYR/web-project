import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import signup from "../assets/login.png";
import { Button } from "../components/ui/button";
import google from "../assets/google.svg";
import { Form, FormItem } from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Label } from "@radix-ui/react-label";
import { PhoneInput } from "../components/PhoneInput";

export default function Register() {
  const navigate = useNavigate();
  const [phoneNo, setPhoneNum] = useState("");
    
  const [data, setData] = useState({
    FirstName: "",
    LastName: "",
    email: "",
    password: ""
  });
  const registerUser = async (e) => {
    e.preventDefault();
    console.log(data,phoneNo)
    const { FirstName, LastName, email, password, userType } = data;
    try {
      const { data } = await axios.post("/register", {
        FirstName,
        LastName,
        email,
        password,
        userType,
        phoneNo,
      });
      if (data.error) {
        if (data.error.message) {
          if(
            data.error.message.includes("email")
          )
          {
            toast.error(data.error.errors.email.properties.message);
          }
          else{
            toast.error(data.error.message);
          }
        } else toast.error(data.error);
      } else {
        setData({});
        toast.success("Registration Successful");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
       <div className="overflow-hidden">
        <Navbar links={[{ button: true, path: "/Login", btn_name: "Login" }]} />
        {/* Large Screen start */}
        <div className="hidden lg:block">
          <div className="py-5 flex justify-center items-center">
            <div className="w-1/2">
              <img className="w-full" src={signup} />
            </div>
            <div className="w-1/2 mb-10">
              <div className="w-1/2 m-auto">
                <form onSubmit={registerUser} method="post">
                  <Form>
                    <h3 className="mb-5 text-3xl font-bold">Register</h3>
                    <FormItem>
                      <div className="w-full mb-2">
                        <Label htmlFor="fName">First Name</Label>
                        <Input
                          id="fName"
                          type="text"
                          className="border-2 border-gray-100 rounded-sm h-10 shadow-sm"
                          value={data.FirstName}
                          onChange={(e) =>
                            setData({ ...data, FirstName: e.target.value })
                          }
                        />
                      </div>
                    </FormItem>
                    <FormItem>
                      <div className="w-full mb-2">
                        <Label htmlFor="lName">Last Name</Label>
                        <Input
                          id="lName"
                          type="text"
                          className="border-2 border-gray-100 rounded-sm h-10 shadow-sm"
                          value={data.LastName}
                          onChange={(e) =>
                            setData({ ...data, LastName: e.target.value })
                          }
                        />
                      </div>
                    </FormItem>
                    <FormItem>
                      <div className="w-full mb-2">
                        <Label htmlFor="inEmail">Email</Label>
                        <Input
                          id="inEmail"
                          type="email"
                          className="border-2 border-gray-100 rounded-sm h-10 shadow-sm"
                          value={data.email}
                          onChange={(e) =>
                            setData({ ...data, email: e.target.value })
                          }
                        />
                      </div>
                    </FormItem>
                    <FormItem>
                      <div className="w-full">
                        <Label htmlFor="phoneNo">Phone Number</Label>
                    <PhoneInput setPhoneNum={setPhoneNum} />
                      </div>
                    </FormItem>
                    <FormItem>
                      <div className="w-full">
                        <Label htmlFor="inPass">Password</Label>
                        <Input
                          id="inPass"
                          type="password"
                          className="border-2 border-gray-100 rounded-sm h-10 shadow-sm"
                          value={data.password}
                          onChange={(e) =>
                            setData({ ...data, password: e.target.value })
                          }
                        />
                      </div>
                    </FormItem>
                    
                    <FormItem>
                      <div className="w-full my-3">
                        <Button
                          className="w-full h-10"
                          type="submit"
                        >
                          Register
                        </Button>
                      </div>
                    </FormItem>
                  </Form>
                </form>
                <div>
                  <div className="flex justify-center items-center">
                    <p className="m-auto text-sm">OR</p>
                  </div>
                  <div className="w-full mt-3">
                    <Link to="http://localhost:8000/auth/google/callback">
                      <Button className="w-full bg-white text-black border-1 rounded-sm h-10 border-2 border-gray-100 shadow-md">
                        <img src={google} alt="Google" className="h-7 mr-2" />
                        Register with Google
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Large Screen end */}
        {/* Mobile Screen Start */}
        <div className="lg:hidden">
          <div className="flex flex-col justify-center items-center h-screen w-screen pb-24">
            <form onSubmit={registerUser} method="post" className="w-80">
              <Form>
                <h3 className="mb-5 font-bold text-xl">Register</h3>
                <FormItem>
                  <div className="w-full">
                    <Label htmlFor="fName1">First Name</Label>
                    <Input
                      id="fName1"
                      type="text"
                      className="border-1 rounded-sm h-10"
                      value={data.FirstName}
                      onChange={(e) =>
                        setData({ ...data, FirstName: e.target.value })
                      }
                    />
                  </div>
                </FormItem>
                <FormItem>
                  <div className="w-full">
                    <Label htmlFor="lName1">Last Name</Label>
                    <Input
                      id="lName1"
                      type="text"
                      className="border-1 rounded-sm h-10"
                      value={data.LastName}
                      onChange={(e) =>
                        setData({ ...data, LastName: e.target.value })
                      }
                    />
                  </div>
                </FormItem>
                <FormItem>
                  <div className="w-full">
                    <Label htmlFor="inEmail1">Email</Label>
                    <Input
                      id="inEmail1"
                      type="email"
                      className="border-1 rounded-sm h-10"
                      value={data.email}
                      onChange={(e) =>
                        setData({ ...data, email: e.target.value })
                      }
                    />
                  </div>
                </FormItem>
                <FormItem>
                  <div className="w-full">
                    <Label htmlFor="inPass1">Password</Label>
                    <Input
                      id="inPass1"
                      type="password"
                      className="border-1 rounded-sm h-10"
                      value={data.password}
                      onChange={(e) =>
                        setData({ ...data, password: e.target.value })
                      }
                    />
                  </div>
                </FormItem>
                <FormItem>
                  <div className="w-full my-3">
                    <Button
                      className="w-full bg-black rounded-sm h-10"
                      type="submit"
                    >
                      Register
                    </Button>
                  </div>
                </FormItem>
              </Form>
            </form>
            <div className="w-80">
              <div className="flex justify-center items-center">
                <p className="m-auto text-sm">OR</p>
              </div>
              <div className="w-full mt-3">
                <Link to="http://localhost:8000/auth/google/callback">
                  <Button className="w-full bg-white text-black border-1 rounded-sm h-10">
                    <img src={google} alt="Google" className="h-7 mr-2" />
                    Register with Google
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* Mobile Screen end */}
      </div>
    </>
  );
}