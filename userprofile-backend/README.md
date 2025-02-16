# UserProfile Backend Documentation

# UserProfile Backend

This project is a backend service for the UserProfile component of a React Native application. It provides RESTful API endpoints for managing user profiles, including retrieving, updating, and uploading profile images.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [License](#license)

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd userprofile-backend
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Create a `.env` file in the root directory and add your MongoDB connection string.

## Usage

To start the server, run the following command:
```
npm start
```
The server will run on `http://localhost:5000` by default.

## API Endpoints

### User Profile

- **GET /api/users/:id**
  - Retrieve user profile by ID.

- **PUT /api/users/:id**
  - Update user profile by ID.

- **POST /api/users/:id/profile-image**
  - Upload a profile image for the user.

## Environment Variables

The following environment variables are required:

- `MONGODB_URI`: The connection string for your MongoDB database.

## License

This project is licensed under the MIT License.