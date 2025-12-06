import React, { use, useState } from "react";
import { FaEye, FaGoogle } from "react-icons/fa";
import { LuEyeClosed } from "react-icons/lu";
import { Link, useLocation, useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
// import Navber from "../components/Navber";
// import Footer from "../components/Footer";
import { Auth } from "../auth/AuthContext";

const LogIn = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, googleSignIn } = use(Auth);
  const location = useLocation();
  const navigate = useNavigate();

  const handleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };
  const handleGoogle = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        // console.log(user);
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        // console.error(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const terms = form.terms.checked;
    // console.log(email, password, terms);
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

    signIn(email, password)
      .then((result) => {
        const user = result.user;
        // console.log(user);
        form.reset();
        setError("");
        setSuccess(true);
        toast.success("LogIn Successful");
        navigate(`${location.state ? location.state : "/"}`);
        
      })
      .catch((error) => {
        // console.error(error);
        setError(error.message);
        toast.error(error.message);
      });
  };
  return (
    <>
  
    <div className="hero bg-base-200 min-h-screen gap-10">
      <div className="hero-content flex-col lg:flex-row-reverse mr-6">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
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
                />
                <label className="label">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="input"
                    placeholder="Password"
                    name="password"
                  />
                  <button
                    size={20}
                    onClick={handleShowPassword}
                    className="absolute right-7 top-1/2 transform -translate-y-1/2"
                  >
                    {showPassword ? <FaEye /> : <LuEyeClosed />}
                  </button>
                </div>
                <Link
                  to="/auth/forget-password"
                  className="link link-hover text-blue-500"
                >
                  Forgot password?
                </Link>

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
                <button className="btn btn-neutral mt-4">Login</button>
                {error && <p className="text-red-600">{error}</p>}
                {success && (
                  <p className="text-green-600">LogIn Successfully</p>
                )}
                <p>
                  Don't have an account?
                  <Link
                    to={"/auth/register"}
                    className="link link-hover text-green-500 ml-2"
                  >
                    SignUp
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

export default LogIn;
