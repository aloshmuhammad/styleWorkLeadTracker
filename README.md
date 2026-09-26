# Lead Tracker

**Live Deployment URL:** [https://style-work-lead-tracker.vercel.app/](https://style-work-lead-tracker.vercel.app/)

## Overview
This is a Lead Tracker application I built for the Junior Full Stack Engineer assignment. It uses React (Vite + TypeScript) on the frontend and Node/Express with MongoDB on the backend. 

I kept the UI clean and responsive using Tailwind CSS, and structured the backend with a standard MVC-like pattern (controllers, models, routes) so it's easy to scale if needed.

## Features
- **Create Lead**: Add new leads directly via a modal.
- **Update Lead Status**: Dropdown in the table to quickly shift leads between New, Contacted, Qualified, and Lost.
- **Search**: Real-time filtering by name or email.
- **List Leads**: A simple, mobile-responsive table layout with KPI cards at the top.

## How to run locally

### Backend
1. Go into the backend folder: `cd LeadTrackerServer`
2. Install dependencies: `npm install`
3. Add your `.env` file with your Mongo string: `MONGO_URI=mongodb+srv://...`
4. Start the server: `npm start` (Runs on port 5000)

### Frontend
1. Go into the frontend folder: `cd LeadTrackerClient`
2. Install dependencies: `npm install`
3. Start the dev server: `npm run dev`

## Deployment
I deployed the backend on Render and the frontend on Vercel. 
- **Render Setup**: Connect the GitHub repo, set the root directory to `LeadTrackerServer`, add the `MONGO_URI` env var, and deploy.
- **Vercel Setup**: Connect the repo, set the root directory to `LeadTrackerClient`, and let Vite handle the build. (I also added a `vercel.json` to handle client-side routing).

## Trade-offs & Decisions
- I went with Tailwind for styling because it's fast and keeps the component files self-contained without needing messy CSS modules.
- State is managed locally in React (`useState` / `useEffect`) since the app is small. I didn't want to overcomplicate it with Redux.
- All leads are loaded at once right now. If the dataset gets huge, I'd want to add server-side pagination later.

## Future Improvements
- Add JWT authentication so not just anyone can edit the leads.
- Implement pagination and infinite scrolling.
- Add some charts/graphs to the dashboard using a library like Recharts.
- Expand the test suite (I added a few basic Jest tests for the backend, but more coverage is always better).
