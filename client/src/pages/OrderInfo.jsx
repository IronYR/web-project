
import { CardTitle, CardHeader, CardContent, Card } from "../components/ui/card"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "../components/ui/table"
import { Separator } from "../components/ui/separator"
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";
const OrderInfo =() =>  {
  const {id} = useParams();
  const [data,setData] = useState();
  const [loading, setLoading] = useState(true); 
  const [subtotal, setSubtotal] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const getOrder = async () => {
      try {
        const { data } = await axios.get(`/orderinfo/${id}`);
        setData(data);
        setLoading(false);
        setSubtotal(data.products.reduce((acc, item) => acc + (item.product.price - item.product.discount) * item.quantity, 0))
      } catch (error) {
        console.error(error);
        setLoading(false); 
        navigate('/*')
      }
    };

    getOrder();
  }, [id]);

  if (loading) {
    return (<div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full border-4 border-gray-300 border-t-gray-900 h-12 w-12 dark:border-gray-600 dark:border-t-gray-50" />
        <p className="text-gray-500 dark:text-gray-400">Loading content...</p>
      </div>
    </div>)
  }
  return (
    <div className="flex flex-col">
      <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
        <a className="lg:hidden" href="#">
          <Package2Icon className="h-6 w-6" />
          <span className="sr-only">Home</span>
        </a>
        <div className="flex-1">
          <h1 className="font-semibold text-lg">Order #{data._id}</h1>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-6">
            <div className="grid gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full ${data.status === 'Processing' ? (" bg-black text-white") : ("bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400")}`}>
                    <TruckIcon className="h-4 w-4" />
                  </div>
                  <div className="text-sm font-medium">Processing</div>
                </div>
                <div className="h-[1px] flex-1 bg-gray-200 dark:bg-gray-700" />
                <div className="flex items-center gap-2">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full ${data.status === 'Shipped' ? (" bg-black text-white") : ("bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400")}`}>
                    <TruckIcon className="h-4 w-4" />
                  </div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Shipped</div>
                </div>
                <div className="h-[1px] flex-1 bg-gray-200 dark:bg-gray-700" />
                <div className="flex items-center gap-2">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full ${data.status === 'Delivered' ? (" bg-black text-white") : ("bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400")}`}>
                    <TruckIcon className="h-4 w-4" />
                  </div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Delivered</div>
                </div>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Order placed on {new Date(data.placedAt).toISOString().split("T")[0]}</div>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Products</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="max-w-[150px]">Name</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {
                      data.products.map((product) => (
                        <TableRow key={product._id}>
                          <TableCell>
                            <div className="flex items-center gap-4">
                              <img
                                alt="Product image"
                                className="aspect-square rounded-md object-cover"
                                height="64"
                                src={product.product.images[0]}
                                width="64"
                              />
                              <div className="font-medium">{product.product.name}</div>
                            </div>
                          </TableCell>
                          <TableCell>{product.quantity}</TableCell>
                          <TableCell>{product.product.price}</TableCell>
                        </TableRow>
                      ))
                    }

                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
          <div className="flex flex-col gap-6">
            <Card>
              <div>
                <CardHeader>
                  <CardTitle>Shipping address</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <div>
                    {data?.buyer ? (
                      <>
                        {data.buyer.address.shippingAddress.address}
                        <br />
                        {data.buyer.address.shippingAddress.city}, {data.buyer.address.shippingAddress.country}
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </CardContent>
              </div>
              <Separator />
              <div>
                <CardHeader>
                  <CardTitle>Billing address</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <div>
                    {data?.buyer ? (
                      <>
                        {data.buyer.address.billingAddress.address}
                        <br />
                        {data.buyer.address.billingAddress.city}, {data.buyer.address.billingAddress.country}
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </CardContent>
              </div>
            </Card>
            <Card>
              <div>
                <CardHeader>
                  <CardTitle>User Details</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <div>
                    {data?.buyer ? (
                      <>
                        {data.buyer.FirstName}
                        <br />
                        {data.buyer.email}
                        <br />
                        {data.buyer.phoneNo}
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </CardContent>
              </div>

            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Payment</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex items-center">
                  <div>Subtotal</div>
                  <div className="ml-auto">{
                    subtotal
                  }</div>
                </div>
                <div className="flex items-center">
                  <div>Shipping</div>
                  <div className="ml-auto">{data.totalPrice - subtotal}</div>
                </div>
                <div className="flex items-center">
                  <div>Payment Method</div>
                  <div className="ml-auto"><b>{data.paymentMethod}</b></div>
                </div>
                <Separator />
                <div className="flex items-center font-medium">
                  <div>Total</div>
                  <div className="ml-auto">{data.totalPrice}</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
export default OrderInfo

function Package2Icon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  )
}


function TruckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
      <circle cx="17" cy="18" r="2" />
      <circle cx="7" cy="18" r="2" />
    </svg>
  )
}