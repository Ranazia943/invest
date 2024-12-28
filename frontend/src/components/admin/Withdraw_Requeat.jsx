import DashboardIcon from '@mui/icons-material/Dashboard';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Groups2Icon from '@mui/icons-material/Groups2';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import WorkIcon from '@mui/icons-material/Work';
import ForumIcon from '@mui/icons-material/Forum';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { CurrencyExchange } from '@mui/icons-material';
import { Button } from '@mui/material';
import axios from "axios";

const Withdraw_Request = () => {
    const [side, setSide] = useState(false);
    const [isactive, setIsactive] = useState(0);
    const [isopentoggle, setIsopentoggle] = useState(false);
    const [withdrawalRequests, setWithdrawalRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    const isopen = (ind) => {
        setIsactive(ind);
        setIsopentoggle(!isopentoggle);
    };

    // Fetch withdrawal requests from the backend
    useEffect(() => {
        const fetchWithdrawalRequests = async () => {
            try {
                const baseURL = import.meta.env.VITE_API_BASE_URL;
                const response = await axios.get(`${baseURL}/api/withdrawl/all`); // Adjust the API endpoint as needed
                setWithdrawalRequests(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching withdrawal requests:", error);
                setLoading(false);
            }
        };
        fetchWithdrawalRequests();
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
                <div className="dashboard-side min-h-screen">
                    <div className="close-icon bg-white inline-block">
                        <i onClick={() => setSide(true)} className="fa-solid fa-bars m-2 text-lg side-menu"></i>
                    </div>
                    <div className="text-center" data-aos="fade-right" data-aos-easing="linear" data-aos-duration="1800">
                        <h2 className="text-2xl font-extrabold bg-green-400 inline-block px-16 rounded-full text-white py-4">Withdraw Requests</h2>
                    </div>
                    <div className="wrappper">
                        <div className="card-wrapper md:w-[90%] mt-10 mx-auto w-[95%] space-y-4">
                            {loading ? (
                                <p className="text-center">Loading withdrawal requests...</p>
                            ) : (
                                withdrawalRequests.map((request, index) => (
                                    <div key={index} className="p-4 border group rounded-lg bg-white shadow-sm">
                                        <h2 className="text-xl font-bold text-center mb-4">Withdraw Request Details</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <p><span className="font-bold">Username:</span> {request.userId.username}</p>
                                                <p><span className="font-bold">Status:</span> {request.status}</p>
                                                <p><span className="font-bold">Amount:</span> {request.amount}</p>
                                                <p><span className="font-bold">Balance Before Request:</span> {request.balanceBeforeRequest}</p>
                                            </div>
                                            <div>
                                                <p><span className="font-bold">Payment Gateway:</span> {request.paymentGateway}</p>
                                                <p><span className="font-bold">Account Name:</span> {request.gatewayAccountName}</p>
                                                <p><span className="font-bold">Account Number:</span> {request.gatewayAccountNumber}</p>
                                                <p><span className="font-bold">Request Date:</span> {new Date(request.requestDate).toLocaleString()}</p>
                                            </div>
                                        </div>
<br></br>
<Button variant="contained" color="primary">
    <Link to={`/admin/dashboard/withdrawl_aciton/${request._id}`} style={{ textDecoration: 'none', color: 'white' }}>
        Action
    </Link>
</Button>

                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Withdraw_Request;
