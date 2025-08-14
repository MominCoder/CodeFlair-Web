import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from '../utils/feedSlice'
import {BASE_URL} from '../utils/constants'

const UserCard = ({ user }) => {
  const dispatch = useDispatch()
  
  const { _id, firstName, lastName, imageURL, bio, age, gender, skills } = user;
  if (!user) return null;

  const handleRequest = async (status, userID) => {
    try {
      await axios.post(BASE_URL + '/request/send/' + status + '/' + userID, null ,{
        withCredentials: true
      })

      dispatch(removeUserFromFeed(userID))      
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="card bg-base-200 items-stretch shadow-sm mt-7">
      <div className="card-body items-center">
        <div className="avatar">
          <figure className="mask mask-heart w-34">
            <img src={imageURL} alt={firstName} />
          </figure>
        </div>

        <h2 className="card-title">
          {firstName} {lastName}
        </h2>
        {bio && <p>{bio}</p>}
        {age && <p>Age: {age} years</p>}
        {gender && <p>{gender}</p>}
        {skills?.length > 0 && (
          <ul>
            <h3>Pro at:</h3>

            {skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        )}

        <div className="card-actions flex-nowrap justify-center">
          <button className="btn btn-primary" onClick={() => handleRequest('interested', _id)}>Interested</button>
          <button className="btn btn-ghost" onClick={() => handleRequest('ignored', _id)}>Ignore</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
