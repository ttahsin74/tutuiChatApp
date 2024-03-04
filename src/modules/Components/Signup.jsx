import React, { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaGoogle,
  FaLinkedinIn,
  FaRegUser,
} from "react-icons/fa6";
import { TfiEmail } from "react-icons/tfi";
import { MdLockOutline } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import defaultProfile from "../../../src/assets/default-profile-pic.png";
import { getDatabase, ref, set,push } from "firebase/database";


const Signup = () => {
  const [input, setInput] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState({
    emailError: "Write your Email",
    nameError: "Write your name",
    passwordError: "Write your password",
    termsError: "",
  });
  const [touched, setTouched] = useState({
    email: false,
    name: false,
    password: false,
  });
  const [eye, seteye] = useState();
  const [passIcon, setPassIcon] = useState();
  const [passwordType, setPasswordTyp] = useState();
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();
  const db = getDatabase();

  const handleRememberChange = () => {
    setRemember(!remember);
    if (remember) {
      setError((oldError) => ({
        ...oldError,
        termsError: "accept our theterms of service?",
      }));
    } else {
      setError((oldError) => ({
        ...oldError,
        termsError: "",
      }));
    }
  };
  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((oldData) => ({
      ...oldData,
      [name]: value,
    }));
    if (name === "name") {
      if (!value) {
        setError((oldError) => ({ ...oldError, nameError: "Write your name" }));
      } else {
        setError((oldError) => ({
          ...oldError,
          nameError: "",
        }));
      }
    }
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
    if (name === "password") {
      setPassIcon(true);
      const pass =
        /^(?=.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

      if (!value.match(pass)) {
        setError((oldError) => ({
          ...oldError,
          passwordError: "Weak password (make it stronger)",
        }));
      } else {
        setError((oldError) => ({
          ...oldError,
          passwordError: "",
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

  const eyeHandle = () => {
    seteye(!eye);
    setPasswordTyp(!passwordType);
  };
  const SignupHandle = (e) => {
    e.preventDefault();
    let emailVal =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const pass =
      /^(?=.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
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
    if (!input.name) {
      setError((oldError) => ({ ...oldError, nameError: "Write your name" }));
    } else {
      setError((oldError) => ({
        ...oldError,
        nameError: "",
      }));
    }

    if (!input.password) {
      setError((oldError) => ({
        ...oldError,
        passwordError: "Write your password",
      }));
    } else if (!input.password.match(pass)) {
      setError((oldError) => ({
        ...oldError,
        passwordError: "write more strong password",
      }));
    } else {
      setError((oldError) => ({
        ...oldError,
        passwordError: "",
      }));
    }
    if (!remember) {
      setError((oldError) => ({
        ...oldError,
        termsError: "accept our theterms of service?",
      }));
    }
    if (remember) {
      setError((oldError) => ({
        ...oldError,
        termsError: "",
      }));
    }
    setTouched({
      email: true,
      name: true,
      password: true,
    });
    if (
      !error.emailError &&
      !error.nameError &&
      !error.passwordError &&
      remember
    ) {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, input.email, input.password)
        .then((userCredential) => {
          sendEmailVerification(auth.currentUser).then(() => {
            updateProfile(auth.currentUser, {
              displayName: input.name,
              photoURL: defaultProfile,
            }).then(() => {
              set(push(ref(db, 'users/')), {
                userId : auth.currentUser.uid,
                name: input.name,
                email: input.email,
                Profile_pic : auth.currentUser.photoURL,
                password : input.password,
              });
              toast.success("Varify your Email account", {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });

              const user = userCredential.user;
              setTimeout(() => {
                navigate("/varify_email");
              }, 3000);
            });
          });
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            toast.error("Duplicate Email", {
              position: "bottom-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });

            setError((oldError) => ({
              ...oldError,
              emailError: "Duplicate Email",
            }));
          }
        });    }
  };
  const data = useSelector((state) => state.userLoginInfo.userLoginInfo);
  useEffect(() => {
    if (data) {
      navigate("/home_page");
    }
  }, []);

  return (
    <section>
      <div className="before:content-[''] before:absolute before:w-1/2 before:top-0 before:left-0 before:min-h-screen custom-bg before:rounded-tr-full before:rounded-br-full before:-z-10 ">
        <div className="xl:max-w-[1090px] lg:max-w-[900px] max-w-max m-auto py-10  lg:px-0 sm:px-10 px-3">
          <div className="flex flex-wrap bg-white items-center lg:gap-0 gap-10 custom-login-box">
            <div className="lg:w-1/2 w-full lg:mt-0 mt-8">
              <div className="xl:w-[410px] lg:w-[350px] sm:w-[500px]  m-auto lg:text-left text-center sm:px-0 px-3">
                <h1 className="text-[36px] font-bold mb-[15px]">
                  WELCOME TO <span className="text-[#FF0000]">LOL CHAT</span>
                </h1>
                <p className="text-[#4d4949d7] mb-6 text-lg sm:text-left text-justify">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when
                </p>
                <div className="flex gap-2 lg:justify-start justify-center">
                  <a
                    href="https://www.facebook.com/profile.php?id=100052166626648"
                    className="relative z-30 duration-300 text-[15px] p-5 text-[#0866FF] bg-[#F3F3F3] rounded-full after:content-[''] after:bg-[#0867ff] after:w-full after:h-full after:absolute after:top-0 after:left-0 after:rounded-full after:scale-0 after:duration-300 after:-z-10 hover:after:scale-100 hover:text-white"
                  >
                    <FaFacebookF />
                  </a>
                  <a
                    href=""
                    className="relative z-30 duration-300 text-[15px] p-5 text-[#1DA1F2] bg-[#F3F3F3] rounded-full after:content-[''] after:bg-[#1DA1F2] after:w-full after:h-full after:absolute after:top-0 after:left-0 after:rounded-full after:scale-0 after:duration-300 after:-z-10 hover:after:scale-100 hover:text-white"
                  >
                    <FaTwitter />
                  </a>
                  <a
                    href="https://www.google.com/"
                    className="relative z-30 duration-300 text-[15px] p-5 text-[#DB4437] bg-[#F3F3F3] rounded-full after:content-[''] after:bg-[#DB4437] after:w-full after:h-full after:absolute after:top-0 after:left-0 after:rounded-full after:scale-0 after:duration-300 after:-z-10 hover:after:scale-100 hover:text-white"
                  >
                    <FaGoogle />
                  </a>
                  <a
                    href=""
                    className="relative z-30 duration-300 text-[15px] p-5 text-[#0077B5] bg-[#F3F3F3] rounded-full after:content-[''] after:bg-[#0077B5] after:w-full after:h-full after:absolute after:top-0 after:left-0 after:rounded-full after:scale-0 after:duration-300 after:-z-10 hover:after:scale-100 hover:text-white"
                  >
                    <FaLinkedinIn />
                  </a>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 w-full border-l-2">
              <div className="xl:px-[90px] lg:px-[40px] sm:px-16 px-4 xl:py-[100px] lg:py-10  lg:mb-0 mb-10">
                <div className="text-center">
                  <h2 className="text-[25px] text-[#ff0000] font-extrabold mb-4">
                    LOL CHAT
                  </h2>
                  <h5 className="text-[#4d4949d7] mb-7 text-2xl font-bold">
                    Sigup Into Your Account
                  </h5>
                </div>
                <div>
                  <form action="">
                    <div className="relative pb-8 ">
                      <input
                        type="text"
                        placeholder="Full Name"
                        className="block w-full outline-none border-2 border-[#d9d9d9] py-3 rounded-3xl pl-4 pr-10"
                        value={input.name}
                        name="name"
                        onChange={handleInput}
                        onBlur={handleBlur}
                      />
                      <FaRegUser className="text-[18px] absolute top-[15px] right-4 text-[#757575]" />
                      {touched.name && (
                        <div className="text-[#ff0000] text-[13px] absolute bottom-3 left-3">
                          <p>{error.nameError}</p>
                        </div>
                      )}
                    </div>
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

                    <div className="relative pb-8">
                      <input
                        type={passwordType ? "text" : "password"}
                        placeholder="Password"
                        className="block  w-full outline-none border-2 border-[#d9d9d9] py-3 rounded-3xl pl-4 pr-10"
                        value={input.password}
                        name="password"
                        onChange={handleInput}
                        onBlur={handleBlur}
                      />
                      {passIcon ? (
                        <div onClick={eyeHandle}>
                          {eye ? (
                            <FaEye className="text-[20px] absolute top-[14px] right-4 text-[#757575]" />
                          ) : (
                            <FaEyeSlash className="text-[20px] absolute top-[14px] right-4 text-[#757575]" />
                          )}
                        </div>
                      ) : (
                        <MdLockOutline className="text-[22px] absolute top-[14px] right-4 text-[#757575]" />
                      )}
                      {touched.password && error.passwordError && (
                        <div className="text-[#ff0000] text-[13px] absolute bottom-3 left-3">
                          <p>{error.passwordError}</p>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-1 items-center mb-[25px] relative">
                      <input
                        type="radio"
                        id="remember_radio"
                        checked={remember}
                        onChange={handleRememberChange}
                      />
                      <label
                        htmlFor="remember_radio"
                        className="text-[#4d4949d7]"
                      >
                        I agree to theterms of service
                      </label>
                      <div className="text-[#ff0000] text-[13px] absolute bottom-[-19px] left-3">
                        <p>{error.termsError}</p>
                      </div>
                    </div>
                    <button
                      onClick={SignupHandle}
                      className="w-full font-bold bg-[#ff0000] text-white text-center py-3 rounded-3xl"
                    >
                      REGISTER
                    </button>
                    <div className="loginTostify">
                      <ToastContainer />
                    </div>
                  </form>
                  <div className="text-center text-[#4d4949d7] mt-5 font-bold">
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
    </section>
  );
};

export default Signup;
