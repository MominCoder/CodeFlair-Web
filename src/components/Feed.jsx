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

  return feed && (
    <div className="flex items-center justify-center">
      <UserCard user={feed[6]} />
    </div>
  );
};

export default Feed;
