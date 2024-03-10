import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue,set, push } from "firebase/database";
import { useSelector } from "react-redux";

const FriendRequests = () => {
  const currentUser = useSelector((state) => state.userLoginInfo.userLoginInfo);
  // console.log(currentUser);
  const [requestData, setRquestData] = useState();
  const db = getDatabase();
  const friendRequestRef = ref(db, "friendRequests/");
  useEffect(() => {
    onValue(friendRequestRef, (snapshot) => {
      let requests = [];
      // const data = snapshot.val();
      snapshot.forEach((request) => {
        requests.push(request.val());
        // console.log(request.val());
      });
      setRquestData(requests);
    });
  }, []);
  console.log(requestData);
  const handleAcceptRequest = (id, profilePic, name) => {
    const db = getDatabase();
    set(push(ref(db, 'friends/')), {
      friendId : id,
      friendPic : profilePic,
      friendName: name,
    });
  };

  return (
    <div>
      {requestData?.map(
        (requests) =>
          currentUser.uid === requests.receverID && (
            <div key={requests.senderId}>
              <ul className=" flex flex-col border-b-2">
                <li className="flex px-5 py-3 items-center justify-between">
                  <div className="mr-2">
                    <picture>
                      <img
                        className="w-10 rounded-full"
                        src={requests.senderProfilePic}
                        alt=""
                      />
                    </picture>
                  </div>
                  <div className="mr-auto">
                    <h5 className="font-semibold capitalize">
                      {requests.senderName}
                    </h5>
                    <p className="text-[#807b7b]">Manchester,England</p>
                  </div>
                  <button
                    onClick={() =>
                      handleAcceptRequest(
                        requests.senderId,
                        requests.senderProfilePic,
                        requests.senderName
                      )
                    }
                    className="px-2 py-1 bg-[#349dce] text-white rounded-md"
                  >
                    Accept
                  </button>
                </li>
              </ul>
            </div>
          )
      )}
    </div>
  );
};

export default FriendRequests;
