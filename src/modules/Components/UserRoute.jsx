import React from "react";
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Users from "./Users";
import UserList from "./UserList";
import Friends from "./Friends";
import FriendRequests from "./FriendRequests";

const UserRoute = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <Users/>
        <div>
          <Routes>
            <Route path="/" element={<UserList/>} />
            <Route path="/friends" element={<Friends/>} />
            <Route path="/friendRequests" element={<FriendRequests/>} />
          </Routes>
        </div>
      </div>
    </Suspense>
  );
};

export default UserRoute;
