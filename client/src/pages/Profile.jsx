import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Address from "../components/Address";
import Orders from "../components/Orders";
import UserProfile from "../components/UserProfile";
import { UserContext } from "../context/userContext";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { Separator } from "../components/ui/seperator";

const Profile = () => {
  const [render, setRender] = useState("Profile");
  const [data, setData] = useState({
    email: "",
    FirstName: "",
    LastName: "",
    googleID: "",
    address: {},
    orders: {},
  });
  const { user, ready } = useContext(UserContext);
  const sidebarNavItems = [
    {
      title: "Profile",
    },
    {
      title: "Orders",
    },
    {
      title: "Address",
    },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/user-profile/${user._id}`);
        const {
          FirstName,
          LastName,
          email,
          orders,
          googleID,
          address,
          phoneNo,
          image,
        } = response.data;
        if (googleID)
          setData({
            email: email,
            FirstName: FirstName,
            LastName: LastName,
            googleID: googleID,
            address: address,
            orders: orders,
            phoneNo: phoneNo,
            image: user.image,
          });
        else
          setData({
            email: email,
            FirstName: FirstName,
            LastName: LastName,
            address: address,
            googleID: null,
            orders: orders,
            phoneNo: phoneNo,
            image: user.image,
          });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  if (!ready) {
      return (
        <div className="flex h-screen w-full items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full border-4 border-gray-300 border-t-gray-900 h-12 w-12 dark:border-gray-600 dark:border-t-gray-50" />
            <p className="text-gray-500 dark:text-gray-400">
              Loading content...
            </p>
          </div>
        </div>
      );
  }
  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div>
      <Navbar links={[{ button: true, path: "/", btn_name: "Logout" }]} />
      <div className="space-y-6 p-10 pb-16 md:block mx-auto max-w-4xl">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Account</h2>
          <p className="text-muted-foreground">Manage your user account.</p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <Sidebar
              setRender={setRender}
              render={render}
              items={sidebarNavItems}
            />
          </aside>
          <div className="flex-1 lg:max-w-2xl">
            {render === "Profile" && (
              <UserProfile
                FirstName={data.FirstName}
                LastName={data.LastName}
                email={data.email}
                googleID={data.googleID}
                id={user._id}
                phoneNo={data.phoneNo}
                image={data.image}
              />
            )}
            {render === "Orders" && <Orders orderData={data.orders} />}
            {render === "Address" && (
              <Address addressData={data.address} id={user._id} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;