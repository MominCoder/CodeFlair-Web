import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;
  if (connections.length === 0) return <h1 className="text-center text-2xl mt-6">No connections yet</h1>;

  return (
    <>
      <h1 className="text-center text-2xl text-blue-600">Your connections</h1>
      <div className="flex flex-col items-center">
        {connections.map((connection) => {
          const {_id, firstName, lastName, age, gender, bio, skills, imageURL, } = connection;

          return (
            <div
              key = {_id}
              className = "flex items-center bg-blue-100 max-w-1/2 px-5 py-2 my-3 rounded-xl"
            >
              <figure className="max-w-1/4 mr-5">
                <img src={imageURL} alt={firstName} className="rounded-full" />
              </figure>
              <div>
                <p className="text-md">{firstName} {lastName}</p>
                <p className="text-sm">{age} years, {gender}</p>
                <p className="text-sm">{bio}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Connections;
