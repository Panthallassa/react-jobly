import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JobsList from "./JobsList";

/**
 * CompanyDetailPage component displays information about a specific company and its available jobs.
 *
 * The company details and jobs are fetched from the backend using the companyId from the URL.
 */
function CompanyDetailPage() {
	const { companyId } = useParams(); // Get the companyId from the URL
	const [company, setCompany] = useState(null); // State to store company details
	const [jobs, setJobs] = useState([]); // State to store the company's jobs

	useEffect(() => {
		// Fetch company details
		fetch(`/api/companies/${companyId}`)
			.then((response) => response.json())
			.then((data) => setCompany(data)); // Update state with company details

		// Fetch jobs for the specific company
		fetch(`/api/companies/${companyId}/jobs`)
			.then((response) => response.json())
			.then((data) => setJobs(data)); // Update state with the company's jobs
	}, [companyId]); // Effect runs when the companyId changes

	return (
		<div className='company-detail-page'>
			{company && (
				<>
					<h1>{company.name}</h1>{" "}
					{/* Display the company name */}
					<p>{company.description}</p>{" "}
					{/* Display the company description */}
					<h2>Jobs at {company.name}</h2>{" "}
					{/* Display jobs available at the company */}
					<JobsList jobs={jobs} />{" "}
					{/* Render jobs for this company */}
				</>
			)}
		</div>
	);
}

export default CompanyDetailPage;
