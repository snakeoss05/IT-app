import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useUser } from "../context/user";
export default function Login() {
  const [tabs, settabs] = useState(true);
  const { userState, UserLog } = useUser();
  const [alertsuccessmsg, setsuccessmsg] = useState();
  const [alertdangermsg, setdangermsg] = useState();
  const navigate = useNavigate();
  const [logform, setlogform] = useState({
    email: "",
    password: "",
  });
  const [register, setregister] = useState({
    name: "",
    lastname: "",
    profilePicture: null,
    email: "",
    password: "",
  });

  const loginform = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/ath/login",
        logform
      );
      userState(true);
      navigate("/");
      Cookies.set("token", response.data.token);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  async function registerform(e) {
    e.preventDefault();
    const formDataToSend = new FormData();

    formDataToSend.append("name", register.name);
    formDataToSend.append("lastname", register.lastname);
    formDataToSend.append("email", register.email);
    formDataToSend.append("password", register.password);

    if (register.profilePicture) {
      formDataToSend.append("profilePicture", register.profilePicture);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/ath/register",
        formDataToSend
      );
      console.log(response.data);
      setsuccessmsg(response.data);
      const timeoutId = setTimeout(() => {
        setsuccessmsg("");
      }, 3000);

      return () => {
        clearTimeout(timeoutId);
      };
    } catch (error) {
      console.log(error);
      setdangermsg(error.response.data);
      const timeoutId = setTimeout(() => {
        setdangermsg("");
      }, 3000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }
  function HandleChange(event) {
    const { name, value } = event.target;

    setlogform((prevFormdata) => ({
      ...prevFormdata,
      [name]: value,
    }));
    setregister((prevFormdata) => ({
      ...prevFormdata,
      [name]: value,
    }));
  }
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setregister({ ...register, profilePicture: file });
  };
  return (
    <>
      <div className="flex justify-center items-center h-screen flex-col ">
        <div className="container my-auto max-w-md mx-auto xl:max-w-3xl  flex bg-white rounded-lg shadow overflow-hidden">
          <div className="relative hidden xl:block xl:w-1/2 h-full">
            <img
              className="absolute h-full w-full object-cover blur-sm"
              src="../assests/ACTIA-ES-4.jpg"
              alt="actia"
            />
          </div>
          <div className="w-full xl:w-1/2 p-8">
            {tabs ? (
              <form onSubmit={loginform}>
                <h1 className=" text-2xl font-bold">Sign in to your account</h1>

                <div className="mb-4 mt-6">
                  <label
                    className="block text-gray-700 text-sm font-semibold mb-2"
                    htmlFor="email">
                    Email
                  </label>
                  <input
                    className="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10"
                    id="email"
                    type="text"
                    name="email"
                    onChange={HandleChange}
                    value={logform.email}
                    placeholder="Your email address"
                  />
                </div>
                <div className="mb-6 mt-6">
                  <label
                    className="block text-gray-700 text-sm font-semibold mb-2"
                    htmlFor="password">
                    Password
                  </label>
                  <input
                    className="text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline h-10"
                    id="password"
                    type="password"
                    name="password"
                    onChange={HandleChange}
                    value={logform.password}
                    placeholder="Your password"
                  />
                </div>
                <div className="flex w-full mt-8 mb-3">
                  <button
                    className="w-full bg-gray-800 hover:bg-grey-900 text-white text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10"
                    type="submit">
                    Sign in
                  </button>
                </div>
                {alertdangermsg && (
                  <div
                    className={`bg-red-400 text-white p-2 my-2 w-fit text-center mx-auto rounded-xl ${
                      alertdangermsg && "alertfadeup"
                    }`}
                    role="alert">
                    {alertdangermsg}
                  </div>
                )}
                <span
                  className="mt-4 text-gray-500 font-bold border-b"
                  onClick={() => {
                    settabs(!tabs);
                  }}>
                  New Account !
                </span>
              </form>
            ) : (
              <form onSubmit={registerform}>
                <h1 className=" text-2xl font-bold">Create New account</h1>
                <span className="ms-28 text-slate-400"> Select Image</span>
                <div className="text-center my-2">
                  <label>
                    <i class="fa-solid fa-user mx-auto text-4xl border rounded-full py-4 px-5 border-gray-500">
                      <input
                        id="formFileSm"
                        type="file"
                        name="profilePicture"
                        required
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </i>
                  </label>
                </div>
                <div className="mb-4 mt-6">
                  <label
                    className="block text-gray-700 text-sm font-semibold mb-2"
                    htmlFor="email">
                    Name
                  </label>
                  <input
                    className="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10"
                    id="nameR"
                    type="text"
                    name="name"
                    onChange={HandleChange}
                    value={register.name}
                    placeholder="Your name"
                  />
                </div>
                <div className="mb-4 mt-6">
                  <label
                    className="block text-gray-700 text-sm font-semibold mb-2"
                    htmlFor="lastname">
                    Last Name
                  </label>
                  <input
                    className="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10"
                    id="lastnameR"
                    type="text"
                    name="lastname"
                    onChange={HandleChange}
                    value={register.lastname}
                    placeholder="Your lastname"
                  />
                </div>
                <div className="mb-4 mt-6">
                  <label
                    className="block text-gray-700 text-sm font-semibold mb-2"
                    htmlFor="email">
                    Email
                  </label>
                  <input
                    className="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10"
                    id="emailR"
                    type="text"
                    name="email"
                    onChange={HandleChange}
                    value={register.email}
                    placeholder="Your email address"
                  />
                </div>
                <div className="mb-6 mt-6">
                  <label
                    className="block text-gray-700 text-sm font-semibold mb-2"
                    htmlFor="password">
                    Password
                  </label>
                  <input
                    className="text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline h-10"
                    id="passwordR"
                    type="password"
                    name="password"
                    onChange={HandleChange}
                    value={register.password}
                    placeholder="Your password"
                  />
                </div>
                <div className="flex w-full mt-8 mb-3">
                  <button
                    className="w-full bg-gray-800 hover:bg-grey-900 text-white text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10"
                    type="submit">
                    Register
                  </button>
                </div>
                <span
                  className="mt-4 text-gray-500 font-bold border-b"
                  onClick={() => {
                    settabs(!tabs);
                  }}>
                  Already Have Account !
                </span>
                {alertsuccessmsg && (
                  <div
                    className={`bg-green-400 text-white p-2 my-2 w-fit text-center mx-auto rounded-xl ${
                      alertsuccessmsg && "alertfadeup"
                    }`}
                    role="alert">
                    {alertsuccessmsg}
                  </div>
                )}
                {alertdangermsg && (
                  <div
                    className={`bg-red-400 text-white p-2 my-2 w-fit text-center mx-auto rounded-xl ${
                      alertdangermsg && "alertfadeup"
                    }`}
                    role="alert">
                    {alertdangermsg}
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
