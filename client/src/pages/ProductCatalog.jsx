import React, {  useEffect, useState } from 'react';
import { Checkbox } from "../components/ui/checkbox"
import { Label } from "../components/ui/label"
import { Button } from "../components/ui/button"
import { DropdownMenuTrigger, DropdownMenuRadioItem, DropdownMenuRadioGroup, DropdownMenuContent, DropdownMenu } from "../components/ui/dropdown-menu"
import ProductCard from "../components/ProductCard"
import axios from 'axios';
import Navbar from "../components/Navbar";
import { useLocation } from 'react-router-dom';

const ProductCatalog = () => {
    const [data, setData] = useState([]);
    const [sort, setSort] = useState("");
    const [filterData, setFilterData] = useState([]);
    const location = useLocation();
    
    const [filters, setFilters] = useState({
        under50: false,
        between50And100: false,
        between100And200: false,
        over200: false,
        ceramic: false,
        textile: false,
        wood: false,
        leather: false,
        above4: false,
        above3: false,
        above2: false,
        above1: false,
    });

    useEffect(() => {
        const fetchProductData = async () => {
            const params = new URLSearchParams(location.search);
            const category = params.get('category');
            const sellerId = params.get('seller')
            if(sellerId){
                const response = await axios.get(`/seller/${sellerId}`);
                const fetchedData = response.data.products;
                setData(fetchedData);
                setFilterData(fetchedData);

            }
           else 
           { 
            const response = await axios.get(`/products`);
            const fetchedData = response.data;
            setData(fetchedData);
            setFilterData(fetchedData);
            if (category) {
                const newFilters = { ...filters };
                if (category === 'ceramic') newFilters.ceramic = true;
                else if (category === 'textile') newFilters.textile = true;
                else if (category === 'wood') newFilters.wood = true;
                else if (category === 'leather') newFilters.leather = true;
                setFilters(newFilters);
                updateFilteredData(newFilters, fetchedData);
            }}
        };

        fetchProductData();

    }, [location.search]);

    const handleSortChange = (value) => {
        setSort(value);
        let sortedData = [...data];
        switch (value) {
            case "price-low-high":
                sortedData.sort((a, b) => a.price - b.price);
                break;
            case "price-high-low":
                sortedData.sort((a, b) => b.price - a.price);
                break;
            case "newest":
                sortedData.sort((a, b) => new Date(b.created) - new Date(a.created));
                break;
            default:
                break;
        }
        setData(sortedData);
    };

    const updateFilteredData = (updatedFilters, productsData = filterData) => {
        let finalDataSet = new Set();
        if (updatedFilters.under50) {
            productsData
                .filter((product) => product.price < 500)
                .forEach((product) => finalDataSet.add(product));
        }
        if (updatedFilters.between50And100) {
            productsData
                .filter((product) => product.price >= 500 && product.price < 1000)
                .forEach((product) => finalDataSet.add(product));
        }
        if (updatedFilters.between100And200) {
            productsData
                .filter((product) => product.price >= 1000 && product.price < 2000)
                .forEach((product) => finalDataSet.add(product));
        }
        if (updatedFilters.over200) {
            productsData
                .filter((product) => product.price >= 2000)
                .forEach((product) => finalDataSet.add(product));
        }
        if (updatedFilters.ceramic) {
            productsData
                .filter((product) => product.category === "ceramic")
                .forEach((product) => finalDataSet.add(product));
        }
        if (updatedFilters.textile) {
            productsData
                .filter((product) => product.category === "textile")
                .forEach((product) => finalDataSet.add(product));
        }
        if (updatedFilters.wood) {
            productsData
                .filter((product) => product.category === "wood")
                .forEach((product) => finalDataSet.add(product));
        }
        if (updatedFilters.leather) {
            productsData
                .filter((product) => product.category === "leather")
                .forEach((product) => finalDataSet.add(product));
        }
        if (updatedFilters.above4) {
            productsData
                .filter((product) => product.avgRating >= 4)
                .forEach((product) => finalDataSet.add(product));
        }
        if (updatedFilters.above3) {
            productsData
                .filter((product) => product.avgRating >= 3)
                .forEach((product) => finalDataSet.add(product));
        }
        if (updatedFilters.above2) {
            productsData
                .filter((product) => product.avgRating >= 2)
                .forEach((product) => finalDataSet.add(product));
        }
        if (updatedFilters.above1) {
            productsData
                .filter((product) => product.avgRating >= 1)
                .forEach((product) => finalDataSet.add(product));
        }
        const noFiltersSelected = Object.values(updatedFilters).every((val) => val === false);
        if (noFiltersSelected) {
            finalDataSet = new Set(productsData);
        }

        setData(Array.from(finalDataSet));
    };

    return (
        <>
            <Navbar
                links={[
                    { button: true, path: "/login", btn_name: "Login" },
                    { button: true, path: "/register", btn_name: "Register" },
                    { button: false, category:true}
                ]}
            />
            <div className="container mx-auto px-4 md:px-6 py-8">
                <div className="grid md:grid-cols-[280px_1fr] gap-8">
                    <div className="bg-white dark:bg-gray-950 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-6 top-4">
                        <h2 className="text-lg font-semibold mb-4">Filters</h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-sm font-semibold mb-2">Category</h3>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Checkbox
                                            id="category-ceramic"
                                            checked={filters.ceramic}
                                            onCheckedChange={(e) => {
                                                const newFilters = { ...filters, ceramic: e };
                                                setFilters(newFilters);
                                                updateFilteredData(newFilters);
                                            }}
                                        />
                                        <Label className="text-sm font-medium" htmlFor="category-ceramic">
                                            Ceramic
                                        </Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Checkbox
                                            id="category-textile"
                                            checked={filters.textile}
                                            onCheckedChange={(e) => {
                                                const newFilters = { ...filters, textile: e };
                                                setFilters(newFilters);
                                                updateFilteredData(newFilters);
                                            }}
                                        />
                                        <Label className="text-sm font-medium" htmlFor="category-textile">
                                            Textile
                                        </Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="category-wood"
                                            checked={filters.wood}
                                            onCheckedChange={(e) => {
                                                const newFilters = { ...filters, wood: e };
                                                setFilters(newFilters);
                                                updateFilteredData(newFilters);
                                            }}
                                        />
                                        <Label className="text-sm font-medium" htmlFor="category-wood">
                                            Woods
                                        </Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="category-leather"
                                            checked={filters.leather}
                                            onCheckedChange={(e) => {
                                                const newFilters = { ...filters, leather: e };
                                                setFilters(newFilters);
                                                updateFilteredData(newFilters);
                                            }}
                                        />
                                        <Label className="text-sm font-medium" htmlFor="category-leather">
                                            Leatherworks
                                        </Label>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold mb-2">Rating</h3>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="rating-4-up"
                                            checked={filters.above4}
                                            onCheckedChange={(e) => {
                                                const newFilters = { ...filters, above4: e };
                                                setFilters(newFilters);
                                                updateFilteredData(newFilters);
                                            }}
                                        />
                                        <Label className="text-sm font-medium" htmlFor="rating-4-up">
                                            4 stars & up
                                        </Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="rating-3-up"
                                            checked={filters.above3}
                                            onCheckedChange={(e) => {
                                                const newFilters = { ...filters, above3: e };
                                                setFilters(newFilters);
                                                updateFilteredData(newFilters);
                                            }}
                                        />
                                        <Label className="text-sm font-medium" htmlFor="rating-3-up">
                                            3 stars & up
                                        </Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="rating-2-up"
                                            checked={filters.above2}
                                            onCheckedChange={(e) => {
                                                const newFilters = { ...filters, above2: e };
                                                setFilters(newFilters);
                                                updateFilteredData(newFilters);
                                            }}
                                        />
                                        <Label className="text-sm font-medium" htmlFor="rating-2-up">
                                            2 stars & up
                                        </Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="rating-1-up"
                                            checked={filters.above1}
                                            onCheckedChange={(e) => {
                                                const newFilters = { ...filters, above1: e };
                                                setFilters(newFilters);
                                                updateFilteredData(newFilters);
                                            }}
                                        />
                                        <Label className="text-sm font-medium" htmlFor="rating-1-up">
                                            1 star & up
                                        </Label>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold mb-2">Price Range</h3>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Checkbox
                                            id="under50"
                                            checked={filters.under50}
                                            onCheckedChange={(e) => {
                                                const newFilters = { ...filters, under50: e };
                                                setFilters(newFilters);
                                                updateFilteredData(newFilters);
                                            }}
                                        />
                                        <Label className="text-sm font-medium" htmlFor="under50">
                                            Under Rs. 500
                                        </Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Checkbox
                                            id="between50And100"
                                            checked={filters.between50And100}
                                            onCheckedChange={(e) => {
                                                const newFilters = { ...filters, between50And100: e };
                                                setFilters(newFilters);
                                                updateFilteredData(newFilters);
                                            }}
                                        />
                                        <Label className="text-sm font-medium" htmlFor="between50And100">
                                            Rs. 500 - Rs. 1000
                                        </Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Checkbox
                                            id="between100And200"
                                            checked={filters.between100And200}
                                            onCheckedChange={(e) => {
                                                const newFilters = { ...filters, between100And200: e };
                                                setFilters(newFilters);
                                                updateFilteredData(newFilters);
                                            }}
                                        />
                                        <Label className="text-sm font-medium" htmlFor="between100And200">
                                            Rs. 1000 - Rs. 2000
                                        </Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Checkbox
                                            id="over200"
                                            checked={filters.over200}
                                            onCheckedChange={(e) => {
                                                const newFilters = { ...filters, over200: e };
                                                setFilters(newFilters);
                                                updateFilteredData(newFilters);
                                            }}
                                        />
                                        <Label className="text-sm font-medium" htmlFor="over200">
                                            Over Rs. 2000
                                        </Label>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid gap-8">
                        <div className="flex flex-col md:flex-row items-start gap-4 md:gap-8 py-5">
                            <div className="grid gap-1">
                                <h1 className="text-2xl font-bold tracking-tight">Discover Our Latest Products</h1>
                                <p className="text-gray-500 dark:text-gray-400">
                                    Browse through our curated selection of top-selling items.
                                </p>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button className="ml-auto shrink-0" variant="outline">
                                        <ArrowUpDownIcon className="w-4 h-4 mr-2" />
                                        Sort by
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-[200px]">
                                    <DropdownMenuRadioGroup value={sort} onValueChange={handleSortChange} >
                                        <DropdownMenuRadioItem value="newest">Newest Arrival</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="price-high-low">Price: High to Low</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="price-low-high" >Price: Low to High</DropdownMenuRadioItem>
                                    </DropdownMenuRadioGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        {!(data.length) && <p className="text-lg font-bold text-center">No items found</p>}
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

                            {data?.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
export default ProductCatalog;

function ArrowUpDownIcon(props) {
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
            <path d="m21 16-4 4-4-4" />
            <path d="M17 20V4" />
            <path d="m3 8 4-4 4 4" />
            <path d="M7 4v16" />
        </svg>
    );
}