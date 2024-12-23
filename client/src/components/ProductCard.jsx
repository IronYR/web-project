import {useNavigate} from 'react-router-dom';
const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  return (
    <div className="relative group" onClick={() => { navigate(`/product/${product._id}`) }}>
      <a className="absolute inset-0 z-10" href="#">
        <span className="sr-only">View</span>
      </a>
      <img
        alt="Product Image"
        className="rounded-lg object-cover w-full aspect-square group-hover:opacity-50 transition-opacity"
        height={300}
        src={product.images}
        width={300}
      />
      <div className="flex-1 py-4">
        <h3 className="font-semibold tracking-tight">{product.name}</h3>
        <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center gap-0.5">
            {(() => {
              const stars = [];

              for (let i = 0; i < 5; i++) {
                if (i < product.avgRating) {
                  stars.push(
                    <StarIcon className="w-5 h-5 fill-primary" key={i} />
                  );
                } else {
                  stars.push(
                    <StarIcon
                      className="w-5 h-5 fill-muted stroke-muted-foreground"
                      key={i}
                    />
                  );
                }
              }
              return stars;
            })()}
          </div>
        </div>
        <span className="font-semibold text-lg">
          {product.discount === 0 ? (
            <span className="text-lg">Rs. {product.price}</span>
          ) : (
            <div className="flex items-center">
              <span className="line-through text-sm">Rs. {product.price}</span>
              <span className="text-lg ml-3">
                Rs. {product.price - product.discount}
              </span>
            </div>
          )}
        </span>
      </div>
    </div>
  );
};
export default ProductCard;
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
  );
}
