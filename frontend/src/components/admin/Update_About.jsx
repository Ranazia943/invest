import { useEffect, useState } from "react";
import axios from "axios";
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
import { Button } from '@mui/material';
import { CurrencyExchange } from '@mui/icons-material';
import { toast } from "react-hot-toast";

const Update_About = () => {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState("");
  const [side, setSide] = useState(false)
  const [isactive, setIsactive] = useState(0)
  const [isopentoggle, setIsopentoggle] = useState(false)
  const isopen = (ind)=>{
      setIsactive(ind)
      setIsopentoggle(!isopentoggle)
  }

  // Fetch tickets from the backend
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const baseURL = import.meta.env.VITE_API_BASE_URL;
        const response = await axios.get(`${baseURL}/api/support/tickets/all`); // Adjust the URL as needed
        setTickets(response.data.tickets);
      } catch (err) {
        setError("Failed to fetch support tickets.");
      }
    };
    fetchTickets();
  }, []);

  // Handle delete action

  // Handle delete action
  const handleDelete = async (id) => {
    try {
      const baseURL = import.meta.env.VITE_API_BASE_URL;

      await axios.delete(`${baseURL}/api/support/tickets/${id}`); // Adjust the URL as needed
      setTickets((prevTickets) => prevTickets.filter((ticket) => ticket._id !== id));
      toast.success("Support message deleted successfully!"); // Success message
    } catch (err) {
      setError("Failed to delete the ticket.");
      toast.error("Failed to delete the support message."); // Error message
    }
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
             <i onClick={()=>setSide(true)} className="fa-solid fa-bars m-2 text-lg side-menu"></i>
            </div>
          <div
            className="text-center"
            data-aos="fade-right"
            data-aos-easing="linear"
            data-aos-duration="1800"
          >
            <h2 className="text-2xl font-extrabold bg-gradient-to-tr from-cyan-300 via-cyan-100 inline-block px-16 rounded-full text-gray-600 py-4">
              Support Requests
            </h2>
          </div>
          <div>
            <div className="mx-2 md:mx-4">
              <div className="max-w-4xl mx-auto mt-20 mb-10">
                {error && (
                  <p className="text-red-500 text-center">{error}</p>
                )}
                <div className="space-y-6">
                  {tickets.map((ticket) => (
                    <div
                      key={ticket._id}
                      className="w-full rounded-md px-4 text-base text-gray-800 bg-gray-100 py-4 flex justify-between items-center"
                    >
                      <div className="w-full">
                        <p className="text-lg font-semibold">
                          <span className="font-bold text-gray-700">Name:</span> {ticket.name}
                        </p>
                        <p>
                          <span className="font-bold text-gray-700">Email:</span> {ticket.email}
                        </p>
                        <p>
                          <span className="font-bold text-gray-700">Phone:</span> {ticket.phone}
                        </p>
                        <p>
                          <span className="font-bold text-gray-700">Message:</span> {ticket.message}
                        </p>
                      </div>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(ticket._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  ))}
                  {tickets.length === 0 && (
                    <p className="text-center text-gray-500">
                      No support tickets available.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Update_About;
