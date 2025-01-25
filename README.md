# Expense Tracker 💸

<img src="./src/assets/budget.png" alt="Expense Tracker Screenshot" width="300" height="600">
## Overview

Expense Tracker is a powerful, user-friendly mobile application designed to help you effortlessly manage and track your personal expenses. Built with modern technologies, this full-stack app provides a seamless experience for financial tracking and analysis.

## 🌟 Features

- **User Authentication**: Secure login and profile management
- **Expense Categorization**: Organize expenses into customizable categories
- **Intuitive UI**: Clean and responsive design using React Native
- **Local Database**: SQLite integration for offline data storage
- **Flexible Navigation**: Smooth bottom sheet interactions

## 🚀 Tech Stack

### Frontend
- **React Native**: Cross-platform mobile development
- **Expo**: Rapid development and deployment
- **React Navigation**: Smooth screen transitions
- **@gorhom/bottom-sheet**: Interactive bottom sheet components

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
expense-tracker/
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
│   └── App.tsx           # Application entry point
│
├── assets/               # Project assets
└── README.md             # Project documentation
```

## 💾 Database

The project uses **SQLite** for local development and data persistence. To inspect the database, we recommend:
- VS Code SQLite Viewer extension
- DB Browser for SQLite

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for details.

## 📞 Contact

For questions or support, please open an issue in the GitHub repository.

**Happy Expense Tracking! 📊**
