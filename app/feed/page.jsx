import Feed from "@components/Feed";
import Sidebar from "@components/Sidebar";

function Feeed() {
  return (
    <div className="page-container">
    <div className="sidebar">
    <Sidebar/>
  </div>
  <div className="main-content">
  <Feed /> 

      
    </div>
    </div>
  );
}
export default Feeed;