// import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { use, useState } from "react";
// import { auth } from "../../Components/Fairbase";
import { FaEye, FaGoogle } from "react-icons/fa";
import { LuEyeClosed } from "react-icons/lu";
import { Link, useLocation, useNavigate } from "react-router";

import { toast, ToastContainer } from "react-toastify";
import { Auth } from "../auth/AuthContext";

const SignUp = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState(""); // store role from select
  const { createUser, googleSignIn } = use(Auth);
  const location = useLocation();
  const navigate = useNavigate();
const handleGoogle = async () => {
  try {
    const result = await googleSignIn();
    const email = result.user.email;
    const name = result.user.displayName;
    const photo = result.user.photoURL;

    // 🔹 ফেচ করে দেখো ইউজার আগে আছে কি না
    let response = await fetch(`http://localhost:3000/user-role/${email}`);
    let roleData = await response.json();

    let userRole = roleData?.role?.toLowerCase();

    // 🔹 যদি ইউজার নতুন হয়, ডিফল্ট রোল 'user' হিসেবে সেট করো
    if (!userRole) {
      userRole = "user"; // default role

      // নতুন ইউজারের রোল ডাটাবেসে পোস্ট করা
      await fetch("http://localhost:3000/user-role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          role: "User", // ucfirst রাখলে nicer
        }),
      });

      // users collection এ ইউজারের info রাখো
      await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          name: name,
          photo: photo,
          role: "User",
        }),
      });
    }

    // 🔹 নেভিগেশন
    navigate("/");
    // switch (userRole) {
    //   case "admin":
    //     navigate("/dashboard/admin");
    //     break;
    //   case "librarian":
    //     navigate("/dashboard/librarian");
    //     break;
    //   default:
    //     navigate("/dashboard");
    // }
  } catch (error) {
    toast.error(error.message);
  }
};



  const handleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const terms = form.terms.checked;
    const name = form.name.value;
    const photo = form.photo.value;
    console.log(email, password, terms, name, photo);

    if (!role) {
      alert("Select a role");
    }

    console.log("Selected Role:", role);

    if (password.length < 6) {
      setError("password must be at least 6 characters");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setError("password must contain at least one uppercase letter");
      return;
    } else if (!/[a-z]/.test(password)) {
      setError("password must contain at least one lowercase letter");
      return;
    }

    setError("");
    setSuccess(false);
    if (!terms) {
      setError("You must agree to the terms and conditions");
      return;
    }

    createUser(email, password)
  .then(async (result) => {
    const user = result.user;

    // 1️⃣ POST to /user-role
    await fetch("http://localhost:3000/user-role", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        role: role,
      }),
    });

    // 2️⃣ POST to /users
    await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        name: name,
        photo: photo,
        role: role,
      }),
    });

    // Reset form & state
    form.reset();
    setRole("");
    setError("");
    setSuccess(true);
    toast.success("User Created Successfully");

    // Navigate
    navigate(location.state ? location.state : "/");
  })
  .catch((error) => {
    console.error(error);
    setError(error.message);
    toast.error(error.message);
  });

  };
  return (
    <>
      <div className="hero bg-base-200 min-h-screen gap-10">
        <div className="hero-content flex-col lg:flex-row-reverse mr-6">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Sign Up!</h1>
            {/* <p className="py-6">Provident cupiditate voluptatem et in.</p> */}
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mr-10">
            <div className="card-body ">
              <form onSubmit={handleSubmit}>
                <fieldset className="fieldset">
                  <label className="label">Email</label>
                  <input
                    type="email"
                    className="input"
                    placeholder="Email"
                    name="email"
                    required
                  />
                  <label className="label">Name</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="name"
                    name="name"
                    required
                  />
                  <label className="label">Photo</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="photo url"
                    name="photo"
                    required
                  />
                  <label className="label">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="input"
                      placeholder="Password"
                      name="password"
                      required
                    />
                    <button
                      size={20}
                      onClick={handleShowPassword}
                      className="absolute right-7 top-1/2 transform -translate-y-1/2"
                    >
                      {showPassword ? <FaEye /> : <LuEyeClosed />}
                    </button>
                  </div>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Role</legend>
                    <select
                      name="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="select"
                    >
                      <option value="" disabled>
                        Role
                      </option>
                      <option value="User">User</option>
                      <option value="Librarian">Librarian</option>
                      <option value="Admin">Admin</option>
                    </select>
                    <span className="label">Optional</span>
                  </fieldset>

                  <div>
                    <input
                      type="checkbox"
                      name="terms"
                      className="checkbox checkbox-neutral"
                    />
                    <label className="label">
                      I agree to the{" "}
                      <a className="link link-hover">terms and conditions</a>
                    </label>
                  </div>
                  <button className="btn btn-neutral mt-4">Sign Up</button>
                  {error && <p className="text-red-600">{error}</p>}
                  {success && (
                    <p className="text-green-600">User Created Successfully</p>
                  )}
                  <p>
                    Already have an account?
                    <Link
                      to={"/auth"}
                      className="link link-hover  text-green-600 ml-2"
                    >
                      Login
                    </Link>
                  </p>
                  <div>
                    <Link>
                      <button
                        onClick={handleGoogle}
                        className="btn btn-neutral w-full"
                      >
                        <FaGoogle />
                        Sign In with Google
                      </button>
                    </Link>
                  </div>
                  <ToastContainer></ToastContainer>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
