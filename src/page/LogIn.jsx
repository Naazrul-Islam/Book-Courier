import React, { useContext, useState } from "react";
import { FaEye, FaGoogle } from "react-icons/fa";
import { LuEyeClosed } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom"; // ✅ FIXED
import { toast, ToastContainer } from "react-toastify";
import { Auth } from "../auth/AuthContext";

const LogIn = () => {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { signIn, googleSignIn } = useContext(Auth);
  const navigate = useNavigate();

  const handleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  // 🚀 GOOGLE LOGIN
  const handleGoogle = async () => {
    try {
      const result = await googleSignIn();
      const email = result.user.email;

      const response = await fetch(`http://localhost:3000/user-role/${email}`);
      const roleData = await response.json();
      const userRole = roleData?.role?.toLowerCase();

      switch (userRole) {
        case "admin":
          navigate("/dashboard/admin");
          break;
        case "librarian":
          navigate("/dashboard/librarian");
          break;
        default:
          navigate("/dashboard");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // 🚀 EMAIL + PASSWORD LOGIN
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    // -------------------------------
    // ⭐ PASSWORD VALIDATION
    // -------------------------------
    const rules = {
      length: /.{6,}/,
      upper: /[A-Z]/,
      lower: /[a-z]/,
      number: /[0-9]/,
    };

    if (!rules.length.test(password))
      return setError("Password must be at least 6 characters long.");
    if (!rules.upper.test(password))
      return setError("Password must include at least 1 uppercase letter.");
    if (!rules.lower.test(password))
      return setError("Password must include at least 1 lowercase letter.");
    if (!rules.number.test(password))
      return setError("Password must include at least 1 number.");

    setError(""); // clear old error

    try {
      await signIn(email, password);

      const res = await fetch(`http://localhost:3000/user-role/${email}`);
      const data = await res.json();
      const userRole = data.role?.toLowerCase();

      switch (userRole) {
        case "admin":
          navigate("/dashboard/admin");
          break;
        case "librarian":
          navigate("/dashboard/librarian");
          break;
        default:
          navigate("/dashboard");
      }
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  return (
    <>
      <div className="hero bg-base-200 min-h-screen gap-10">
        <div className="hero-content flex-col lg:flex-row-reverse mr-6">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
          </div>

          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mr-10">
            <div className="card-body">
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
                      onClick={handleShowPassword}
                      className="absolute right-7 top-1/2 transform -translate-y-1/2"
                    >
                      {showPassword ? <FaEye /> : <LuEyeClosed />}
                    </button>
                  </div>

                  {/* ERROR MESSAGE */}
                  {error && <p className="text-red-600 mt-2">{error}</p>}

                  <Link
                    to="/auth/forget-password"
                    className="link link-hover text-blue-500"
                  >
                    Forgot password?
                  </Link>

                  <button
                    type="submit"
                    className="btn btn-neutral mt-4 w-full"
                  >
                    Login
                  </button>

                  <p className="mt-2">
                    Don't have an account?
                    <Link
                      to="/auth/register"
                      className="link link-hover text-green-500 ml-2"
                    >
                      SignUp
                    </Link>
                  </p>

                  {/* GOOGLE LOGIN */}
                  <button
                    onClick={handleGoogle}
                    type="button"
                    className="btn btn-neutral w-full mt-2"
                  >
                    <FaGoogle /> Sign In with Google
                  </button>

                  <ToastContainer />
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
