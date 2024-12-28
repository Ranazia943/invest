import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Groups2Icon from '@mui/icons-material/Groups2';
import WorkIcon from '@mui/icons-material/Work';
import ForumIcon from '@mui/icons-material/Forum';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { CurrencyExchange } from '@mui/icons-material';

const Plan_Request = () => {
const [side, setSide] = useState(false);
const [isactive, setIsactive] = useState(0);
const [isopentoggle, setIsopentoggle] = useState(false);
const [plans, setPlans] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [openModal, setOpenModal] = useState(false);  // State to manage the modal visibility
const [selectedImage, setSelectedImage] = useState("");  // State to hold the selected image URL


useEffect(() => {
  const fetchPlans = async () => {
    try {
      const baseURL = import.meta.env.VITE_API_BASE_URL;

      const response = await fetch(`${baseURL}/api/userplan/users/plans`);
      const data = await response.json();
      console.log(data); // Log the full data structure to check the available plan data

      if (response.ok) {
        setPlans(data.plans);  // Assuming the API returns an object with a 'plans' array
        // Log each plan's ID after fetching
        data.plans.forEach((plan) => {
          console.log('Fetched planId:', plan.planRequestDetail.planDetail.planId);
        });
      } else {
        setError(data.message || 'Failed to fetch data');
      }
    } catch (err) {
      setError('An error occurred while fetching plans');
    } finally {
      setLoading(false);
    }
  };

  fetchPlans();
}, []);


// Function to update a single plan's state to active
const handleStateUpdate = async (planId) => {
  console.log('Updating plan with ID:', planId); // Log the planId when the button is clicked
  try {
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    const response = await fetch(`${baseURL}/api/userplan/updateState`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ planId })  // Send planId for the update
    });
    const data = await response.json();
    if (response.ok) {
      // Only update the plan with the correct planId
      setPlans((prevPlans) =>
        prevPlans.map((plan) =>
          plan.planRequestDetail.planDetail.planId === planId
            ? { ...plan, planRequestDetail: { ...plan.planRequestDetail, approved: 'active' } }
            : plan
        )
      );
      alert('Plan updated to active');
    } else {
      alert(data.message || 'Failed to update the plan state');
    }
  } catch (error) {
    console.error('Error updating plan state:', error);
    alert('An error occurred while updating the plan state');
  }
};


// Function to open the modal with the image
const handleImageClick = (imageUrl) => {
setSelectedImage(imageUrl);
setOpenModal(true);  // Open the modal
};

// Function to close the modal
const handleCloseModal = () => {
setOpenModal(false);
setSelectedImage("");  // Clear the selected image
};

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
    <h2 className="text-2xl font-extrabold bg-green-400 inline-block px-16 rounded-full text-white py-4">All Requests</h2>
</div>

<div className="wrapper">
    {loading ? (
        <div>Loading...</div>
    ) : error ? (
        <div>{error}</div>
    ) : (
        <div className="card-wrapper space-y-4 w-[95%] mx-auto mt-10 md:w-[90%]">
            {plans.map((planRequest, index) => {
                const { planRequestDetail } = planRequest;
                return (
                    <div key={index} className='p-4 border group rounded-lg hover:-translate-y-2 duration-300 overflow-hidden bg-white'>
                        <h2 className='text-center font-[700] text-base md:text-xl my-2 rounded-lg text-black'>Plan Request Detail</h2>

                        {/* Flex container for plan and user details */}
                        <div className="flex justify-between items-start flex-wrap">
                            {/* Plan details */}
                            <div className="flex-1 p-4">
                                <h3 className='text-base md:text-xl font-[700] mb-3'>{planRequestDetail.planDetail.planName}</h3>
<p><span className='text-lg font-[500]'>Price: </span><span className='text-sm'>{planRequestDetail.planDetail.price}</span></p>
<p><span className='text-lg font-[500]'>Duration: </span><span className='text-sm'>{planRequestDetail.planDetail.duration} Days</span></p>
<p><span className='text-lg font-[500]'>Daily Profit: </span><span className='text-sm'>{planRequestDetail.planDetail.dailyProfit}</span></p>
<p><span className='text-lg font-[500]'>Total Profit: </span><span className='text-sm'>{planRequestDetail.planDetail.totalProfit}</span></p>
<p><span className='text-lg font-[500]'>Start Date: </span><span className='text-sm'>{planRequestDetail.startDate}</span></p>
<p><span className='text-lg font-[500]'>End Date: </span><span className='text-sm'>{planRequestDetail.endDate}</span></p>
                            </div>

                            {/* User details */}
                            <div className="flex-1 p-4">
                                <h3 className='text-base md:text-xl font-[700] mb-3'>User Detail</h3>
                                <p><span className='text-lg font-[500]'>Name: </span><span className='text-sm'>{planRequestDetail.userDetail.username}</span></p>
                                <p><span className='text-lg font-[500]'>Method: </span><span className='text-sm'>{planRequestDetail.userDetail.paymentGateway}</span></p>
                                <p className='text-green-500'><span className='text-lg font-[500]'>State: </span><span className='text-sm'>{planRequestDetail.approved}</span></p>
                                
                                {/* Button to update state */}
                                <Button variant="contained" color="primary" onClick={() => handleStateUpdate(planRequest.planRequestDetail.planDetail.planId)}>
Mark as Active
</Button>


                                {/* Display the payment screenshot if available */}
                                {planRequestDetail.userDetail.paymentScreenshot && (
                                    <div className="flex justify-center items-center mt-4">
                                        <img src={planRequestDetail.userDetail.paymentScreenshot} alt="Payment Screenshot" className="max-w-xs max-h-64 object-cover cursor-pointer" onClick={() => handleImageClick(planRequestDetail.userDetail.paymentScreenshot)} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    )}
</div>
</div>
</div>

{/* Modal for image */}
<Dialog open={openModal} onClose={handleCloseModal}>
<DialogTitle>Payment Screenshot</DialogTitle>
<DialogContent>
<img src={selectedImage} alt="Payment Screenshot" className="w-full h-auto" />
</DialogContent>
<DialogActions>
<Button onClick={handleCloseModal} color="primary">Close</Button>
</DialogActions>
</Dialog>
</div>
);
};

export default Plan_Request;
