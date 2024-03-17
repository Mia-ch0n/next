import React from 'react'
import Sidebar from '../components/Sidebar'
import CreatePost from '../components/CreatePost'
import Posts from '../components/Posts'
const Feed = () => {
  return (
    <div className='w-screen absolute left-0'>
    <Sidebar/>
   <div className='sm:ml-[400px] sm:mr-[100px]'>
   <div className='mx-40'><CreatePost/></div>
   <Posts/>
   </div>
    
    </div>
  )
}

export default Feed
