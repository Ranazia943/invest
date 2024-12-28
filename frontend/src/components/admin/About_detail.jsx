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
import { Add, CurrencyExchange, Delete, Diversity3, Edit, Lock, MonetizationOn, Public } from '@mui/icons-material';
import { Box, Button, Modal, Tooltip } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  '@media (max-width:768px)':{width:'95%'},
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  padding: 2,
};

const About_Detail = () => {
    const [side, setSide] = useState(false)
    const [isactive, setIsactive] = useState(0)
    const [isopentoggle, setIsopentoggle] = useState(false)
    const isopen = (ind)=>{
        setIsactive(ind)
        setIsopentoggle(!isopentoggle)
    }
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    const [open1, setOpen1] = useState(false);
    const handleOpen1 = () => {
      setOpen1(true);
    };
    const handleClose1 = () => {
      setOpen1(false);
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
      <div className="dashboard-side min-h-screen ">
      <Modal
        open={open}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style }}>
          <h2 id="child-modal-title" className=' text-xl font-[600] text-center my-4'>Update Questions</h2>
          <p id="child-modal-description">
          <div className=' space-y-4'>
          <div>
            <label htmlFor="" className=' text-lg font-[600] text-green-400'>What is goldmine3x.com.</label>
          <input type='text' placeholder='Answer' value={"Goldmine3x.com is an investment platform that allows users to grow their wealth through secure and transparent investment plans."}
              className="w-full bg-gray-100 rounded-md py-3 px-4 text-sm outline-blue-600 focus-within:bg-transparent" />
          </div>
          </div>
          </p>
          <div className=' text-center mt-6 space-x-2'>
          <Button onClick={handleClose} variant='contained' sx={{marginTop:"10px"}}>Cancel</Button>
          <Button variant='contained' sx={{marginTop:"10px"}}>Update</Button>
          </div>
        </Box>
      </Modal>
      <Modal
        open={open1}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style }}>
          <h2 id="child-modal-title" className=' text-xl font-[600] text-center my-4'>Add Questions</h2>
          <p id="child-modal-description">
          <div className=' space-y-4'>
          <div>
            <label htmlFor="" className=' text-lg font-[600] text-green-400'>Enter Question</label>
          <input type='text' placeholder='Question input'
              className="w-full bg-gray-100 rounded-md py-3 px-4 text-sm outline-blue-600 focus-within:bg-transparent" />
          </div>
          <div>
            <label htmlFor="" className=' text-lg font-[600] text-green-400'>Enter Answer</label>
          <input type='text' placeholder='Answer iput' 
              className="w-full bg-gray-100 rounded-md py-3 px-4 text-sm outline-blue-600 focus-within:bg-transparent" />
          </div>
          </div>
          </p>
          <div className=' text-center mt-6 space-x-2'>
          <Button onClick={handleClose1} variant='contained' sx={{marginTop:"10px"}}>Cancel</Button>
          <Button variant='contained' sx={{marginTop:"10px"}}>Add</Button>
          </div>
        </Box>
      </Modal>
            <div className="close-icon bg-white inline-block">
             <i onClick={()=>setSide(true)} className="fa-solid fa-bars m-2 text-lg side-menu"></i>
            </div>
            
       <div className=" text-center" data-aos="fade-right"  data-aos-easing="linear" data-aos-duration="1800">
       <h2 className="text-2xl font-extrabold bg-green-400 inline-block px-16 rounded-full text-white py-4">About Page Details</h2>
       </div>
       <div className='ml-4'>
              <Link to="/admin/dashboard/update_about"><Button sx={{background:"#4ade80"}} variant='contained'><Edit/><span className='ml-2'>Update Page</span></Button></Link>
            </div>
        <div>
            <div className="about_detail_wrapper m-4">
            <div className="cards grid grid-cols-1 md:grid-cols-2 gap-12 mt-10">
                <div data-aos="zoom-in" data-aos-duration="1500" className="card hover:-translate-y-2 duration-300 hover:shadow-green-200 p-4 border relative shadow-lg rounded-lg">
                <div className=' absolute top-2 right-2 space-x-2'>
                <Tooltip title="Delete Question" placement="top">
            <Button variant='contained' sx={{background:"#4ade80"}}><Delete/></Button>
          </Tooltip>
                </div>
                    <h2 className=" text-3xl font-[600] text-green-400">Who We Are</h2>
                    <p className=" text-xl font-[400] text-gray-600 mt-2">Goldmine3x.com is an innovative investment platform designed to help you grow your wealth. With a focus on transparency, security, and high returns, we empower investors to achieve their financial goals.</p>
                </div>
                <div data-aos="zoom-in" data-aos-duration="2000" className="card hover:-translate-y-2 duration-300 hover:shadow-green-200 p-4 border shadow-lg rounded-lg">
                <div className=' absolute top-2 right-2 space-x-2'>
                <Tooltip title="Delete Question" placement="top">
            <Button variant='contained' sx={{background:"#4ade80"}}><Delete/></Button>
          </Tooltip>
                </div>
                    <h2 className=" text-3xl font-[600] text-green-400">Our Mission</h2>
                    <p className=" text-xl font-[400] text-gray-600 mt-2">To provide accessible and secure investment opportunities to individuals and businesses globally. We aim to deliver consistent growth while maintaining the highest standards of integrity.</p>
                </div>
            </div>
            <div data-aos="zoom-in" data-aos-duration="2000" className="card hover:-translate-y-2 duration-300 hover:shadow-green-200 shadow-lg rounded-lg mt-10 border p-4 md:p-8">
            <div className=' absolute top-2 right-2 space-x-2'>
                <Tooltip title="Delete Question" placement="top">
            <Button variant='contained' sx={{background:"#4ade80"}}><Delete/></Button>
          </Tooltip>
                </div>
                <h2 className=" text-4xl font-[600] text-green-400">Why Choose Us?</h2>
                <ul className=" mt-4 space-y-4">
                    <li className=" text-base md:text-lg font-[350] text-gray-800 flex items-start gap-2"><Diversity3 sx={{color:"brown",fontSize:"30px"}}/> we are powered by a passionate and skilled team of developers, financial experts, and blockchain specialists. Together, we aim to provide a user-friendly and secure platform. With extensive expertise in digital finance and mining, our team continuously innovates to enhance your earning journey.</li>
                    <li className=" text-base md:text-lg font-[350] text-gray-800 flex items-start gap-2"><Lock sx={{color:"brown",fontSize:"30px"}}/>We believe in transparency and accountability. Our app tracks performance metrics, including mining speed, daily earnings, and withdrawal history, in real time. Users can easily monitor their progress and optimize their activities. This commitment to measurable results ensures trust and empowers users to make informed decisions.</li>
                    <li className=" text-base md:text-lg font-[350] text-gray-800 flex items-start gap-2"><MonetizationOn sx={{color:"brown",fontSize:"30px"}}/>we prioritize user satisfaction with clear investment and return policies. While initial investments unlock advanced features, we ensure fair returns based on market conditions and user activities. With timely payouts and no hidden charges, our policy promotes long-term trust and consistent rewards for our valued users.</li>
                    <li className=" text-base md:text-lg font-[350] text-gray-800 flex items-start gap-2"><Public sx={{color:"brown",fontSize:"30px"}}/>Our primary goal is to democratize digital mining, making it accessible to everyone, regardless of expertise. We aim to create a transparent, efficient, and rewarding environment for users to participate in mining and earning. By simplifying complex processes, we empower users to achieve financial independence through our platform.</li>
                </ul>
            </div>
            <div data-aos="zoom-in" data-aos-duration="2000" className="card hover:-translate-y-2 duration-300 hover:shadow-green-200 p-4    mt-10 mb-20 shadow-lg border rounded-xl">
            <div className=' absolute top-2 right-2 space-x-2'>
                <Tooltip title="Add Question" placement="top">
            <Button variant='contained' onClick={handleOpen1} sx={{background:"#4ade80"}}><Add/></Button>
          </Tooltip>
                </div>
                <h2 className=" text-4xl font-[600] text-green-400 mb-6">Frequently Asked Questions</h2>
                <div>
                  <div className="cards grid grid-cols-1 md:grid-cols-2 md:gap-4 gap-2">
                    <div className="card relative border p-4 rounded-md">
                       <div className=' absolute top-2 right-2 space-x-2'>
                <Tooltip title="Edit Questions" placement="top">
            <Button variant='contained' onClick={handleOpen} sx={{background:"#4ade80"}}><Edit/></Button>
          </Tooltip>
                <Tooltip title="Delete Question" placement="top">
            <Button variant='contained' sx={{background:"#4ade80"}}><Delete/></Button>
          </Tooltip>
                </div>
                      <h2 className='text-lg md:text-2xl font-[600]  '>What is goldmine3x.com?</h2>
                      <p className=' text-base md:text-lg font-[400] mt-2 text-gray-700'>Goldmine3x.com is an investment platform that allows users to grow their wealth through secure and transparent investment plans.</p>
                    </div>
                    <div className="card relative border p-4 rounded-md">
                    <div className=' absolute top-2 right-2 space-x-2'>
                <Tooltip title="Edit Questions" placement="top">
            <Button variant='contained' sx={{background:"#4ade80"}} onClick={handleOpen}><Edit/></Button>
          </Tooltip>
          <Tooltip title="Delete Question" placement="top">
            <Button variant='contained' sx={{background:"#4ade80"}}><Delete/></Button>
          </Tooltip>
                </div>
                      <h2 className='text-lg md:text-2xl font-[600]  '>How secure is my investment?</h2>
                      <p className=' text-base md:text-lg font-[400] mt-2 text-gray-700'>We employ state-of-the-art encryption and secure protocols to ensure that your investments are safe at all times.</p>
                    </div>
                    <div className="card relative border p-4 rounded-md">
                    <div className=' absolute top-2 right-2 space-x-2'>
                <Tooltip title="Edit Questions" placement="top">
            <Button variant='contained' sx={{background:"#4ade80"}} onClick={handleOpen}><Edit/></Button>
          </Tooltip>
          <Tooltip title="Delete Question" placement="top">
            <Button variant='contained' sx={{background:"#4ade80"}}><Delete/></Button>
          </Tooltip>
                </div>
                      <h2 className='text-lg md:text-2xl font-[600]  '>What kind of return can i except?</h2>
                      <p className=' text-base md:text-lg font-[400] mt-2 text-gray-700'>Our platform offers competitive and consistent returns that vary depending on the selected investment plan.</p>
                    </div>
                  </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
   </div>
   
  )
}

export default About_Detail