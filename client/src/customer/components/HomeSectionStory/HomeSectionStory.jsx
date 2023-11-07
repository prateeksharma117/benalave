import React from 'react'
import data from "../../../data/story.json"
import { useNavigate } from 'react-router-dom'

const HomeSectionStory = ({story}) => {

  const navigate=useNavigate()

  const randomNumber = Math.floor(Math.random() * 10) + 1;

  return (
    <div onClick={()=>navigate(`/unisex/clothing/${story.category}`)} className="w-full md:w-[15rem] p-3 hover:scale-95 duration-300 hover:text-[#2b65b6] my-5">
      <div className='h-[20rem] relative'>
        <img className='w-full h-full object-cover object-top' src={story.image} alt="" />
        {randomNumber > 7 && (
          <div className='absolute flex gap-1 bg-black text-white py-1 px-2 top-0 right-0 rounded-sm'>
            <h3>Sale</h3>
            <p className='text-red-500'>{story?.sale}%</p>
          </div>
        )}
      </div>
      <h2 className='secondaryTex line-clamp-1 text-center mt-2'>{story.text}</h2>
    </div>
  )
}

export default HomeSectionStory
