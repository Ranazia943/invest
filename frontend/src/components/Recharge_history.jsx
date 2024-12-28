import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../authcontext/AuthContext"; // Assuming you're using context for authentication

const Recharge_history = () => {
  const [rechargeHistory, setRechargeHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [selectedImage, setSelectedImage] = useState(""); // State to store selected image URL
  const { authUser } = useAuthContext(); // Get authUser from context (adjust as per your implementation)

  useEffect(() => {
    const fetchRechargeHistory = async () => {
      try {
        if (!authUser) {
          console.log("No user logged in");
          return;
        }

        const token = authUser.token || localStorage.getItem("token"); // Use the token from context or localStorage

        if (!token) {
          console.error("Token not available");
          return;
        }
        const baseURL = import.meta.env.VITE_API_BASE_URL;
        const response = await axios.get(`${baseURL}/api/userplan/${authUser._id}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (response.data && response.data.purchasedPlans) {
          setRechargeHistory(response.data.purchasedPlans); // Set the fetched data in state
        } else {
          console.error("No recharge data found");
        }
        setLoading(false); // Stop loading after data fetch
      } catch (error) {
        console.error("Error fetching recharge history:", error);
        setLoading(false);
      }
    };

    if (authUser) {
      fetchRechargeHistory();
    }
  }, [authUser]);

  const handleViewScreenshot = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowModal(true); // Show the modal with the image
  };

  const closeModal = () => {
    setShowModal(false); // Close the modal
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] py-4">
      <div className="wrapper">
        <h2 className="text-center my-8 text-3xl font-[600] font-sans">Recharge History</h2>
      </div>
      <div className="cards-wrapper mb-24 grid max-[850px]:grid-cols-1 max-[850px]:gap-4 max-[850px]:mx-2 grid-cols-2 md:gap-4 lg:gap-8 md:mx-8 lg:mx-16" style={{ minHeight: '200px' }}>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : rechargeHistory.length > 0 ? (
          rechargeHistory.map((recharge, index) => (
            <div
              key={index}
              data-aos="zoom-in"
              data-aos-duration="3000"
              className="card border relative p-2 max-[850px]:w-[450px] max-[520px]:w-full max-[850px]:mx-auto rounded-xl flex justify-start gap-2 bg-green-50"
            >
              <h2>
                <i className="fa-solid fa-check border p-1 rounded-full bg-green-400 text-white mr-2"></i>
              </h2>
              <div className="wrapp">
                <div>
                  <h2 className="text-xl font-[700]">{recharge.name}</h2>
                  <p className="text-base font-[350]">State: {recharge.state}</p>
                  <p className="text-base font-[350]">Payment Gateway: {recharge.paymentGateway}</p>
                  <p className="text-base font-[350]">Tax ID: {recharge.taxId}</p>
                </div>
              </div>
             
              <div className="absolute bottom-4 right-2">
                <p className="text-end m-2 text-xl font-[500] text-red-500">Rs. {recharge.price}</p>
                <div>
                    
                  <button
                    className="bg-green-400 shadow-md focus:shadow-none text-white max-[850px]:text-sm px-2 min-[850px]:px-3 py-1 min-[850px]:py-2 rounded-md mx-1 min-[850px]:mx-2"
                    onClick={() => handleViewScreenshot(recharge.paymentScreenshot)} // Pass the screenshot URL
                  >
                    View Screenshot
                  </button>
                  <Link to="/addamount">
                    <button className="bg-green-400 shadow-md focus:shadow-none text-white max-[850px]:text-sm px-2 min-[850px]:px-3 py-1 min-[850px]:py-2 rounded-md mx-1 min-[850px]:mx-2">
                      Recharge
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No recharge history found.</p>
        )}
      </div>

      {/* Modal for displaying screenshot */}
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="relative w-full h-full">
            <button
              className="absolute top-4 right-4 text-white text-3xl"
              onClick={closeModal}
            >
              &times;
            </button>
            <img
              src={selectedImage}
              alt="Screenshot"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Recharge_history;
