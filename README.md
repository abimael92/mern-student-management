# Mern Student Management

## Overview

This is a full-stack MERN application that allows for student management. The project contains both a **frontend** built with React and a **backend** built with Node.js and Express. The frontend and backend are configured to run concurrently.

---

## Initial Setup

Follow these steps to get your environment up and running:

### 1. Clone the Repository

Clone the repository to your local machine:

 ```
git clone https://github.com/yourusername/mern-student-management.git cd mern-student-management
 ```

### 2. Install Root Dependencies

From the root directory, install the root-level dependencies:

 ```
npm install
 ```

### 3. Install Frontend Dependencies

Navigate to the `frontend` folder and install its dependencies:

 ```
npm install --prefix frontend
 ```

### 4. Install Backend Dependencies

Navigate to the `backend` folder and install its dependencies:

 ```
npm install --prefix backend
 ```

---

## Running the Development Environment

To run both the backend and frontend concurrently, run:

npm run start

This will start the **backend** and **frontend** servers simultaneously.

- **Backend** will be available on `http://localhost:5000`.
- **Frontend** will be available on `http://localhost:3000`.

---

## Linting & Prettier

The project uses **Husky** to run linting and formatting checks automatically before each commit.

- **ESLint**: Automatically checks your code for common issues.
- **Prettier**: Automatically formats your code to ensure consistent style.

### Commands:

- **Lint** the code:

  ```
  npm run lint
  ```

- **Prettier** to format the code:

  ```
  npm run prettier
  ```

---

## Build

To build the frontend and backend for production, run the following commands:

### Build the Frontend

Navigate to the `frontend` directory and run:

```
npm run build --prefix frontend
```

### Build the Backend

Navigate to the `backend` directory and run:

```
npm run build --prefix backend
```

---

## Folder Structure

The folder structure for this project is as follows:

```
/mern-student-management
│
├── /frontend # Frontend React App
│ ├── /public # Static files for the frontend
│ ├── /src # Source files for the frontend (components, pages, etc.)
│ ├── package.json # Frontend package.json with dependencies and scripts
│ └── .gitignore # Git ignore rules for frontend
│
├── /backend # Backend Node.js App
│ ├── /controllers # Controller files for handling logic
│ ├── /models # Model files for MongoDB schema
│ ├── /routes # API routes for the backend
│ ├── /config # Configuration files (database, server settings, etc.)
│ ├── package.json # Backend package.json with dependencies and scripts
│ └── .gitignore # Git ignore rules for backend
│
├── .gitignore # Git ignore rules for the entire project
├── package.json # Root-level package.json with shared scripts (start, lint, etc.)
├── README.md # Project documentation
├── .eslintrc.js # ESLint configuration
├── .prettierrc # Prettier configuration
└── /logs # Log files (e.g., server logs, error logs)
```

---

## Files to Delete If No Longer Needed

If there are files that are no longer necessary in either the frontend or backend, here's a list of common files to delete:

### **Frontend:**

If no longer needed, delete:


- **Unnecessary Components**: If you have components that aren't being used, you can delete them from `frontend/src/components/`.

  Example:

  - `frontend/src/components/Header.jsx`
  - `frontend/src/components/Footer.jsx`

- **Unused Pages**: If you have page components that aren't being used, you can delete them from `frontend/src/pages/`.

  Example:

  - `frontend/src/pages/LoginPage.jsx`

- **CSS or Styles**: If you've removed specific styles or no longer need them, delete the corresponding CSS files from `frontend/src/`.

  Example:

  - `frontend/src/index.css`

### **Backend:**

If no longer needed, delete:

- **Unused Routes or Controllers**: Remove unnecessary route files or controllers from `backend/src/routes/` or `backend/src/controllers/`.

  Example:

  - `backend/src/routes/studentRoutes.js`
  - `backend/src/controllers/studentController.js`

- **Models**: Delete any unused models from `backend/src/models/`.

  Example:

  - `backend/src/models/studentModel.js`

- **Middleware**: If you've created middleware that's no longer in use, delete it from `backend/src/middleware/`.

  Example:

  - `backend/src/middleware/authMiddleware.js`

- **Unused Config Files**: Delete any unused configuration files or settings in `backend/src/config/`.

---

## Useful Commands

- **Start the Backend**:

  ```
  npm run server
  ```

- **Start the Frontend**:

  ```
  npm run client
  ```

- **Start both Backend and Frontend concurrently**:

  ```
  npm run start
  ```

---

## Troubleshooting

- **If the backend server doesn't start**: Ensure you have `nodemon` installed and configured for automatic server restarts.

- **If the frontend doesn't load**: Check the `frontend/package.json` for the correct start script and make sure the frontend dependencies are installed correctly.

---

## Contributing

If you wish to contribute to this project:

1. Fork the repository.
2. Create a new branch for your feature.
3. Make your changes and commit them.
4. Open a pull request to merge your changes into the main branch.

---

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.
