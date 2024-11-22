import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import LoginForm from "./LoginForm"; // Import LoginForm component

/**
 * Login Component
 *s
 * This component renders the login page, including a heading and a prompt for the user
 * to log in. It also includes the LoginForm component to handle the login functionality.
 * After successful login, it redirects the user to the homepage.
 *
 * @returns {JSX.Element} The JSX layout for the Login page.
 */
function Login({ handleLogin }) {
	const navigate = useNavigate(); // Initialize the navigate hook

	const loginAction = async (formData) => {
		await handleLogin(formData, navigate); // Use the login function passed as a prop
		navigate("/"); // Redirect after successful login
	};

	return (
		<div>
			<h1>Login</h1>
			<p>Please log in to continue.</p>
			<LoginForm login={loginAction} />
		</div>
	);
}

export default Login;
