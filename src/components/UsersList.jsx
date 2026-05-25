import { useEffect, useState } from "react";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // GET USERS
  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/user-api/users`
      );

      const data = await res.json();

      console.log("API RESPONSE:", data);

      // SAFE HANDLING (works for all response types)
      const usersData =
        data?.payload ||
        data?.users ||
        (Array.isArray(data) ? data : []);

      setUsers(usersData);
    } catch (error) {
      console.log("Error fetching users:", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  // DELETE USER
  const deleteUser = async (id) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/user-api/users/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("User deleted successfully");
        fetchUsers(); // refresh list
      } else {
        alert(data.message || "Failed to delete user");
      }
    } catch (error) {
      console.log("Delete error:", error);
      alert("Server error");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-10">

      <h1 className="text-3xl font-bold mb-8 text-center">
        Users List
      </h1>

      {loading ? (
        <p className="text-center text-gray-400">
          Loading users...
        </p>
      ) : users.length === 0 ? (
        <p className="text-center text-gray-500">
          No users found
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:bg-gray-800 transition"
            >
              <h2 className="text-xl font-semibold mb-2">
                {user.name}
              </h2>

              <p className="text-gray-400 text-sm">
                 {user.email}
              </p>

              <p className="text-gray-400 text-sm mt-1">
                 {user.mobilenumber}
              </p>

              <p className="text-gray-500 text-xs mt-1">
                DOB: {user.dateofbirth}
              </p>

              <button
                onClick={() => deleteUser(user._id)}
                className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UsersList;
