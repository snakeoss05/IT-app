import React, { useEffect, useState } from "react";
import axios from "axios";
export default function Account() {
  const [image, setImage] = useState(null);
  const [register, setregister] = useState({
    name: "",
    lastname: "",
    profilePicture: null,
    email: "",
    password: "",
    role: "",
  });
  const [alertsuccessmsg, setsuccessmsg] = useState();
  const [alertdangermsg, setdangermsg] = useState();
  const [AdminList, setAdminList] = useState([]);
  function HandleChange(event) {
    const { name, value } = event.target;
    setregister((prevFormdata) => ({
      ...prevFormdata,
      [name]: value,
    }));
  }
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setregister({ ...register, profilePicture: file });
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  async function registerform(e) {
    e.preventDefault();
    const formDataToSend = new FormData();

    formDataToSend.append("name", register.name);
    formDataToSend.append("lastname", register.lastname);
    formDataToSend.append("email", register.email);
    formDataToSend.append("password", register.password);
    formDataToSend.append("role", register.role);

    if (register.profilePicture) {
      formDataToSend.append("profilePicture", register.profilePicture);
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/ath/register",
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
  useEffect(() => {
    async function getAdminList() {
      axios.get("http://localhost:8000/api/ath/admin").then((response) => {
        setAdminList(response.data);
      });
    }
    getAdminList();
  }, []);
  return (
    <div className="container shadow ">
      <div className="flex items-center justify-center flex-col">
        <h2>Add New Account</h2>

        <div className=" bg-slate-100 rounded-lg p-10 border border-gray-300">
          <form onSubmit={registerform}>
            <div className="text-center mb-2">
              <div className="mx-auto font-semibold mb-2">Add Your Photo</div>
              {image ? (
                <img
                  src={image}
                  alt="profileimg"
                  className="rounded-full h-20 w-20 mx-auto shadow "
                />
              ) : (
                <label>
                  <i className="fa-solid fa-user mx-auto text-4xl border rounded-full py-4 px-5 border-gray-300 shadow">
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
              )}
            </div>
            <div className="flex flex-row ">
              <div className="flex flex-col gap-2">
                <label className="text-lg ms-1 font-medium text-gray-500">
                  Name
                </label>
                <input
                  className="col-12 border rounded-lg text-lg px-2 py-1 focus:outline-slate-300"
                  type="text"
                  name="name"
                  value={register.name}
                  onChange={HandleChange}
                  placeholder="Ahmed"
                />
              </div>
              <div className="flex flex-col gap-2 mx-4">
                <label className="text-lg ms-1 font-medium text-gray-500">
                  Last Name
                </label>
                <input
                  className="col-12 border rounded-lg text-lg px-2 py-1 focus:outline-slate-300"
                  type="text"
                  name="lastname"
                  value={register.lastname}
                  onChange={HandleChange}
                  placeholder="Maghraoui"
                />
              </div>
            </div>
            <div className="flex flex-row mt-5">
              <div className="flex flex-col gap-2">
                <label className="text-lg ms-1 font-medium text-gray-500">
                  Email
                </label>
                <input
                  className="col-12 border rounded-lg text-lg px-2 py-1 focus:outline-slate-300"
                  type="email"
                  name="email"
                  value={register.email}
                  onChange={HandleChange}
                  placeholder="example@example.com"
                />
              </div>
              <div className="flex flex-col gap-2 mx-4">
                <label className="text-lg ms-1 font-medium text-gray-500">
                  Password
                </label>
                <input
                  className="col-12 border rounded-lg text-lg px-2 py-1 focus:outline-slate-300"
                  type="password"
                  name="password"
                  value={register.password}
                  onChange={HandleChange}
                  placeholder="***********"
                />
              </div>
            </div>
            <div className="flex flex-row mt-5">
              <div className="flex flex-col gap-2">
                <label className="text-lg ms-1 font-medium text-gray-500">
                  Role
                </label>
                <select
                  className="col-12 border rounded-lg text-lg px-2 py-1 focus:outline-slate-300"
                  name="role"
                  value={register.role}
                  onChange={HandleChange}>
                  <option>Choose one</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
              <div className="ms-auto pt-8 pe-5">
                <button
                  className="border font-semibold hover:bg-slate-400 border-slate-400 text-gray-500 rounded-xl p-2 shadow"
                  type="submit">
                  Submit
                </button>
              </div>
            </div>
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
        </div>
      </div>
      <div className="projects p-20 bg-white rad-10 m-20">
        <h2 className="mt-0 mb-20">Admin List</h2>
        <div className="responsive-table">
          <table className="fs-15 w-full">
            <thead>
              <tr>
                <td>Photo</td>
                <td>Name</td>
                <td>LastName</td>
                <td>Email</td>
                <td>Role</td>
              </tr>
            </thead>
            <tbody>
              {AdminList?.map((admin) => {
                return (
                  <tr key={admin._id}>
                    <td>
                      <img
                        src={admin.imageURL}
                        className="m-2 rounded-circle object-fit-contain h-40"
                        alt="photoprofile"
                      />
                    </td>
                    <td>{admin.name}</td>
                    <td>{admin.lastname}</td>
                    <td>{admin.email}</td>
                    <td>{admin.role}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
