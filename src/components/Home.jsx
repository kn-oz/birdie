import React, { useState, useContext, useEffect, useRef } from "react";
import TwitterLogo from "../assets/twitter.jpg";
import TwitterBlueLogo from "../assets/twitter-blue.svg";
import { UserIcon, LockClosedIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

const Home = () => {
  const [state, setState] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  let navigate = useNavigate();
  let signupRef = useRef(0);

  const { currentUser, setCurrentUser } = useContext(UserContext);

  const login = () => {
    let allUser = JSON.parse(localStorage.getItem("allUsers"));
    if (allUser) {
      let user = allUser.find((user) => user.username === username);
      if (user) {
        if (user.password === password) {
          navigate("/dashboard");
          setCurrentUser(user);
          return alert("login sucessful");
        } else {
          return alert("Password incorrect");
        }
      } else {
        return alert(`No user with username ${username}`);
      }
    } else {
      return alert(`There is No User in Database`);
    }
  };

  const signup = () => {
    let allUser = JSON.parse(localStorage.getItem("allUsers"));
    if (allUser) {
      let user = allUser.find((user) => user.username == username);
      if (user) {
        return alert("This username is already taken");
      }
      if (password.length >= 8 && password === confirmPassword) {
        let userObj = {
          username: username,
          password: password,
        };
        let posts = [];
        allUser.push(userObj);
        localStorage.setItem("allUsers", JSON.stringify(allUser));
        localStorage.setItem("posts", JSON.stringify(posts));
        signupRef.current.click();
        return alert("Congratulations, your account has been successfully created.");
      } else {
        alert("Password don't match or Password is weak");
      }
    } else {
      if (password.length >= 8 && password === confirmPassword) {
        let userObj = {
          username: username,
          password: password,
        };
        let posts = [];
        localStorage.setItem("allUsers", JSON.stringify([userObj]));
        localStorage.setItem("posts", JSON.stringify(posts));
        return alert("register successfully");
      } else {
        alert("password don't match or password is weak");
      }
    }
  };

  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard", { replace: true });
    }
  }, []);

  return (
    <div className="h-screen flex">
      <div className="hidden md:flex w-full lg:w-1/2 bg-[url('src/assets/bg.png')] justify-around items-center">
        <div className="bg-black opacity-20 inset-0 z-0"></div>
        <div className="flex w-full mx-auto px-20 flex-col items-center space-y-6">
          <img src={TwitterLogo} alt="logo" className="max-w-[380px]" />
        </div>
      </div>
      <div className="flex flex-col w-full lg:w-1/2 items-center bg-black">
        <div className="w-full flex flex-col justify-start items-start px-9">
          <img src={TwitterBlueLogo} alt="twitterlogo" className="h-12 mt-12" />
          <h1 className="text-white font-bold text-6xl w-full my-6">
            Happening now
          </h1>
          <p className="text-3xl font-normal text-[#d9d9d9] mb-8 w-full">
            Join Twitter today.
          </p>
        </div>
        <div className="w-full px-8 lg:px-24 mb-24 mt-12">
          <div className="flex items-center border-2 mb-6 py-2 px-3 rounded-2xl">
            <div>
              <UserIcon className="text-[#d9d9d9] h-5" />
            </div>
            <input
              value={username}
              className="pl-2 w-full outline-none border-none bg-black text-[#d9d9d9] placeholder-gray-500"
              type="text"
              name="username"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex items-center border-2 mb-6 py-2 px-3 rounded-2xl">
            <div>
              <LockClosedIcon className="text-[#d9d9d9] h-5" />
            </div>
            <input
              value={password}
              className="pl-2 w-full outline-none bg-black border-none text-[#d9d9d9]  placeholder-gray-500"
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {state && (
            <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl placeholder-gray-500">
              <div>
                <LockClosedIcon className="text-[#d9d9d9] h-5" />
              </div>
              <input
                value={confirmPassword}
                className="pl-2 w-full outline-none border-none bg-black text-[#d9d9d9]"
                type="password"
                name="confirm password"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          )}
          {state ? (
            <button
              type="submit"
              className="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
              onClick={signup}
            >
              Sign up
            </button>
          ) : (
            <button
              type="submit"
              className="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
              onClick={login}
            >
              Login
            </button>
          )}
          <div className="flex justify-between mt-4">
            <div className="flex justify-center items-center text-[#d9d9d9]">
              {state ? (
                <p>Have an account already? </p>
              ) : (
                <p>Don't have an account yet?</p>
              )}
              <button
                ref={signupRef}
                className="text-sm text-blue-500 cursor-pointer ml-2"
                onClick={() => setState((oldvalue) => !oldvalue)}
              >
                {state ? "Log in" : "Sign up"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
