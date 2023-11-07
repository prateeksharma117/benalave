import { useEffect, useState } from "react";
import {
  Banners,
  HomeCarousel,
  HomeSectionCarousel,
  HomeSectionStoryCarousel,
  Loader,
} from "../../components";
import { BsRocketTakeoff, BsRecycle, BsGift } from "react-icons/bs";
import { MdPayment } from "react-icons/md";
import { RiCustomerService2Line } from "react-icons/ri";
import homeStory from "../../../data/story.json";
import { useDispatch, useSelector } from "react-redux";
import { findProducts } from "../../../State/Product/Action";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState('manShirt');
  const { product } = useSelector((store) => store);
  const navigate=useNavigate()

  const filterProductsByCategory = (categoryName) => {
    return product?.products?.content?.filter(
      (product) => product?.category?.name === categoryName
    );
  };



  useEffect(() => {
    const data = {
      category: "",
      colors: [],
      size: [],
      minPrice: 0,
      maxPrice: 100000000,
      minDiscount: 0,
      sort: "price_high_to_low",
      pageNumber: 1,
      pageSize: 200000000000,
      stock: "",
    };
    dispatch(findProducts(data));
  }, []);

  return (
    <>
      {
        product?.loading === true ?
          (
            <Loader />
          ) :
          (
            <div>
              <HomeCarousel />
              <div className="bg-[#f7f7f7]">
                <div>
                  <div>
                    <div className="paddings hidden md:block ">
                      <div className="p-5 flex md:justify-evenly flex-wrap gap-5 rounded-md border-2 border-[#e8e3e4]">
                        <div className="flex items-center gap-3">
                          <div>
                            <BsRocketTakeoff size={30} style={{ color: "gold" }} />
                          </div>
                          <div>
                            <h2 className="text-lg font-medium">Free Delivery</h2>
                            <p className="secondaryText">For all orders</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div>
                            <BsRecycle size={30} style={{ color: "gold" }} />
                          </div>
                          <div>
                            <h2 className="text-lg font-medium">90 Days Return</h2>
                            <p className="secondaryText">If goods have problems</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div>
                            <MdPayment size={30} style={{ color: "gold" }} />
                          </div>
                          <div>
                            <h2 className="text-lg font-medium">Secure Payment</h2>
                            <p className="secondaryText">100% secure payment</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div>
                            <RiCustomerService2Line
                              size={30}
                              style={{ color: "gold" }}
                            />
                          </div>
                          <div>
                            <h2 className="text-lg font-medium">24/7 Support</h2>
                            <p className="secondaryText">Dedicated support</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div>
                            <BsGift size={30} style={{ color: "gold" }} />
                          </div>
                          <div>
                            <h2 className="text-lg font-medium">Gift Service</h2>
                            <p className="secondaryText">Support gift service</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className=" md:paddings grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                      <div onClick={() =>
                        navigate(`/clothing/unisex/levis`)
                      } className="border border-gray-300 rounded-md cursor-pointer md:mx-5 my-5">
                        <div className=" h-[14rem]">
                          <img className=" w-full h-full" src="https://i.pinimg.com/originals/42/2a/96/422a9607d5a6e13d28b66af569c7188e.jpg" alt="" />
                        </div>
                        <div className=" p-3">
                          <h1 className=" text-[#2b65b6] font-bold text-xl">On ₹5000: Exiting Gifts</h1>
                          <h1 className=" text-gray-500">On ₹6000: 2 Mini Gifts</h1>
                        </div>
                        <div>

                        </div>
                      </div>

                      <div onClick={() =>
                        navigate(`/clothing/unisex/zara`)
                      } className="border border-gray-300 rounded-md cursor-pointer md:mx-5 my-5">
                        <div className=" h-[14rem]">
                          <img className=" w-full h-full" src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/930f4f95631365.5e9c2b936388e.jpg" alt="" />
                        </div>
                        <div className=" p-3">
                          <h1 className=" text-[#2b65b6] font-bold text-xl">2 Shirt Samples on ₹3500</h1>
                          <h1 className=" text-gray-500">Free Yo Glow 20ml on ₹5000</h1>
                        </div>
                        <div>

                        </div>
                      </div>

                      <div onClick={() =>
                        navigate(`/clothing/unisex/hnm`)
                      } className="border border-gray-300 rounded-md cursor-pointer md:mx-5 my-5">
                        <div className=" h-[14rem]">
                          <img className=" w-full h-full" src="https://i.pinimg.com/originals/d7/74/1c/d7741c5294cbcb50f8c137fbd47de8c9.png" alt="" />
                        </div>
                        <div className=" p-3">
                          <h1 className=" text-[#2b65b6] font-bold text-xl">H&M Bestsellers</h1>
                          <h1 className=" text-gray-500">Starting at ₹5000!</h1>
                        </div>
                        <div>

                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className=" mt-5">
                      <div className="flex gap-3 justify-center items-center">
                        <p className=" px-2 py-1 border border-black rounded-full cursor-pointer hover:bg-black hover:text-white" onClick={() => setSelectedCategory("manShirt")}>New Drop</p>
                        <p className=" px-2 py-1 border border-black rounded-full cursor-pointer hover:bg-black hover:text-white" onClick={() => setSelectedCategory("accessories")}>Accessories</p>
                        <p className=" px-2 py-1 border border-black rounded-full cursor-pointer hover:bg-black hover:text-white" onClick={() => setSelectedCategory("manHoodies")}>Winter Flex</p>
                      </div>
                      <HomeSectionCarousel
                        sectionHeading={""}
                        sectionName={""}
                        data={filterProductsByCategory(selectedCategory)}
                      />
                    </div>
                    <HomeSectionCarousel
                      sectionHeading={"✨DIWALI PRICE SLASH✨"}
                      sectionName={"Trending"}
                      data={filterProductsByCategory("manJackets")}
                    />
                    <HomeSectionCarousel
                      sectionHeading={"✨THE T-shirt GALLERY✨"}
                      sectionName={"LIMITED PERIOD OFFER"}
                      data={filterProductsByCategory("manT-shirt")}
                    />
                    <HomeSectionCarousel
                      sectionHeading={"✨LEGENDS OF THE LOWER HALF✨"}
                      sectionName={"Men Pants"}
                      data={filterProductsByCategory("manPant")}
                    />
                    <HomeSectionCarousel
                      sectionHeading={"✨Stylish Tops for Every Occasion✨"}
                      sectionName={"Women Top"}
                      data={filterProductsByCategory("womenTop")}
                    />
                    <HomeSectionCarousel
                      sectionHeading={"✨Must-Have Women's Pants✨"}
                      sectionName={"Women Pants"}
                      data={filterProductsByCategory("womenPant")}
                    />
                    <HomeSectionCarousel
                      sectionHeading={"✨STEP INTO THE SPOTLIGHT✨"}
                      sectionName={"Foot Wear"}
                      data={filterProductsByCategory("shoes")}
                    />
                    <div>
                      <HomeSectionStoryCarousel homeStory={homeStory} />
                    </div>
                  </div>
                </div>

                <Banners />
              </div>
            </div>
          )
      }
    </>
  );
};

export default HomePage;
