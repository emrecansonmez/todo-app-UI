# THY Todo App Frontend

## Project Overview

THY Todo App frontend is built using **React** and **TypeScript**, and it integrates with a backend server for task management via REST API calls. The application allows users to sign in, manage tasks (CRUD operations), and filter tasks based on their priority and state. The backend API URL is configurable via environment variables.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A statically typed superset of JavaScript.
- **Ant Design (AntD)**: A React UI library used for building responsive and user-friendly interfaces.
- **Axios**: A promise-based HTTP client for making API requests.
- **SWR**: A React hook library for data fetching with caching and revalidation support.

## Project Structure

The project is structured as follows:

```bash
src/
│
├── assets/               # Image assets used in the application
│   └── toDo.jpeg
│   └── todo.png
│
├── components/           # Reusable React components
│   ├── modals/
│   │   └── TaskSearch.tsx
│   │   └── TaskTable.tsx
│
├── constants/            # App constants, such as options for task priorities
│   └── options.ts
│
├── hooks/                # Custom React hooks
│   └── useDebounce.ts
│
├── modules/              # Specific page-level modules
│   └── Dashboard/
│       └── index.tsx     # Dashboard page for managing tasks
│
├── pages/                # Authentication and TaskManager pages
│   ├── Auth/
│   │   └── Login.tsx
│   │   └── Register.tsx
│   └── TaskManager/
│       └── index.tsx     # TaskManager page that lists tasks
│
├── services/             # API services for authentication and tasks
│   └── auth-service.ts
│   └── task-service.ts
│
├── styles/               # Theme and styling related files
│   └── theme.ts
│
├── types/                # TypeScript types used across the application
│   └── index.ts
│
├── App.tsx               # Main App component
├── index.tsx             # Entry point of the React application
├── ProtectedRoutes.tsx   # Component to protect routes based on authentication
└── Router.tsx            # Router configuration for the application
```

## API Configuration

The application makes API requests to the backend using **Axios** and **SWR** for data fetching. The backend API URL is configurable via an `.env` file, where you can specify the base URL for the API.

- **.env** example:
  ```env
  REACT_APP_API_URL=https://your-backend-api.com
  ```

All backend requests will use this base URL, allowing easy switching between development, staging, and production environments.

## Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/emrecansonmez/thy-todoapp-ui.git
cd thy-todoapp-ui
```

### 2. Install Dependencies

Install all the necessary dependencies using npm or yarn:

```bash
npm install
# or
yarn install
```

### 3. Configure the Environment Variables

Create a `.env` file in the root directory and configure the backend API URL:

```bash
REACT_APP_API_URL=http://localhost:8080
```

### 4. Start the Development Server

To start the React development server, run:

```bash
npm start
# or
yarn start
```

The application will be available at **http://localhost:3000**.

---

Feel free to explore and modify the project as per your requirements!
