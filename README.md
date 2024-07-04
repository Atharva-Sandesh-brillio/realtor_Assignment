 𝐑𝐞𝐚𝐥𝐭𝐨𝐫 𝐀𝐬𝐬𝐢𝐠𝐧𝐦𝐞𝐧𝐭

Overview:
This project is a web application for managing real estate leads and sources. It includes features for user authentication (login, signup, forgot password), managing sources through a modal dialog, and maintaining user sessions.

Table of Contents:
1) Installation
2) Running the Project
3) Project Structure
4) Features
5) Dependencies
6) API Endpoints
7) Usage
8) Contributing
9) License

Installation:
To get started with this project, clone the repository and install the dependencies.

git clone [<repository-url>](https://github.com/Atharva-Sandesh-brillio/realtor_Assignment.git)
cd realtor
npm install

Running the Project
Start the development server and the JSON server for the backend.

Start React Development Server
npm start

Start JSON Server
npx json-server --watch db.json --port 5000


Features:
1) User Authentication: Signup, login, and forgot password functionality.
2) Source Management: Create and manage real estate sources through a modal dialog.
3) Profile Management: User profile menu with logout option.

Dependencies:
1) React: Frontend library for building user interfaces.
2) React Router: For navigation and routing in the application.
3) Axios: For making HTTP requests.
4) CryptoJS: For encrypting user passwords.
5) React Toastify: For showing toast notifications.
6) Headless UI: For creating accessible UI components like menus and transitions.
7) Tailwind CSS: For styling the application.

API Endpoints:
1) GET /users: Fetch all users.
2) POST /users: Create a new user.
3) PUT /users/:id: Update an existing user.
These endpoints are served by the JSON server running on port 5000.

Usage:

User Authentication:
1) Signup: Create a new account by providing email, password, and other required details.
2) Login: Authenticate using email and password.
3) Forgot Password: Reset password by validating security questions and setting a new password.

Source Management:
1) Create Source: After logging in, click on "Create Source" button to open the modal.
2) Fill Source Details: Enter required source information and submit.
3) View Sources: View the list of created sources in the modal.

Profile Management:
1) Profile Menu: Access the profile menu by clicking on the profile image.
2) Logout: Click on the "Logout" button to end the session and navigate to the login page.
   
Contributing:
1) Contributions are welcome! Please fork the repository and create a pull request with your changes.

License:
This project is licensed under the MIT License. See the LICENSE file for more details.

This README provides a structured overview and easy-to-understand explanation of the project, helping developers to quickly understand how to install, run, and use the application.
