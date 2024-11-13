App
├── NavBar
├── Routes
│ ├── Home
│ ├── Login
│ ├── Signup
│ ├── Profile
│ ├── Companies
│ │ ├── CompanyCard
│ │ └── CompanyDetail
│ ├── Jobs
│ │ └── JobCard
│ └── NotFound
├── PrivateRoute
├── LoadingSpinner
├── SearchBar
└── FormInput

1. App
   - The main component that sets up routing for the entire application.
   - Manages global state such as user authentication.
2. NavBar
   - Displays navigation links such as Home, Companies, Jobs, Profile, Login, and Signup.
   - Changes based on whether the user is logged in or not.
3. Routes
   - Uses React Router to define different routes for the app.
   - Includes private routes that require authentication.
4. Home
   - The homepage of the application.
   - Displays a welcome message or featured jobs/companies.
5. Login
   - A form to allow users to log in.
   - Communicates with auth.js backend route.
6. Signup
   - A form to allow users to register.
   - Communicates with users.js backend route for creating a new user.
7. Profile
   - Displays and allows editing of the user's profile information.
   - Uses users.js route for updating user data.
8. Companies
   - Displays a list of companies using companies.js backend route.
   - Includes:
     CompanyCard: Displays a summary of each company.
     CompanyDetail: Shows more details about a specific company and its jobs.
9. Jobs
   - Displays a list of jobs using the jobs.js backend route.
   - Includes:
     JobCard: Displays a summary of each job list
10. PrivateRoute
    - A wrapper component for protecting routes that require authentication.
    - Redirects users to the Login page if not authenticated.
11. LoadingSpinner
    - Displays a loading spinner while waiting for API responses.
12. SearchBar
    - Used on the Companies and Jobs pages to filter the list based on search criteria.
    - Utilizes schemas like companySearch.json and jobSearch.json.
13. FormInput
    - A reusable input component for handling forms such as Login, Signup, and Profile.
14. NotFound
    - A fallback component for handling invalid routes.
