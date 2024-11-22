/**
 * CompanyCard Component
 *
 * This component is used to display information about a single company.
 * It shows the company's logo, name, description, and a link to view more details
 * about the company. This component is typically used in a list of companies,
 * where each card represents one company.
 *
 * Features:
 * - Displays the company's logo (if available).
 * - Displays the company's name and description.
 * - Provides a link to view more details about the company by navigating
 *   to the company's detail page.
 *
 * Props:
 * - handle (string): The unique identifier for the company, used for routing.
 * - name (string): The name of the company.
 * - description (string): A brief description of the company.
 * - logoUrl (string): The URL of the company's logo image (optional).
 *
 * Usage:
 * Simply include <CompanyCard /> and pass the relevant company data as props.
 * Typically used in a parent component like `Companies` to display a list of companies.
 */

import React from "react";
import { Link } from "react-router-dom";
import "./CompanyCard.css";

/**
 * CompanyCard
 *
 * This component displays a single company's logo, name, description,
 * and a link to view more details about the company.
 *
 * @param {Object} props - The properties passed into the component.
 * @param {string} props.handle - The unique handle of the company, used for routing.
 * @param {string} props.name - The name of the company.
 * @param {string} props.description - A description of the company.
 * @param {string} [props.logoUrl] - The URL of the company's logo (optional).
 *
 * @returns {JSX.Element} The JSX representation of the company card.
 */
function CompanyCard({
	handle,
	name,
	description,
	logoUrl,
}) {
	return (
		<div className='CompanyCard'>
			{/* Display company logo if available */}
			{logoUrl && (
				<img src={logoUrl} alt={`${name} logo`} />
			)}
			<div className='CompanyCard-body'>
				{/* Display company name */}
				<h2>{name}</h2>
				{/* Display company description */}
				<p>{description}</p>
				{/* Link to the company's detail page */}
				<Link to={`/companies/${handle}`}>
					View Details
				</Link>
			</div>
		</div>
	);
}

export default CompanyCard;
