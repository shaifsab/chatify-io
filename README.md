# Chatify.io

![Chatify.io Banner](https://res.cloudinary.com/dmqqrpppn/image/upload/v1730811234/chatify-banner.jpg)

Chatify.io is a real-time chat application built with the **MERN stack** (MongoDB, Express.js, React, Node.js) and **Socket.io**. It offers a seamless messaging experience with secure user authentication, real-time messaging, conversation management via email, and media upload support using Cloudinary. The application is responsive, scalable, and optimized for both desktop and mobile users.

## Features

- **User Authentication**: Secure registration and login using JSON Web Tokens (JWT).
- **Real-Time Messaging**: Instant message delivery powered by Socket.io.
- **Conversation Management**: Create, view, edit, and delete conversations by email.
- **Media Uploads**: Upload images and media files using Cloudinary integration.
- **Responsive UI**: Seamless experience on desktop and mobile devices.
- **Scalable Backend**: Robust API and database management with Express.js and MongoDB.
- **Message History**: Persist chat history for revisiting conversations.
- **Real-Time Notifications**: Alerts for new messages and user activities.

## Tech Stack

- **Frontend**: React.js with React Router for navigation
- **Backend**: Node.js with Express.js for API development
- **Database**: MongoDB with Mongoose for schema-based data modeling
- **Real-Time Communication**: Socket.io for bi-directional messaging
- **Authentication**: JSON Web Tokens (JWT)
- **Media Storage**: Cloudinary for image and file uploads
- **Styling**: Vanila CSS (assumed, adjust if different)
- **Deployment**: Configurable for platforms like Heroku or Render

## Prerequisites

Before setting up the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14.x or higher)
- [MongoDB](https://www.mongodb.com/) (local or MongoDB Atlas account)
- [Git](https://git-scm.com/) for version control
- A code editor like [VS Code](https://code.visualstudio.com/)
- A [Cloudinary](https://cloudinary.com/) account for media uploads
- (Optional) [Postman](https://www.postman.com/) for testing API endpoints

## Installation

Follow these steps to set up and run Chatify.io locally:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/shaifsab/chatify-io.git
   cd chatify-io
   ```

2. **Install Backend Dependencies**:
   ```bash
   cd server
   npm install
   ```

3. **Install Frontend Dependencies**:
   ```bash
   cd client
   npm install
   ```

4. **Configure Backend Environment Variables**:
   - In the `backend` directory, create a `.env` file with the following:
     ```env
     DB_CONECTION_STRING       = <your-mongodb-connection-string>
     PORT                      = 8000
     API_ROUTE                 = /api/v1
     JWT_SEC                   = <your-secret-key-for-jwt>
     EMAIL_USERNAME            = <your-email-username-app-password>
     EMAIL_PASS                = <your-email-app-password>
     CLOUDINARY_CLOUD_NAME     = <your-cloudinary-cloud-name>
     CLOUDINARY_API_KEY        = <your-cloudinary-api-key>
     CLOUDINARY_API_SECRET     = <your-cloudinary-api-secret>
     ```
   - **Important**: Replace the placeholders with your own values. For example:
     - Use your MongoDB Atlas connection string for `DB_CONECTION_STRING`.
     - Set a secure `JWT_SEC` (avoid using the provided example in production).
     - Use your email provider's app-specific password for `EMAIL_PASS` (e.g., Gmail App Password not Gmail Account Password).
     - Obtain Cloudinary credentials from your Cloudinary dashboard.

5. **Configure Frontend Environment Variables**:
   - In the `frontend` directory, create a `.env` file with the following:
     ```env
     VITE_API_BASE_URL=http://localhost:8000 or your server URL
     ```
   - Ensure the `VITE_API_BASE_URL` matches the backend's URL and port (e.g., `http://localhost:8000`).

6. **Run the Application**:
   - Start the backend server:
     ```bash
     cd server
     npm start
     ```
   - Start the frontend development server:
     ```bash
     cd client
     npm run dev
     ```
   - Access the application:
     - Frontend: `http://localhost:3000` (default for Vite)
     - Backend API: `http://localhost:8000/api/v1`

## Usage

1. **Register or Log In**: Create a new account or sign in with existing credentials.
2. **Start a Conversation**: Enter the email address of another user to initiate a chat.
3. **Send Messages**: Exchange text messages or upload media (e.g., images) in real time.
4. **Manage Conversations**: View, edit, or delete conversations from the dashboard.
5. **Real-Time Updates**: Receive instant notifications for new messages or activities.

## Project Structure

```
chatify-io/
├── server/                    # Backend server and API logic
│   ├── config/                 # Database and Cloudinary setup
│   ├── models/                 # MongoDB schemas (e.g., User, Message, Conversation)
│   ├── routes/                 # API routes under /api/v1 (e.g., auth, messages)
│   ├── socket/                 # Socket.io event handlers
│   ├── middleware/             # Custom middleware (e.g., authentication)
│   └── server.js               # Backend entry point
├── client/                   # React.js frontend (Vite-based)
│   ├── src/                    # React components, hooks, and logic
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/              # Page components (e.g., Login, Chat)
│   │   ├── context/            # React context for state management
│   │   └── assets/             # Static assets (e.g., images, styles)
│   ├── public/                 # Public assets (e.g., index.html, favicon)
│   └── package.json            # Frontend dependencies
├── .gitignore                  # Files and folders ignored by Git
└── README.md                   # Project documentation
```

## API Endpoints

Example API endpoints (update based on your implementation):

- **POST** `/api/v1/auth/register`: Register a new user
- **POST** `/api/v1/auth/login`: Log in an existing user
- **GET** `/api/v1/conversations`: Fetch all conversations for the authenticated user
- **POST** `/api/v1/conversations`: Create a new conversation
- **GET** `/api/v1/messages/:conversationId`: Fetch messages for a specific conversation
- **POST** `/api/v1/messages`: Send a new message
- **POST** `/api/v1/upload`: Upload media files via Cloudinary

## Socket.io Events

- **connection**: Establishes a WebSocket connection
- **joinConversation**: Joins a user to a conversation by ID
- **sendMessage**: Emits a new message to recipients
- **receiveMessage**: Listens for incoming messages in real time

## Contributing

We welcome contributions to improve Chatify.io! To contribute(check LICENSE):

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Make your changes and commit: `git commit -m "Add your feature"`.
4. Push to your branch: `git push origin feature/your-feature-name`.
5. Open a Pull Request on GitHub.

Ensure your code follows the project's coding standards and includes relevant tests.

## Testing

- **Backend**: Run `npm test` in the `backend` directory (if tests are implemented).
- **Frontend**: Run `npm test` in the `frontend` directory for React tests (e.g., Jest).
- Manually test the application using the UI or API endpoints with tools like Postman.

## Deployment

To deploy Chatify.io, consider:

- **Frontend**: Netlify or Render
- **Backend**: Heroku, Render, AWS
- **Database**: MongoDB Atlas
- **Media Storage**: Cloudinary

1. Set up environment variables in your deployment platform (e.g., `DB_CONECTION_STRING`, `CLOUDINARY_CLOUD_NAME`).
2. Deploy the backend and frontend separately.
3. Update `VITE_API_BASE_URL` in the frontend `.env` to point to the deployed backend URL.

## Troubleshooting

- **MongoDB Connection Issues**: Verify `DB_CONECTION_STRING` and ensure MongoDB is running.
- **Socket.io Errors**: Confirm CORS settings and that `VITE_API_BASE_URL` matches the backend's URL/port.
- **JWT Errors**: Ensure `JWT_SEC` is consistent and secure across sessions.
- **Cloudinary Uploads Failing**: Check `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET`.
- **Email Issues**: Verify `EMAIL_USERNAME` and `EMAIL_PASS` (use an app-specific password for Gmail).
- **Frontend Not Loading**: Ensure `VITE_API_BASE_URL` is correct and the backend is running.

## Security Notes

- **Sensitive Data**: Never commit your `.env` files to version control. Ensure `.env` is listed in `.gitignore`.
- **JWT Secret**: Use a strong, unique `JWT_SEC` in production.
- **Email Credentials**: Use app-specific passwords for `EMAIL_PASS` to avoid security risks.
- **Cloudinary**: Keep `CLOUDINARY_API_SECRET` secure and avoid exposing it in client-side code.

## Future Improvements

- Add end-to-end encryption for messages.
- Implement group chat functionality.
- Support additional media types (e.g., videos, documents) via Cloudinary.
- Add typing indicators and read receipts.
- Integrate push notifications for offline users.

## License

This project is licensed under the [MIT License](LICENSE). See the LICENSE file for details.

## Contact

For questions or support, contact [shaifsab](https://github.com/shaifsab) at [workforshaif@gmail.com](mailto:workforshaif@gmail.com) or open an issue on the [GitHub repository](https://github.com/shaifsab/chatify-io).

---

© 2025 Chatify.io
