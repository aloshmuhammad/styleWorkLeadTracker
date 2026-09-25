# AI Tools Used

## Tools
- Cursor IDE
- Claude 3.5 Sonnet / ChatGPT

## Prompts Used
- "Build a simple Lead Tracker application. Features: Create Lead, Update Lead Status, Search Leads, List Leads."
- "Set up a clean MongoDB connection and provide controller functions for CRUD operations on leads."
- "Refactor the React UI to use Tailwind CSS for a more modern, dashboard-like appearance."
- "Ensure components are modularized (e.g., LeadForm, LeadList) and add search debouncing."

## AI-Generated vs Manually Written Sections
- **AI-Generated:** Initial boilerplate for Express server, Mongoose schemas, and standard React CRUD components. Base Tailwind CSS utility classes and layout structuring.
- **Manually Written/Refined:** MongoDB Atlas connection string integration, adjusting the Tailwind CSS layout for better UX, fixing TypeScript strict mode (verbatimModuleSyntax) issues with imports, and orchestrating the module-by-module Git commits to ensure a clean history.

## Key Engineering Decisions
- **Stack Selection:** Chose Node.js (Express) and React (Vite, TS) for a robust and standard Full-Stack JS environment. MongoDB was chosen for flexibility in document schemas.
- **Styling:** Used Tailwind CSS (v3) to rapidly build a clean, responsive, and modern dashboard UI. Tailwind's utility-first approach made it easy to create consistent spacing and typography.
- **Architecture:** Separated concerns in the backend by using `models`, `controllers`, and `routes`. Used standard HTTP verbs (POST, GET, PATCH) for RESTful API design.
- **State Management:** Used React's built-in `useState` and `useEffect` hooks for fetching and updating data. Passed functions down directly since the component tree is shallow. Implemented debouncing for the search bar to optimize API calls.
