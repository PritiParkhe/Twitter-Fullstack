import React, { useState } from "react";
import { FaXTwitter } from "react-icons/fa6";
import AllApiUrls from "../utils/constants";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser } from "../store/userSlice";

const Login = () => {
  const [isLogin, setLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isLogin ? AllApiUrls.login.Url : AllApiUrls.signUp.Url;
    const method = isLogin ? AllApiUrls.login.method : AllApiUrls.signUp.method;

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
        withCredentials: true,
      });

      const data = await response.json();

      if (response.ok) {
        dispatch(getUser(data.user));
        toast.success(data.message);

        if (isLogin) {
          navigate("/");
        } else {
          setLogin(true); // Switch to login view after successful signup
        }
      } else {
        toast.error(data.message || "Something went wrong!");
      }
    } catch (error) {
      toast.error(
        `Failed to ${isLogin ? "login" : "signup"}: ${error.message}`
      );
      console.error("Error:", error);
    }
  };

  const loginSignupHandler = () => {
    setLogin(!isLogin);
  };

  return (
    <div className="relative w-screen h-screen flex items-center justify-center">
      <div className="absolute top-20 left-10 lg:hidden">
        <FaXTwitter size="70px" style={{ fontWeight: "lighter" }} />
      </div>
      <div className="flex items-center justify-evenly lg:w-[80%]">
        <div className="hidden lg:block">
          <FaXTwitter size="350px" style={{ fontWeight: "lighter" }} />
        </div>

        <div>
          <div className="my-5">
            <h1 className="font-bold text-3xl lg:text-6xl">Happening now</h1>
          </div>
          <label className="mt-4 mb-4 text-2xl font-bold">
            {isLogin ? "Login" : "Signup"}
          </label>
          <form onSubmit={handleSubmit} className="flex flex-col w-[55%]">
            {!isLogin && (
              <>
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="outline-blue-500 border border-gray-800 px-3 py-2 my-1 font-semibold rounded-full "
                />
                <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="outline-blue-500 border border-gray-800 px-3 py-2 my-1 font-semibold rounded-full"
                />
              </>
            )}
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="outline-blue-500 border border-gray-800 px-3 py-2 my-1 font-semibold rounded-full"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="outline-blue-500 border border-gray-800 px-3 py-2 my-1 font-semibold rounded-full"
              autoComplete=""
            />
            <button className="bg-[#1D9BF0] border-none py-2 my-4 rounded-full text-lg text-white">
              {isLogin ? "Login" : "Create Account"}
            </button>
            <h1>
              {isLogin
                ? "Do not have an account? "
                : "Already have an account? "}
              <span
                onClick={loginSignupHandler}
                className="font-bold text-blue-400 cursor-pointer"
              >
                {isLogin ? "Signup" : "Login"}
              </span>
            </h1>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
