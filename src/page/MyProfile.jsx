import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
// import Navber from "../components/Navber";
// import Footer from "../components/Footer";
import { Auth } from "../auth/AuthContext";

const MyProfile = () => {
  const { user, updateUser } = useContext(Auth);
  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateUser({ displayName: name, photoURL: photo });
    Swal.fire({
      icon: "success",
      title: "Profile Updated!",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900/70 to-purple-900/70 text-white">
      {/* <Navber /> */}
      <div className="max-w-lg mx-auto mt-16 bg-white/10 p-8 rounded-2xl backdrop-blur-md shadow-xl">
        <h2 className="text-2xl font-semibold mb-6 text-center text-white">
          My Profile
        </h2>

        <div className="flex flex-col items-center space-y-4">
          <img
            src={photo || "https://i.ibb.co/6gR0T7P/default-avatar.png"}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
          />
          <h3 className="text-xl font-semibold">{name}</h3>
          <p className="text-gray-200">{user?.email}</p>
        </div>

        <form onSubmit={handleUpdate} className="mt-8 space-y-4">
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              value={name}
              defaultValue={user?.displayName}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 rounded-md text-black bg-white"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Photo URL</label>
            <input
              type="text"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              className="w-full p-2 rounded-md text-black bg-white"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 py-2 rounded-md font-semibold text-white hover:opacity-90 transition"
          >
            Update Profile
          </button>
        </form>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default MyProfile;
