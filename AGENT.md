# AI Tools Used

## Tools
- Antigravity (Gemini 3.1 Pro)

## Prompts Used
- "Build a simple Lead Tracker application. AI tools are allowed and encouraged. Features: Create Lead, Update Lead Status, Search Leads, List Leads."
- "Connect this my cluster create db and connect to this" (MongoDB Atlas connection).
- Proceeding module by module to establish a clean git commit history.

## Key Engineering Decisions
- **Stack Selection:** Chose Node.js (Express) and React (Vite, TS) for a robust and standard Full-Stack JS environment. MongoDB was chosen for flexibility in document schemas.
- **Styling:** Decided to avoid external utility frameworks like Tailwind and instead built a custom, premium design system using Vanilla CSS variables (`index.css`). This provides a completely custom look and feel.
- **Architecture:** Separated concerns in the backend by using `models`, `controllers`, and `routes`. Used standard HTTP verbs (POST, GET, PATCH) for RESTful API design.
- **State Management:** Used React's built-in `useState` and `useEffect` hooks for fetching and updating data. Passed functions down directly since the component tree is shallow.
