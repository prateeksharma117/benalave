import {BsFillHeartFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const HomeSectionCard = ({ product }) => {

  const navigate=useNavigate()

  return (
    <>
      <div onClick={()=>navigate(`/product/${product._id}/${product.category.name}`)} className="md:w-[16rem] w-full my-5 p-3 cursor-pointer hover:shadow-sm ease-in-out duration-300 ">
            <div className="h-[24rem] relative rounded-md group">
              <img
                className=" w-full h-full object-cover object-top"
                src={product.imageUrl[0].image}
                alt=""
              />
              <img
                    className="h-full w-full object-cover object-left-top opacity-0 absolute top-0 left-0 transition-opacity group-hover:opacity-100"
                    src={product.imageUrl[1].image}
                    alt=""
                />
            </div>
            <div>
              <h3 className="secondaryText mt-2">{product.brand}</h3>
              <h1 className="PrimaryText font-medium mt-1 line-clamp-1">
                {product.title}
              </h1>
              <h1 className="secondaryText font-medium mt-2 line-clamp-1">
                {product.description}
              </h1>

              <div className="flex justify-between mt-2">
                <div className="flex items-center gap-2">
                <p className="font-semibold ">Rs. {product.price}</p>
                <p className="line-through secondaryText">Rs. {product.discountedPrice}</p>
                <p className="secondaryText text-green-500">{product.discountPersent}% off</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <h1 className="text text-gray-600">Size</h1>
                <h2 className="f text-sm">{product.size?.map((item)=>item.name)+""}</h2>
              </div>
            </div>
        </div>

    </>
  );
};

export default HomeSectionCard;
