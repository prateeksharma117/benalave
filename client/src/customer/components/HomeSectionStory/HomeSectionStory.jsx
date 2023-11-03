import React from 'react'
import data from "../../../data/story.json"
import { useNavigate } from 'react-router-dom'

const HomeSectionStory = ({story}) => {

  const navigate=useNavigate()

  return (
    <div onClick={()=>navigate(`/unisex/clothing/${story.category}`)} className="py-3 hover:scale-110 duration-300 hover:text-[#2b65b6]">
      <div className='flex flex-col justify-center items-center'>
        <img className='w-16 h-16 my-2' src={story.image} alt="" />
        <h2 className='secondaryTex line-clamp-1'>{story.text}</h2>
      </div>
    </div>
  )
}

export default HomeSectionStory
