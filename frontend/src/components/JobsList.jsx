/**
 * JobsList Component
 *
 * This component displays a list of jobs fetched from the Jobly API.
 * It includes a search form that allows users to filter jobs by title.
 * The component is responsible for fetching job data, handling search input,
 * and rendering individual job cards.
 *
 * Features:
 * - Displays a search form to filter jobs.
 * - Fetches all jobs from the Jobly API on initial load.
 * - Filters jobs based on the search term provided by the user.
 * - Renders a loading message while the jobs are being fetched.
 * - Renders a list of job cards or a "No jobs found" message.
 *
 * Usage:
 * Simply include <JobsList /> in your component tree to display the list of jobs.
 */

import React, { useState, useEffect } from "react";
import JoblyApi from "../../JoblyApi";
import JobCard from "./JobCard";

/**
 * JobsList
 *
 * This component manages the state for the list of jobs, the search term,
 * and the loading state. It handles the fetching of jobs from the Jobly API
 * and updates the displayed list of jobs based on the search term entered by
 * the user.
 *
 * @returns {JSX.Element} The JSX representation of the jobs list, search form,
 *                        and loading state.
 */
function JobsList() {
	const [jobs, setJobs] = useState([]); // State for the list of jobs
	const [searchTerm, setSearchTerm] = useState(""); // State for the search input
	const [isLoading, setIsLoading] = useState(true); // State for loading status

	/**
	 * Fetches the list of jobs from the Jobly API on initial load.
	 *
	 * This useEffect hook runs once when the component is first mounted and
	 * fetches the jobs list from the JoblyApi. It then updates the state
	 * with the fetched jobs and sets the loading state to false.
	 */
	useEffect(() => {
		async function fetchJobs() {
			try {
				const jobs = await JoblyApi.getJobs(); // Fetch jobs from API
				setJobs(jobs); // Update the jobs state with fetched data
			} catch (err) {
				console.error("Error fetching jobs:", err); // Log any errors
			} finally {
				setIsLoading(false); // Set loading state to false once fetch is complete
			}
		}
		fetchJobs(); // Call the fetchJobs function
	}, []);

	/**
	 * Handles the search form submission.
	 *
	 * This function is called when the user submits the search form. It uses the
	 * search term entered by the user to fetch the filtered list of jobs
	 * from the Jobly API.
	 *
	 * @param {object} evt - The form submission event.
	 */
	async function handleSearch(evt) {
		evt.preventDefault(); // Prevent the default form submission behavior
		setIsLoading(true); // Set loading state to true while fetching
		try {
			const jobs = await JoblyApi.getJobs(searchTerm); // Fetch filtered jobs based on search term
			setJobs(jobs); // Update the jobs state with the search results
		} catch (err) {
			console.error("Error searching jobs:", err); // Log any errors
		} finally {
			setIsLoading(false); // Set loading state to false once fetch is complete
		}
	}

	// Display a loading message while the jobs are being fetched
	if (isLoading) return <p>Loading...</p>;

	return (
		<div className='JobsList'>
			{/* Search form */}
			<form onSubmit={handleSearch}>
				<input
					type='text'
					placeholder='Search jobs...'
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)} // Update search term state
				/>
				<button type='submit'>Search</button>
			</form>

			{/* Render the list of jobs or a message if no jobs are found */}
			{jobs.length ? (
				jobs.map((job) => (
					<JobCard key={job.id} job={job} /> // Render each job as a JobCard
				))
			) : (
				<p>No jobs found.</p> // Display message if no jobs match the search
			)}
		</div>
	);
}

export default JobsList;
