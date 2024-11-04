import { useState } from "react";

function SignupForm() {
  const [formData, setFormData] = useState({
    institute: "", // Changed from name to institute
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(""); // State for error messages
  const [successMsg, setSuccessMsg] = useState(""); // State for success messages

  const handleChange = (e : any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value.toLowerCase(), // Convert input to lowercase
    }));
  };

  const handleSubmit = async (e : any) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError(""); // Clear previous errors
    setSuccessMsg(""); // Clear previous success message

    try {
      const response = await fetch('https://blockcertifybackend.onrender.com/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          institute: formData.institute, // Changed from name to institute
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMsg(data.msg); // Show success message
        // Optionally, reset form fields or navigate to another page
        setFormData({
          institute: "", // Changed from name to institute
          email: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        setError(data.msg || "Registration failed.");
      }
    } catch (err) {
      console.error("Error during signup:", err);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: "#060B0F", minHeight: "100vh" }}
    >
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 ">
        Sign Up
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-[#060B0F] p-6 sm:p-8 rounded-xl w-full max-w-md shadow-lg "
      >
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {successMsg && <p className="text-green-500 mb-4">{successMsg}</p>}
        <div className="mb-4">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="institute"
          >
            Institute ID
          </label>
          <input
            name="institute" // Changed from name to institute
            id="institute"
            type="text"
            placeholder="Institute ID"
            value={formData.institute} // Changed from name to institute
            onChange={handleChange}
            required
            className="shadow appearance-none rounded-xl w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-[#ffffff1a] backdrop-blur-md border-white transition-transform transform hover:scale-105 focus:ring-2 focus:ring-[#94a3ad]"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            name="email"
            id="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="shadow appearance-none rounded-xl w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-[#ffffff1a] backdrop-blur-md border-white transition-transform transform hover:scale-105 focus:ring-2 focus:ring-[#94a3ad]"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            name="password"
            id="password"
            type="password"
            placeholder="******************"
            value={formData.password}
            onChange={handleChange}
            required
            className="shadow appearance-none rounded-xl w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-[#ffffff1a] backdrop-blur-md border-white transition-transform transform hover:scale-105 focus:ring-2 focus:ring-[#94a3ad]"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            name="confirmPassword"
            id="confirmPassword"
            type="password"
            placeholder="******************"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="shadow appearance-none rounded-xl w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-[#ffffff1a] backdrop-blur-md border-white transition-transform transform hover:scale-105 focus:ring-2 focus:ring-[#94a3ad]"
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-[#202d37] hover:text-[#202d37] hover:bg-[#94a3ad] text-white py-2 px-4 mt-2 rounded-xl focus:outline-none focus:shadow-outline w-full transition-transform transform hover:scale-105"
            type="submit"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;
