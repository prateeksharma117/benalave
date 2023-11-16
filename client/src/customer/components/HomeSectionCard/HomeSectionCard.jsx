import { useNavigate } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../State/Auth/Action";
import { wishlist } from "../../../State/Product/Action";

const HomeSectionCard = ({ product }) => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);


  useEffect(() => {
    dispatch(getUser(jwt));
  }, [])

  const onHeartClick = () => {
    const isProductInWishlist = auth?.jwt?.wishlist?.some((item) => item?._id === product?._id);
    const ProductData = {
      userId: auth?.jwt?._id,
      productId: product?._id,
    };

    dispatch(wishlist(ProductData))
    if (isProductInWishlist) {
      toast.error("Product removed from wishlist");
    } else {
      toast.success("Product added to wishlist");
    }
  }

  return (
    <>
      <div className="md:w-[18rem] w-full my-5 p-3 cursor-pointer hover:shadow-sm ease-in-out duration-300 ">
        <div className="h-[24rem] relative group">
          <img
            className=" w-full h-full object-cover object-top"
            src={product?.imageUrl[0]?.image}
            alt=""
          />
          <img
            className="h-full w-full object-cover object-left-top opacity-0 absolute top-0 left-0 transition-opacity group-hover:opacity-100"
            src={product?.imageUrl[1]?.image}
            alt=""
          />
          <div className=" absolute top-2 right-3">
            <AiFillHeart onClick={() => onHeartClick()} size={30} color={auth?.jwt?.wishlist?.some(item => item?._id === product?._id) ? "#da444d" : "#c6c4c5"} />
          </div>
        </div>
        <div onClick={() => navigate(`/product/${product?._id}/${product?.category?.name}`)}>
          <h3 className="secondaryText mt-2">{product?.brand}</h3>
          <h1 className="PrimaryText font-medium mt-1 line-clamp-1">
            {product?.title}
          </h1>
          <h1 className="secondaryText font-medium mt-2 line-clamp-1">
            {product?.description}
          </h1>

          <div className="flex justify-between mt-2">
            <div className="flex items-center gap-2">
              <p className="font-semibold ">Rs. {product?.price}</p>
              <p className="line-through secondaryText">Rs. {product?.discountedPrice}</p>
              <p className="secondaryText text-green-500">{product?.discountPersent}% off</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <h1 className="text text-gray-600">Size</h1>
            <h2 className="f text-sm">{product?.size?.map((item) => item?.name) + ""}</h2>
          </div>
        </div>
      </div>

    </>
  );
};

export default HomeSectionCard;
