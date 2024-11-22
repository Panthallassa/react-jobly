import React, { useState, useEffect } from "react";
import {
	BrowserRouter,
	useNavigate,
} from "react-router-dom";
import NavBar from "./components/NavBar";
import AppRoutes from "./Routes";
import useLocalStorage from "./hooks/useLocalStorage";
import * as jwtDecode from "jwt-decode";
import "./App.css";
import JoblyApi from "../JoblyApi";

/**
 * Main application component that handles the routing, user authentication,
 * and renders the necessary components based on the authentication state.
 *
 * @returns {JSX.Element} The main app layout including the navigation bar and routes.
 */

/** Key for storing token in localStorage */
const TOKEN_STORAGE_KEY = "jobly-token";

function App() {
	const [token, setToken] = useLocalStorage(
		TOKEN_STORAGE_KEY
	);
	const [currentUser, setCurrentUser] = useState(null);

	// Load user info when app loads or when token changes
	useEffect(() => {
		async function loadUserInfo() {
			if (token) {
				try {
					const { username } = jwtDecode.default(token);
					JoblyApi.token = token; // Set token in API helper
					const user = await JoblyApi.getCurrentUser(
						username
					);
					setCurrentUser(user);
				} catch (err) {
					console.error("Error loading user info", err);
					setCurrentUser(null);
				}
			}
		}
		loadUserInfo();
	}, [token]);

	// Handle user login
	async function handleLogin({
		username,
		password,
		navigate,
	}) {
		try {
			const token = await JoblyApi.login({
				username,
				password,
			});
			localStorage.setItem("token", token);
			JoblyApi.token = token;

			const user = await JoblyApi.getUser(username);
			setCurrentUser(user);
			navigate("/");
		} catch (err) {
			console.error("Error logging in", err);
		}
	}

	// Handle user signup
	async function handleSignup(signupData) {
		const token = await JoblyApi.signup(signupData);
		setToken(token);
	}

	// Handle user logout
	function handleLogout() {
		setToken(null);
		setCurrentUser(null);
	}

	// Handle user update
	async function updateUser(updatedData) {
		try {
			const updatedUser = await JoblyApi.saveProfile(
				currentUser.username,
				updatedData
			);
			setCurrentUser(updatedUser);
		} catch (err) {
			console.error("Error updating profile:", err);
			throw err;
		}
	}

	return (
		<BrowserRouter>
			<NavBar
				logout={handleLogout}
				currentUser={currentUser}
			/>
			<AppRoutes
				handleLogin={handleLogin}
				handleSignup={handleSignup}
				currentUser={currentUser}
				updateUser={updateUser}
			/>
		</BrowserRouter>
	);
}

export default App;
