import React from 'react'
import { MutatingDots } from "react-loader-spinner";

const Loader = () => {
  return (
    <>
    <div className=" flex justify-center items-center min-h-screen">
                <MutatingDots
                    height="100"
                    width="100"
                    color="#2b65b6"
                    secondaryColor='#fff'
                    radius='12.5'
                    ariaLabel="mutating-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />
            </div>
    </>
  )
}

export default Loader
