import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const generateUserId = () => {
    return Math.floor(1000 + Math.random() * 9000).toString(); // 4-digit random ID
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newUser = {
      name,
      password, 
      role,
      userId: generateUserId(),
    };

    try {
      const res = await axios.post("http://localhost:5000/users", newUser);
      alert(`User "${res.data.name}" created successfully!`);
      navigate("/admin/cases");
    } catch (err) {
      console.error("Failed to create user", err);
      alert(
        err.response?.data?.error || "An error occurred while creating the user."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-md"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Create New User
        </h2>

        <label className="block mb-2 text-gray-700">Name</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        />
        <label className="block mb-2 text-gray-700">Password</label>
        <input
          type="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        />

        <label className="block mb-2 text-gray-700">Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full mb-6 p-2 border border-gray-300 rounded"
        >
          <option value="user">User</option>
          <option value="writer">Writer</option>
        </select>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 text-white rounded ${
            isSubmitting ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isSubmitting ? "Creating..." : "Create User"}
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
