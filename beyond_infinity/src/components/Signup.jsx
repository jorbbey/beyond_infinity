import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveUserData, checkEmailExists } from "../utils/IndexedDB";

const Signup = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null); // To store error messages
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error message

    // Check if the email already exists
    const emailExists = await checkEmailExists(userData.email);
    if (emailExists) {
      setError("Email already exists. Please choose a different email.");
      return;
    }

    // Save user data if email does not exist
    try {
      await saveUserData(userData);
      navigate("/homepage");
    } catch (err) {
      console.error("Error saving user data:", err);
      setError("An error occurred during sign-up. Please try again.");
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Name"
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            placeholder="name"
          />
          <FormInput
            label="Email"
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            placeholder="email"
          />
          <FormInput
            label="Password"
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            placeholder="password"
          />
          <div className="flex items-center justify-between mt-6">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Sign Up
            </button>
            <a
              href="#"
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

const FormInput = ({ label, type, name, value, onChange, placeholder }) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

export default Signup;
