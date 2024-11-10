import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home"
import FetchAll from "./components/FetchAll";
import Generate from "./components/Generate";
import About from "./components/About";
import LoginForm from "./components/LoginForm";
import SignUp from "./components/Signup";
import { Context12 } from "./components/ContextProvide";
import { ThirdwebProvider } from "thirdweb/react";
import { useContext } from "react";
import { ContextProvide } from "./components/ContextProvide";

function Main() {
	const context = useContext(Context12);
	const loggedIn = context?.loggedIn;
	const isLoading = context?.loading;

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/fetch" element={<FetchAll />} />
			<Route
				path="/generate"
				element={
					loggedIn ? (
						<ThirdwebProvider>
							<Generate />
						</ThirdwebProvider>
					) : (
						<Navigate to="/login" />
					)
				}
			/>
			<Route path="/about" element={<About />} />
			<Route path="/login" element={<LoginForm />} />
			<Route path="/signup" element={<SignUp />} />
			<Route path="/*" element={<div className="text-center text-2xl"><h1>Page Does not exists</h1></div>} />
		</Routes>
	);
}

export function App() {
	return (
		<ContextProvide>
			<Router>
				<Navbar />
				<Main />
			</Router>
		</ContextProvide>
	);
}
