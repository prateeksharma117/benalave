import { useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { getCarouselImage } from '../../../State/Carousel/Action';
import { useDispatch, useSelector } from 'react-redux';



const HomeCarousel = () => {

    const dispatch = useDispatch();
    const { carousel } = useSelector((store) => store);

    useEffect(() => {
        dispatch(getCarouselImage())
    }, [])

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
                    {carousel?.Carousel?.map((imageUrl, index) => (
                        <div key={index}>
                            <img
                                className="object-cover object-right w-full md:h-screen h-[15rem]"
                                src={imageUrl?.image}
                                alt=""
                            />
                        </div>
                    ))}
                </Carousel>
            </div>
        </>
    );
};

export default HomeCarousel;
