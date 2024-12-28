import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { useAuthContext } from "../authcontext/AuthContext"; // to get the auth user

export const Recharge_form = () => {
  const { authUser, authToken } = useAuthContext(); // Use AuthContext to get user details
  const [plans, setPlans] = useState([]);
  const [paymentGateways, setPaymentGateways] = useState(["EasyPaisa", "JazzCash", "Bank Transfer"]);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [taxId, setTaxId] = useState("");
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [planDetails, setPlanDetails] = useState(null);

  // Fetch plans on component mount
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const baseURL = import.meta.env.VITE_API_BASE_URL;
        const response = await axios.get(`${baseURL}/api/plan/all`); // Replace with your API URL
        setPlans(response.data.plans);
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    };
    fetchPlans();
  }, []);

  const handlePlanChange = (e) => {
    const planName = e.target.value;
    const selectedPlan = plans.find((plan) => plan.name === planName);
    setSelectedPlan(planName);
    setPlanDetails(selectedPlan); // Store the plan details (for display)
  };

  const handleScreenshotChange = (e) => {
    setPaymentScreenshot(e.target.files[0]);
  };

  // Cloudinary upload function for payment screenshot
  const uploadScreenshot = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");

    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/dqqejge0d/image/upload", {
        method: "POST",
        body: formData,
      });
      const urlData = await response.json();
      return urlData.secure_url; // Return the URL of the uploaded image
    } catch (error) {
      console.error("Error uploading payment screenshot:", error);
      return "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!authUser || !authUser._id) {
      alert("No user data found.");
      return;
    }

    if (!selectedPlan || !paymentMethod || !taxId || !paymentScreenshot) {
      alert("Please fill out all fields.");
      return;
    }

    // Upload the payment screenshot to Cloudinary
    const screenshotUrl = await uploadScreenshot(paymentScreenshot);
    if (!screenshotUrl) {
      alert("Error uploading screenshot. Please try again.");
      return;
    }

    // Prepare the form data for the purchase request
    const formData = {
      planId: planDetails._id,                // Plan ID
      paymentGateway: paymentMethod,          // Payment method
      paymentScreenshot: screenshotUrl,       // URL of the uploaded screenshot
      taxId: taxId                            // Tax ID
    };

    try {
      // Send POST request to the server to purchase the plan
      const baseURL = import.meta.env.VITE_API_BASE_URL;
      const response = await axios.post(`${baseURL}/api/userplan/purchase/${authUser._id}`, // Include the userId in the URL
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,  // Include auth token in request headers for authorization
          },
        }
      );

      if (response.data.message === "Plan purchased successfully") {
        setIsSubmitted(true);  // Show success message
      }
    } catch (error) {
      console.error("Error in purchase plan:", error);
      alert("There was an issue processing your payment. Please try again.");
    }
  };

  return (
    <div className="bg-[url('https://images.hdqwalls.com/download/dark-blur-abstract-4k-v3-1920x1080.jpg')] bg-cover bg-no-repeat min-h-screen">
      
    <div className="wrapper flex flex-col items-center min-h-[90vh] py-10">
    <div className="mt-10 w-full max-w-md bg-gray-800 text-white p-6 rounded-lg border">
        <h3 className="text-lg font-bold mb-4">Account Details</h3>
        <p><strong>Account Holder Name:</strong> Syed Ali Shah</p>
        <p><strong>Account Number:</strong> 043049304340</p>
        <p><strong>Account Name:</strong> Bank Account UBL</p>
      </div>
      {/* Recharge Form */}
      <form className="max-w-md w-full backdrop-blur-lg p-6 rounded-lg border" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Recharge Now</h2>
  
        {/* Plan Dropdown */}
        <div className="mb-6">
          <label htmlFor="plan" className="block text-white mb-2">Select Plan</label>
          <select
            id="plan"
            className="w-full h-10 px-3 border rounded-md"
            onChange={handlePlanChange}
            value={selectedPlan}
          >
            <option value="">-- Select Plan --</option>
            {plans.map((plan) => (
              <option key={plan._id} value={plan.name}>
                {plan.name} - Rs {plan.price}
              </option>
            ))}
          </select>
        </div>
  
        {/* Payment Method Dropdown */}
        <div className="mb-6">
          <label htmlFor="paymentMethod" className="block text-white mb-2">Select Payment Method</label>
          <select
            id="paymentMethod"
            className="w-full h-10 px-3 border rounded-md"
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="">-- Select Payment Method --</option>
            {paymentGateways.map((gateway, index) => (
              <option key={index} value={gateway}>
                {gateway}
              </option>
            ))}
          </select>
        </div>
  
        {/* Show Selected Plan Price and Payment Method */}
        {planDetails && (
          <div className="bg-gray-800 text-white p-4 mb-4 rounded-lg">
            <h3>Selected Plan:</h3>
            <p>Plan: {planDetails.name}</p>
            <p>Price: Rs {planDetails.price}</p>
            <p>Payment Method: {paymentMethod}</p>
          </div>
        )}
  
        {/* Tax ID and Payment Screenshot */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Enter Tax ID"
            className="w-full p-2 border rounded-md mb-4"
            value={taxId}
            onChange={(e) => setTaxId(e.target.value)}
          />
          <input
            type="file"
            className="mb-4 w-full"
            onChange={handleScreenshotChange}
          />
        </div>
  
        {/* Submit Button */}
        <div className="text-center">
          <Button
            variant="contained"
            type="submit"
            sx={{ backgroundColor: "#4ade80" }}
          >
            Submit
          </Button>
        </div>
      </form>
  
      {/* Success Section */}
      {isSubmitted && (
        <div
          data-aos="zoom-in"
          data-aos-duration="1000"
          className="mt-10 w-full max-w-md bg-green-50 p-6 rounded-lg border"
        >
          <h2 className="text-base lg:text-xl font-[700]">Your plan purchase is being processed.</h2>
          <p className="text-gray-700">You will be notified once the payment is verified.</p>
        </div>
      )}
  
      {/* Account Details */}
      
    </div>
  </div>
  
  );
};
