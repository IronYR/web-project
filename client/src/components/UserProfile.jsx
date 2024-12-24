import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Form, FormItem } from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "../components/ui/button";
import { PhoneInput } from "./PhoneInput";

export default function  UserProfile(props) {
  const preset_key = process.env.REACT_APP_CLOUDINARY_PRESET_KEY|| "funoon";
  const cloud_name = process.env.REACT_APP_CLOUD_NAME || "yousuf";
  const [phoneNo, setPhoneNum] = useState("");
  const [data, setData] = useState({
    FirstName: "",
    LastName: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [image, setImage] = useState();
  const [coverPreview, setCoverPreview] = useState();

  useEffect(() => {
    setData((prevVal) => ({
      ...prevVal,
      FirstName: props.FirstName,
      LastName: props.LastName,
    }));
    setPhoneNum(props.phoneNo);
    setCoverPreview(props.image);
  }, [props]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = props.image;
    if (image) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", preset_key);
      formData.append("cloud_name", cloud_name);
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const imgdata = await res.json();
      imageUrl = imgdata.url;
    }

    try {
      const response = await axios.patch(`/update-user-profile/${props.id}`, {
        data,
        phoneNo,
        imageUrl,
      });
      if (response.data.success) {
        toast.success(response.data.success);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      toast.error(error);
    }
  };
  const fullName = `${props.FirstName}`;
  const previewImage = (event) => {
    const input = event.target;
    const preview = document.getElementById("preview");

    if (input.files && input.files[0]) {
      const reader = new FileReader();

      reader.onload = function (e) {
        preview.src = e.target.result;
        preview.classList.remove("hidden");
      };

      reader.readAsDataURL(input.files[0]);
    }
  };
  return (
    <div className="overflow-hidden">
      <h3 className="text-dark mb-4 text-xl">Profile</h3>
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
                  placeholder={props.email}
                  disabled
                />
              </div>
            </FormItem>
            <FormItem>
              <div className="w-4/5 pb-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="name"
                  className="border-2 border-gray-100 rounded-sm h-10 shadow-sm"
                  placeholder={fullName}
                  disabled
                />
              </div>
            </FormItem>
            <FormItem>
              <div className="w-4/5">
                <Label htmlFor="contact">Contact</Label>
                <PhoneInput
                  id="contact"
                  setPhoneNum={setPhoneNum}
                  phoneNo={phoneNo}
                />
              </div>
            </FormItem>
          </Form>
        </div>
        <div className="w-1/3 flex flex-col items-center">
          <Label>Profile Photo</Label>
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
          />
        </div>
      </div>
      <div className="pt-5">
        <h3 className="text-dark mb-4 text-xl">Change Password</h3>
        <div className="">
          <form>
            <Form>
              <div className="flex">
                <div className="w-1/2">
                  <FormItem>
                    <div className="w-4/5">
                      <Label htmlFor="newPass">New Password</Label>
                      <Input
                        id="newPass"
                        type="password"
                        className="bborder-2 border-gray-100 rounded-sm h-10 shadow-sm"
                        value={data.newPassword}
                        onChange={(e) =>
                          setData({ ...data, newPassword: e.target.value })
                        }
                      />
                    </div>
                  </FormItem>
                </div>
                <div className="w-1/2">
                  <FormItem>
                    <div className="w-4/5">
                      <Label htmlFor="conPass">Confirm Password</Label>
                      <Input
                        id="conPass"
                        type="password"
                        className="border-2 border-gray-100 rounded-sm h-10 shadow-sm"
                        value={data.confirmPassword}
                        onChange={(e) =>
                          setData({ ...data, confirmPassword: e.target.value })
                        }
                      />
                    </div>
                  </FormItem>
                </div>
              </div>
            </Form>
          </form>
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
  );
}
