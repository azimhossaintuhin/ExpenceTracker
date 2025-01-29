# Task Master ✅

## Overview
Task Master is a modern, intuitive todo application designed to help users organize their daily tasks and boost productivity. Built with a clean, responsive interface and powerful features, this full-stack application makes task management effortless and efficient.

## 🌟 Features
- **User Authentication**: Secure login and profile management
- **Task Organization**: Create, organize, and prioritize tasks
- **Smart Categories**: Group tasks by projects or categories
- **Due Dates**: Set and track task deadlines
- **Progress Tracking**: Monitor completion status
- **Responsive Design**: Seamless experience across all devices

## 🚀 Tech Stack

### Frontend
- **React**: Modern UI development
- **Material-UI**: Polished component library
- **Redux**: State management
- **React Router**: Navigation handling
- **Axios**: API communication

### Backend
- **Node.js**: Runtime environment
- **Express**: Web application framework
- **MongoDB**: NoSQL database
- **JWT**: Authentication management

## 🛠 Installation

### Backend Setup
1. Navigate to the backend directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with your MongoDB URI and JWT secret:
```env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

4. Start the server:
```bash
npm run dev
```

### Frontend Setup
1. Navigate to the frontend directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

## 📂 Project Structure
```
task-master/
│
├── client/              # React Frontend
│   ├── public/          # Static files
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Application pages
│   │   ├── redux/       # State management
│   │   ├── utils/       # Helper functions
│   │   └── App.js       # Main component
│   │
│   └── package.json     # Frontend dependencies
│
├── server/              # Node.js Backend
│   ├── controllers/     # Request handlers
│   ├── models/          # Database schemas
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   └── package.json     # Backend dependencies
│
└── README.md            # Project documentation
```

## 💾 Database
The project uses **MongoDB** as its primary database. To manage your database:
- Use MongoDB Compass for visual database management
- Connect to your MongoDB instance using the provided URI
- Manage collections through the MongoDB shell or GUI

## 🔑 API Endpoints

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

### Users
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - User login
- `GET /api/users/profile` - Get user profile

## 🤝 Contributing
We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support
For support, feature requests, or bug reports, please open an issue in the GitHub repository.

**Happy Task Managing! ✨**
