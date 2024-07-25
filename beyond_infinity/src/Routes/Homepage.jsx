import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { loginData } from "../database";

const Homepage = () => {
  const [availableObjects, setAvailableObjects] = useState([]);
  const [selectedObject, setSelectedObject] = useState(null);
  const [buttonEnabled, setButtonEnabled] = useState(true);

  useEffect(() => {
    // Load available objects from localStorage
    const storedAvailableObjects = localStorage.getItem("availableObjects");

    if (storedAvailableObjects) {
      const parsedAvailableObjects = JSON.parse(storedAvailableObjects);
      const mergedObjects = mergeNewObjects(parsedAvailableObjects, loginData);
      setAvailableObjects(mergedObjects);
    } else {
      setAvailableObjects(loginData);
    }

    // Check localStorage for selected object
    const storedSelectedObject = localStorage.getItem("selectedObject");
    if (storedSelectedObject) {
      setSelectedObject(JSON.parse(storedSelectedObject));
      setButtonEnabled(false); // Disable button if an object is already selected
    }
  }, []);

  useEffect(() => {
    // Save available objects to localStorage whenever it changes
    localStorage.setItem("availableObjects", JSON.stringify(availableObjects));
  }, [availableObjects]);

  useEffect(() => {
    // Save selected object to localStorage whenever it changes
    if (selectedObject !== null) {
      localStorage.setItem("selectedObject", JSON.stringify(selectedObject));
    } else {
      localStorage.removeItem("selectedObject");
    }
  }, [selectedObject]);

  const mergeNewObjects = (storedObjects, initialObjects) => {
    const storedIds = new Set(storedObjects.map((obj) => obj.id));
    const newObjects = initialObjects.filter((obj) => !storedIds.has(obj.id));
    return [...storedObjects, ...newObjects];
  };

  const generateRandomNumber = () => {
    if (availableObjects.length > 0 && selectedObject === null) {
      const randomIndex = Math.floor(Math.random() * availableObjects.length);
      const randomObject = availableObjects[randomIndex];

      setSelectedObject(randomObject);
      setAvailableObjects((prevAvailableObjects) =>
        prevAvailableObjects.filter((obj) => obj.id !== randomObject.id)
      );
      setButtonEnabled(false); // Disable button after an object is selected
    } else {
      console.log("All IDs have been selected or an ID is already selected.");
    }
  };

  // Function to handle user signup
  const handleUserSignup = () => {
    // Enable the button and reset the selected object for a new user
    setButtonEnabled(true);
    setSelectedObject(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full text-center">
        <h1 className="text-3xl font-bold mb-6 text-blue-600">
          Welcome to Beyond Initializer!
        </h1>
        <p className="text-gray-700 mb-4">
          Thank you for signing up! We are excited to have you join our
          community.
        </p>
        <p className="text-gray-700 mb-4">
          To complete your registration and KYC (Know Your Customer) process,
          please follow the instructions below.
        </p>
        <div className="text-left mb-6">
          <h2 className="text-xl font-semibold mb-2">Instructions:</h2>
          <ol className="list-decimal list-inside text-gray-700 space-y-2">
            <li>
              Visit the Beyond Infinity registration page by clicking
              <a
                href="https://beyondinfinity.club/members/login/"
                className="text-blue-500 hover:underline"
              >
                here
              </a>
              .
            </li>
            <li>
              Fill in your personal details and upload the necessary documents
              for verification.
            </li>
            <li>Submit the form and wait for an email confirmation.</li>
            <li>
              Once your KYC is approved, you will be able to access all the
              features of Beyond Infinity Initializer.
            </li>
          </ol>
        </div>
        <div className="text-left mb-6">
          <h2 className="text-xl font-semibold mb-2">Login Details:</h2>
          <p className="text-gray-700 mb-2">
            Use the following credentials to log in to your Beyond Infinity
            account:
          </p>

          <div>
            <button
              onClick={generateRandomNumber}
              disabled={!buttonEnabled}
              className={`py-2 px-4 rounded-lg focus:outline-none focus:ring-2 ${
                buttonEnabled
                  ? "bg-blue-500 hover:bg-blue-700 text-white"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Get Details
            </button>
            {selectedObject !== null && (
              <>
                <p>Email: {selectedObject.newEmail}</p>
                <p>Password: {selectedObject.password}</p>
              </>
            )}
          </div>
        </div>
        <Link to="/" className="text-blue-500 hover:underline">
          Go back to the homepage
        </Link>
      </div>
    </div>
  );
};

export default Homepage;
