# EduPlanner

EduPlanner is a comprehensive educational planning application built with React and Vite, designed to help students manage their academic journey effectively.

## Features

- **CWA Analysis**: Track and analyze your Cumulative Weighted Average
- **Course Upload**: Easy document processing for course materials
- **Timetable Generation**: Automated schedule planning
- **Progress Tracking**: Monitor your academic progress
- **User Authentication**: Secure login and signup functionality

## Tech Stack

- **Frontend**: React 19 with Vite
- **Styling**: TailwindCSS for modern, responsive design
- **Routing**: React Router DOM
- **Backend**: Express.js
- **Database**: PostgreSQL
- **Development Tools**: ESLint for code quality

## Getting Started

### Prerequisites

- Node.js (Latest LTS version)
- PostgreSQL database

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with your database configuration
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Start the backend server:
   ```bash
   npm run server
   ```

## Development

- `npm run dev` - Start the Vite development server
- `npm run build` - Build for production
- `npm run server` - Start the backend server
- `npm run lint` - Run ESLint

## Project Structure

```
src/
  ├── api/         # Backend API endpoints
  ├── components/  # Reusable React components
  ├── config/      # Configuration files
  ├── db/          # Database migrations and setup
  ├── models/      # Data models
  └── pages/       # Main application pages
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
