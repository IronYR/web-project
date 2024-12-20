import {
    ChevronLeft,
    Home,
    LineChart,
    Package,
    Package2,
    PanelLeft,
    PlusCircle,
    Search,
    Settings,
    ShoppingCart,
    Upload,
    Users2,
    PackagePlus
  } from "lucide-react"
  import Logo from "../assets/symvol_logo_transparent.svg"
  import { Badge } from "../components/ui/badge"
  import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "../components/ui/breadcrumb"
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
  import { Input } from "../components/ui/input"
  import { Label } from "../components/ui/label"
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "../components/ui/select"
  import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet"
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "../components/ui/table"
  import { Textarea } from "../components/ui/textarea"
  import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider
  } from "../components/ui/tooltip"
  import { useContext, useEffect, useState } from "react"
  import { UserContext } from "../context/userContext"
  import { Navigate, useNavigate } from "react-router-dom"
  import toast from "react-hot-toast"
  import axios from "axios"
  import { Switch } from "../components/ui/switch"
  
  const AddProduct =() =>{
    const preset_key = process.env.REACT_APP_CLOUDINARY_PRESET_KEY;
    const cloud_name = process.env.REACT_APP_CLOUD_NAME;
    const { user, ready,setUser } = useContext(UserContext);
    const [preview, setPreview] = useState(null);
    const [data, setData] = useState({
      name: "",
      description: "",
      longDescription: "",
      category: "",
      quantity:0,
      price:0,
      discount:0,
      image:"",
      isActive:true
    });
    const navigate = useNavigate();
    console.log(user)
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
    
  
  const handleSubmit = async ()=>{
    if(!data.name || !data.description  || !data.category || !data.quantity || !data.price  || !data.image)
    {
      toast.error('Please Fill all the fields')
    }
    else{
      if (data.image) {
        const formData = new FormData();
        formData.append("file", data.image);
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
        data.image = imgdata.url;
      }
      try {
        const response = await axios.post(`/addnewproduct/${user.brand._id}`, {
          data
        });
        if (response.data.success) {
          toast.success(response.data.success);
          navigate("/seller/products");
        } else {
          toast.error(response.data.error);
        }
      } catch (error) {
        console.log(error)
      }
    }
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
              className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
            href="/">
              <img src={Logo} className="h-3 w-3 transition-all group-hover:scale-110" />
              <span className="sr-only"></span>
            </a>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  href="/dash"
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
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  href="/seller/products"
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
                  className="flex h-9 w-9 items-center justify-center rounded-lg trounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                
                  href="#"
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
                  href="/seller/products"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Package className="h-5 w-5" />
                  Products
                </a>
                <a
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-foreground "
                >
                  <PackagePlus className="h-5 w-5" />
                  Add Product
                </a>
      
              </nav>
            </SheetContent>
          </Sheet>
  
          <div className="flex items-center gap-4 ml-auto">
            <span>Hello, <b>{user?.brand.name}</b></span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="overflow-hidden rounded-full"
                >
                  <img
                    src={user?.brand.image}
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
            <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
              <div className="flex items-center gap-4">
                
                <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                  Add Product
                </h1>
                <div className="hidden items-center gap-2 md:ml-auto md:flex">
                  <Button variant="outline" size="sm" onClick={()=>{navigate('/seller/products')}}>
                    Discard
                  </Button>
                  <Button size="sm" onClick={handleSubmit}>Save Product</Button>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                  <Card x-chunk="dashboard-07-chunk-0">
                    <CardHeader>
                      <CardTitle>Product Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6">
                        <div className="grid gap-3">
                          <Label htmlFor="name">Name</Label>
                          <Input
                            id="name"
                            type="text"
                            className="w-full"
                            placeholder="Enter product name"	
                            value = {data.name}
                            onChange = {(e)=>setData({...data,name:e.target.value})}
                          />
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            placeholder="Enter long product description"
                            className="min-h-20"
                            value = {data.description}
                            onChange = {(e)=>setData({...data,description:e.target.value})}
                          />
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="description">Long Description</Label>
                          <Textarea
                            id="description"
                            placeholder="Enter long product description"
                            className="min-h-32"
                            value = {data.longDescription}
                            onChange = {(e)=>setData({...data,longDescription:e.target.value})}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card x-chunk="dashboard-07-chunk-1">
                    <CardHeader>
                      <CardTitle>Stock</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Discount</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>
                              <Label htmlFor="stock-1" className="sr-only">
                                Quantity
                              </Label>
                              <Input
                                id="stock-1"
                                type="number"
                                value={data.quantity}
                                onChange = {(e)=>setData({...data,quantity:e.target.value})}
                              />
                            </TableCell>
                            <TableCell>
                              <Label htmlFor="price-1" className="sr-only">
                                Price
                              </Label>
                              <Input
                                id="price-1"
                                type="number"
                                value={data.price}
                                onChange = {(e)=>setData({...data,price:e.target.value})}
                              />
                            </TableCell>
                            <TableCell>
                              <Label htmlFor="stock-1" className="sr-only">
                                Discount
                              </Label>
                              <Input
                                id="stock-1"
                                type="number"
                                value={data.discount}
                                onChange = {(e)=>setData({...data,discount:e.target.value})}
                              />
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                  <Card x-chunk="dashboard-07-chunk-2">
                    <CardHeader>
                      <CardTitle>Product Category</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6 sm:grid-cols-3">
                        <div className="grid gap-3">
                          <Label htmlFor="category">Category</Label>
                          <Select 
                              onValueChange={(value) => setData({...data,category:value})} >
                            <SelectTrigger
                              id="category"
                              aria-label="Select category"
                            >
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ceramic"
                              >Ceramic</SelectItem>
                              <SelectItem value="textile">
                                Textile
                              </SelectItem>
                              <SelectItem value="wood">
                                Wood
                              </SelectItem>
                              <SelectItem value="leather">
                                Leather
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                  <Card x-chunk="dashboard-07-chunk-3">
                    <CardHeader>
                      <CardTitle>Product Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6">
                        <div className="grid gap-3">
                          <Label htmlFor="status">Active</Label>
                          <Switch checked={data.isActive}
                onCheckedChange={(checked) => setData({...data,isActive:checked})} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card
                    className="overflow-hidden" x-chunk="dashboard-07-chunk-4"
                  >
                    <CardHeader>
                      <CardTitle>Product Image</CardTitle>
                      <CardDescription>
                        Will be displayed on the product page.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-2">
                        <img
                          alt="Product image"
                          className="aspect-square w-full rounded-md object-cover"
                          height="300"
                          src={preview}
                          width="300"
                        />
                        <div>
                          <Input id="picture"
                            type="file"
                            onChange={(e) => {
                              setData({ ...data, image: e.target.files[0] });
                              setPreview(URL.createObjectURL(e.target.files[0]));
                            }}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 md:hidden">
                <Button variant="outline" size="sm">
                  Discard
                </Button>
                <Button size="sm" onClick={handleSubmit}>Save Product</Button>
              </div>
            </div>
          </main>
        </div>
      </div>
      </TooltipProvider>
    )
  }
  export default AddProduct