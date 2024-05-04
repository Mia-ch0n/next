import Sidebar from '@components/Sidebar'
import Posts from '@components/Posts'
import { getServerSession } from 'next-auth';
import { authOptions } from '@app/api/auth/[...nextauth]/route';


function Feeed() {

  getServerSession(authOptions).then(value => {
    console.log(value);
  })
  
  return (
    <div className="main-content">
      <div className='w-screen absolute left-0'>
        <Sidebar />
        <div className='sm:ml-[400px] sm:mr-[300px]'>
          <Posts />
        </div>
      </div>
    </div>
  );
}
export default Feeed;