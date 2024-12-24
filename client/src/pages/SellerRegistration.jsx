import React, { useContext } from 'react'
import axios from "axios";
import {  useState } from "react";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";
import { Form, FormItem } from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "../components/ui/button";
import pfp from "../assets/user_pfp.png";
import { PhoneInput } from '../components/PhoneInput';
import Navbar from '../components/Navbar';
import { Separator } from "../components/ui/seperator";
import { UserContext } from '../context/userContext';
import { Textarea } from '../components/ui/textarea';
export const SellerRegistration = () => {
    const preset_key = process.env.REACT_APP_CLOUDINARY_PRESET_KEY || "funoon";
    const cloud_name =  process.env.REACT_APP_CLOUD_NAME || "yousuf"; 
    const { user, ready,updateUserContext } = useContext(UserContext);
    const [phoneNo, setPhoneNum] = useState("");
    const [data, setData] = useState({
        email:'',
        name:'',
        description:''
    });
    const [image, setImage] = useState();
    const [coverPreview, setCoverPreview] = useState(pfp);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
      if(!!image && !!data.email && !!data.name && !!data.description && !!phoneNo)
        {
        try {
              const formData = new FormData();
            formData.append("file", image);
            formData.append("upload_preset", preset_key);
            formData.append("cloud_name", cloud_name);
        
            const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
              method: "POST",
              body: formData,
            });
            const imgdata = await res.json();
            setCoverPreview(null);
            const response = await axios.post("/registerBrand", {
                data,phoneNo,userid:user._id,urlImage:imgdata.url
            });
            if (response.data.success) {
                toast.success(response.data.success);
                await updateUserContext();
                navigate("/dash");
            } else {
                toast.error(data.error.errors.email.properties.message);
            }
        } catch (error) {
            toast.error(error.response.data.error.errors.email.message);
        }
      }
      else{
        toast.error('Please Fill all the fields')
      }
    }
    if (!ready) {
        return (<div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full border-4 border-gray-300 border-t-gray-900 h-12 w-12 dark:border-gray-600 dark:border-t-gray-50" />
          <p className="text-gray-500 dark:text-gray-400">Loading content...</p>
        </div>
      </div>);
      }
    if (ready && (!user || user.isSeller)) {
        toast.error('Please log in to access this page!');
        return <Navigate to={"/login"} />;
      }
    
  return (
    <div>
    <Navbar links={[{ button: true, path: "/", btn_name: "Logout" }]} />
    <div className="space-y-6 p-10 pb-16 md:block mx-auto max-w-4xl">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Seller Registration</h2>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        
        <div className="flex-1 lg:max-w-2xl">
        <div className="overflow-hidden">
      <div className="flex justify-between">
        <div className="w-2/3">
          <Form>
            <FormItem>
              <div className="w-4/5 pb-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  className="border-2 border-gray-100 rounded-sm h-10 shadow-sm"
                  onChange={(e) =>
                          setData({ ...data, email: e.target.value })
                        }
                required />
              </div>
            </FormItem>
            <FormItem>
              <div className="w-4/5 pb-2">
                <Label htmlFor="name">Brand Name</Label>
                <Input
                  id="name"
                  type="name"
                  className="border-2 border-gray-100 rounded-sm h-10 shadow-sm"
                  onChange={(e) =>
                          setData({ ...data, name: e.target.value })
                        }
                required
                />
              </div>
            </FormItem>
             <FormItem>
              <div className="w-4/5 pb-2">
                <Label htmlFor="contact">Contact</Label>
                <PhoneInput 
                setPhoneNum={setPhoneNum}
                required
                />
              </div>
            </FormItem>
            <FormItem>
              <div className="w-4/5">
                <Label htmlFor="contact">Description</Label>
                <Textarea onChange={(e) =>
                          setData({ ...data, description: e.target.value })
                        }
                required
                        />
              </div>
            </FormItem>
          </Form>
        </div>
        <div className="w-1/3 flex flex-col items-center">
          <Label>Add banner for the store homepage</Label>
          <Label htmlFor="picture" className="block cursor-pointer">
            <img
              id="preview"
              className="h-32 w-32"
              src={coverPreview}
              alt="Selected Image"
            />
          </Label>
          <Input
            id="picture"
            type="file"
            onChange={(e) => {
                        setImage(e.target.files[0]);
                        setCoverPreview(URL.createObjectURL(e.target.files[0]));
                      }}
            className="border-1 rounded-sm border-gray-100 cursor-pointer h-10 m-0 mt-4 p-2 border-2"
            accept="image/*"
            required
          />
        </div>
      </div>
      <div className="pt-8 flex justify-center">
        <Button
          className="w-full bg-black rounded-sm h-10"
          onClick={handleSubmit}
        >
          Save Changes
        </Button>
      </div>
    </div>
        </div>
      </div>
    </div>
  </div>
  )
}