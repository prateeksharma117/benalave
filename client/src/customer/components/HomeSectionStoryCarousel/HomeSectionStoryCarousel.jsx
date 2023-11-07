import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { HomeSectionStory } from "../../components"

const HomeSectionStoryCarousel = ({ homeStory }) => {

  return (
    <>
      <div className="paddings flex flex-col justify-start">
        <div className="flex flex-col justify-center items-center">
          <h1 className=" font-medium text-lg md:text-2xl">✨Decide what you want✨</h1>
          <h1 className=" font-thin">Category</h1>
        </div>
        <div className="md:flex md:flex-wrap md:justify-center ">
          {
            homeStory.story.map((item, i) => <HomeSectionStory key={i} story={item} />)
          }
        </div>
      </div>
    </>
  )
}

export default HomeSectionStoryCarousel
