import { useEffect, useState } from "react";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 TOAST STATE
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "",
  });

  const showToast = (message, type) => {
    setToast({ show: true, message, type });

    setTimeout(() => {
      setToast({ show: false, message: "", type: "" });
    }, 3000);
  };

  // GET USERS
  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/user-api/users`
      );

      const data = await res.json();

      const usersData =
        data?.payload ||
        data?.users ||
        (Array.isArray(data) ? data : []);

      setUsers(usersData);
    } catch (error) {
      console.log(error);
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
        showToast("User deleted successfully 🗑️", "success");
        fetchUsers();
      } else {
        showToast(data.message || "Delete failed", "error");
      }
    } catch (error) {
      console.log(error);
      showToast("Server error", "error");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-10 relative">

      <h1 className="text-3xl font-bold mb-8 text-center">
        Users List
      </h1>

      {/* 🔥 HOTDOG TOAST */}
      {toast.show && (
        <div
          className={`fixed top-5 right-5 px-5 py-3 rounded-md text-white shadow-lg transition-all duration-300
          ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`}
        >
          {toast.message}
        </div>
      )}

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
                📧 {user.email}
              </p>

              <p className="text-gray-400 text-sm mt-1">
                📱 {String(user.mobilenumber)}
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
