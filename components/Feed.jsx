import React from 'react'
import Sidebar from '../components/Sidebar'
import Posts from '../components/Posts'
const Feed = () => {
  return (
    <div className='w-screen absolute left-0'>
      <Sidebar />

      <div className='sm:ml-[400px] sm:mr-[300px]'>
        <div className='mx-40'></div>
        <Posts />
      </div>

    </div>
  )
}

export default Feed
