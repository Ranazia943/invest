import DashboardIcon from '@mui/icons-material/Dashboard';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Groups2Icon from '@mui/icons-material/Groups2';
// import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useState ,useEffect} from "react";
import { Link } from "react-router-dom";
import WorkIcon from '@mui/icons-material/Work';
import ForumIcon from '@mui/icons-material/Forum';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { CurrencyExchange, Delete, Edit } from '@mui/icons-material';
import { Button, Tooltip } from '@mui/material';
import { toast } from "react-hot-toast"; // Import toast for notifications

const All_Plains = () => {
    const [side, setSide] = useState(false)
    const [isactive, setIsactive] = useState(0)
    const [isopentoggle, setIsopentoggle] = useState(false)
    const [plans, setPlans] = useState([]);  // State to store plans


    const fetchPlans = async () => {
        try {
          const baseURL = import.meta.env.VITE_API_BASE_URL;
          const response = await fetch(`${baseURL}/api/plan/all`);  // Replace with your actual API URL
          const data = await response.json();
          if (data.plans) {
            setPlans(data.plans);  // Set the fetched plans
          } else {
            toast.error('Failed to load plans');
          }
        } catch (error) {
          toast.error('Error fetching plans: ' + error.message);
        }
      };
    
      // Delete a plan
      const deletePlan = async (planId) => {
        try {
          const baseURL = import.meta.env.VITE_API_BASE_URL;

          const response = await fetch(`${baseURL}/api/plan/delete/${planId}`, {
            method: 'DELETE',
          });
          const data = await response.json();
          if (data.plan) {
            toast.success('Plan deleted successfully!');
            setPlans(plans.filter(plan => plan._id !== planId));  // Remove deleted plan from state
          } else {
            toast.error('Failed to delete plan');
          }
        } catch (error) {
          toast.error('Error deleting plan: ' + error.message);
        }
      };
    
    const isopen = (ind)=>{
        setIsactive(ind)
        setIsopentoggle(!isopentoggle)
    }
    useEffect(() => {
        fetchPlans();
      }, []);
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
       <h2 className="text-2xl font-extrabold bg-gradient-to-tr from-cyan-300 via-cyan-100 inline-block px-16 rounded-full text-gray-600 py-4">Plans</h2>
       </div>
        <div>
        <div className="plan-wrapper">
            <div className="investment mt-20 mx-4 md:mx-10 lg:mx-16 pb-28">
              <div className="wrapper grid grid-cols-1 min-[700px]:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
                {/* Dynamically render each plan */}
                {plans.map(plan => (
                  <div key={plan._id} data-aos="zoom-in" data-aos-duration="1000" className='p-4 border max-[700px]:w-[400px] max-[700px]:mx-auto max-[500px]:w-full group relative rounded-lg hover:-translate-y-2 duration-300 overflow-hidden bg-white'>
                    <h2 className='text-center font-[700] text-xl my-2 rounded-lg text-black'>{plan.name}</h2>
                    <div className='wrapp flex justify-between items-end'>
                      <div>
                        <p><span className='text-lg text-black font-[500]'>Price : </span><span className='text-black font-[350] text-base'>Rs. {plan.price}</span></p>
                        <p><span className='text-lg text-black font-[500]'>Duration : </span><span className='text-black font-[350] text-base'>{plan.duration} Days</span></p>
                        <p><span className='text-lg text-black font-[500]'>Daily Profit : </span><span className='text-black font-[350] text-base'>Rs. {plan.dailyProfit}</span></p>
                        <p><span className='text-lg text-black font-[500]'>Total Profit : </span><span className='text-black font-[350] text-base'>Rs. {plan.totalProfit}</span></p>
                        <p><span className='text-lg text-black font-[500]'>Start Date : </span><span className='text-black font-[350] text-base'> {plan.startDate}</span></p>
                        <p><span className='text-lg text-black font-[500]'>End Date : </span><span className='text-black font-[350] text-base'>{plan.endDate}</span></p>
                      </div>
                      <div className='space-x-2'>
                        <Tooltip title="Edit plan" placement="top">
                          {/* Add edit button logic here */}
                        </Tooltip>
                        <Tooltip title="Delete Plan" placement="top">
                          <Button variant='contained' sx={{ background: "#4ade80" }} onClick={() => deletePlan(plan._id)}>
                            <Delete />
                          </Button>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            </div>
        </div>
        </div>
    </div>
   </div>
   
  )
}

export default All_Plains