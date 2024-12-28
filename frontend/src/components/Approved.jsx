import { Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../authcontext/AuthContext"; // Adjust the import path according to your project structure

const Approved = () => {
  const location = useLocation();
  const { plan, paymentMethod } = location.state || {}; // Retrieve passed data

  // Get user info from AuthContext
  const { authUser } = useContext(AuthContext);

  if (!plan || !paymentMethod) {
    return <div>No plan selected or no payment method.</div>;
  }

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default"); // Your Cloudinary preset

    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/dqqejge0d/image/upload", {
        method: "POST",
        body: formData,
      });
      const urlData = await response.json();
      return urlData.secure_url; // Return the URL of the uploaded image
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };
const handlePurchase = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const paymentScreenshot = formData.get("paymentScreenshot");
  const taxId = formData.get("taxId");

  let screenshotUrl = null;
  if (paymentScreenshot) {
    screenshotUrl = await uploadImageToCloudinary(paymentScreenshot);
  }

  if (!screenshotUrl) {
    alert("Failed to upload the screenshot.");
    return;
  }

  try {
    const baseURL = import.meta.env.VITE_API_BASE_URL;
  
    const response = await axios.post(`${baseURL}/api/userplan/purchase`, {
      userId: authUser._id,  // Pass the user ID from the AuthContext
      planId: plan._id,
      paymentGateway: paymentMethod,
      paymentScreenshot: screenshotUrl,
      taxId,
    });
    alert(response.data.message);
  } catch (error) {
    console.error("Error purchasing plan:", error);
    alert("Error purchasing plan.");
  }
};

  return (
    <div>
      <div className="wrapper flex justify-center items-center min-h-[80vh]">
        <div data-aos="zoom-in" data-aos-duration="1000" className="form w-[95%] md:w-[80%] lg:w-[60%] rounded-lg border bg-green-50">
          <div className="card relative p-2 flex justify-start gap-2">
            <h2>
              <i className="fa-solid fa-check border p-1 rounded-full bg-green-400 text-white mr-2"></i>
            </h2>
            <div className="wrapp">
              <h2 className="text-base lg:text-xl font-[700]">First submit payment and then upload screenshot</h2>
              <p className="text-xl font-[350] text-gray-700 my-2">Bank Account</p>
              <p className="text-xl font-[350] flex max-[500px]:flex-col text-gray-700">
                <span className="text-lg font-[500]">Acc-name</span>: <span className="font-[350] underline underline-offset-2">Ahmad Raza</span>
              </p>
              <p className="text-xl font-[350] flex max-[500px]:flex-col text-gray-700 mt-2">
                <span className="text-lg font-[500]">Acc-number</span>: <span className="font-[350] underline underline-offset-2">03001234567</span>
              </p>
            </div>
            <div className="absolute bottom-4 right-2">
              <p className="text-end m-2 text-xl font-[500] text-red-500">Price: Rs. {plan.price}</p>
              <p className="text-xl font-[350] text-gray-700 my-2">Payment Method: {paymentMethod}</p>
              <p className="text-end text-base font-[500] text-green-500">Approved in 5 mins</p>
            </div>
          </div>
          <hr className="w-[80%] my-4 m-auto" />
          <form onSubmit={handlePurchase} className="mt-4 px-8">
            <p className="ml-2 text-base font-[350] text-gray-700 my-2">Upload your payment Proof</p>
            <div>
              <input
                type="file"
                name="paymentScreenshot"
                className="file:bg-green-400 file:text-white w-full p-1.5 rounded-md file:outline-none file:border-none border file:p-1 file:font-[400] file:rounded-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="taxId" className="ml-2 my-2">Tax ID</label>
              <input
                type="text"
                name="taxId"
                placeholder="Enter tax id"
                className="w-full border rounded-md py-3 px-4 text-sm outline-blue-600 bg-transparent"
              />
            </div>
            <div className="text-center my-4">
              <Link to="/account">
                <Button variant="contained" sx={{ background: "#4ade80" }} type="submit">
                  Submit
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Approved;
