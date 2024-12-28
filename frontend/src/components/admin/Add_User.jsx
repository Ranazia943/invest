import DashboardIcon from '@mui/icons-material/Dashboard';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Groups2Icon from '@mui/icons-material/Groups2';
// import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useState } from "react";
import { Link } from "react-router-dom";
import WorkIcon from '@mui/icons-material/Work';
import ForumIcon from '@mui/icons-material/Forum';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { CurrencyExchange } from '@mui/icons-material';

const Add_user = () => {
    const [side, setSide] = useState(false)
    const [isactive, setIsactive] = useState(0)
    const [isopentoggle, setIsopentoggle] = useState(false)
    const isopen = (ind)=>{
        setIsactive(ind)
        setIsopentoggle(!isopentoggle)
    }
  return (
   <div>
     <div className="dashboard-wrapper">
     <div id="sidebar-wrapper" className={`${side ? "open":""}`}>
            <div className="sidebar">
            <div className="close-icon flex justify-start ml-4  mt-4">
             <i onClick={()=>setSide(false)} className="fa-solid border-2 px-1 rounded-md fa-xmark text-xl side-menu"></i>
            </div>
            <ul className=" p-2 text-white">
                <li id="cc" className={`flex justify-between p-2 rounded-lg my-2 ${isactive===0 ? "activ" : ""}`} onClick={()=>isopen(0)}>
                  <Link to='/admin/dashboard'>
                  <div className=" flex justify-center space-x-2">
                        <DashboardIcon/> <p className=" cursor-pointer">DashBoard</p>
                    </div>
                  </Link>
                    {/* <div className="arrow">
                        <KeyboardArrowRightIcon/>
                    </div> */}
                </li>
                <li className=" my-2">
                   <div id="cc" className={`flex justify-between p-2 rounded-lg ${isactive===1 ? "activ" : ""}`} onClick={()=>isopen(1)}>
                   <div className=" flex justify-center  space-x-2">
                        <WorkIcon/> <p className=" cursor-pointer">users</p>
                    </div>
                    <div className="arrow">
                        {isopentoggle && isactive===1 ? <KeyboardArrowDownIcon/> : <KeyboardArrowRightIcon/>}
                    </div>
                   </div>
                    <div className={`submenu-wrapper ${isactive===1 && isopentoggle===true ? "colaps":"colapsd"}`}>
                        <ul className="submenu text-start pl-8 border-l-2 mt-2">
                        <li className="my-2"><Link to="/admin/dashboard/allusers">ALL users</Link></li>
                        <li className="my-2"><Link to="/admin/dashboard/adduser">Add user</Link></li>
                        </ul>
                    </div>
                </li>
                <li className=" my-2">
                   <div id="cc" className={`flex justify-between p-2 rounded-lg ${isactive===2 ? "activ" : ""}`} onClick={()=>isopen(2)}>
                   <div className=" flex justify-center  space-x-2">
                        <Groups2Icon/> <p className=" cursor-pointer">Plans</p>
                    </div>
                    <div className="arrow">
                    {isopentoggle && isactive===2 ? <KeyboardArrowDownIcon/> : <KeyboardArrowRightIcon/>}
                    </div>
                   </div>
                    <div className={`submenu-wrapper ${isactive===2 && isopentoggle===true ? "colaps":"colapsd"}`}>
                        <ul className="submenu text-start pl-8 border-l-2 mt-2">
                        <li className="my-2"><Link to="/admin/dashboard/allplans">All Plans</Link></li>
                        <li className="my-2"><Link to="/admin/dashboard/addplan">Add Plan</Link></li>
                        </ul>
                    </div>
                </li>
                <li className=" my-2">
                   <div id="cc" className={`flex justify-between p-2 rounded-lg ${isactive===3 ? "activ" : ""}`} onClick={()=>isopen(3)}>
                   <div className=" flex justify-center  space-x-2">
                        <WorkspacePremiumIcon/> <p className=" cursor-pointer">About</p>
                    </div>
                    <div className="arrow">
                    {isopentoggle && isactive===3 ? <KeyboardArrowDownIcon/> : <KeyboardArrowRightIcon/>}
                    </div>
                   </div>
                    <div className={`submenu-wrapper ${isactive===3 && isopentoggle===true ? "colaps":"colapsd"}`}>
                        <ul className="submenu text-start pl-8 border-l-2 mt-2">
                        <li className="my-2"><Link to="/admin/dashboard/aboutdetail">About Details</Link></li>
                        <li className="my-2"><Link to="/admin/dashboard/add_aboutdetail">Add Detail</Link></li>
                        </ul>
                    </div>
                </li>
              
                <li id="cc" className={`flex justify-between p-2 rounded-lg my-2 ${isactive===0 ? "activ" : ""}`} onClick={()=>isopen(0)}>
                  <Link to='/admin/dashboard/support'>
                  <div className=" flex justify-center space-x-2">
                        <ForumIcon/> <p className=" cursor-pointer">Support</p>
                    </div>
                  </Link>
                    {/* <div className="arrow">
                        <KeyboardArrowRightIcon/>
                    </div> */}
                </li>
                <li id="cc" className={`flex justify-between p-2 rounded-lg my-2 ${isactive===0 ? "activ" : ""}`} onClick={()=>isopen(0)}>
                  <Link to='/admin/dashboard/requests'>
                  <div className=" flex justify-center space-x-2">
                        <SportsKabaddiIcon/> <p className=" cursor-pointer">Plan Requests</p>
                    </div>
                  </Link>
                    {/* <div className="arrow">
                        <KeyboardArrowRightIcon/>
                    </div> */}
                </li>
                <li id="cc" className={`flex justify-between p-2 rounded-lg my-2 ${isactive===0 ? "activ" : ""}`} onClick={()=>isopen(0)}>
                  <Link to='/admin/dashboard/withdraw'>
                  <div className=" flex justify-center space-x-2">
                        <CurrencyExchange/> <p className=" cursor-pointer">Withraw Rquests</p>
                    </div>
                  </Link>
                </li>


                <li id="cc" className={`flex justify-between p-2 rounded-lg my-2 ${isactive===0 ? "activ" : ""}`} onClick={()=>isopen(0)}>
                  <Link to='/admin/dashboard/sendmail'>
                  <div className=" flex justify-center space-x-2">
                        <CurrencyExchange/> <p className=" cursor-pointer">Email Setting</p>
                    </div>
                  </Link>
                </li>
            </ul>
            </div>
        </div>
      <div className="dashboard-side min-h-screen ">
            <div className="close-icon bg-white inline-block">
             <i onClick={()=>setSide(true)} className="fa-solid fa-bars m-2 text-lg side-menu"></i>
            </div>
       <div className=" text-center" data-aos="fade-right"  data-aos-easing="linear" data-aos-duration="1800">
       <h2 className="text-2xl font-extrabold bg-gradient-to-tr from-cyan-300 via-cyan-100 inline-block px-16 rounded-full text-gray-600 py-4">Add user</h2>
       </div>
        <div>
        <div className="flex flex-col justify-center font-[sans-serif] p-4">
  <div className="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8">
    <div className="text-center mb-12">
        <h2 className=' text-center font-[800] text-2xl'>Goldmine3x</h2>
    </div>
    <form>
      <div className="space-y-6">
        <div>
          <label className="text-gray-800 text-sm mb-2 block">Name</label>
          <input name="name" type="text" className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter Name" />
        </div>
        <div>
          <label className="text-gray-800 text-sm mb-2 block">Email Id</label>
          <input name="email" type="text" className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter email" />
        </div>
        <div>
          <label className="text-gray-800 text-sm mb-2 block">Password</label>
          <input name="password" type="password" className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter password" />
        </div>
        <div>
          <label className="text-gray-800 text-sm mb-2 block">Confirm Password</label>
          <input name="cpassword" type="password" className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter confirm password" />
        </div>
        <input type="file" className=" file:bg-[#b1b483] file:text-white w-full p-1.5 rounded-md file:outline-none file:border-none border file:p-1 file:font-[400] file:rounded-sm" />
      </div>
      <div className="!mt-12">
        <button type="button" className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
          Create user
        </button>
      </div>
    </form>
  </div>
</div>

        </div>
        </div>
    </div>
   </div>
   
  )
}

export default Add_user