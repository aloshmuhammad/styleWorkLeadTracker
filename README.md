# Lead Tracker Application

## Overview
A simple Lead Tracker application built with React, TypeScript, Node.js, Express, and MongoDB. The UI features a premium, modern dashboard design crafted with Tailwind CSS and Lucide icons.

## Features
- **Create Lead**: Add new leads directly from the dashboard.
- **Update Lead Status**: Instantly update lead status (New, Contacted, Qualified, Lost).
- **Search Leads**: Search for leads dynamically by name or email.
- **List Leads**: View all leads in an organized, beautiful table layout with a KPI dashboard summary.

## Setup Instructions

### Backend (LeadTrackerServer)
1. `cd LeadTrackerServer`
2. `npm install`
3. The `.env` file should contain your `MONGO_URI` (e.g. `MONGO_URI=mongodb+srv://...`). 
4. Run `npm run dev` to start the backend on port 5000.

### Frontend (LeadTrackerClient)
1. `cd LeadTrackerClient`
2. `npm install`
3. Run `npm run dev` to start the React application using Vite.

## Trade-offs
- Used Tailwind CSS for rapid styling, though it introduces a slight learning curve for developers unfamiliar with utility-first CSS.
- Handled state locally within components rather than Redux for simplicity, given the scale of the application.
- Utilized an all-in-one table view instead of pagination, assuming initial lead scale is small.

## Future Improvements
- Add authentication (JWT) for secure access.
- Implement server-side pagination for infinite scrolling.
- Include data visualizations (e.g., Recharts) for the dashboard.
- Add unit and integration tests (Jest/React Testing Library).
