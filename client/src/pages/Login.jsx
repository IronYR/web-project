import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import login from "../assets/signup.png";
import { UserContext } from "../context/userContext";
import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
import google from "../assets/google.svg";
import { Form, FormItem } from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Label } from "@radix-ui/react-label";

export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const { setUser } = useContext(UserContext);
  async function loginUser(e) {
    e.preventDefault();
    const { email, password } = data;
    try {
      const response = await axios.post("/login", {
        email,
        password,
      });

      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        setUser(response.data.user);
        localStorage.setItem("token", response.data.token);
        toast.success("Welcome Back");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
       <div className="overflow-hidden">
        <Navbar
          links={[{ button: true, path: "/Register", btn_name: "Register" }]}
        />
        {/* Large Screen start */}
        <div className="hidden lg:block">
          <div className="py-5 flex justify-center items-center">
            <div className="w-1/2">
              <img className="w-full m-auto p-16" src={login} />
            </div>
            <div className="w-1/2 mb-10">
              <div className="w-1/2 m-auto">
                <form onSubmit={loginUser} method="post">
                  <Form>
                    <h3 className="mb-5 text-3xl font-bold">Log In</h3>
                    <FormItem>
                      <div className="w-full pt-4">
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
                      <div className="w-full pt-4">
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
                      <div className="flex justify-between mt-2 items-center">
                        <div>
                          <Checkbox id="remember" />
                          <Label htmlFor="remember" className="ml-2">
                            Remember me
                          </Label>
                        </div>
                        <div className="lg:text-xs xl:text-sm">
                          <Link to="/ResetPassword">
                            <p className="cursor-pointer m-auto">
                              <u>
                                <b>Forgot Password?</b>
                              </u>
                            </p>
                          </Link>
                        </div>
                      </div>
                    </FormItem>
                    <FormItem>
                      <div className="w-full my-3">
                        <Button
                          className="w-full h-10"
                          type="submit"
                          variant="default"
                        >
                          Log In
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
                    <Link to="http://funoonserver.vercel.app/auth/google/callback">
                      <Button className="w-full bg-white text-black h-10 border-2 border-gray-100 rounded-sm shadow-md">
                        <img src={google} alt="Google" className="h-7 p-1 mr-1" />
                        Log In with Google
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
            <form onSubmit={loginUser} method="post" className="w-80">
              <Form>
                <h3 className="mb-5 font-bold text-xl">Log In</h3>
                <FormItem>
                  <div className="w-full">
                    <Label htmlFor="inEmai1">Email</Label>
                    <Input
                      id="inEmai1"
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
                  <div className="flex justify-between mt-2 items-center">
                    <div>
                      <Checkbox id="remember1" />
                      <Label htmlFor="remember1" className="ml-2">
                        Remember me
                      </Label>
                    </div>
                    <div className="ml-6">
                      <Link to="/ResetPassword">
                        <p className="cursor-pointe m-auto">
                          <u>
                            <b>Forgot Password?</b>
                          </u>
                        </p>
                      </Link>
                    </div>
                  </div>
                </FormItem>
                <FormItem>
                  <div className="my-3">
                    <Button
                      className="w-full bg-black rounded-sm h-10"
                      type="submit"
                    >
                      Log In
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
                <Link to="https://web-project-green-nu.vercel.app/auth/google/callback">
                  <Button className="w-full bg-white text-black border-1 rounded-sm h-10">
                    <img src={google} alt="Google" className="h-7 mr-1 p-1" />
                    Log In with Google
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
