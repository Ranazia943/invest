import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DashboardIcon from '@mui/icons-material/Dashboard';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Groups2Icon from '@mui/icons-material/Groups2';
import { Link } from "react-router-dom";
import WorkIcon from '@mui/icons-material/Work';
import ForumIcon from '@mui/icons-material/Forum';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { CurrencyExchange } from '@mui/icons-material';

const WithdrawlAction = () => {
    const { id } = useParams(); // Capture ID from URL
    const [status, setStatus] = useState('');
    const [adminSummary, setAdminSummary] = useState('');
    const [adminScreenshot, setAdminScreenshot] = useState(null); // Handle file
    const [approvedAmount, setApprovedAmount] = useState('');
    const [side, setSide] = useState(false);
    const [isactive, setIsactive] = useState(0);
    const [isopentoggle, setIsopentoggle] = useState(false);

    
    const isopen = (ind) => {
        setIsactive(ind);
        setIsopentoggle(!isopentoggle);
    };
    // Handle the screenshot file change
    const handleScreenshotChange = (e) => {
        setAdminScreenshot(e.target.files[0]); // Store the file
    };

    // Cloudinary upload function for admin screenshot
    const uploadScreenshot = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "ml_default");  // Your Cloudinary upload preset

        try {
            const response = await fetch("https://api.cloudinary.com/v1_1/dqqejge0d/image/upload", {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            return data.secure_url;  // Return the image URL from Cloudinary
        } catch (error) {
            console.error("Error uploading screenshot:", error);
            return "";
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!adminScreenshot) {
            alert('Please upload an admin screenshot.');
            return;
        }

        // Upload the screenshot image to Cloudinary and get the URL
        const screenshotUrl = await uploadScreenshot(adminScreenshot);
        if (!screenshotUrl) {
            alert("Error uploading screenshot. Please try again.");
            return;
        }

        const data = {
            status,
            adminSummary,
            adminScreenshot: screenshotUrl,  // Use the URL from Cloudinary
            approvedAmount: status === 'completed' ? approvedAmount : null, // Only send approvedAmount if status is 'completed'
        };

        try {
            const baseURL = import.meta.env.VITE_API_BASE_URL;
            const response = await axios.put(`${baseURL}/api/withdrawl/response/${id}`,
                data
            );
            alert(response.data.message);
        } catch (error) {
            console.error('Error updating withdrawal request:', error);
            alert('Error updating withdrawal request');
        }
    };

    const formStyle = {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif',
    };

    const labelStyle = {
        display: 'block',
        fontSize: '14px',
        color: '#555',
        marginBottom: '8px',
    };

    const inputStyle = {
        width: '100%',
        padding: '12px',
        borderRadius: '6px',
        border: '1px solid #ccc',
        fontSize: '16px',
        outline: 'none',
        transition: 'border-color 0.3s ease',
        marginBottom: '12px',
    };

    const textareaStyle = {
        width: '100%',
        padding: '12px',
        borderRadius: '6px',
        border: '1px solid #ccc',
        fontSize: '16px',
        outline: 'none',
        resize: 'vertical',
        marginBottom: '12px',
    };

    const selectStyle = {
        width: '100%',
        padding: '12px',
        borderRadius: '6px',
        border: '1px solid #ccc',
        fontSize: '16px',
        outline: 'none',
        marginBottom: '12px',
    };

    const buttonStyle = {
        padding: '12px 20px',
        backgroundColor: '#5b9bd5',
        color: 'white',
        fontSize: '16px',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    };

    const handleHover = (e) => {
        e.target.style.backgroundColor = '#4a8fb5';
    };

    const handleMouseOut = (e) => {
        e.target.style.backgroundColor = '#5b9bd5';
    };

    return (

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
        <div style={formStyle}>
            <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Respond to Withdrawal Request</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="status" style={labelStyle}>Status</label>
                    <select
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        style={selectStyle}
                    >
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>

                {status === 'completed' && (
                    <div>
                        <label htmlFor="approvedAmount" style={labelStyle}>Approved Amount</label>
                        <input
                            type="number"
                            id="approvedAmount"
                            value={approvedAmount}
                            onChange={(e) => setApprovedAmount(e.target.value)}
                            min="0"
                            required
                            style={inputStyle}
                        />
                    </div>
                )}

                <div>
                    <label htmlFor="adminSummary" style={labelStyle}>Admin Summary</label>
                    <textarea
                        id="adminSummary"
                        value={adminSummary}
                        onChange={(e) => setAdminSummary(e.target.value)}
                        style={textareaStyle}
                    />
                </div>

                <div>
                    <label htmlFor="adminScreenshot" style={labelStyle}>Admin Screenshot (Upload Image)</label>
                    <input
                        type="file"
                        id="adminScreenshot"
                        onChange={handleScreenshotChange}
                        accept="image/*"
                        style={inputStyle}
                        required
                    />
                </div>

                <div>
                    <button
                        type="submit"
                        style={buttonStyle}
                        onMouseOver={handleHover}
                        onMouseOut={handleMouseOut}
                    >
                        Submit Response
                    </button>
                </div>
            </form>
        </div>
        </div>
        </div>
    );
};

export default WithdrawlAction;
