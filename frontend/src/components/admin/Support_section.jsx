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
import { Button, Tooltip } from '@mui/material';
import { CurrencyExchange, Delete } from '@mui/icons-material';

const Support_section = () => {
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
       <h2 className="text-2xl font-extrabold bg-green-400 inline-block px-16 rounded-full text-white py-4">Support</h2>
       </div>
       <div className="wrapper m-2 md:m-6">
        <div className="cards mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="card p-4 border rounded-lg relative hover:-translate-y-2 duration-300 shadow-lg hover:shadow-green-100">
            <div className=' absolute top-2 right-2 space-x-2'>
                <Tooltip title="Delete Question" placement="top">
            <Button variant='contained' sx={{background:"#4ade80"}}><Delete/></Button>
          </Tooltip>
                </div>
                <p><span className='text-base md:text-xl font-[600]'>Name : </span><span>Ahmad Raza</span></p>
                <p><span className='text-base md:text-xl font-[600]'>Email : </span><span>ahmad@gmail.com</span></p>
                <p><span className='text-base md:text-xl font-[600]'>Phone : </span><span>03214569874</span></p>

                <p className=' font-[300] text-base sm:text-lg mt-4'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus maxime ipsa deleniti exercitationem necessitatibus in nulla tenetur perspiciatis itaque expedita non voluptas velit quia nemo impedit quam doloremque, eius aliquid? Necessitatibus aperiam eaque distinctio amet accusantium. Cumque et culpa dignissimos.</p>
            </div>
            <div className="card p-4 border rounded-lg relative hover:-translate-y-2 duration-300 shadow-lg hover:shadow-green-100">
            <div className=' absolute top-2 right-2 space-x-2'>
                <Tooltip title="Delete Question" placement="top">
            <Button variant='contained' sx={{background:"#4ade80"}}><Delete/></Button>
          </Tooltip>
                </div>
                <p><span className='text-base md:text-xl font-[600]'>Name : </span><span>Ahmad Raza</span></p>
                <p><span className='text-base md:text-xl font-[600]'>Email : </span><span>ahmad@gmail.com</span></p>
                <p><span className='text-base md:text-xl font-[600]'>Phone : </span><span>03214569874</span></p>

                <p className=' font-[300] text-base sm:text-lg mt-4'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus maxime ipsa deleniti exercitationem necessitatibus in nulla tenetur perspiciatis itaque expedita non voluptas velit quia nemo impedit quam doloremque, eius aliquid? Necessitatibus aperiam eaque distinctio amet accusantium. Cumque et culpa dignissimos.</p>
            </div>
            <div className="card p-4 border relative rounded-lg hover:-translate-y-2 duration-300 shadow-lg hover:shadow-green-100">
            <div className=' absolute top-2 right-2 space-x-2'>
                <Tooltip title="Delete Question" placement="top">
            <Button variant='contained' sx={{background:"#4ade80"}}><Delete/></Button>
          </Tooltip>
                </div>
                <p><span className='text-base md:text-xl font-[600]'>Name : </span><span>Ahmad Raza</span></p>
                <p><span className='text-base md:text-xl font-[600]'>Email : </span><span>ahmad@gmail.com</span></p>
                <p><span className='text-base md:text-xl font-[600]'>Phone : </span><span>03214569874</span></p>

                <p className=' font-[300] text-base sm:text-lg mt-4'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus maxime ipsa deleniti exercitationem necessitatibus in nulla tenetur perspiciatis itaque expedita non voluptas velit quia nemo impedit quam doloremque, eius aliquid? Necessitatibus aperiam eaque distinctio amet accusantium. Cumque et culpa dignissimos.</p>
            </div>
            <div className="card p-4 border rounded-lg relative hover:-translate-y-2 duration-300 shadow-lg hover:shadow-green-100">
            <div className=' absolute top-2 right-2 space-x-2'>
                <Tooltip title="Delete Question" placement="top">
            <Button variant='contained' sx={{background:"#4ade80"}}><Delete/></Button>
          </Tooltip>
                </div>
                <p><span className='text-base md:text-xl font-[600]'>Name : </span><span>Ahmad Raza</span></p>
                <p><span className='text-base md:text-xl font-[600]'>Email : </span><span>ahmad@gmail.com</span></p>
                <p><span className='text-base md:text-xl font-[600]'>Phone : </span><span>03214569874</span></p>

                <p className=' font-[300] text-base sm:text-lg mt-4'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus maxime ipsa deleniti exercitationem necessitatibus in nulla tenetur perspiciatis itaque expedita non voluptas velit quia nemo impedit quam doloremque, eius aliquid? Necessitatibus aperiam eaque distinctio amet accusantium. Cumque et culpa dignissimos.</p>
            </div>
        </div>
       </div>
        </div>
    </div>
   </div>
   
  )
}

export default Support_section