import { useState, useEffect } from "react";
import { AvatarImage, AvatarFallback, Avatar } from "../components/ui/avatar"
import { Button } from "../components/ui/button"
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
const SellerHome = () => {
  const { id } = useParams();
  const [seller, setSeller] = useState([]);
  const [reviews, setReviews] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  useEffect(() => {
    const fetchSeller = async () => {
      try {
        const response = await axios.get(`/seller/${id}`);
        if (response.data.products === undefined || response.data.products.length === 0) {
          setSeller(response.data);
        }
        else {
          setSeller(response.data.products);
          setReviews(response.data.reviews);
        }
      } catch (error) {
        console.error("Error fetching seller:", error);
        navigate('/*')
      } finally {
        setLoading(false);
      }
    };
    fetchSeller();
  }, [])
  if (loading) {
    return (<div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full border-4 border-gray-300 border-t-gray-900 h-12 w-12 dark:border-gray-600 dark:border-t-gray-50" />
        <p className="text-gray-500 dark:text-gray-400">Loading content...</p>
      </div>
    </div>)
  }
  return (
    <>{
      seller[0] ?
        (<div>
          <div className="relative h-[50vh] w-full overflow-hidden">
            <img
              alt="Backdrop"
              className="h-full w-full object-cover"
              height={1080}
              src={seller[0]?.brand.image}
              style={{
                aspectRatio: "1920/1080",
                objectFit: "cover",
              }}
              width={1920}
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <Avatar className="h-24 w-24 border-4 border-white dark:border-gray-950">
                <AvatarImage alt="Seller Avatar" src="/placeholder-user.jpg" />
                <AvatarFallback>{extractInitials(seller[0].brand.name)}</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <div className="container px-4 md:px-6 py-12">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 mb-10">
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Featured Products</h2>
              <p className="text-gray-500 dark:text-gray-400">
              </p>
              <Button
                className="ml-auto shrink-0 bg-gray-900 text-gray-50 hover:bg-gray-900/90 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90"
                variant="outline"
                onClick={() => navigate(`/products?seller=${seller[0]?.brand._id}`)}
               >
                View all products
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                className="relative group overflow-hidden rounded-lg cursor-pointer"
                onClick={() => navigate(`/product/${seller[0]?._id}`)}
              >
                <a className="absolute inset-0 z-10">
                  <span className="sr-only">View</span>
                </a>
                <img
                  alt="Product 1"
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  height={600}
                  src={seller[0]?.images[0]}
                  style={{
                    aspectRatio: "800/600",
                    objectFit: "cover",
                  }}
                  width={800}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 transition-opacity duration-300 group-hover:bg-opacity-50"></div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {
                  seller?.slice(1, 5).map((product, index) => (
                    <div
                      className="relative group overflow-hidden rounded-lg cursor-pointer"
                      onClick={() => navigate(`/product/${product._id}`)}
                    >
                      <a className="absolute inset-0 z-10">
                        <span className="sr-only">View</span>
                      </a>
                      <img
                        alt={product.name}
                        className="object-cover w-full h-60 transition-transform duration-300 group-hover:scale-105"
                        height={300}
                        src={product.images[0]}
                        style={{
                          aspectRatio: "400/300",
                          objectFit: "cover",
                        }}
                        width={400}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 transition-opacity duration-300 group-hover:bg-opacity-50"></div>
                    </div>
                  ))

                }


              </div>
            </div>
            <div className="mt-12 grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-2">{seller[0]?.brand.name}</h3>
                <div className="flex items-center gap-2 mb-4">
                  <MailIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <p className="text-gray-500 dark:text-gray-400">
                    {seller[0]?.brand.email}
                  </p>
                </div>
                <p className="text-gray-500 dark:text-gray-400">{seller[0]?.brand.description}</p>

              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Reviews</h3>
                <div className="space-y-6">
                  {/* first 2 with rating more than 1 */}
                  {
                    reviews.slice(0, 2).map((review, index) => (
                      <div key={index} className="flex gap-4">
                        <img
                          alt="Reviewer 1"
                          className="h-10 w-10 rounded-full"
                          src={review.user.image}
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center gap-0.5">
                              <h3 className="font-semibold">{review.user.FirstName}</h3>
                              {Array.from({ length: 5 }).map((_, index) => (
                                <StarIcon
                                  key={index}
                                  className={`w-5 h-5 ${index < review.rating
                                    ? "fill-primary"
                                    : "fill-muted stroke-muted-foreground"
                                    }`}
                                />
                              ))}
                            </div>
                          </div>
                          <time className="text-sm text-gray-500 dark:text-gray-400 mb-2 block">
                            {(() => {
                              const reviewDate = new Date(review.createdAt);
                              const today = new Date();
                              const timeDifference = today - reviewDate;
                              const daysDifference = Math.floor(
                                timeDifference / (1000 * 60 * 60 * 24)
                              );

                              if (daysDifference > 1) {
                                return `${daysDifference} days ago`;
                              } else if (daysDifference === 1) {
                                return "1 day ago";
                              } else {
                                return "Today";
                              }
                            })()}
                          </time>
                          <p className="text-gray-500 dark:text-gray-400 mt-2">
                            {review.review}
                          </p>
                        </div>
                      </div>

                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        </div>) : (
          <div>
            <div className="relative h-[50vh] w-full overflow-hidden">
              <img
                alt="Backdrop"
                className="h-full w-full object-cover"
                height={1080}
                src={seller.image}
                style={{
                  aspectRatio: "1920/1080",
                  objectFit: "cover",
                }}
                width={1920}
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Avatar className="h-24 w-24 border-4 border-white dark:border-gray-950">
                  <AvatarImage alt="Seller Avatar" src="/placeholder-user.jpg" />
                  <AvatarFallback>{extractInitials(seller.name)}</AvatarFallback>
                </Avatar>
              </div>
            </div>
            <div className="container px-4 md:px-6 py-12">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 mb-10">
                <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Featured Products</h2>
                <p className="text-gray-500 dark:text-gray-400">
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative group overflow-hidden rounded-lg">
                  <a className="absolute inset-0 z-10" >
                    <span className="sr-only">View</span>
                  </a>
                  <p>No items to show</p>
                </div>
              </div>
              <div className="mt-12 grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-2">{seller.name}</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <MailIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    <p className="text-gray-500 dark:text-gray-400">
                      {seller.email}
                    </p>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400">{seller.description}</p>

                </div>
              </div>
            </div>
          </div>
        )
    }

    </>
  )
}
export default SellerHome
function MailIcon(props) {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 2C0.447715 2 0 2.44772 0 3V12C0 12.5523 0.447715 13 1 13H14C14.5523 13 15 12.5523 15 12V3C15 2.44772 14.5523 2 14 2H1ZM1 3L14 3V3.92494C13.9174 3.92486 13.8338 3.94751 13.7589 3.99505L7.5 7.96703L1.24112 3.99505C1.16621 3.94751 1.0826 3.92486 1 3.92494V3ZM1 4.90797V12H14V4.90797L7.74112 8.87995C7.59394 8.97335 7.40606 8.97335 7.25888 8.87995L1 4.90797Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
  )
}


function StarIcon(props) {
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
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}
function extractInitials(name) {
  const words = name.split(" ");
  let initials = "";
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    initials += word.charAt(0).toUpperCase();
  }
  return initials;
}