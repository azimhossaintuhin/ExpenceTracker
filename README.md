# Task Master ✅ <img src="./src/assets/todo-icon.png" alt="Task Master Icon" width="150" height="150">

## Overview
Task Master is a powerful, user-friendly mobile application designed to help you effortlessly manage and organize your daily tasks. Built with React Native and Django REST Framework, this full-stack app provides a seamless experience for task management across iOS and Android platforms.

## 🌟 Features
- **User Authentication**: Secure login and profile management
- **Task Organization**: Create, organize, and prioritize tasks
- **Smart Categories**: Group tasks by projects or categories
- **Due Dates**: Set and track task deadlines
- **Intuitive UI**: Clean and responsive design using React Native
- **MMKV Storage**: MMKV integration for offline data access
- **Flexible Navigation**: Smooth bottom sheet interactions

## 🚀 Tech Stack

### Frontend
- **React Native**: Cross-platform mobile development
- **Expo**: Rapid development and deployment
- **React Navigation**: Smooth screen transitions
- **@gorhom/bottom-sheet**: Interactive bottom sheet components
- **AsyncStorage**: Local data persistence

### Backend
- **Django**: Robust Python web framework
- **Django Rest Framework (DRF)**: Powerful API development
- **SQLite**: Lightweight, serverless database

## 🛠 Installation

### Backend Setup
1. Navigate to the backend directory:
```bash
cd server
```

2. Create and activate a virtual environment:
```bash
# On macOS/Linux
python3 -m venv env
source env/bin/activate

# On Windows
python -m venv env
env\Scripts\activate
```

3. Install backend dependencies:
```bash
pip install -r requirements.txt
```

4. Apply database migrations:
```bash
python manage.py migrate
```

5. Start the Django development server:
```bash
python manage.py runserver
```

### Frontend Setup
1. Return to project root:
```bash
cd ..
```

2. Install frontend dependencies:
```bash
npm install
```

3. Launch Expo development server:
```bash
npx expo start
```

## 📂 Project Structure
```
task-master/
│
├── server/               # Django Backend
│   ├── api/              # API endpoints
│   ├── core/             # Core configurations
│   ├── utils/            # Utility functions
│   ├── db.sqlite3        # Local database
│   └── requirements.txt  # Backend dependencies
│
├── src/                  # React Native Frontend
│   ├── components/       # Reusable UI components
│   ├── screens/          # App screens
│   ├── navigation/       # Navigation setup
│   ├── context/          # State management
│   └── App.tsx          # Application entry point
│
├── assets/               # Project assets
└── README.md            # Project documentation
```

## 💾 Database
The project uses **SQLite** for local development and data persistence. To inspect the database, we recommend:
- VS Code SQLite Viewer extension
- DB Browser for SQLite

## 🔑 API Endpoints

### Tasks
- `GET /api/tasks/` - Get all tasks
- `POST /api/tasks/` - Create a new task
- `PUT /api/tasks/:id/` - Update a task
- `DELETE /api/tasks/:id/` - Delete a task

### Users
- `POST /api/users/register/` - Register a new user
- `POST /api/users/login/` - User login
- `GET /api/users/profile/` - Get user profile

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
