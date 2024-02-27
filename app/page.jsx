import { FaQuestionCircle } from "react-icons/fa";
import { GiTeamIdea } from "react-icons/gi";
import { AiOutlineTeam } from "react-icons/ai";
import Image from 'next/image';
import { FcIdea } from "react-icons/fc";
const Home = () => {
  return (
    <div className='home'>
    <section className="w-full flex-center flex-col">
    <h1 className="head_text text-center">Solve & Share 
    <br className="max-md:hidden"/>
    <span className="blue_gradient text-center">Coding Problems</span></h1>
    <p className="desc text-center">Mobistack serves as a collaborative hub for Mobelite team members, facilitating the exposition and resolution of technical issues and enabling the exchange of ideas</p>
 
     
    </section>
    <div className='cards flex  '>
    

    <div class="max-w-sm bg-white  border border-gray-200 rounded-lg shadow dark:bg-gray-800 ark:border-gray-700">
    <a href="#">
      <div className="rounded-t-lg relative">
      <FaQuestionCircle className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl text-white" />
      </div>
    </a>
    <div class="p-5">
      <a href="#">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Ask the community</h5>
      </a>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">feel free to post your coding problem.</p>
    </div>
  </div>
  <div class="max-w-sm bg-white  border border-gray-200 rounded-lg shadow dark:bg-gray-800 ark:border-gray-700">
  <a href="#">
    <div className="rounded-t-lg relative">
    <FcIdea  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl text-white" />
    </div>
  </a>
  <div class="p-5">
    <a href="#">
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Give solutions</h5>
    </a>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Contribute to the Community's Progress by Providing Solutions.</p>
  </div>
</div>
<div class="max-w-sm bg-white  border border-gray-200 rounded-lg shadow dark:bg-gray-800 ark:border-gray-700 ">
    <a href="#">
      <div className="rounded-t-lg relative">
        <AiOutlineTeam className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl text-white" />
      </div>
    </a>
    <div class="p-5">
      <a href="#">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Get knowlege</h5>
      </a>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Tap into a Wealth of Insights and Expertise.</p>
    </div>
  </div>
  <div class="max-w-sm bg-white  border border-gray-200 rounded-lg shadow dark:bg-gray-800 ark:border-gray-700">
  <a href="#">
    <div className="rounded-t-lg relative">
      <GiTeamIdea className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl text-white" />
    </div>
  </a>
  <div class="p-5">
    <a href="#">
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Share ideas</h5>
    </a>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Exchange Ideas and Collaborate with the Community to Drive Progress.</p>
  </div>
</div>

</div>
    </div>
  )
}
export default Home;