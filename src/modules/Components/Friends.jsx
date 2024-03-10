import React from 'react'
import { getDatabase, ref, onValue } from "firebase/database";



const Friends = () => {
  const db = getDatabase();
  const friendsRef = ref(db, "friends/");
  const [friends, setFriend] = useState();

  useEffect(() => {
    onValue(friendsRef, (snapshot) => {
      let users = [];
      snapshot.forEach((friend) => {
        users.push(friend.val());
      });
      setFriend(friends);
      
    });
  }, []);
  return (
    <div>
      {/* {friends?.map((friend)=>(
        
      ))} */}
    </div>
  )
}

export default Friends