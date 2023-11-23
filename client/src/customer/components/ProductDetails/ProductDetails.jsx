import { useEffect, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { Button, Rating } from "@mui/material";
import { Banners, Loader } from "../../components";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  findProducts,
  findProductsById,
  recentlyViewed,
} from "../../../State/Product/Action.js";
import { addItemToCart } from "../../../State/Cart/Action";
import { toast } from "react-toastify";
import ProductCard from "../Product/ProductCard";
import numeral from "numeral";
import { getUser } from "../../../State/Auth/Action";

const ProductDetails = () => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [rating, setRating] = useState(Math.floor(Math.random() * 6));
  const [reviewCount, setReviewCount] = useState(
    numeral(Math.floor(Math.random() * 1000000)).format("(0 a)")
  );
  const [ratingCount, setRatingCount] = useState(
    numeral(Math.floor(Math.random() * 1000000)).format("(0 a)")
  );
  const params = useParams();
  const dispatch = useDispatch();
  const { product, auth } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  const decodedQueryString = decodeURIComponent(location.search);
  const searchParams = new URLSearchParams(decodedQueryString);
  const colorValue = searchParams.get("color");
  const sizeValue = searchParams.get("size");
  const priceValue = searchParams.get("price");
  const discountValue = searchParams.get("discount");
  const sortValue = searchParams.get("sort");
  const pageNumber = searchParams.get("page") || 1;
  const stock = searchParams.get("stock");

  const handleAddToCart = () => {
    if (selectedSize == null) {
      toast.warning("Please select size");
      return;
    }
    if (jwt===null) {
      toast.error("Please login first");
      return;
    }
    const data = {
      productId: params.productId,
      size: selectedSize,
    };
    dispatch(addItemToCart(data));
    setSelectedSize(null);
  };

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  useEffect(() => {

    setRating(Math.floor(Math.random() * 6));
    setReviewCount(numeral(Math.floor(Math.random() * 1000000)).format("(0 a)"));
    setRatingCount(numeral(Math.floor(Math.random() * 1000000)).format("(0 a)"));
    const [minPrice, maxPrice] =
      priceValue === null ? [0, 10000] : priceValue.split("-").map(Number);

    const relatedProductData = {
      category: params.category,
      colors: colorValue || [],
      size: sizeValue || [],
      minPrice,
      maxPrice,
      minDiscount: discountValue || 1,
      sort: sortValue || "price_high_to_low",
      pageNumber: pageNumber,
      pageSize: 12,
      stock: stock,
    };

    dispatch(getUser(jwt));
    dispatch(findProducts(relatedProductData));
    dispatch(findProductsById(params.productId));

    const recentProductData = {
      userId: auth?.jwt?._id,
      productId: params.productId,
    };

    dispatch(recentlyViewed(recentProductData))
  }, [params.productId]);

  return product.loading === true ? (
    <Loader />
  ) : (
    <div className="bg-white lg:px-20">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            <li>
              <div className="flex items-center">
                <a className="mr-2 text-sm font-medium secondaryText">
                  CLOTHING \
                  {` ${product?.product?.category?.name.toUpperCase()}`}
                </a>
              </div>
            </li>
            <li className="text-sm">
              <a
                href={product.href}
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {product.name}
              </a>
            </li>
          </ol>
        </nav>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 pt-10">
          {/* Image gallery */}
          <div className=" space-y-3 flex flex-col items-center">
            <div className="overflow-hidden max-w-[40rem]">
              <img
                className=" object-cover object-top"
                src={product?.product?.imageUrl[selectedImageIndex]?.image}
                alt=""
              />
            </div>
            <div className="flex flex-wrap space-x-4  justify-center">
              {product?.product?.imageUrl.map((image, i) => (
                <div
                  onClick={() => handleImageClick(i)}
                  key={image._id}
                  className="aspect-h-2 aspect-w-3 overflow-hidden mb-3 rounded-md max-w-[5rem] max-h-[5rem] md:max-w-[7rem] md:max-h-[7rem] hover:scale-90 duration-300"
                >
                  <img
                    src={image.image}
                    alt="image not found"
                    className="h-full w-full object-cover object-top"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product info */}
          <div className=" col-span-1 max-auto max-w-2xl px-4 pb-16 sm:px-6 lg:max-w-7xl lg:px-8 lg:pb-24">
            <div className="lg:col-span-2">
              <div className="text-lg lg:text-xl font-semibold text-gray-900">
                <h1 className="secondaryText text-lg lg:text-xl pt-1">
                  {product?.product?.brand.toUpperCase()}
                </h1>
                <h1 className="primaryText text-xl lg:text-3xl pt-1">
                  {product?.product?.title}
                </h1>
              </div>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <div className="flex space-x-5 items-center text-lg lg:text-xl text-gray-900 mt-6">
                <p className=" font-semibold">Rs. {product?.product?.price}</p>
                <p className=" line-through text-gray-400">
                  Rs. {product?.product?.discountedPrice}
                </p>
                <p className=" text-green-500">
                  {product?.product?.discountedPercent}% off
                </p>
              </div>

              {/* Reviews */}
              <div className="mt-6">
                <div className="flex items-center space-x-3">
                  <Rating
                    name="read-only"
                    value={rating}
                    readOnly
                  />
                  <p className=" opacity-50 text-sm">{`Ratings ${ratingCount}`}</p>
                  <p className=" ml-3 text-sm font-medium text-[#2b65b6] hover:text-[#4691fb]">
                  {`Review ${reviewCount}`}
                  </p>
                </div>
              </div>

              <div className="mt-6 text-sm">
                <div className="flex items-center space-x-2">
                  <p>Pay $100 and rest later via</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="50"
                    viewBox="0 0 512 214"
                  >
                    <path
                      fill="#635BFF"
                      d="M512 110.08c0-36.409-17.636-65.138-51.342-65.138c-33.85 0-54.33 28.73-54.33 64.854c0 42.808 24.179 64.426 58.88 64.426c16.925 0 29.725-3.84 39.396-9.244v-28.445c-9.67 4.836-20.764 7.823-34.844 7.823c-13.796 0-26.027-4.836-27.591-21.618h69.547c0-1.85.284-9.245.284-12.658Zm-70.258-13.511c0-16.071 9.814-22.756 18.774-22.756c8.675 0 17.92 6.685 17.92 22.756h-36.694Zm-90.31-51.627c-13.939 0-22.899 6.542-27.876 11.094l-1.85-8.818h-31.288v165.83l35.555-7.537l.143-40.249c5.12 3.698 12.657 8.96 25.173 8.96c25.458 0 48.64-20.48 48.64-65.564c-.142-41.245-23.609-63.716-48.498-63.716Zm-8.534 97.991c-8.391 0-13.37-2.986-16.782-6.684l-.143-52.765c3.698-4.124 8.818-6.968 16.925-6.968c12.942 0 21.902 14.506 21.902 33.137c0 19.058-8.818 33.28-21.902 33.28ZM241.493 36.551l35.698-7.68V0l-35.698 7.538V36.55Zm0 10.809h35.698v124.444h-35.698V47.36Zm-38.257 10.524L200.96 47.36h-30.72v124.444h35.556V87.467c8.39-10.951 22.613-8.96 27.022-7.396V47.36c-4.551-1.707-21.191-4.836-29.582 10.524Zm-71.112-41.386l-34.702 7.395l-.142 113.92c0 21.05 15.787 36.551 36.836 36.551c11.662 0 20.195-2.133 24.888-4.693V140.8c-4.55 1.849-27.022 8.391-27.022-12.658V77.653h27.022V47.36h-27.022l.142-30.862ZM35.982 83.484c0-5.546 4.551-7.68 12.09-7.68c10.808 0 24.461 3.272 35.27 9.103V51.484c-11.804-4.693-23.466-6.542-35.27-6.542C19.2 44.942 0 60.018 0 85.192c0 39.252 54.044 32.995 54.044 49.92c0 6.541-5.688 8.675-13.653 8.675c-11.804 0-26.88-4.836-38.827-11.378v33.849c13.227 5.689 26.596 8.106 38.827 8.106c29.582 0 49.92-14.648 49.92-40.106c-.142-42.382-54.329-34.845-54.329-50.774Z"
                    />
                  </svg>
                </div>
                <div className=" flex items-center space-x-2">
                  <p className=" ">or 3 monthly payments of $500 with</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    viewBox="0 0 256 83"
                  >
                    <defs>
                      <linearGradient
                        id="logosVisa0"
                        x1="45.974%"
                        x2="54.877%"
                        y1="-2.006%"
                        y2="100%"
                      >
                        <stop offset="0%" stop-color="#222357" />
                        <stop offset="100%" stop-color="#254AA5" />
                      </linearGradient>
                    </defs>
                    <path
                      fill="url(#logosVisa0)"
                      d="M132.397 56.24c-.146-11.516 10.263-17.942 18.104-21.763c8.056-3.92 10.762-6.434 10.73-9.94c-.06-5.365-6.426-7.733-12.383-7.825c-10.393-.161-16.436 2.806-21.24 5.05l-3.744-17.519c4.82-2.221 13.745-4.158 23-4.243c21.725 0 35.938 10.724 36.015 27.351c.085 21.102-29.188 22.27-28.988 31.702c.069 2.86 2.798 5.912 8.778 6.688c2.96.392 11.131.692 20.395-3.574l3.636 16.95c-4.982 1.814-11.385 3.551-19.357 3.551c-20.448 0-34.83-10.87-34.946-26.428m89.241 24.968c-3.967 0-7.31-2.314-8.802-5.865L181.803 1.245h21.709l4.32 11.939h26.528l2.506-11.939H256l-16.697 79.963h-17.665m3.037-21.601l6.265-30.027h-17.158l10.893 30.027m-118.599 21.6L88.964 1.246h20.687l17.104 79.963h-20.679m-30.603 0L53.941 26.782l-8.71 46.277c-1.022 5.166-5.058 8.149-9.54 8.149H.493L0 78.886c7.226-1.568 15.436-4.097 20.41-6.803c3.044-1.653 3.912-3.098 4.912-7.026L41.819 1.245H63.68l33.516 79.963H75.473"
                      transform="matrix(1 0 0 -1 0 82.668)"
                    />
                  </svg>
                </div>
                <p className="secondaryText">Flat 15% cashback up to $500.</p>
              </div>

              <div className="mt-6 space-y-2">
                <p className="secondaryText">
                  {`COLOR ---> ${product?.product?.color}`}
                </p>
                <div
                  style={{ backgroundColor: `${product?.product?.color}` }}
                  className={`w-10 h-10 flex items-center rounded-full drop-shadow-xl border-2 border-gray-300`}
                ></div>
              </div>

              <form className="mt-10">
                {/* Sizes */}
                <div className="mt-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  </div>

                  <RadioGroup
                    value={selectedSize}
                    onChange={setSelectedSize}
                    className="mt-4"
                  >
                    <RadioGroup.Label className="sr-only">
                      Choose a size
                    </RadioGroup.Label>
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-y-4 ">
                      {product?.product?.size.map((size, i) => (
                        <RadioGroup.Option key={i} value={size.name}>
                          {({ active }) =>
                            active ? (
                              <Button
                                style={{
                                  border: "2px solid #2b65b6",
                                  padding: "1rem 2.5rem",
                                }}
                              >
                                {size.name}
                              </Button>
                            ) : (
                              <Button
                                style={{
                                  border: "2px solid #e4e4e4",
                                  padding: "1rem 2.5rem",
                                }}
                              >
                                {size.name}
                              </Button>
                            )
                          }
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                <div className=" mt-5">
                  <Button
                    onClick={()=>handleAddToCart()}
                    variant="outlined"
                    sx={{
                      width: "100%",
                      px: "2rem",
                      py: "0.5rem",
                      "&:hover": {
                        backgroundColor: "#1fb356",
                        color: "#fff",
                        borderColor: "#1fb356",
                      },
                    }}
                  >
                    Add To Cart
                  </Button>
                </div>
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {product.description}
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">
                  Highlights
                </h3>

                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2">
                    {product?.product?.highlights.map((highlight, i) => (
                      <div key={i} className="flex gap-x-2 items-center">
                        <p className=" font-bold text-xl text-gray-400">.</p>
                        <span className="text-gray-600">{highlight.text}</span>
                      </div>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">
                    {product?.product?.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* recent viewed product */}

        <section className="py-10 mx-3">
          <h1 className="primaryText flex text">
            {auth?.jwt?.recentProduct===undefined || auth?.jwt?.recentProduct?.length < 1 ? "" : "Recently Viewed"}
          </h1>
          <div className="flex justify-center flex-wrap space-y-5">
            {auth?.jwt?.recentProduct?.length < 1 ? (
              <div>
              </div>
            ) : (
              <div className=" flex flex-wrap">
                {auth?.jwt?.recentProduct?.filter((item) => item?._id !== product?.product?._id)
                  .slice(0, 5)
                  .map((item, i) => (
                    <ProductCard product={item} key={i} />
                  ))}
              </div>
            )}
          </div>
        </section>

        {/* semilar product */}

        <section className="py-10 mx-3">
          <h1 className="primaryText flex text">
            {product?.products?.content?.length < 2 ? "" : "Similar Products"}
          </h1>
          <div className="flex justify-center flex-wrap space-y-5">
            {product?.products?.content?.length < 2 ? (
              <div className="flex justify-center items-center">
                <p className=" text-center">
                  There are no similar products available for this product
                </p>
              </div>
            ) : (
              <div className=" flex flex-wrap">
                {product?.products?.content
                  ?.filter((item) => item?._id !== product?.product?._id)
                  .slice(0, 10)
                  .map((item, i) => (
                    <ProductCard product={item} key={i} />
                  ))}
              </div>
            )}
          </div>
        </section>

        <section className="mb-10">
          <Banners />
        </section>
      </div>
    </div>
  );
};

export default ProductDetails;
