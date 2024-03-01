import React, { useEffect, useState } from "react";
import { BiMessageRoundedDetail } from "react-icons/bi";
import {
  FiMessageCircle,
  FiUser,
  FiStar,
  FiArchive,
  FiMoon,
} from "react-icons/fi";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch} from 'react-redux';
import { addLoginUserInfo } from "../../features/user/userSlice";

const HomeSideber = () => {
  const [profileMenu, setProfileMenu] = useState();
  const navigate = useNavigate();
  const [logout, setLogout] = useState();
  const dispatch = useDispatch()
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const handleSureLogout = () => {
    const auth = getAuth();

    signOut(auth)
    .then(() => {
      localStorage.removeItem("userInfo");
      dispatch(addLoginUserInfo(null))
      navigate("/login")
      })
      // .catch((error) => {
      //   // An error happened.
      // });
    };

  return (
    <div className="w-[100px] border-r-2">
      <ul className="flex flex-col items-center gap-9  h-screen min-h-[500px] bg-[#fefe]">
        <li>
          <a href="" className="text-[90px] text-[#0A80FF] hover:text-[#0A80FF] duration-300">
            <BiMessageRoundedDetail className="py-5 " />
          </a>
        </li>
        <li>
          <a href="" className="text-2xl hover:text-[#0A80FF] duration-300">
            <FiMessageCircle />
          </a>
        </li>
        <li>
          <a href="" className="text-2xl hover:text-[#0A80FF] duration-300">
            <FiUser />
          </a>
        </li>
        <li>
          <a href="" className="text-2xl hover:text-[#0A80FF] duration-300">
            <FiStar />
          </a>
        </li>
        <li>
          <a href="" className="text-2xl hover:text-[#0A80FF] duration-300">
            <FiArchive />
          </a>
        </li>
        <li className="mt-auto">
          <a href="" className="text-2xl hover:text-[#0A80FF] duration-300">
            <FiMoon />
          </a>
        </li>
        <li>
          <div className="relative p-4 m-3">
            <div className="">
                <img
                  onClick={() => setProfileMenu(!profileMenu)}
                  className="rounded-full"
                  src={userInfo.photoURL}
                  alt="Profile Picture"
                />
            </div>
            {profileMenu && (
              <div
                className={`flex flex-col w-[150px] absolute top-[-140px] left-4 bg-[#e4e4e4] rounded-lg`}
              >
                <button className="py-2">Edit profile</button>
                <button className="py-2">Profile</button>
                <button className="py-2">Setting</button>
                <button onClick={() => setLogout(!logout)} className="py-2">
                  Logout
                </button>
              </div>
            )}
          </div>
          {logout  && (
            <div
              className={`flex fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.26)] justify-center items-center`}
            >
              <div
                className={`flex flex-col gap-2 text-center bg-[#e4e4e4] w-[300px] rounded-lg`}
              >
                <div className="mt-5">
                  <p className="font-bold">Sure? Are you went to Log Out?</p>
                </div>
                <div className="flex justify-evenly my-5 font-semibold text-[#fff]">
                  <button onClick={()=>setLogout(false)} className="px-6 py-1 bg-[#3cb82c] rounded-lg">
                    No
                  </button>
                  <button onClick={handleSureLogout} className="px-6 py-1 bg-[#ff3939] rounded-lg">
                    Yes
                  </button>
                </div>
              </div>
            </div>
          )}
        </li>
      </ul>
    </div>
  );
};

export default HomeSideber;
