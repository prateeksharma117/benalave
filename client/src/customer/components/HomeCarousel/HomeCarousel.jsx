import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const HomeCarousel = () => {
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 1,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
    };

    return (
        <>
            <div>
                <Carousel
                    className="-z-10"
                    infinite={true}
                    autoPlay={true}
                    responsive={responsive}
                    removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
                >
                    <div>
                        <img
                            className="object-cover w-full h-full"
                            src="https://nolabels.in/cdn/shop/files/Website_Banner_14.jpg?v=1699277942&width=1920"
                            alt=""
                        />
                    </div>
                    <div>
                        <img
                            className="object-cover w-full h-full"
                            src="https://nolabels.in/cdn/shop/files/Website_Banner_13.jpg?v=1698751509&width=1920"
                            alt=""
                        />
                    </div>
                    <div>
                        <img
                            className="object-cover w-full h-full"
                            src="https://nolabels.in/cdn/shop/files/Untitled-1-01_058b47e0-b956-474a-8dcc-fa6f0462bd39.jpg?v=1696316991&width=5760"
                            alt=""
                        />
                    </div>
                </Carousel>
            </div>
        </>
    );
};

export default HomeCarousel;
