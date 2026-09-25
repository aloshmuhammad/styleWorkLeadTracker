# Lead Tracker Application

## Overview
A simple Lead Tracker application built with React, TypeScript, Node.js, Express, and MongoDB. The UI features a premium, modern design crafted with raw CSS variables and flexbox/grid layouts.

## Features
- **Create Lead**: Add new leads directly from the dashboard.
- **Update Lead Status**: Instantly update lead status (New, Contacted, Qualified, Lost).
- **Search Leads**: Search for leads dynamically by name or email.
- **List Leads**: View all leads in an organized, beautiful table layout.

## Setup Instructions

### Backend (LeadTrackerServer)
1. `cd LeadTrackerServer`
2. `npm install`
3. The `.env` file should contain your `MONGO_URI`. 
4. Run `npm run dev` to start the backend on port 5000.

### Frontend (LeadTrackerClient)
1. `cd LeadTrackerClient`
2. `npm install`
3. Run `npm run dev` to start the React application.

## Trade-offs
- Used Vanilla CSS over Tailwind to demonstrate core CSS competency and custom design systems.
- Handled state locally within components rather than Redux for simplicity, given the scale of the application.
- Utilized an all-in-one table view instead of pagination, assuming initial lead scale is small.

## Future Improvements
- Add authentication (JWT) for secure access.
- Implement server-side pagination for infinite scrolling.
- Include a dashboard with charts (e.g., leads by status).
- Add unit and integration tests (Jest/React Testing Library).
