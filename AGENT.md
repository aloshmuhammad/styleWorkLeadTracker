# AI Tools Used

## Tools
- Cursor IDE
- Claude 3.5 Sonnet / ChatGPT (for occasional debugging and boilerplate)

## Prompts Used
- "Give me a basic Express and Mongoose boilerplate setup."
- "What is the best way to structure Tailwind CSS utility classes for a dashboard grid?"
- "How do I write a Jest test for an Express API endpoint?"

*(Note: AI tools were used primarily for generating boilerplate, fixing syntax errors, and suggesting CSS structures. The core logic, component orchestration, API design, and deployment setups were done manually.)*

## AI-Generated vs Manually Written Sections
- **AI-Generated:** Initial Express server boilerplate, basic test configuration (Jest), and standard Tailwind grid syntax.
- **Manually Written/Refined:** The actual MongoDB models, lead status logic, React state management (debouncing search, updating status dynamically), robust form validations, custom UI/UX adjustments for mobile responsiveness, and deployment orchestrations.

## Key Engineering Decisions
- **Stack Selection:** Chose Node.js (Express) and React (Vite, TS) for a robust and standard Full-Stack JS environment. MongoDB was chosen for flexibility in document schemas.
- **Styling:** Used Tailwind CSS (v3) to build a clean, responsive, and mobile-friendly dashboard UI.
- **Architecture:** Separated concerns in the backend by using `models`, `controllers`, and `routes`. Used standard HTTP verbs (POST, GET, PATCH) for RESTful API design.
- **State Management & Validation:** Managed React state locally. Implemented debouncing on the search bar to optimize API calls, and added robust HTML5/Regex validation for emails and phone numbers in the frontend.
