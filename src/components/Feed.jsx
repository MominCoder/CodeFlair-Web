import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((state) => state.feed);   
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      if (feed) return;

      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });

      if (res.status === 200) {
        dispatch(addFeed(res.data));
      }
    } catch (err) {
      console.error("Error fetching feed:", err);
    }
  };
  
  useEffect(() => {
    getFeed();
  }, []);

  if(!feed) return;
  if(feed.length <= 0) return (
    <>
    <h1 className="text-center text-3xl mt-6 mb-1">That's it!</h1>
    <h2 className="text-center text-lg">No new users</h2>
    </>
  )

  return feed && (
    <div className="flex justify-center">
      <UserCard user={feed[0]}/>
    </div>
  );
};

export default Feed;
