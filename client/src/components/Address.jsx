import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Form, FormItem } from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "../components/ui/button";

export default function Address(props) {
  const navigate = useNavigate();
  const [data, setData] = useState({
    shippingAddress: "",
    shippingCity: "",
    shippingCountry: "",
    billingAddress: "",
    billingCity: "",
    billingCountry: "",
  });
  useEffect(() => {
    setData({
      shippingAddress: props.addressData.shippingAddress.address,
      shippingCity: props.addressData.shippingAddress.city,
      shippingCountry: props.addressData.shippingAddress.country,
      billingAddress: props.addressData.billingAddress.address,
      billingCity: props.addressData.billingAddress.city,
      billingCountry: props.addressData.billingAddress.country,
    });
  }, [props]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

        const response = await axios.patch(`/update-user-address/${props.id}`,{data})
        if(response.data.success)
          {
            toast.success(response.data.success);
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }
          else{
            toast.error(response.data.error);
          }
        console.log(data)
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <div className="overflow-hidden">
      <h3 className="text-dark mb-4 text-xl">Address</h3>
      <div className="flex">
        <div className="w-1/2 mr-5">
          <h6 className="my-4 text-lg">Shipping Address</h6>
          <Form>
            <FormItem>
              <div className="mb-4">
                <Label htmlFor="shipAddress">Address</Label>
                <Input
                  id="shipAddress"
                  type="text"
                  className="border-2 border-gray-100 rounded-sm h-10 shadow-sm"
                    placeholder={props.addressData.shippingAddress.address}
                  value={data.shippingAddress}
                  onChange={(e) =>
                    setData({ ...data, shippingAddress: e.target.value })
                  }
                />
              </div>
            </FormItem>
            <div className="flex mb-4">
              <FormItem>
                <div className="mr-2">
                  <Label htmlFor="shipCity">City</Label>
                  <Input
                    id="shipCity"
                    type="text"
                    className="border-2 border-gray-100 rounded-sm h-10 shadow-sm"
                    placeholder={props.addressData.shippingAddress.city}
                    value={data.shippingCity}
                    onChange={(e) =>
                      setData({ ...data, shippingCity: e.target.value })
                    }
                  />
                </div>
              </FormItem>
              <FormItem>
                <div className="ml-2">
                  <Label htmlFor="shipCountry">Country</Label>
                  <Input
                    id="shipCountry"
                    type="text"
                    className="border-2 border-gray-100 rounded-sm h-10 shadow-sm"
                    placeholder={props.addressData.shippingAddress.country}
                    value={data.shippingCountry}
                    onChange={(e) =>
                      setData({ ...data, shippingCountry: e.target.value })
                    }
                  />
                </div>
              </FormItem>
            </div>
          </Form>
        </div>
        <div className="w-1/2 ml-5">
          <h6 className="my-4 text-lg">Billing Address</h6>
          <Form>
            <FormItem>
              <div className="mb-4">
                <Label htmlFor="billAddress">Address</Label>
                <Input
                  id="billAddress"
                  type="text"
                  className="border-2 border-gray-100 rounded-sm h-10 shadow-sm"
                    placeholder={props.addressData.billingAddress.address}
                  value={data.billingAddress}
                  onChange={(e) =>
                    setData({ ...data, billingAddress: e.target.value })
                  }
                />
              </div>
            </FormItem>
            <div className="flex mb-4">
              <FormItem>
                <div className="mr-2">
                  <Label htmlFor="billCity">City</Label>
                  <Input
                    id="billCity"
                    type="text"
                    className="border-2 border-gray-100 rounded-sm h-10 shadow-sm"
                    placeholder={props.addressData.billingAddress.city}
                    value={data.billingCity}
                    onChange={(e) =>
                      setData({ ...data, billingCity: e.target.value })
                    }
                  />
                </div>
              </FormItem>
              <FormItem>
                <div className="ml-2">
                  <Label htmlFor="billCountry">Country</Label>
                  <Input
                    id="billCountry"
                    type="text"
                    className="border-2 border-gray-100 rounded-sm h-10 shadow-sm"
                    placeholder={props.addressData.billingAddress.country}
                    value={data.billingCountry}
                    onChange={(e) =>
                      setData({ ...data, billingCountry: e.target.value })
                    }
                  />
                </div>
              </FormItem>
            </div>
          </Form>
        </div>
      </div>
      <div className="mt-5 flex justify-center">
        <Button className="bg-black w-full" type="submit" onClick={handleSubmit}>
          Save Changes
        </Button>
      </div>
    </div>
  );
}
