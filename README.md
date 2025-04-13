# Flight Inspection Frontend

A modern React application for flight inspection management. This project provides a user interface for inspecting and managing flights, with features for viewing flight details, inspection histories, and more.

## 🚀 Features

- Dashboard with flight overview
- Flight details and inspection history
- Intuitive UI based on Figma designs
- TypeScript for type safety
- Responsive design for all device sizes

## 🛠️ Tech Stack

- React 18+
- TypeScript
- React Router for navigation
- Styled Components for styling
- Axios for API requests

## 📂 Project Structure

```
frontend_flight_inspection/
├── public/            # Static files
├── src/
│   ├── assets/        # Images, icons, and other static assets
│   │   ├── images/    # Image files
│   │   ├── icons/     # Icon files
│   │   └── fonts/     # Font files
│   ├── components/    # Reusable UI components
│   │   ├── Button/    # Button component
│   │   ├── FlightCard/# Flight card component
│   │   └── Layout/    # Layout component with header and footer
│   ├── context/       # React context for global state management
│   ├── hooks/         # Custom React hooks
│   ├── pages/         # Page components
│   ├── services/      # API services
│   ├── styles/        # Global styles
│   ├── types/         # TypeScript type definitions
│   └── utils/         # Utility functions
├── package.json       # Project dependencies and scripts
└── tsconfig.json      # TypeScript configuration
```

## 🔧 Getting Started

### Prerequisites

- Node.js 14+ and npm

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd frontend_flight_inspection
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm start
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## 🔌 Backend Integration

This frontend is designed to work with a RESTful API. The API endpoints are configured in the `src/services/api.ts` file. The main endpoints include:

- `/flights` - Get all flights, create a new flight
- `/flights/:id` - Get, update, or delete a specific flight
- `/inspections` - Get all inspections, create a new inspection
- `/inspections/:id` - Get, update, or delete a specific inspection

## 🧪 Testing

Run tests with:

```bash
npm test
```

## 📦 Building for Production

To build the app for production:

```bash
npm run build
```

The build output will be in the `build/` directory.

## 🤝 Collaboration with Backend Team

For backend developers working on this project:

1. The frontend expects a RESTful API as defined in the API service files
2. All API responses should follow the format defined in the `src/types/index.ts` file
3. Authentication is handled through JWT tokens in the Authorization header

## 📝 License

This project is licensed under the MIT License.
