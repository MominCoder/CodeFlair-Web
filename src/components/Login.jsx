import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState("");

  const [isLogin, setIsLogin] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [showError, setShowError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data?.Error || "Something went wrong");
    }
  };

  const handleSignUp = async () => {
    try {      
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, age, emailId, password, gender, bio },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));

      setShowError(false);
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 0);

      return navigate("/profile");
    } catch (err) {
      console.log(err);
      setError(true);
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 0);
    }
  };

  return (
    <div className="my-10">
      {showToast && (
        <div className="toast toast-top toast-center">
          {showError ? (
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
      <div className="card card-side bg-base-100 shadow-sm max-w-3xl mx-auto">
        <figure className="w-1/3">
          <img
            src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
            alt="Movie"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-3xl">
            {isLogin ? "Login" : "Sign up"}
          </h2>

          <div>
            {!isLogin && (
              <>
                <div className="my-3">
                  <label className="input validator">
                    <input
                      type="text"
                      value={firstName}
                      placeholder="First name"
                      required
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </label>
                </div>
                <div className="my-3">
                  <label className="input validator">
                    <input
                      type="text"
                      value={lastName}
                      placeholder="Last name"
                      required
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </label>
                </div>
                <div className="my-3">
                  <label className="input validator">
                    <input
                      type="number"
                      value={age}
                      placeholder="Age"
                      required
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </label>
                </div>
                <div className="my-3">
                  <select
                    value={gender}
                    name="gender"
                    className="select select-sm"
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option>Select gender</option>
                    <option value='male'>male</option>
                    <option value='female'>female</option>
                    <option value='others'>others</option>
                  </select>
                </div>
                <div className="my-3">
                  <label className="input validator">
                    <input
                      type="text"
                      placeholder="About"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                    />
                  </label>
                </div>
              </>
            )}

            <div className="my-3">
              <label className="input validator">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </g>
                </svg>
                <input
                  type="email"
                  value={emailId}
                  required
                  placeholder="Email"
                  onChange={(e) => setEmailId(e.target.value)}
                />
              </label>
              {/* <div className="validator-hint hidden">{error}</div> */}
            </div>

            <div className="my-3">
              <label className="input validator">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                    <circle
                      cx="16.5"
                      cy="7.5"
                      r=".5"
                      fill="currentColor"
                    ></circle>
                  </g>
                </svg>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Password"
                  title="Must be minimum 8 characters, including number, lowercase letter, uppercase letter and symbol"
                />
              </label>
              <div className="text-red-700 text-sm mt-1.5">{error}</div>
            </div>
          </div>

          <div className="card-actions flex flex-col">
            <button
              className="btn btn-primary"
              onClick={isLogin ? handleLogin : handleSignUp}
            >
              {isLogin ? "Login" : "Sign up"}
            </button>

            {isLogin ? (
              <p>
                Create a new account, <b className="cursor-pointer" onClick={() => setIsLogin(false)}>Sign up</b>
              </p>
            ) : (
              <p>
                Already a user, <b className="cursor-pointer" onClick={() => setIsLogin(true)}>Login</b>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
