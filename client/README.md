# Chat Application

A simple chat application built with React that includes:

- User authentication (login and registration)
- Conversation list
- Chat functionality
- Add conversations by email

## Features

- **Login Page**: Simple login form with email and password fields
- **Registration Page**: User registration with full name, email, and password
- **Chat Page**: 
  - Conversation list in the left sidebar
  - Chat box in the main area
  - Option to add new conversations by email

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to the URL shown in the terminal

## Technology Stack

- React 19
- React Router
- CSS (custom styling)

## Note

This is a frontend-only implementation with mock data. In a real-world scenario, you would connect to a backend service for user authentication and real-time messaging functionality.

## Future Improvements

- Add real backend integration
- Implement real-time messaging with WebSockets
- Add user profile management
- Add message delivery status (sent, delivered, read)
- Implement file sharing and media messages
