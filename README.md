Wear Once Club

A dynamic, full-stack e-commerce and reservation platform designed for a clothing rental service. This project demonstrates 
modern web development practices, including building a custom REST API, managing data with a NoSQL database, and deploying 
a cloud-hosted backend.

Live Demo: https://kristijandrazetic.github.io/WearOnceClub/

Key Features:
  - RESTful API: A robust backend API architecture built to manage clothing item availability and booking reservations seamlessly.
  - NoSQL Database Integration: Implements MongoDB to securely store, retrieve, and update clothing collections.
  - Persistent Shopping Cart: Features a client-side cart implementation using the LocalStorage API, ensuring user selections survive page refreshes.
  - Cloud Deployment: Fully operational backend deployed on Render, paired with a frontend hosted via GitHub Pages.

Technologies Used:
  - Backend: Node.js
  - Database: MongoDB
  - Frontend: JavaScript (ES6+), HTML5, CSS3
  - APIs & Tools: LocalStorage API, Formspree
  - Hosting: Render (Backend), GitHub Pages (Frontend)


To run this project locally on your machine follow these steps:
  1. Download the project:
   - Click on the green "Code" button at the top right of this repository.
   - Select "Download ZIP" from the dropdown menu.
   - Extract the downloaded ".zip" file on your computer.

  2. Set up Environment Variables:
   - Open the project in Visual Studio Code.
   - Navigate to the "backend/" folder.
   - Create a new file named ".env" and inside add the following configuration:

     MONGODB_URI="mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.mu3zs9v.mongodb.net/inventory"
     
     PORT=3000

     *Note: Replace "YOUR_USERNAME" and "YOUR_PASSWORD" with your actual MongoDB credentials.*

     ***Database Reference Example
     To seed your local database or MongoDB Atlas cluster, use the following structure inside the "inventory" database and "dresses" collection:

    {
      "_id": { "\$oid": "6a455274a3468d1634955081" },
      "Name": "Asta",
      "Price": 50,
      "Color": "red",
      "Size": "M",
      "Img": "https://imgur.com",
      "Size_index": 3,
      "Occasion": "formal",
      "Available": 7
      }

  3. Configure Frontend for Localhost:
    - Open the "main.js" file in your frontend directory.
    - Change the production API URL to your local server URL by replacing:
     
     const SERVER_URL = "https://onrender.com";
    
     with:
     
     const SERVER_URL = "http://localhost:3000/api/data/find";

     or:

     const SERVER_URL = "http://localhost:3000/api/data/update";

     
  4. Initialize and Start Backend Server:
     - Open the integrated terminal in VS Code.
     - Navigate into the backend directory:
     
     cd backend
     
     - Initialize the Node.js project, install the dependencies, and start the server by running:
     
     npm init -y
     npm install
     node server.js

  5. Launch the Frontend Application:
    - In VS Code, navigate back to your frontend files.
    - Right-click on the "index.html" file and select "Open with Live Server" (or click the "Go Live" button in the bottom status bar) to launch the web application with hot-reloading.
     
    
