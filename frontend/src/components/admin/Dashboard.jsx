import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Groups2Icon from '@mui/icons-material/Groups2';
import WorkIcon from '@mui/icons-material/Work';
import ForumIcon from '@mui/icons-material/Forum';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { CurrencyExchange } from '@mui/icons-material';
import { LineChart } from '@mui/x-charts/LineChart';

const Dashboard = () => {
  const [side, setSide] = useState(false);
  const [isactive, setIsactive] = useState(0);
  const [isopentoggle, setIsopentoggle] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalInvests: '',
    totalPlans: 0,
    totalReferredUsers: 0,
  });

  useEffect(() => {
    // Fetch the data from the backend API
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    fetch(`${baseURL}/api/data/user-statistics`)
      .then((response) => response.json())
      .then((data) => setStats(data))
      .catch((error) => console.error('Error fetching stats:', error));
  }, []);

  const isopen = (ind) => {
    setIsactive(ind);
    setIsopentoggle(!isopentoggle);
  };

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
        <div className="dashboard-side min-h-screen">
        <div className="close-icon bg-white inline-block">
          <i onClick={() => setSide(true)} className="fa-solid fa-bars m-2 text-lg side-menu"></i>
        </div>
          <div className="text-center" data-aos="fade-right" data-aos-easing="linear" data-aos-duration="1800">
            <h2 className="text-2xl font-extrabold bg-gradient-to-tr from-cyan-300 via-cyan-100 inline-block px-16 rounded-full text-gray-600 py-4">
              Admin Dashboard
            </h2>
          </div>
          <div className="wrapper">
            <div className="sec-2 w-[95%] md:w-[90%] mx-auto mt-10">
              <div className="cards text-black grid grid-cols-2 min-[650px]:grid-cols-4 gap-4">
                <div className="text-center bg-white py-4 rounded-lg border shadow-md hover:-translate-y-2 duration-300 hover:shadow-xl">
                  <h2 className="text-base lg:text-xl font-[600]">Total Users</h2>
                  <p className="text-lg font-[400] ">{stats.totalUsers}</p>
                </div>
                <div className="text-center bg-white py-4 rounded-lg border shadow-md hover:-translate-y-2 duration-300 hover:shadow-xl">
                  <h2 className="text-base lg:text-xl font-[600]">Total Invests</h2>
                  <p className="text-lg font-[400] ">{stats.totalInvests}</p>
                </div>
                <div className="text-center bg-white py-4 rounded-lg border shadow-md hover:-translate-y-2 duration-300 hover:shadow-xl">
                  <h2 className="text-base lg:text-xl font-[600]">Purchased Plans</h2>
                  <p className="text-lg font-[400] ">{stats.totalPlans}</p>
                </div>
                <div className="text-center bg-white py-4 rounded-lg border shadow-md hover:-translate-y-2 duration-300 hover:shadow-xl">
                  <h2 className="text-base lg:text-xl font-[600]">Referred User</h2>
                  <p className="text-lg font-[400] ">{stats.totalReferredUsers}</p>
                </div>
              </div>
              <div className="chart mt-10">
                <div
                  style={{
                    width: '100%',
                    height: '400px',
                    maxWidth: '100%',
                    position: 'relative',
                  }}
                >
                  <LineChart
                    xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                    series={[
                      {
                        data: [2, 5.5, 2, 8.5, 1.5, 5],
                      },
                    ]}
                    sx={{
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
