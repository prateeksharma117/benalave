import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { HomeSectionCard } from "../../components"

const HomeSectionCarousel = ({ data, sectionName ,sectionHeading}) => {

    return (
        <>
            <div className="paddings flex flex-col justify-start">
                <div className=" flex flex-col justify-center items-center">
                <h1 className=" font-medium text-lg md:text-2xl">{sectionHeading}</h1>
                <h1 className=" font-thin">{sectionName}</h1>
                </div>
                <div className="md:flex md:flex-wrap md:justify-center ">
                    {

                        data?.slice(0,5).map((item, i) => <HomeSectionCard product={item} key={i} />)
                    }
                </div>
            </div>
        </>

    );
};

export default HomeSectionCarousel;
