import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Context12 } from "./ContextProvide";

function LoginForm() {
  const context = useContext(Context12);
  const loggedIn = context?.loggedIn || false;
  const setLoggedIn = context?.setLoggedIn || (() => { });

  // State to manage the email, password, and error message
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>(""); // State for error message

  const navigate = useNavigate(); // Initialize useNavigate

  // Function to handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevents the default form submission
    
    setErrorMessage(""); // Clear previous error message

    try {
      // Send a POST request to the login API with the email and password
      const response = await fetch('https://blockcertifybackend.onrender.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.toLowerCase(), password }),
      });

      const data = await response.json();
     
      
      if (response.ok) {
        // Successfully logged in
       
        localStorage.setItem('token', data.token);
        setLoggedIn(true);
        navigate('/generate'); // Redirect to the generate page
      } else {
        // Handle login failure
        console.error("Login failed:", data.message);
        setErrorMessage(data.message || "Login failed"); // Set the error message for display
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
      setErrorMessage("An error occurred. Please try again."); // Set a generic error message
    }
  };


  return (
    <div
      className="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: "#060B0F", minHeight: "100vh" }}
    >
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
        Login
      </h2>
      {errorMessage && ( // Conditionally render the error message
        <div className="mb-4 text-red-500 text-sm">{errorMessage}</div>
      )}
      <form
        className="bg-[#060B0F] p-6 sm:p-8 rounded-xl w-full max-w-md shadow-lg"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="email" // Changed from "username" to "email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none rounded-xl w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-[#ffffff1a] backdrop-blur-md border-white transition-transform transform hover:scale-105 focus:ring-2 focus:ring-[#94a3ad]"
            id="email" // Changed from "username" to "email"
            type="text"
            placeholder="Email" // Changed placeholder from "Username" to "Email"
            value={email} // Changed from username to email
            onChange={(e) => setEmail(e.target.value.toLowerCase())} // Set email value and convert to lowercase
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none rounded-xl w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-[#ffffff1a] backdrop-blur-md border-white transition-transform transform hover:scale-105 focus:ring-2 focus:ring-[#94a3ad]"
            id="password"
            type="password"
            placeholder="******************"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Set password value
            required
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-[#202d37] hover:text-[#202d37] hover:bg-[#94a3ad] text-white py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline w-full transition-transform transform hover:scale-105"
            type="submit"
          >
            Log In
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
