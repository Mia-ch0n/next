
import React, { use } from 'react'

const Cards = ({title,description,icon}) => {
    const IconComponent = icon;
  return (
    <div
  className="rounded-lg p-6 shadow-secondary-1 w-[250px] h-[330px] mt-10 bg-gray-800 shadow-xl hover:scale-105 duration-200">
  <div class="flex justify-center items-center py-8">
  <IconComponent size={60} color="white" />
  </div>
  <h3 className='flex justify-center items-center text-white text-lg font-bold mt-8'>{title}</h3>
  <p class="mb-4 mx-4 mt-3 text-base text-gray-400 font-normal">
    {description}
  </p>

</div>
  )
}

export default Cards