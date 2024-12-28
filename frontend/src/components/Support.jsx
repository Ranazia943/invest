import React, { useState } from "react";
import { Button } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";

const Support = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation (you can enhance this as needed)
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      // API call to submit the support ticket
      const baseURL = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(`${baseURL}/api/support/tickets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // If the ticket is created successfully
        toast.success("Thanks for your support we will contact back on your email.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        // Handle error from the API
        toast.error(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      // Handle network or other errors
      toast.error("Network error. Please try again.");
    }
  };

  return (
    <div>
      <Toaster position="top-center" />
      <div className="wrapper flex mb-28 justify-center items-center min-h-[90vh]">
        <div className="font-[sans-serif] max-md:mr-2 max-md:ml-2 max-w-6xl mx-auto relative bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-3xl overflow-hidden mt-4">
          <div className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full bg-red-400" />
          <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-red-400" />
          <div className="grid md:grid-cols-2 gap-8 py-8 px-6">
            <div className="text-center flex flex-col items-center justify-center">
              <img src="/images/jelp.png" className="shrink-0 w-5/6" />
            </div>
            <form onSubmit={handleSubmit} className="rounded-tl-3xl rounded-bl-3xl">
              <h2 className="text-2xl text-red-600 font-bold text-center mb-6">
                Support Ticket
              </h2>
              <div className="max-w-md mx-auto space-y-3 relative">
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-gray-100 rounded-md py-3 px-4 text-sm outline-blue-600 focus-within:bg-transparent"
                />
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-gray-100 rounded-md py-3 px-4 text-sm outline-blue-600 focus-within:bg-transparent"
                />
                <input
                  type="number"
                  placeholder="Phone No."
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-gray-100 rounded-md py-3 px-4 text-sm outline-blue-600 focus-within:bg-transparent"
                />
                <textarea
                  placeholder="Write Message"
                  rows={6}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-gray-100 rounded-md px-4 text-sm pt-3 outline-blue-600 focus-within:bg-transparent"
                />
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ background: "#f87171" }}
                  className="w-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16px"
                    height="16px"
                    fill="#fff"
                    className="mr-2 inline"
                    viewBox="0 0 548.244 548.244"
                  >
                    <path
                      fillRule="evenodd"
                      d="M392.19 156.054 211.268 281.667 22.032 218.58C8.823 214.168-.076 201.775 0 187.852c.077-13.923 9.078-26.24 22.338-30.498L506.15 1.549c11.5-3.697 24.123-.663 32.666 7.88 8.542 8.543 11.577 21.165 7.879 32.666L390.89 525.906c-4.258 13.26-16.575 22.261-30.498 22.338-13.923.076-26.316-8.823-30.728-22.032l-63.393-190.153z"
                      clipRule="evenodd"
                      data-original="#000000"
                    />
                  </svg>
                  Send Message
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
