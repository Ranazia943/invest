import { Diversity3, Lock, MonetizationOn, Public } from "@mui/icons-material"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const About = () => {
  return (
    <div>
        <div className="wrapper max-w-7xl border-8 border-white m-auto mt-20 mb-28">
            <div className="banner bg-[url('/images/about.jpg')] hover:-translate-y-2 duration-300 hover:shadow-lg hover:shadow-green-200 relative after:absolute after:inset-0 after:bg-black after:opacity-60 rounded-xl overflow-hidden bg-cover bg-no-repeat h-[300px] flex justify-center items-center">
            <div className=" z-50 text-center">
                <h2 className=" text-4xl font-[800] text-white mx-1">About Goldmine3x.com</h2>
                <p className=" text-xl mt-2 font-[500] text-white">Your trusted partner in smart investments</p>
            </div>
            </div>
            <div className="cards grid grid-cols-1 md:grid-cols-2 gap-12 mt-10">
                <div data-aos="zoom-in" data-aos-duration="1500" className="card hover:-translate-y-2 duration-300 hover:shadow-green-200 p-4 border shadow-lg rounded-lg">
                    <h2 className=" text-3xl font-[600] text-green-400">Who We Are</h2>
                    <p className=" text-xl font-[400] text-gray-600 mt-2">Goldmine3x.com is an innovative investment platform designed to help you grow your wealth. With a focus on transparency, security, and high returns, we empower investors to achieve their financial goals.</p>
                </div>
                <div data-aos="zoom-in" data-aos-duration="2000" className="card hover:-translate-y-2 duration-300 hover:shadow-green-200 p-4 border shadow-lg rounded-lg">
                    <h2 className=" text-3xl font-[600] text-green-400">Our Mission</h2>
                    <p className=" text-xl font-[400] text-gray-600 mt-2">To provide accessible and secure investment opportunities to individuals and businesses globally. We aim to deliver consistent growth while maintaining the highest standards of integrity.</p>
                </div>
            </div>
            <div data-aos="zoom-in" data-aos-duration="2000" className="card hover:-translate-y-2 duration-300 hover:shadow-green-200 shadow-lg rounded-lg mt-10 border p-4 md:p-8">
                <h2 className=" text-4xl font-[600] text-green-400">Why Choose Us?</h2>
                <ul className=" mt-4 space-y-4">
                    <li className=" text-base md:text-lg font-[350] text-gray-800 flex items-start gap-2"><Diversity3 sx={{color:"brown",fontSize:"30px"}}/> we are powered by a passionate and skilled team of developers, financial experts, and blockchain specialists. Together, we aim to provide a user-friendly and secure platform. With extensive expertise in digital finance and mining, our team continuously innovates to enhance your earning journey.</li>
                    <li className=" text-base md:text-lg font-[350] text-gray-800 flex items-start gap-2"><Lock sx={{color:"brown",fontSize:"30px"}}/>We believe in transparency and accountability. Our app tracks performance metrics, including mining speed, daily earnings, and withdrawal history, in real time. Users can easily monitor their progress and optimize their activities. This commitment to measurable results ensures trust and empowers users to make informed decisions.</li>
                    <li className=" text-base md:text-lg font-[350] text-gray-800 flex items-start gap-2"><MonetizationOn sx={{color:"brown",fontSize:"30px"}}/>we prioritize user satisfaction with clear investment and return policies. While initial investments unlock advanced features, we ensure fair returns based on market conditions and user activities. With timely payouts and no hidden charges, our policy promotes long-term trust and consistent rewards for our valued users.</li>
                    <li className=" text-base md:text-lg font-[350] text-gray-800 flex items-start gap-2"><Public sx={{color:"brown",fontSize:"30px"}}/>Our primary goal is to democratize digital mining, making it accessible to everyone, regardless of expertise. We aim to create a transparent, efficient, and rewarding environment for users to participate in mining and earning. By simplifying complex processes, we empower users to achieve financial independence through our platform.</li>
                </ul>
            </div>
            <div data-aos="zoom-in" data-aos-duration="2000" className="card hover:-translate-y-2 duration-300 hover:shadow-green-200 p-4 max-[550px]:w-full min-[550px]:w-[500px] md:w-[600px] mx-auto mt-10 shadow-lg border rounded-xl">
                <h2 className=" text-4xl font-[600] text-green-400 mb-6">Frequently Asked Questions</h2>
            <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          What is Goldmine3x.com?
        </AccordionSummary>
        <AccordionDetails>
        Goldmine3x.com is an investment platform that allows users to grow their wealth through secure and transparent investment plans.
        </AccordionDetails>
      </Accordion>
            <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          How secure is my investment?
        </AccordionSummary>
        <AccordionDetails>
        We employ state-of-the-art encryption and secure protocols to ensure that your investments are safe at all times.
        </AccordionDetails>
      </Accordion>
            <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
       What kind of returns can I expect?
        </AccordionSummary>
        <AccordionDetails>
        Our platform offers competitive and consistent returns that vary depending on the selected investment plan.
        </AccordionDetails>
      </Accordion>
            </div>
        </div>
    </div>
  )
}

export default About