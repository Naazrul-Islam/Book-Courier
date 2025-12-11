import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/users"); // Correct API
      setUsers(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Update user role
  const updateRole = async (email, role) => {
    try {
      await axios.put(`http://localhost:3000/users/role/${email}`, { role });
      toast.success(`User role updated to ${role}`);

      // Update UI instantly
      setUsers((prev) =>
        prev.map((user) =>
          user.email === email ? { ...user, role } : user
        )
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to update role");
    }
  };

  if (loading) return <p className="p-4">Loading users...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Users Management</h2>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Current Role</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="text-center">
                <td className="p-2 border">{user.name || "N/A"}</td>
                <td className="p-2 border">{user.email}</td>
                <td className="p-2 border">{user.role || "User"}</td>

                <td className="p-2 border flex justify-center gap-2">
                  <button
                    onClick={() => updateRole(user.email, "Librarian")}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Make Librarian
                  </button>

                  <button
                    onClick={() => updateRole(user.email, "Admin")}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Make Admin
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UsersManagement;
