// import React from "react";
import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue, push, set } from "firebase/database";
import { useSelector } from "react-redux";


const UserList = () => {
  const db = getDatabase();
  const userRef = ref(db, "users/");
  const [users, setUsers] = useState();
  const currentUser = useSelector((state) => state.userLoginInfo.userLoginInfo);

  useEffect(() => {
    onValue(userRef, (snapshot) => {
      let users = [];
      snapshot.forEach((user) => {
        users.push(user.val());
      });
      setUsers(users);
      
    });
  }, []);
  const handleFriendRequest = (id) => {
    const db = getDatabase();
    set(push(ref(db, "friendRequests/")), {
      senderName: currentUser.displayName,
      senderProfilePic: currentUser.photoURL,
      senderId: currentUser.uid,
      receverID: id,
    });
// return (id)
  };


  const [requestData, setRquestData] = useState();
  const friendRequestRef = ref(db, "friendRequests/");
  useEffect(() => {
    onValue(friendRequestRef, (snapshot) => {
      let requests = [];
      snapshot.forEach((request) => {
        requests.push(request.val());
      });
      setRquestData(requests);
    });
  }, []);
console.log(requestData);
console.log(users);
  return (
    <div>
      {users?.map(
        (user) =>
          user.userId !== currentUser.uid && (
            <div key={user.userId}>
              <ul className=" flex flex-col border-b-2">
                <li className="flex px-5 py-3 items-center justify-between">
                  <div className="mr-2">
                    <picture>
                      <img
                        className="w-10 rounded-full"
                        src={user.Profile_pic}
                        alt=""
                      />
                    </picture>
                  </div>
                  <div className="mr-auto">
                    <h5 className="font-semibold capitalize">{user.name}</h5>
                    <p className="text-[#807b7b]">Manchester,England</p>
                  </div>
                  <button
                    className="px-2 py-1 bg-[#349dce] text-white rounded-md text-sm"
                    onClick={() =>
                      handleFriendRequest(
                        user.userId,
                        user.Profile_pic,
                        user.name
                      )
                    }
                  >
                    Add friend
                  </button>
                </li>
              </ul>
            </div>
          )
      )}
    </div>
  );
};

export default UserList;
