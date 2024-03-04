import React, { useEffect, useState } from "react";
import { FiUsers, FiPlusCircle } from "react-icons/fi";
import FirnedImg from "../../assets/download.jpeg";
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from "react-redux";

const Users = ({}) => {
  const db = getDatabase();
  const userRef = ref(db, "users/");
  const [users, setUsers] = useState();
  const currentUser = useSelector((state) => state.userLoginInfo.userLoginInfo);
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
    <div className="flex flex-col w-[350px] h-screen overflow-y-auto border-x-2 scrollbar-hide">
      <div className="sticky -z-30 top-0 bg-white">
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
      {users?.map(
        (user) =>
          user.userId !== currentUser.uid && (
            <div>
              <ul className=" flex flex-col border-b-2">
                <li className="flex px-5 py-3 items-center justify-between">
                  <div className="mr-2">
                    <picture>
                      <img
                        className="w-10 rounded-full"
                        src={FirnedImg}
                        alt=""
                      />
                    </picture>
                  </div>
                  <div className="mr-auto">
                    <h5 className="font-semibold capitalize">{user.name}</h5>
                    <p className="text-[#807b7b]">Manchester,England</p>
                  </div>
                    <button className="px-2 py-1 bg-[#349dce] text-white rounded-md">Add friend</button>
                </li>
              </ul>
            </div>
          )
      )}
    </div>
  );
};

export default Users;
