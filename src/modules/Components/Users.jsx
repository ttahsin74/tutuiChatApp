import React from "react";
import { lazy, Suspense } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { FiPlusCircle } from "react-icons/fi";
import FriendRequests from "./FriendRequests";
import Friends from "./Friends";
import UserList from "./UserList";

const Users = () => {
  const navigate = useNavigate();

  const handleUser = () => {
    navigate("/");
  };
  const handleFriend = () => {
    navigate("/friends");
  };
  const handleFriendRequest = () => {
    navigate("/friendRequests");
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-col w-[350px] h-screen overflow-y-auto border-x-2 scrollbar-hide">
        <div className=" bg-white">
          <div className="flex justify-between items-center px-7 py-5">
            <h3 className="text-2xl font-semibold">Users</h3>
            <div className="flex text-[#525558]">
              <div className="border-2 text-md p-2 rounded-md">
                <FiPlusCircle />
              </div>
            </div>
          </div>
          <div className="px-7 py-3 mb-4">
            <form action="">
              <input
                className="border-2 py-2 px-4 w-full rounded-md outline-none"
                type="text"
                placeholder="Search user"
              />
            </form>
          </div>
        </div>
        <div className="flex justify-between border-y-2 px-4 py-2 ">
          <button onClick={handleUser}>Users</button>
          <button onClick={handleFriend}>Friends</button>
          <button onClick={handleFriendRequest}>Friend Requests</button>
        </div>
        <div>
          <Routes>
            <Route path="/userList" element={<UserList />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/" element={<FriendRequests />} />
          </Routes>
        </div>
      </div>
    </Suspense>
  );
};

export default Users;
