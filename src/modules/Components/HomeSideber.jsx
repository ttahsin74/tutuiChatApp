import { Suspense, lazy } from "react";
import React, { useEffect, useState } from "react";
import { BiMessageRoundedDetail } from "react-icons/bi";
import {
  FiMessageCircle,
  FiUser,
  FiStar,
  FiArchive,
  FiMoon,
} from "react-icons/fi";
import { MdOutlineEdit } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { TiEdit } from "react-icons/ti";
import { MdPhotoCamera } from "react-icons/md";

import { getAuth, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addLoginUserInfo } from "../../features/user/userSlice";
import { getDatabase, ref, onValue } from "firebase/database";

const HomeSideber = () => {
  const [profileMenu, setProfileMenu] = useState();
  const navigate = useNavigate();
  const [logout, setLogout] = useState();
  const [editPrifile, setEditProfile] = useState();
  const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useDispatch();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const handleSureLogout = () => {
    const auth = getAuth();

    signOut(auth).then(() => {
      localStorage.removeItem("userInfo");
      dispatch(addLoginUserInfo(null));
      navigate("/login");
    });
    // .catch((error) => {
    //   // An error happened.
    // });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };
  const handleUpload = () => {
    setSelectedImage(false);
  };
  const handleItemEdit = (item) => {
    console.log(item);
  };
  // const [usersData, setUsersData] = useState();

  // const db = getDatabase();
  // const userRef = ref(db, "users/");
  // useEffect(() => {
  //   const user = [];
  //   onValue(userRef, (snapshot) => {

  //     snapshot.forEach((user)=>{
  //       user.push(user.val());
  //     })
  //     setUsersData(push(user.val()))
  //   });
  // },[]);
  // console.log(usersData);
  const db = getDatabase();
  const userRef = ref(db, "users/");
  const [users, setUsers] = useState();
  useEffect(() => {
    onValue(userRef, (snapshot) => {
      let users = [];
      const data = snapshot.val();
      snapshot.forEach((user) => {
        users.push(user.val());
      });
      setUsers(users);
    });
  }, []);
  return (
    <>
      <div className="w-[100px]">
        <ul className="flex flex-col items-center gap-9  h-screen min-h-[500px] bg-[#fefe]">
          <li>
            <Link className="text-[90px] text-[#0A80FF] hover:text-[#0A80FF] duration-300">
              <BiMessageRoundedDetail className="py-5 " />
            </Link>
          </li>
          <li>
            <Link to="/" className="text-2xl hover:text-[#0A80FF] duration-300">
              <FiMessageCircle />
            </Link>
          </li>
          <li>
            <Link
              to="/users"
              className="text-2xl hover:text-[#0A80FF] duration-300"
            >
              <FiUser />
            </Link>
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
                  src=""
                  alt="Profile Picture"
                />
              </div>
              {profileMenu && (
                <div
                  className={`flex flex-col w-[150px] absolute top-[-140px] left-4 bg-[#e4e4e4] rounded-lg`}
                >
                  <button
                    onClick={() => {
                      setEditProfile(!editPrifile);
                      setProfileMenu(false);
                    }}
                    className="py-2"
                  >
                    Edit profile
                  </button>
                  <button className="py-2">Profile</button>
                  <button className="py-2">Setting</button>
                  <button onClick={() => setLogout(!logout)} className="py-2">
                    Logout
                  </button>
                </div>
              )}
            </div>
          </li>
        </ul>
      </div>
      {editPrifile && (
        <div
          className={`flex fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.26)] justify-center items-center`}
        >
          <div
            className={`flex flex-col gap-2 text-center bg-[#e4e4e4] w-[500px] rounded-lg`}
          >
            <div className="flex bg-[#0A80FF] p-5 items-center justify-between">
              <div className="flex items-center gap-3 text-xl text-white">
                <MdOutlineEdit className="" />
                <h3 className="font-semibold ">Edit your profile</h3>
              </div>
              <div
                className="text-md p-[5px] bg-[#419DFF] rounded-full text-white cursor-pointer"
                onClick={() => setEditProfile(!editPrifile)}
              >
                <RxCross2 />
              </div>
            </div>
            <div className="flex flex-col gap-3 p-5">
              <div className="relative m-auto w-32">
                <img className="rounded-full" src={userInfo.photoURL} />
                <div className="absolute lg:bottom-1 lg:right-0 w-9 h-9 rounded-full overflow-hidden z-10">
                  <input
                    onChange={handleImageChange}
                    className="opacity-0"
                    type="file"
                    accept="image/*"
                  />
                  <MdPhotoCamera className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[50px] bg-slate-300 p-[14px] -z-10" />
                </div>
              </div>
              <div>
                <p className="capitalize text-3xl font-bold tracking-[3px]">
                  {userInfo.displayName}
                </p>
              </div>
              <div className="flex justify-between items-center border-2 border-[#c7bcbc] p-2">
                <div>
                  <p className="font-bold">
                    Name :{" "}
                    <span className="font-normal capitalize">
                      {userInfo.displayName}
                    </span>
                  </p>
                </div>
                <div
                  onClick={() => handleItemEdit("name")}
                  name={"emailEdit"}
                  className=" cursor-pointer flex items-center gap-2 hover:bg-[#838181] p-1 rounded-lg hover:text-white duration-500"
                >
                  <p className="">Edit</p>
                  <TiEdit />
                </div>
              </div>
              <div className="flex justify-between items-center border-2 border-[#c7bcbc] p-2">
                <div>
                  <p className="font-bold">
                    Email :{" "}
                    <span className="font-normal">{userInfo.email}</span>
                  </p>
                </div>
                <div
                  onClick={() => handleItemEdit("email")}
                  className=" cursor-pointer flex items-center gap-2 hover:bg-[#838181] p-1 rounded-lg hover:text-white duration-500"
                >
                  <p className="">Edit</p>
                  <TiEdit />
                </div>
              </div>
              <div className="flex justify-between items-center border-2 border-[#c7bcbc] p-2">
                <div>
                  <p className="font-bold">
                    Phone number :{" "}
                    <span className="font-normal">{userInfo.email}</span>
                  </p>
                </div>
                <div
                  onClick={() => handleItemEdit("number")}
                  className=" cursor-pointer flex items-center gap-2 hover:bg-[#838181] p-1 rounded-lg hover:text-white duration-500"
                >
                  <p className="">Edit</p>
                  <TiEdit />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedImage && (
        <div className="flex fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.26)] justify-center items-center">
          <div className="w-[250px]">
            <div className="py-4 bg-[#0A80FF]">
              <h2 className="text-center text-2xl font-semibold text-white">
                Upload your picture
              </h2>
            </div>
            <div className="bg-[#817474] flex gap-1">
              <img
                src={URL.createObjectURL(selectedImage)}
                className="w-[150px]"
              />
              <div className="flex flex-col justify-end gap-5">
                <button
                  className="text-white px-5 py-3 rounded-lg bg-red-600"
                  onClick={() => setSelectedImage(false)}
                >
                  Cencel
                </button>
                <button
                  className="text-white px-5 py-3 rounded-lg bg-green-600"
                  onClick={handleUpload}
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {logout && (
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
              <button
                onClick={() => setLogout(false)}
                className="px-6 py-1 bg-[#3cb82c] rounded-lg"
              >
                No
              </button>
              <button
                onClick={handleSureLogout}
                className="px-6 py-1 bg-[#ff3939] rounded-lg"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HomeSideber;
