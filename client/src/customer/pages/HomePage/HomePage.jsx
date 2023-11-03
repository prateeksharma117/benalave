import { useEffect } from "react";
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

const HomePage = () => {
  const dispatch = useDispatch();
  const { product } = useSelector((store) => store);

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
                    <div className="md:paddings ">
                      <HomeSectionStoryCarousel homeStory={homeStory} />
                    </div>
                  </div>

                  <div>
                    <HomeSectionCarousel
                      sectionName={"Trending"}
                      data={filterProductsByCategory("manHoodies")}
                    />
                    <HomeSectionCarousel
                      sectionName={"Men Shirts"}
                      data={filterProductsByCategory("manT-shirt")}
                    />
                    <HomeSectionCarousel
                      sectionName={"Men Pants"}
                      data={filterProductsByCategory("manPant")}
                    />
                    <HomeSectionCarousel
                      sectionName={"Women Top"}
                      data={filterProductsByCategory("womenTop")}
                    />
                    <HomeSectionCarousel
                      sectionName={"Women Pants"}
                      data={filterProductsByCategory("womenPant")}
                    />
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
