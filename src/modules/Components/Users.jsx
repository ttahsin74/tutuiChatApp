import React from "react";
import { FiUsers, FiPlusCircle } from "react-icons/fi";
import FirnedImg from "../../assets/download.jpeg";

const Users = () => {
  return (
    <div className="flex flex-col w-[350px] h-screen overflow-y-auto border-x-2 scrollbar-hide">
      <div className="sticky top-0 bg-white">
        <div className="flex justify-between items-center px-7 py-5">
          <h3 className="text-2xl font-semibold">Users</h3>
          <div className="flex gap-2 text-[#525558]">
            <div className="border-2 text-md p-2 rounded-md">
              <FiUsers />
            </div>
            <div className="border-2 text-md p-2 rounded-md">
              <FiPlusCircle />
            </div>
          </div>
        </div>
        <div className="px-7 py-4 mb-4">
          <form action="">
            <input
              className="border-2 py-2 px-4 w-full rounded-md outline-none"
              type="text"
              placeholder="Search user"
            />
          </form>
        </div>
      </div>
      <div>
        <ul className=" flex flex-col border-b-2">
          <li className="flex px-7 py-3 items-center ">
            <div className="mr-2">
              <picture>
                <img className="w-10 rounded-full" src={FirnedImg} alt="" />
              </picture>
            </div>
            <div>
                <h5 className="font-semibold">Shakira shakira</h5>
                <p className="text-[#807b7b]">Manchester,England</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Users;
