import axios from "axios";

const BASE_URL =
	(typeof import.meta !== "undefined" &&
		import.meta.env.VITE_BASE_URL) ||
	"http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 */

class JoblyApi {
	// the token for interacting with the API will be stored here.
	static token;

	/** Generic method to make an API request.
	 *
	 * @param {string} endpoint - The API endpoint.
	 * @param {object} data - Data to send in the request (for POST/PUT requests).
	 * @param {string} method - HTTP method (GET, POST, PATCH, DELETE).
	 *
	 * @returns {object} - The response data from the API.
	 */
	static async request(
		endpoint,
		data = {},
		method = "get"
	) {
		console.debug("API Call:", endpoint, data, method);

		const url = `${BASE_URL}/${endpoint}`;
		const headers = {
			Authorization: `Bearer ${JoblyApi.token}`,
		};
		const params = method === "get" ? data : {};

		try {
			const response = await axios({
				url,
				method,
				data,
				params,
				headers,
			});
			return response.data;
		} catch (err) {
			console.error("API Error:", err.response);
			let message = err.response.data.error.message;
			throw Array.isArray(message) ? message : [message];
		}
	}

	// ============================
	// Individual API Routes
	// ============================

	/** Get details on a company by handle. */
	static async getCompany(handle) {
		const res = await this.request(
			`api/companies/${handle}`
		);
		return res.company;
	}

	/** Get a list of all companies, with optional search filters. */
	static async getCompanies(name = "") {
		const res = await this.request("api/companies", {
			params: name ? { name } : {},
		});
		return res.companies;
	}

	/** Get a list of all jobs, with optional search filters. */
	static async getJobs(name = "") {
		const res = await this.request("api/jobs", {
			params: name ? { name } : {},
		});
		return res.jobs;
	}

	/** Get details on a user by username. */
	static async getUser(username) {
		const res = await this.request(`api/users/${username}`);
		return res.user;
	}

	/** Get details of the current user (from token). */
	static async getCurrentUser(username) {
		const res = await this.request(`api/users/${username}`);
		return res.user;
	}

	/** Register a new user. */
	static async register(data) {
		const res = await this.request(
			"api/auth/register",
			data,
			"post"
		);
		return res.token;
	}

	/** Log in an existing user. */
	static async login(data) {
		const res = await this.request(
			"api/auth/token",
			data,
			"post"
		);
		return res.token;
	}

	/** Save user profile updates. */
	static async saveProfile(username, data) {
		const res = await this.request(
			`api/users/${username}`,
			data,
			"patch"
		);
		return res.user;
	}

	/** Apply to a job. */
	static async applyToJob(username, jobId) {
		await this.request(
			`api/users/${username}/jobs/${jobId}`,
			{},
			"post"
		);
	}
}

// For now, use the test user's token
JoblyApi.token =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
	"FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;
