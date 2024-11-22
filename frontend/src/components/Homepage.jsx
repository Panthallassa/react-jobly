import React from "react";

/**
 * Home page component that shows a welcome message if the user is logged in,
 * or a prompt to log in or sign up if the user is not logged in.
 *
 * @param {object} props - The component's props.
 * @param {object} props.currentUser - The current logged-in user.
 * @returns {JSX.Element} The home page JSX.
 */
function Home({ currentUser }) {
	return (
		<div>
			{currentUser ? (
				<h1>
					Welcome back, {currentUser.username}!
				</h1> /* Welcome message for logged-in user */
			) : (
				<h1>
					Welcome to Jobly! Please log in or sign up.
				</h1> /* Prompt for not logged-in user */
			)}
		</div>
	);
}

export default Home;
