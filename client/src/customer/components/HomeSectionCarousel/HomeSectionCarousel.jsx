import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {HomeSectionCard} from "../../components"

const HomeSectionCarousel = ({data,sectionName}) => {

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 6,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5,
        },
        tablet: {
            breakpoint: { max: 1024, min: 700 },
            items: 3,
        },
        midrange: {
            breakpoint: { max: 700, min: 500},
            items: 2,
        },
        mobile: {
            breakpoint: { max: 500, min: 0 },
            items: 1,
        },
    };

    return (
        <>
            <div className="paddings">
            <h1 className="primaryText">{sectionName}</h1>
            <div>
                <Carousel
                    responsive={responsive}
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                    
                >
                    {
                        
                        data?.slice(0,10).map((item,i)=><HomeSectionCard product={item} key={i}/>)
                    }
                </Carousel>
                </div>
            </div>
        </>

    );
};

export default HomeSectionCarousel;
