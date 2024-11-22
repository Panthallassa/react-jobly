import React from "react";

/**
 * JobCard component displays individual job details.
 *
 * Props:
 * - job: An object containing job details such as title, company, salary, equity, and description.
 *
 * This component is reusable in both the job listing page and the company detail page.
 */
function JobCard({ job }) {
	return (
		<div className='job-card'>
			<h3>{job.title}</h3> {/* Display job title */}
			<p>{job.companyName}</p>{" "}
			{/* Display the company name */}
			<p>
				Salary:{" "}
				{job.salary ? `$${job.salary}` : "Not specified"}
			</p>{" "}
			{/* Display job salary if available */}
			<p>
				Equity:{" "}
				{job.equity ? `${job.equity}%` : "Not specified"}
			</p>{" "}
			{/* Display equity percentage if available */}
			<p>{job.description}</p>{" "}
			{/* Display job description */}
		</div>
	);
}

export default JobCard;
