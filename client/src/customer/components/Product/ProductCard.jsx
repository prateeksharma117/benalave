import { BsFillHeartFill } from "react-icons/bs";
import "./ProductCard.scss";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {

    const navigate = useNavigate()


    return (
        <div onClick={() => navigate(`/product/${product._id}/${product.category.name}`)} className="productCard md:w-[16rem] w-full px-3 py-6 transition-all cursor-pointer ">
            <div className="h-[24rem] relative group">
                <img
                    className="h-full w-full object-cover object-left-top"
                    src={product.imageUrl[0].image}
                    alt=""
                />
                <img
                    className="h-full w-full object-cover object-left-top opacity-0 absolute top-0 left-0 transition-opacity group-hover:opacity-100"
                    src={product.imageUrl[1].image}
                    alt=""
                />
            </div>

            <div className="textPart bg-white pt-3">
                <div>
                    <p className="secondaryText line-clamp-1">{product.brand}</p>
                    <p className="line-clamp-1 font-medium mt-1">{product.title}</p>
                    <h1 className="secondaryText font-medium mt-2 line-clamp-1">{product.description}</h1>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                    <p className="font-semibold">Rs. {product.price}</p>
                    <p className="line-through secondaryText">Rs. {product.discountedPrice}</p>
                    <p className="secondaryText text-green-500">{product.discountedPercent}% off</p>
                </div>
                <div className="flex items-center gap-2 mt-1">
                    <h1 className="text text-gray-600">Size</h1>
                    <h2 className="f text-sm">{product.size?.map((item) => item.name) + ""}</h2>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
