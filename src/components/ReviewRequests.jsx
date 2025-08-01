import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "../utils/requestSlice";
import { useEffect } from "react";

const ReviewRequests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const fetchAllRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/request/received", {
        withCredentials: true,
      });

      dispatch(addRequests(res?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };

  const reviewRequest = async (status, id) => {
    try {

      const res = await axios.post(BASE_URL + "/request/review/" + status + '/' + id, {}, {
        withCredentials: true,
      });

      dispatch(removeRequests(id))
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAllRequests();
  }, []);

  if (!requests) return;
  if (requests.length === 0) return <p className="text-center text-xl text-red-700 mt-5">No pending request</p>;

  return (
    <>
      <h1 className="text-center text-2xl text-blue-600">Pending requests</h1>
      <div className="flex flex-col items-center">
        {requests.map((request) => {
          const {
            _id,
            firstName,
            lastName,
            age,
            gender,
            bio,
            imageURL,
          } = request.fromUserId;

          return (
            <div
              key={_id}
              className="flex items-center bg-gray-100 max-w-xl px-5 py-2 my-3 rounded-xl"
            >
              <figure className="max-w-1/4 mr-5">
                <img src={imageURL} alt={firstName} className="rounded-full" />
              </figure>
              <div>
                <p className="text-md">
                  {firstName} {lastName}
                </p>
                <p className="text-sm">
                  {age} years, {gender}
                </p>
                <p className="text-sm">{bio}</p>
              </div>
              <div>
                <button className="btn btn-soft btn-success" onClick={() => reviewRequest('accepted', request._id)}>Accept</button>
                <button className="btn btn-soft btn-error" onClick={() => reviewRequest('rejected', request._id)}>Reject</button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ReviewRequests;
