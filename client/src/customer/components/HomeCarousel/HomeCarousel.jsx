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
                            className="object-cover w-full h-[25rem] md:h-[35rem]"
                            src="https://dolcegabbana-cdn.thron.com/delivery/public/image/dolcegabbana/8eafd81c-9473-4d7c-ba9f-1a68bc44e615/dg7eqa/std/0x0/a1_2"
                            alt=""
                        />
                    </div>
                    <div>
                        <img
                            className="object-cover w-full h-[25rem] md:h-[35rem]"
                            src="https://dolcegabbana-cdn.thron.com/delivery/public/image/dolcegabbana/e5be004a-88dc-4b0e-89df-429affb6bb73/xkxkfc/std/0x0/a1_3"
                            alt=""
                        />
                    </div>
                    <div>
                        <img
                            className="object-cover w-full h-[25rem] md:h-[35rem]"
                            src="https://dolcegabbana-cdn.thron.com/delivery/public/image/dolcegabbana/488920cc-5db2-480e-bb3f-fb150f814da4/pqiamn/std/0x0/a1_4"
                            alt=""
                        />
                    </div>
                    <div>
                        <img
                            className="object-cover w-full h-[25rem] md:h-[35rem]"
                            src="https://dolcegabbana-cdn.thron.com/delivery/public/image/dolcegabbana/e40fba7d-e7d5-4ede-82cc-9dc0196a0cc5/azcroc/std/0x0/a1_5"
                            alt=""
                        />
                    </div>
                </Carousel>
            </div>
        </>
    );
};

export default HomeCarousel;
