# 🍽️ Dine and Play

A modern restaurant management and gaming application frontend built with React and Vite.

## 📋 Overview

Dine and Play combines restaurant operations with an interactive gaming experience. This repository currently contains the **frontend client**, featuring a responsive user interface for managing dining services and engaging in entertainment activities.

## ✨ Features

- **Restaurant Management**: Handle orders, menu items, and customer service
- **Interactive Gaming**: Engage customers with built-in gaming experiences
- **Responsive Design**: Optimized for desktop and mobile devices
- **Modern UI/UX**: Clean and intuitive user interface

## 🚀 Tech Stack

- **Framework**: React.js (Vite)
- **Language**: JavaScript (ES6+)
- **Styling**: CSS3
- **Package Manager**: npm

## 📁 Project Structure

```
dine-and-play/
├── client/              # Frontend React application
│   ├── src/            # Source files
│   ├── public/         # Static assets
│   └── package.json    # Client dependencies
├── package.json        # Root dependencies
└── .gitignore         # Git ignore rules
```

## 🛠️ Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/thisisjaymodi/dine-and-play.git
   cd dine-and-play
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install

   # Install client dependencies
   cd client
   npm install
   cd ..
   ```

3. **Environment Variables**

   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   ```

4. **Run the application**
   ```bash
   # Development mode (runs both client and server)
   npm run dev

   # Run server only
   npm run server

   # Run client only
   npm run client
   ```

## 🎮 Usage

1. Navigate to `http://localhost:3000` in your browser
2. Create an account or login
3. Explore restaurant management features
4. Engage with gaming activities
5. Manage orders and customer interactions

## 📝 Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Run in development mode with hot reload
- `npm run client` - Start the client application only
- `npm run server` - Start the server only
- `npm test` - Run test suites
- `npm run build` - Build for production

## 🔧 Configuration

The application can be configured through environment variables:

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port number | 5000 |
| `MONGODB_URI` | MongoDB connection string | - |
| `JWT_SECRET` | Secret key for JWT authentication | - |
| `NODE_ENV` | Environment mode | development |

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Jay Modi**
- GitHub: [@thisisjaymodi](https://github.com/thisisjaymodi)

## 🙏 Acknowledgments

- Built with React and Node.js
- Inspired by modern restaurant management systems
- Community contributions and feedback

---

⭐ **If you find this project useful, please consider giving it a star!** ⭐
