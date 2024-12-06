import React, { useState, useEffect } from "react";
import JobsList from "./JobsList";

/**
 * AllJobsPage component displays all available jobs.
 *
 * This component fetches all jobs from the backend and filters them based on user input in the search box.
 *
 * The jobs are fetched from the backend API endpoint that supports search.
 */
function AllJobsPage() {
	const [jobs, setJobs] = useState([]); // State to store the list of jobs
	const [searchTerm, setSearchTerm] = useState(""); // State to store the search term

	// useEffect hook to fetch jobs data from backend API
	useEffect(() => {
		// Build the API endpoint conditionally
		const url = `/api/jobs${
			searchTerm ? `?search=${searchTerm}` : ""
		}`;
		console.log("Fetching jobs from: ", url);

		fetch(url)
			.then((response) => {
				if (!response.ok) {
					throw new Error(
						`Failed to fetch jobs: ${response.statusText}`
					);
				}
				return response.json();
			})
			.then((data) => {
				console.log("Fetched jobs data: ", data);
				setJobs(Array.isArray(data) ? data : []);
			})
			.catch((err) => {
				console.error("Error fetching jobs:", err);
				setJobs([]);
			});
	}, [searchTerm]); // Effect will run whenever searchTerm changes

	return (
		<div className='all-jobs-page'>
			<input
				type='text'
				placeholder='Search jobs...' // Placeholder text in the search box
				value={searchTerm} // Bind the value of the input to the searchTerm state
				onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm state on input change
			/>
			<JobsList jobs={jobs} />{" "}
			{/* Render the list of jobs */}
		</div>
	);
}

export default AllJobsPage;
