import {
  Copy,
  CreditCard,
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  Settings,
  ShoppingCart,
  Truck,
  Users2,
  PackagePlus
} from "lucide-react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select"

import { Button } from "../components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import Logo from "../assets/symvol_logo_transparent.svg";
import { Separator } from "../components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table"
import {
  Tabs,
  TabsContent,
} from "../components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "../components/ui/tooltip"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/userContext"
import { Link,Navigate, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import axios from "axios"
import { Money } from "@mui/icons-material"

const SellerDash = ()=>  {
  const { user, ready,setUser,updateUserContext } = useContext(UserContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [display, setDisplay] = useState()
  const [status, setStatus] = useState()
  const [seller, setSeller] = useState()
  const navigate = useNavigate()
  const logout = () => {
    axios
      .get("/logout")
      .then((res) => {
        if (res.data && res.data.Status === "Success") {
          setUser(null);
          toast.success("Successfully logged out");
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(()=>{
    const fetchData = async () => {
      if (status && status.id) {
        try {
          const response = await axios.patch(`/update-order-status/${status.id}`,{status:status.status});
          toast.success(response.data.success)
        } catch (error) {
          console.error("error");
        }
      }
    };
    if (status) {
      fetchData();
    }
  },[status])
  useEffect(() => {
    const fetchData = async () => {
      if (ready && user && user._id) {
        try {
          const response = await axios.get(`/seller-detail/${user._id}`);
          setSeller(response.data.brand);
          setData(response.data.orders);
          await updateUserContext();
          console.log(response.data.orders)
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    if (ready) {
      fetchData();
    }
  }, [ready, user]);
  const subtotal = () => {
    let total = 0;
    display.products.map((item,index) => {
      const productDetail = display.productDetails[index]
      total += productDetail.price * item.quantity;
    });
    return total;
  };
  const handledisplay = (order) => { 
    const newProductDetails = order.products.map(orderProduct => {
      const detail = order.productDetails.find(detail => detail._id === orderProduct.product);
      return {
        ...orderProduct,
        ...(detail ? detail : {})
      };
    }).filter(product => product._id); // Filter out products without corresponding details
  
    const newOrder = {
      ...order,
      productDetails: newProductDetails
    };
  
    setDisplay(newOrder)
  }
  if (loading) {
    return (
    <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full border-4 border-gray-300 border-t-gray-900 h-12 w-12 dark:border-gray-600 dark:border-t-gray-50" />
          <p className="text-gray-500 dark:text-gray-400">Loading content...</p>
        </div>
      </div>)
  }
  if (ready && (!user || !user.isSeller)) {
    toast.error('Please log in to access or become a seller!');
    return <Navigate to="/login" />;
  }
  return (
    <TooltipProvider>
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <a
            href="/"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <img src={Logo} className="h-3 w-3 transition-all group-hover:scale-110" />
            <span className="sr-only"></span>
          </a>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Orders</span>
              </a>
            </TooltipTrigger>
            <TooltipContent side="right">Orders</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href="seller/products"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Package className="h-5 w-5" />
                <span className="sr-only">Products</span>
              </a>
            </TooltipTrigger>
            <TooltipContent side="right">Products</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href="seller/add"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <PackagePlus className="h-5 w-5" />
                <span className="sr-only">Add Product</span>
              </a>
            </TooltipTrigger>
            <TooltipContent side="right">Add Product</TooltipContent>
          </Tooltip>
          
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="sm:hidden">
              <PanelLeft className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-xs">
            <nav className="grid gap-6 text-lg font-medium">
              <a
                href="/"
                className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
              >
                <img src={Logo} className="h-4 w-4 transition-all group-hover:scale-110" />
                <span className="sr-only"></span>
              </a>
              <a
                href="#"
                className="flex items-center gap-4 px-2.5 text-foreground"
              >
                <ShoppingCart className="h-5 w-5" />
                Orders
              </a>
              <a
                href="/seller/products"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Package className="h-5 w-5" />
                Products
              </a>
              <a
                href="seller/add"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <PackagePlus className="h-5 w-5" />
                Add Product
              </a>
            </nav>
          </SheetContent>
        </Sheet>

        <div className="flex items-center gap-4 ml-auto">
          <span>Hello, <b>{seller?.name}</b></span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <img
                  src={seller?.image}
                  width={36}
                  height={36}
                  alt="ProfilePicture"
                  className="overflow-hidden rounded-full"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Button onClick={logout} className ="w-full">Logout</Button>  
              
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2 ">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <Card
                className="sm:col-span-2" x-chunk="dashboard-05-chunk-0"

              >
                <CardHeader className="pb-3">
                  <CardTitle>Your Products</CardTitle>
                  <CardDescription className="max-w-lg text-balance leading-relaxed">
                    Your products are the items you have listed for sale in your store.
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button onClick={()=> navigate("/seller/products")}>View All</Button>
                </CardFooter>
              </Card>
              <Card x-chunk="dashboard-05-chunk-1">
                <CardHeader className="pb-2 pad2x">
                  <CardDescription>Total Earnings</CardDescription>
                  <CardTitle className="text-4xl">
                  Rs,{
                    data?.reduce((acc, order) => acc + order.totalPrice, 0)
                  }</CardTitle>
                </CardHeader>
                <CardContent>
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-05-chunk-2 ">
                <CardHeader className="pb-2 pad1">
                  <CardDescription>Total Orders</CardDescription>
                  <CardTitle className="text-4xl">{data?.length}</CardTitle>
                </CardHeader>
                <CardContent>
                </CardContent>
              </Card>
            </div>
            <Tabs defaultValue="">
              <TabsContent value="">
                <Card x-chunk="dashboard-05-chunk-3" >
                  <CardHeader className="px-7">
                    <CardTitle>Orders</CardTitle>
                    <CardDescription>
                      Recent orders from your store.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                  <div className="table-container" style={{ overflowY: 'scroll', maxHeight: '400px' }}>
                    <Table >
                      <TableHeader>
                        <TableRow>
                          <TableHead>Customer</TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Payment Method
                          </TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Status
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Date
                          </TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                      {
                        data?.map((order) => (
                          <TableRow key={order._id}
                          onClick={()=> {handledisplay(order) 
                          }}
                          className={display && display._id === order._id ? "bg-accent" : ""}
                          >
                            <TableCell>
                              <div className="font-medium">{order.buyerDetails.FirstName}</div>
                              <div className="hidden text-sm text-muted-foreground md:inline">
                                {order.buyerDetails.email}
                              </div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              {order.paymentMethod}
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                            <Select onValueChange={(value) => setStatus({id:order._id,status:value})} defaultValue={order.status}>
                                <SelectTrigger>
                                  <SelectValue placeholder={order.status} />
                                </SelectTrigger>
                              <SelectContent >
                                <SelectItem value="Processing">Processing</SelectItem>
                                <SelectItem value="Shipped">Shipped</SelectItem>
                                <SelectItem value="Delivered">Delivered</SelectItem>
                              </SelectContent>
                            </Select>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {new Date(order.placedAt).toISOString().split("T")[0]}
                            </TableCell>
                            <TableCell className="text-right">{order.totalPrice}</TableCell>
                          </TableRow>
                        ))
                      }
                      </TableBody>
                    </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          <div>
            <Card
              className="overflow-hidden" x-chunk="dashboard-05-chunk-4"
            >
              <CardHeader className="flex flex-row items-start bg-muted/50">
                <div className="grid gap-0.5">
                  <CardTitle className="group flex items-center gap-2 text-lg">
                    Order {display?._id}
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <Copy className="h-3 w-3" />
                      <span className="sr-only">Copy Order ID</span>
                    </Button>
                  </CardTitle>
                  <CardDescription>Date: { 
                    display?.placedAt ? display.placedAt.split("T")[0] : ""
                  }</CardDescription>
                </div>
                
                <div className="ml-auto flex  gap-1">
                  { display? (
                <Link to={'/orders/'+display?._id} className="flex items-center gap-2">
                    <Button size="sm" variant="outline" className="h-8 gap-1">
                    <Truck className="h-3.5 w-3.5" />
                    <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                        Track Order
                    </span>
            </Button>
            </Link>
            ):(<></>)}
                </div>
              </CardHeader>
              <CardContent className="p-6 text-sm">
                <div className="grid gap-3">
                  <div className="font-semibold">Order Details</div>
                  <ul className="grid gap-3">
                  {
                  display?.products.map((product, index) => {
                    const productDetail = display.productDetails[index];
                    return (
                      <li key={product._id} className="flex items-center justify-between">
                        <div>
                          <span>{productDetail.name}</span>
                        </div>
                        <span>{product.quantity}</span>
                      </li>
                    );
                  })
                }
                  </ul>
                  <Separator className="my-2" />
                  <ul className="grid gap-3">
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>{display? `Rs ${subtotal()}`:""}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>{display? `Rs ${display.totalPrice-subtotal()}`:""}</span>
                    </li>
                    <li className="flex items-center justify-between font-semibold">
                      <span className="text-muted-foreground">Total</span>
                      <span>Rs {display?.totalPrice}</span>
                    </li>
                  </ul>
                </div>
                <Separator className="my-4" />
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-3">
                    <div className="font-semibold">Shipping Information</div>
                    <address className="grid gap-0.5 not-italic text-muted-foreground">
                
                      <span>{display?.buyerDetails.address.shippingAddress.address}</span>
                      <span>{display?.buyerDetails.address.shippingAddress.city}, {display?.buyerDetails.address.shippingAddress.country}</span>
                    </address>
                  </div>
                  <div className="grid auto-rows-max gap-3">
                    <div className="font-semibold">Billing Information</div>
                    <div className="text-muted-foreground">
                      <span>{display?.buyerDetails.address.billingAddress.address}</span><br/>
                      <span>{display?.buyerDetails.address.billingAddress.city}, {display?.buyerDetails.address.billingAddress.country}</span>
                    </div>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="grid gap-3">
                  <div className="font-semibold">Customer Information</div>
                  <dl className="grid gap-3">
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Customer</dt>
                      <dd><span>{display?.buyerDetails.FirstName}</span></dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Email</dt>
                      <dd>
                        <a href="mailto:"><span>{display?.buyerDetails.email}</span>
</a>
                      </dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Phone</dt>
                      <dd>
                        <a href="tel:"><span>{display?.buyerDetails.phoneNo}</span></a>
                      </dd>
                    </div>
                  </dl>
                </div>
                <Separator className="my-4" />
                <div className="grid gap-3">
                  <div className="font-semibold">Payment Information</div>
                  <dl className="grid gap-3">
                    <div className="flex items-center justify-between">
                      <dt className="flex items-center gap-1 text-muted-foreground">
                        {
                          display?.paymentMethod === "Pay through Stripe" ? (
                            <CreditCard className="h-4 w-4" />
                          ) : (
                            <Money className="h-4 w-4" />
                          )
                        }
                        {display?.paymentMethod}
                      </dt>
                    </div>
                  </dl>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
    </TooltipProvider>
  )
}
export default SellerDash;
{/* <TableCell>
                            <div className="font-medium">Liam Johnson</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                              liam@example.com
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            Sale
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <Badge className="text-xs" variant="secondary">
                              Fulfilled
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            2023-06-23
                          </TableCell>
                          <TableCell className="text-right">$250.00</TableCell>
                        </TableRow>
                        
                        <TableRow>
                          <TableCell>
                            <div className="font-medium">Emma Brown</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                              emma@example.com
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            Sale
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <Badge className="text-xs" variant="secondary">
                              Fulfilled
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            2023-06-26
                          </TableCell>
                          <TableCell className="text-right">$450.00</TableCell> */}