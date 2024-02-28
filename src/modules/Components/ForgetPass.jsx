import React, { useEffect, useState } from "react";
import { TfiEmail } from "react-icons/tfi";

import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useSelector } from "react-redux";

const ForgetPass = () => {
  const [input, setInput] = useState({ email: "" });

  const [error, setError] = useState({
    emailError: "Email is required",
  });
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((oldData) => ({
      ...oldData,
      [name]: value,
    }));
    if (name === "email") {
      let emailVal =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (!value.match(emailVal)) {
        setError((oldError) => ({
          ...oldError,
          emailError: "This is not a valid Email",
        }));
      } else {
        setError((oldError) => ({
          ...oldError,
          emailError: "",
        }));
      }
    }
  };
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((oldTouched) => ({
      ...oldTouched,
      [name]: true,
    }));
  };
  const handleOtp = (e) => {
    e.preventDefault();
    setTouched({
      email: true,
      password: true,
    });
    let emailVal =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!input.email) {
      setError((oldError) => ({ ...oldError, emailError: "Write your Email" }));
    } else if (!input.email.match(emailVal)) {
      setError((oldError) => ({
        ...oldError,
        emailError: "This is not a valid Email",
      }));
    } else {
      setError((oldError) => ({
        ...oldError,
        emailError: "",
      }));
    }
    if (!error.emailError) {
      const auth = getAuth();
      sendPasswordResetEmail(auth, input.email)
        .then(() => {
          toast.success("Send OTP in your email", {
            position: "bottom-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          console.log(errorCode);
          if (errorCode === "") {
            
          }
        });
    } else {
      toast.error("Email is not correct", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const data = useSelector((state) => state.userLoginInfo.userLoginInfo)
  useEffect(()=>{
    if (data) {
      navigate("/home_page")
    }
  },[])
  return (
    <section>
      <div className="before:content-[''] before:absolute before:w-1/2 before:top-0 before:left-0 before:min-h-screen custom-bg before:rounded-tr-full before:rounded-br-full before:-z-10 ">
        <div className=" m-auto py-10">
          <div className="flex items-center justify-center sm:px-0 px-6">
            <div className="xl:w-1/2 lg:w-[700px] sm:w-[600px] w-full bg-white custom-login-box">
              <div className="xm:px-[90px] sm:py-[100px] px-5 py-10">
                <div className="text-center">
                  <h2 className="text-[25px] text-[#ff0000] font-extrabold mb-4">
                    LOL CHAT
                  </h2>
                  <h5 className="text-[#4d4949d7] mb-7 text-2xl font-bold">
                    Recover you password
                  </h5>
                </div>
                <div>
                  <form action="">
                    <div className="relative pb-8 ">
                      <input
                        type="email"
                        placeholder="Email Address"
                        className="block w-full outline-none border-2 border-[#d9d9d9] py-3 rounded-3xl pl-4 pr-10"
                        value={input.email}
                        name="email"
                        onChange={handleInput}
                        onBlur={handleBlur}
                      />
                      <TfiEmail className="text-[18px] absolute top-4 right-4 text-[#757575]" />
                      {touched.email && error.emailError && (
                        <div className="text-[#ff0000] text-[13px] absolute bottom-3 left-3">
                          <p>{error.emailError}</p>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={handleOtp}
                      className="w-full bg-[#ff0000] text-white text-center py-3 rounded-3xl font-bold"
                    >
                      SEND OTP
                    </button>
                    <ToastContainer />
                  </form>
                  <div className="flex flex-col items-center">
                    <div className="text-center text-[#4d4949d7] mt-5 font-bold">
                      <p>
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-[#EA6C00]">
                          Register here
                        </Link>
                      </p>
                    </div>
                    <p className="text-lg font-bold text-[#4d4949d7] ">or</p>
                    <div className="text-center text-[#4d4949d7] font-bold">
                      <p>
                        Already have an account?{" "}
                        <Link to="/login" className="text-[#EA6C00]">
                          Login here
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgetPass;
