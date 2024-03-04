import { lazy, Suspense } from "react";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";
import HomeSideber from "./HomeSideber";
import Chats from "./Chats";
import Users from "./Users";

const Home = () => {
  const data = useSelector((state) => state.userLoginInfo.userLoginInfo);
  const navigate = useNavigate();
  useEffect(() => {
    if (!data) {
      navigate("/login");
    }
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <section>
        <div className="flex">
          <HomeSideber />
          <div>
            <Routes>
              <Route path="/" element={<Chats />} />
              <Route path="/users" element={<Users />} />
            </Routes>
          </div>
        </div>
      </section>
    </Suspense>
  );
};

export default Home;
