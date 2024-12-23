import {
    Home,
    LineChart,
    Package,
    Package2,
    PanelLeft,
    PlusCircle,
    Search,
    Settings,
    ShoppingCart,
    Users2,
    PackagePlus
  } from "lucide-react"
  
  import Logo from "../assets/symvol_logo_transparent.svg"
  import { Button } from "../components/ui/button"
  import {
    Card,
    CardContent,
    CardDescription,
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
  import { Input } from "../components/ui/input"
  import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet"
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "../components/ui/table"
  import { Switch } from "../components/ui/switch"
  
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
  
  const ProductInfo = () => {
    const { user, ready,setUser } = useContext(UserContext);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [productStates, setProductStates] = useState({});
    const navigate = useNavigate();
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
    useEffect(() => {
      const fetchData = async () => {
        if (ready && user && user._id && user.brand) {
          try {
            const response = await axios.get(`/seller/${user.brand._id}`);
            const fetchedData = response.data.products;
            console.log(fetchedData)
            setData(fetchedData);
            //object with product id as key and isActive, price, quantity as value
            const initialProductStates = fetchedData.reduce((acc, product) => {
              acc[product._id] = {
                isActive: product.isActive,
                price: product.price,
                quantity: product.quantity,
                discount: product.discount,
              };
              return acc;
            }, {});
            console.log()
            setProductStates(initialProductStates);
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
  
    const handleSwitchChange = (productId, checked) => {
      setProductStates((prevState) => ({
        ...prevState,
        [productId]: {
          ...prevState[productId],
          isActive: checked,
        },
      }));
    };
  
  const handleSubmit =async (id)=>{
    if(productStates[id].quantity<0 || productStates[id].price<0 || productStates[id].discount<0){
      toast.error('Please enter valid values')
    }
    else{
      try{
        await axios.patch(`/update-product/${id}`,productStates[id]);
        toast.success('Product Updated Successfully')
      }
      catch(error){
        console.error(error);
      }
    }
  }
    // useEffect(()=>{
    //   const fetchData = async () => {
    //     if (status && status.id) {
    //       try {
    //         const response = await axios.patch(`/update-order-status/${status.id}`,{status:status.status});
    //         toast.success(response.data.success)
    //       } catch (error) {
    //         console.error("error");
    //       }
    //     }
    //   };
    //   if (status) {
    //     fetchData();
    //   }
    // },[status])
    if (loading) {
      return (<div className="flex h-screen w-full items-center justify-center">
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
                  href="/dash"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
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
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
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
                  href="/seller/add"
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
                  <img src={Logo} className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only"></span>
                </a>
                <a
                  href="/dash"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Orders
                </a>
                <a
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-foreground "
                >
                  <Package className="h-5 w-5" />
                  Products
                </a>
                <a
                  href="/seller/add"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <PackagePlus className="h-5 w-5" />
                  Add Order
                </a>
              </nav>
            </SheetContent>
          </Sheet>
  
          <div className="flex items-center gap-4 ml-auto">
            <span>Hello, <b>{user.brand.name}</b></span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="overflow-hidden rounded-full"
                >
                  <img
                    src={user.brand.image}
                    width={36}
                    height={36}
                    alt="ProfilePicture"
                    className="overflow-hidden rounded-full"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <Button onClick={logout} className="w-full">Logout</Button>  
                
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          </header>
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <Tabs defaultValue="all">
              <div className="flex items-center">
                
                <div className="ml-auto flex items-center gap-2">
                  <Button size="sm" className="h-8 gap-1" onClick={()=>{
                    navigate('/seller/add')
                  }}>
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Add Product
                    </span>
                  </Button>
                </div>
              </div>
              <TabsContent value="all">
                <Card x-chunk="dashboard-06-chunk-0">
                  <CardHeader>
                    <CardTitle>Products</CardTitle>
                    <CardDescription>
                      Manage your products and view their sales performance.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                      <TableRow>
                    <TableHead className="p-2">
                      <span className="sr-only">img</span>
                    </TableHead>
                    <TableHead className="p-2">Name</TableHead>
                    <TableHead className="p-2">Status</TableHead>
                    <TableHead className="p-2 md:table-cell">Price</TableHead>
                    <TableHead className="p-2 ">Quantity</TableHead>
                    <TableHead className="p-2">Items Sold</TableHead>
                    <TableHead className="p-2">Discount</TableHead>
                    <TableHead className="p-2">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                {
                  data ? (
                    data.map((product) => (
                      <TableRow key={product._id}>
                        <TableCell className="p-2">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="h-10 w-10 rounded-md"
                          />
                        </TableCell>
                        <TableCell className="p-2">{product.name}</TableCell>
                        <TableCell className="p-2">
                          <Switch
                            checked={productStates[product._id].isActive}
                            onCheckedChange={(checked) =>
                              handleSwitchChange(product._id, checked)
                            }
                          />
                        </TableCell>
                        <TableCell className="p-2">
                          <Input
                            type="number"
                            value={productStates[product._id].price}
                            onChange={(e) =>
                              setProductStates((prevState) => ({
                                ...prevState,
                                [product._id]: {
                                  ...prevState[product._id],
                                  price: e.target.value,
                                },
                              }))
                            }
                          />
                        </TableCell>
                        <TableCell className="p-2">
                          <Input
                            type="number"
                            value={productStates[product._id].quantity}
                            onChange={(e) =>
                              setProductStates((prevState) => ({
                                ...prevState,
                                [product._id]: {
                                  ...prevState[product._id],
                                  quantity: e.target.value,
                                },
                              }))
                            }
                          />
                        </TableCell>
                        <TableCell className="p-2">{product.itemsSold}</TableCell>
                        <TableCell className="p-2">
                          <Input
                            type="number"
                            value={productStates[product._id].discount}
                            onChange={(e) =>
                              setProductStates((prevState) => ({
                                ...prevState,
                                [product._id]: {
                                  ...prevState[product._id],
                                  discount: e.target.value,
                                },
                              }))
                            }
                          />
                        </TableCell>
                        <TableCell className="p-2">
                          <Button
                            size="sm"
                            onClick={() => handleSubmit(product._id)}
                          >
                            Save
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ):(<></>)
                  }
                  
                      </TableBody>
                    </Table>
                  </CardContent>
                  </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
      </TooltipProvider>
    )
  }
  export default ProductInfo