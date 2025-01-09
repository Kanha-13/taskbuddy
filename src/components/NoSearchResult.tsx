import React from 'react'
import { ReactComponent as NoSearchIllustrator } from "../assets/images/SearchNotFound.svg"

const NoSearchResult: React.FC = () => {
  return (
    <div className='flex flex-col w-full h-[70vh] text-2xl font-bold font-mulish text-[#2F2F2F] justify-center items-center'>
      <NoSearchIllustrator />
      <div className='w-full md:w-[40%] text-lg text-center mt-1'>It looks like we can't find any results<br /> that match.</div>
    </div>
  )
}

export default NoSearchResult;