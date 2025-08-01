import { useSelector } from "react-redux";
import { Link } from "react-router";

const Profile = () => {
  const user = useSelector((state) => state.user);

  return (
    <div className="flex flex-col items-center justify-center mt-5">
      <div className="avatar">
        <div className="w-24 rounded-full">
          <img src={user.imageURL} />
        </div>
      </div>

      <p className="text-gray-600 text-xl font-semibold">{user.firstName} {user.lastName}</p>
      <p className="text-gray-600 text-sm font-semibold">{user.age}, {user.gender}</p>
      <p className="text-gray-500 text-xs">{user.bio}</p>

      <div className="flex items-center justify-center mt-2">
        <Link to={'/profile/edit'} role="button" className="btn mx-1">Edit</Link>
        <Link to={'/setting'} role="button" className="btn mx-1">Settings</Link>
      </div>
    </div>
  );
};

export default Profile;
