import React, { useState, useEffect, use } from "react";


import { useLocation } from "react-router";

import { toast, ToastContainer } from "react-toastify";

import { Auth } from "../auth/AuthContext";

const ForgetPassword = () => {
  const { ForgetPassword, user } = use(Auth);
  const location = useLocation();
 
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location.state]);

  const handleReset = (e) => {
    e.preventDefault();
    const email = e.target.email.value; 
    ForgetPassword(email)
      .then(() => {
        toast.success("Password reset link sent! Check your Gmail.");
        setTimeout(() => {
          window.location.href = "https://mail.google.com";
        }, 2000);
      })
      .catch((error) => {
        // console.error(error);
        toast.error(error.message);
      });
  };

  return (
    <>
      {/* <Navber></Navber> */}
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col">
        <h1 className="text-4xl font-bold mb-4">Reset Password</h1>
        <form onSubmit={handleReset} className="card bg-base-100 shadow-xl p-6">
          <label className="label">Email</label>
          <input
            type="email"
            value={email}
            defaultValue={user?.email}
            readOnly
           name="email"
           onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full mb-4"
            placeholder="Enter your email"
          />
          <button type="submit" className="btn btn-neutral w-full">Reset Password</button>
        </form>
        <ToastContainer />
      </div>
    </div>
    {/* <Footer></Footer> */}
    </>
  );
};

export default ForgetPassword;
