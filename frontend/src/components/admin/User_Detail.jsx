import DashboardIcon from '@mui/icons-material/Dashboard';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Groups2Icon from '@mui/icons-material/Groups2';
// import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { Link } from "react-router-dom";
import WorkIcon from '@mui/icons-material/Work';
import ForumIcon from '@mui/icons-material/Forum';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { Button, Tooltip } from '@mui/material';
import { CurrencyExchange, Delete } from '@mui/icons-material';
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";


const User_Detail = () => {
    const [side, setSide] = useState(false)
    const [isactive, setIsactive] = useState(0)
    const [isopentoggle, setIsopentoggle] = useState(false)
    const { id } = useParams();
    const [userDetails, setUserDetails] = useState(null);
    const isopen = (ind)=>{
        setIsactive(ind)
        setIsopentoggle(!isopentoggle)
    }
    useEffect(() => {
      const fetchUserDetails = async () => {
        try {
          const baseURL = import.meta.env.VITE_API_BASE_URL;
          const response = await axios.get(`${baseURL}/api/userplan/${id}`);
          setUserDetails(response.data);
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      };
  
      fetchUserDetails();
    }, [id]);
  
    if (!userDetails) return <div>Loading...</div>;
  
    const { user, totalReferrals, referrals, totalBalance, totalReferralProfit, purchasedPlans,dailyProfit, activePlansCount } = userDetails;

  
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
       <h2 className="text-2xl font-extrabold bg-green-400 inline-block px-16 rounded-full text-white py-4">User Detail</h2>
       </div>
            <div className="wrapper">
                <div className="card-wrapper">
                    <div className="card-main mt-10 w-[95%] md:w-[90%] mx-auto grid grid-cols-2 min-[580px]:grid-cols-4 gap-2 md:gap-4">
                        <div  data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="100" className=' border rounded-md text-center py-6'>
                            <h2 className=' text-lg font-[600]'>Total Plans</h2>
                            <p className=' text-base font-[400]'>{activePlansCount}</p>
                        </div>
                        <div  data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="200" className=' border rounded-md text-center py-6'>
                            <h2 className=' text-lg font-[600]'>Total Earned</h2>
                            <p className=' text-base font-[400]'>Rs.{totalBalance}</p>
                        </div>
                        <div  data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="300" className=' border rounded-md text-center py-6'>
                            <h2 className=' text-lg font-[600]'>Total {"Referall's"}</h2>
                            <p className=' text-base font-[400]'>{totalReferrals}</p>
                        </div>
                        <div  data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="400" className=' border rounded-md text-center py-6'>
                            <h2 className=' text-lg font-[600]'>Daily Profit</h2>
                            <p className=' text-base font-[400]'>{dailyProfit}</p>
                        </div>
                    </div>
                </div>

                {/* plans */}

                <div className="user-plans mt-12">
  <h2 className='text-center font-[700] text-3xl my-10'>User Purchased Plans</h2>
  <div className="cards w-[95%] mx-auto md:w-[90%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
    {purchasedPlans.map((plan, index) => (
      <div key={index} data-aos="zoom-in" data-aos-duration="1000" className='p-4 border max-[700px]:w-[400px] max-[700px]:mx-auto max-[500px]:w-full group rounded-lg hover:-translate-y-2 duration-300 overflow-hidden bg-white'>
        <div className="my-4">
          <h2 className='text-center font-[700] text-xl my-2 rounded-lg text-black'>{plan.name}</h2>
          <div className='wrapp flex justify-between items-end'>
            <div>
              <p><span className='text-lg text-black font-[500]'>Price : </span><span className='text-black font-[350] text-base'>Rs. {plan.price}</span></p>
              <p><span className='text-lg text-black font-[500]'>Duration : </span><span className='text-black font-[350] text-base'>{plan.duration} Days</span></p>
              <p><span className='text-lg text-black font-[500]'>Daily Profit : </span><span className='text-black font-[350] text-base'>Rs. {plan.dailyProfit}</span></p>
              <p><span className='text-lg text-black font-[500]'>Total Profit : </span><span className='text-black font-[350] text-base'>Rs. {plan.totalProfit}</span></p>
              <p><span className='text-lg text-black font-[500]'>Start DAtae: </span><span className='text-black font-[350] text-base'> {new Date(plan.startDate).toLocaleDateString()}</span></p>
              <p><span className='text-lg text-black font-[500]'>End DAtae: </span><span className='text-black font-[350] text-base'> {new Date(plan.endDate).toLocaleDateString()}</span></p>
            </div>
            <div>
              <Tooltip title="Delete" placement="top">
                <Button variant='contained' sx={{background:"#4ade80"}}>
                {plan.state}
                </Button>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>


                {/* team */}

              {/* team */}

<div className="wrapper-team mt-10 mb-20">
  <h2 className=" text-center font-[700] text-3xl my-10">Referral Users</h2>
  <div className="cards space-y-4 w-[95%] md:w-[90%] mx-auto">
    {userDetails.referralProfits.map((referralProfit, index) => (
      <div key={index} data-aos="zoom-in" data-aos-duration="1500" className="card border flex-1 rounded-lg px-2 py-4 shadow-lg duration-300 hover:-translate-y-2 hover:shadow-green-100 flex justify-between items-center">
        <div className=" flex items-center gap-4 md:gap-16">
          <img src="/images/teams.png" className=" w-12 h-12 ml-2 md:ml-10 hover:scale-105 duration-300" alt="" />
          <div>
            <h2 className=" text-base md:text-lg lg:text-xl font-[500]">{referralProfit.referral.username}</h2>
           
          </div>
        </div>

        {/* Display plan details for each referral */}
        <div className="text-end">
          <p className="text-lg font-[400] text-gray-500 ">Referral Profit</p>
          <p className=" text-lg text-green-400 font-[400] mb-1">{referralProfit.totalReferralProfit}</p>
        </div>

        {referralProfit.plans.map((plan, planIndex) => (
          <div key={planIndex} className="text-end">
            
            <p className=" text-lg text-green-400 font-[400] mb-1">{plan.planName}</p>
            <p className="text-lg font-[400] text-gray-500 ">Plan Price</p>
            <p className=" text-lg text-green-400 font-[400] mb-1">Rs. {plan.planPrice}</p>
           
          </div>
        ))}
      </div>
    ))}
  </div>
</div>


                    </div>
                </div>
            </div>
        </div>
   
   
  )
}

export default User_Detail