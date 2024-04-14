# Chat Application API
A real-time chat application API that allows users to communicate through text and voice messages. This API supports both private and group chats, offering a seamless communication experience.

## API Documentation

The documentation for the Chat Application API can be found [here](https://documenter.getpostman.com/view/31765464/2sA3Bhfun4#0e722fcf-9dd4-4cd3-9ab2-36de33868f43).

## Features
- **Private Chat**: Users can engage in one-on-one private conversations securely.
- **Group Chat**: Create or join group chats to communicate with multiple users simultaneously.
- **Text and Voice Messages**: Send and receive text and voice messages within the app.
- **Admin Capabilities**: Admins can manage users, add or remove members from groups, and promote other users to admin status.
- **Profile Pictures**: Users can view profile pictures of others with whom they share a chat history.
- **Invite Links**: Admins can generate invite links for group chats, simplifying the process for users to join.
- **Exit Group**: Users have the option to exit group chats at any time.
- **Socket.IO Integration**: Utilizes Socket.IO to enable real-time, dynamic communication between users.
- **Authentication**: Sign up and sign in functionality is implemented with JSON Web Token (JWT) for secure validation. Passwords are hashed using bcrypt for added security.
- **Email Notifications**: Nodemailer is used to send email notifications when users sign up.
- **Error Handling**: Asynchandler is used for handling asynchronous operations and error handling.


## Getting Started

To get started with the Chat Application API, follow these steps:

1. Clone the repository to your local machine.
2. Install the necessary dependencies by running `npm install`.
3. Create a `.env` file in the root directory of the project.
4. Add the following environment variables to the `.env` file:
   - `PORT`: Port number for the server to listen on.
   - `SECRET_KEY`: Secret key for JWT token generation.
   - `URL`: MongoDB connection string.
5. Ensure that the SMTP settings of your email account allow for third-party applications to send emails. In some cases, you may need to enable "less secure apps" or generate an app-specific password.
6. If you're using a Gmail account to send emails, you may need to set up "two-step verification" for your Google account. This additional security step ensures that only authorized applications can access your Gmail account for sending emails.
7. Start the server using `npm start`.
8. Access the API endpoints using your preferred API client (e.g., Postman).


## Technologies Used

- Node.js
- Express.js
- Socket.IO
- JSON Web Token (JWT)
- MongoDB with Mongoose
- Bcrypt
- Nodemailer
- Asynchandler

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please fork the repository and submit a pull request with your changes.
