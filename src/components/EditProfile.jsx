import { useDispatch, useSelector } from "react-redux";
import Profile from "./Profile";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const EditProfile = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    age: user.age || "",
    gender: user.gender || "",
    bio: user.bio || "",
  });

  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      const res = await axios.patch(BASE_URL + "/profile/edit", userData, {
        withCredentials: true,
      });

      dispatch(addUser(res.data.data));
      setError(false);
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(true);
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 3000);
      console.log("Error saving profile:", err?.response?.data?.Error);
    }
  };

  if (!user) return;

  return (
    <div className="flex justify-center mt-7">
      {showToast && (
        <div className="toast toast-top toast-center">
          {error ? (
            <div className="alert alert-error">
              <span>Something went wrong</span>
            </div>
          ) : (
            <div className="alert alert-info">
              <span>User updated successfully.</span>
            </div>
          )}
        </div>
      )}
      <div className="mx-5">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend text-xl">Edit Profile</legend>

          <label className="label">First Name</label>
          <input
            type="text"
            name="firstName"
            value={userData.firstName}
            className="input"
            placeholder="First Name"
            onChange={(e) => handleChange(e)}
          />

          <label className="label">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={userData.lastName}
            className="input"
            placeholder="Last Name"
            onChange={(e) => handleChange(e)}
          />

          <label className="label">Age</label>
          <input
            type="number"
            name="age"
            value={userData.age}
            className="input"
            placeholder="Age"
            onChange={(e) => handleChange(e)}
          />

          <label className="label">Gender</label>
          <select
            value={userData.gender}
            name="gender"
            className="select select-sm"
            onChange={(e) => handleChange(e)}
          >
            <option disabled={true}>gender</option>
            <option>male</option>
            <option>female</option>
            <option>others</option>
          </select>

          <label className="label">Bio</label>
          <textarea
            value={userData.bio}
            name="bio"
            className="textarea textarea-ghost"
            placeholder="Bio"
            onChange={(e) => handleChange(e)}
          />

          <button className="btn btn-neutral mt-4" onClick={handleSave}>
            Save
          </button>
        </fieldset>
      </div>
      <Profile />
    </div>
  );
};

export default EditProfile;
