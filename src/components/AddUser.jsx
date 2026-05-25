import { useState } from "react";

function AddUser() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobilenumber: "",
    dateofbirth: "",
  });

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/user-api/user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (res.ok) {
        showToast("User added successfully 🎉", "success");

        setFormData({
          name: "",
          email: "",
          mobilenumber: "",
          dateofbirth: "",
        });
      } else {
        showToast(data.message || "Failed to add user", "error");
      }
    } catch (error) {
      console.log(error);
      showToast("Server error", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center py-10 relative">

      <h1 className="text-3xl font-bold mb-8">Add User</h1>

      {/* 🔥 HOTDOG TOAST */}
      {toast.show && (
        <div
          className={`fixed top-5 right-5 px-5 py-3 rounded-md text-white shadow-lg transition-all duration-300
          ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`}
        >
          {toast.message}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-gray-900 p-6 rounded-xl space-y-4"
      >
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full p-3 bg-gray-800 rounded-md"
        />

        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-3 bg-gray-800 rounded-md"
        />

        <input
          name="mobilenumber"
          value={formData.mobilenumber}
          onChange={handleChange}
          placeholder="Mobile Number"
          className="w-full p-3 bg-gray-800 rounded-md"
        />

        <input
          type="date"
          name="dateofbirth"
          value={formData.dateofbirth}
          onChange={handleChange}
          className="w-full p-3 bg-gray-800 rounded-md"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-md"
        >
          Add User
        </button>
      </form>
    </div>
  );
}

export default AddUser;
