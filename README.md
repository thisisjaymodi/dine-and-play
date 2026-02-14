# 🍽️ Dine and Play

A modern **restaurant management and gaming application frontend** built with React and Vite. Dine and Play combines elegant dining service management with interactive entertainment experiences to create a unique customer engagement platform.

## 📋 Overview

Dine and Play is a full-featured frontend application designed for modern restaurants seeking to enhance customer engagement through integrated gaming experiences. The application provides intuitive interfaces for managing dining operations while offering interactive entertainment features that keep customers engaged before, during, and after their meals.

This repository contains the **frontend client** built with React 19 and Vite, featuring a responsive user interface optimized for both desktop and mobile experiences.

## ✨ Features

- **Restaurant Management Dashboard** – Handle orders, menu items, and customer interactions
- **Interactive Gaming Experience** – Built-in games and activities for customer engagement
- **Real-time Order Tracking** – Monitor and manage orders in real-time
- **Responsive Design** – Optimized for desktop, tablet, and mobile devices
- **Modern UI Components** – Beautiful, intuitive interface using DaisyUI
- **Icon Library** – Comprehensive icon set with React Icons
- **State Management** – Efficient routing and component state handling with React Router

## 🚀 Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend Framework** | React 19.2.0 |
| **Build Tool** | Vite 7.3.1 |
| **Styling** | Tailwind CSS + DaisyUI 5.5.18 |
| **Routing** | React Router 7.13.0 |
| **Icons** | React Icons 5.5.0 |
| **UI Utilities** | clsx 2.1.1, canvas-confetti 1.9.4 |
| **Language** | JavaScript ES6+ |
| **Package Manager** | npm |

## 📁 Project Structure

```
client/
├── src/
│   ├── assets/              # Static files (images, icons, etc.)
│   ├── components/          # Reusable React components
│   │   ├── common/         # Common UI components
│   │   ├── forms/          # Form components
│   │   └── cards/          # Card components
│   ├── data/               # Mock data, constants, configurations
│   ├── features/           # Feature-specific modules
│   │   ├── restaurant/     # Restaurant management features
│   │   ├── gaming/         # Gaming features
│   │   └── orders/         # Order management
│   ├── layouts/            # Layout components
│   ├── pages/              # Page components (routes)
│   ├── ui/                 # UI utilities and helpers
│   ├── App.jsx             # Main App component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── public/                 # Static assets served directly
├── .cursorrules            # AI assistant rules
├── .gitignore              # Git ignore file
├── eslint.config.js        # ESLint configuration
├── index.html              # HTML template
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
└── tailwind.config.js      # Tailwind CSS configuration
```

## 🛠️ Installation

### Prerequisites

- Node.js (v16 or higher)
- npm 7.0 or higher

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/thisisjaymodi/dine-and-play.git
   cd dine-and-play/client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

## 📝 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot module replacement (HMR) |
| `npm run build` | Build for production (output to `dist/` directory) |
| `npm run lint` | Run ESLint to check code quality |
| `npm run preview` | Preview production build locally |

## 🎮 Usage

1. **Start the dev server**
   ```bash
   npm run dev
   ```

2. **Open your browser** and navigate to `http://localhost:5173`

3. **Explore the application**
   - Navigate through different restaurant management features
   - Interact with the gaming experiences
   - Manage orders and customer activities
   - Experience the responsive design on different screen sizes

## 🔧 Configuration

### Vite Configuration
The project uses Vite for fast development and optimized production builds. Configuration can be modified in `vite.config.js`:
- React plugin with automatic JSX refresh
- Asset handling and optimization
- Development server configuration

### Tailwind CSS
Customize styling by editing `tailwind.config.js`:
- Extend default colors and spacing
- Add custom utilities
- Configure plugins like DaisyUI

### ESLint
Code quality rules are defined in `eslint.config.js`. Run `npm run lint` to check your code.

## 🎨 Styling

The project uses a modern CSS-in-utility approach:
- **Tailwind CSS** for utility-first styling
- **DaisyUI** for pre-built components and themes
- **Custom CSS** in `src/index.css` for global styles
- **Component-scoped styling** using Tailwind classes

## 🔀 Routing

The application uses React Router v7 for client-side navigation. Main routes are defined in `src/App.jsx`:
- Restaurant management dashboard
- Gaming features
- Order tracking
- Customer profiles

## 🚀 Build & Deployment

### Production Build
```bash
npm run build
```
Creates an optimized production build in the `dist/` folder.

### Preview Production Build
```bash
npm run preview
```
Serves the production build locally for testing before deployment.

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

Contributions are welcome! Follow these steps:

1. **Fork** the repository
2. **Create** a feature branch
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make** your changes and commit
   ```bash
   git commit -m "Add amazing feature"
   ```
4. **Push** to your fork
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open** a Pull Request

### Code Style
- Follow the existing code structure
- Run ESLint before committing: `npm run lint`
- Use meaningful commit messages
- Ensure responsive design for all screen sizes

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

**Jay Modi**
- GitHub: [@thisisjaymodi](https://github.com/thisisjaymodi)
- Location: Toronto, Ontario, Canada

## 🙏 Acknowledgments

- Built with [React 19](https://react.dev/) – The JavaScript library for building user interfaces
- Powered by [Vite](https://vitejs.dev/) – Next generation frontend tooling
- Styled with [Tailwind CSS](https://tailwindcss.com/) and [DaisyUI](https://daisyui.com/)
- Icons from [React Icons](https://react-icons.github.io/react-icons/)
- Special effects with [canvas-confetti](https://github.com/catdad/canvas-confetti)

## 📞 Support

For issues, questions, or suggestions, please open a [GitHub Issue](https://github.com/thisisjaymodi/dine-and-play/issues).

---

⭐ **If you find this project helpful, please consider giving it a star!** ⭐

Made with ❤️ by Jay Modi
