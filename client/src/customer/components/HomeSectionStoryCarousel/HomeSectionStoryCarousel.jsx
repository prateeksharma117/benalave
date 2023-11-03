import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { HomeSectionStory } from "../../components"

const HomeSectionStoryCarousel = ({ homeStory }) => {

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 9,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 9,
    },
    tablet: {
      breakpoint: { max: 1024, min: 600},
      items: 5,
    },
    mobile: {
      breakpoint: { max: 600, min: 350},
      items: 3,
    },
    small: {
      breakpoint: { max: 350, min: 0},
      items: 2,
    },
  };

  return (
    <>
      <div className="paddings">
      <h1 className="primaryText mb-4">Category</h1>
        <Carousel
          responsive={responsive}
          removeArrowOnDeviceType={["tablet", "mobile","small"]}
        >
          {
            homeStory.story.map((item,i)=><HomeSectionStory key={i} story={item}/>)
          }
        </Carousel>
      </div>
    </>
  )
}

export default HomeSectionStoryCarousel
