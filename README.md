# Task Reminder System

A modern, full-stack task management application built with React frontend and Node.js backend, designed to help users organize, track, and manage their daily tasks efficiently.

## 🚀 Features

### Current Features (v1.0)
- ✅ **Task Management**: Create, edit, delete, and mark tasks as complete
- ✅ **Priority System**: Organize tasks by priority (High, Medium, Low)
- ✅ **Due Date Tracking**: Set and track task deadlines
- ✅ **Status Management**: Separate pending and completed tasks
- ✅ **Overdue Detection**: Visual indicators for overdue tasks
- ✅ **Responsive Design**: Works on desktop, tablet, and mobile devices
- ✅ **Interactive UI**: Modern, clean interface with hover effects and animations

### Planned Features (Roadmap)
- 🔄 **User Authentication**: Register, login, and user profiles
- 🔄 **Data Persistence**: Backend API with database storage
- 🔄 **Task Categories**: Organize tasks into custom categories
- 🔄 **Calendar View**: Visual calendar for task scheduling
- 🔄 **Notifications**: Email, SMS, and push notifications
- 🔄 **Task Sharing**: Collaborate on tasks with team members
- 🔄 **Analytics**: Task completion statistics and productivity insights
- 🔄 **Dark Mode**: Theme switching capability
- 🔄 **Search & Filter**: Advanced task filtering and search
- 🔄 **Recurring Tasks**: Set up repeating tasks

## 🛠️ Tech Stack

### Frontend
- **React** 18.x - UI framework
- **CSS3** - Styling with modern features
- **JavaScript ES6+** - Modern JavaScript features

### Backend (Planned)
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **JWT** - Authentication
- **Nodemailer** - Email notifications

### DevOps
- **Docker** - Containerization
- **GitHub Actions** - CI/CD pipeline
- **Nginx** - Reverse proxy

## 📁 Project Structure

```
task-reminder-system/
├── frontend/                          # React frontend application
│   ├── public/                        # Static files
│   ├── src/
│   │   ├── components/                # Reusable UI components
│   │   │   ├── common/               # Generic components
│   │   │   │   └── Header/           # Navigation header
│   │   │   └── task/                 # Task-specific components
│   │   │       ├── TaskCard/         # Individual task display
│   │   │       ├── TaskForm/         # Task creation form
│   │   │       └── TaskList/         # Task list container
│   │   ├── hooks/                    # Custom React hooks (planned)
│   │   ├── services/                 # API service layer (planned)
│   │   ├── context/                  # React Context providers (planned)
│   │   ├── utils/                    # Utility functions
│   │   └── styles/                   # Global styles and themes
│   └── package.json
├── backend/                           # Backend services (planned)
│   └── nodejs-api/                   # Node.js REST API
├── docs/                             # Documentation
├── docker/                           # Docker configuration
└── scripts/                          # Build and deployment scripts
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/task-reminder-system.git
   cd task-reminder-system
   ```

2. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

### Alternative Setup (Create React App)
If starting fresh:
```bash
npx create-react-app task-reminder-frontend
cd task-reminder-frontend
npm start
```

## 🎯 Usage

### Adding Tasks
1. Fill out the task form with:
   - **Title**: Brief description of the task
   - **Description**: Detailed information (optional)
   - **Due Date**: When the task should be completed
   - **Priority**: High (🔴), Medium (🟡), or Low (🟢)

2. Click "Add Task" to create the task

### Managing Tasks
- **Complete Task**: Check the checkbox next to the task title
- **Delete Task**: Click the ❌ button on the task card
- **View Status**: Tasks are automatically organized into "Pending" and "Completed" sections

### Visual Indicators
- **Priority Colors**: Red (High), Yellow (Medium), Green (Low)
- **Overdue Tasks**: Highlighted with red border and "Overdue" badge
- **Completed Tasks**: Struck-through text and muted appearance

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Test Structure
- **Unit Tests**: Individual component testing
- **Integration Tests**: Component interaction testing
- **E2E Tests**: Full user workflow testing (planned)

## 🚢 Deployment

### Development Build
```bash
npm run build
```

### Docker Deployment
```bash
# Build Docker image
docker build -t task-reminder-app .

# Run container
docker run -p 3000:3000 task-reminder-app
```

### Production Deployment (Planned)
- **Frontend**: Deployed on Vercel/Netlify
- **Backend**: Deployed on Heroku/AWS
- **Database**: MongoDB Atlas

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests for new functionality
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Code Standards
- Follow **ESLint** configuration
- Use **Prettier** for code formatting
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📋 Available Scripts

### Frontend Scripts
```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run test suite
npm run eject      # Eject from Create React App (one-way)
npm run lint       # Run ESLint
npm run format     # Format code with Prettier
```

### Backend Scripts (Planned)
```bash
npm run dev        # Start development server with nodemon
npm run start      # Start production server
npm run test       # Run backend tests
npm run seed       # Seed database with sample data
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the frontend directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_APP_NAME=Task Reminder System
REACT_APP_VERSION=1.0.0
```

### Backend Configuration (Planned)
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/task-reminder
JWT_SECRET=your-secret-key
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

## 📊 Performance

### Optimization Features
- **Component Lazy Loading**: Reduce initial bundle size
- **Image Optimization**: Compressed and responsive images
- **Caching Strategy**: Browser and API caching
- **Bundle Analysis**: Webpack bundle analyzer

### Performance Metrics (Target)
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Lighthouse Score**: > 90

## 🐛 Known Issues

- [ ] Tasks are currently stored in local state (no persistence)
- [ ] No user authentication yet
- [ ] Limited to single-user functionality
- [ ] No offline capability

## 🛣️ Roadmap

### Phase 1 (Current) - MVP Frontend
- ✅ Basic task CRUD operations
- ✅ Priority system
- ✅ Due date tracking
- ✅ Responsive design

### Phase 2 - Backend Integration
- 🔄 REST API development
- 🔄 Database setup
- 🔄 User authentication
- 🔄 Data persistence

### Phase 3 - Advanced Features
- 🔄 Notifications system
- 🔄 Task categories
- 🔄 Calendar integration
- 🔄 Team collaboration

### Phase 4 - Optimization & Polish
- 🔄 Performance optimization
- 🔄 Advanced analytics
- 🔄 Mobile app
- 🔄 Offline support

## 📞 Support

### Getting Help
- 📧 **Email**: support@taskreminder.com
- 💬 **Discord**: [Join our community](https://discord.gg/taskreminder)
- 📖 **Documentation**: [Read the docs](https://docs.taskreminder.com)
- 🐛 **Issues**: [Report bugs](https://github.com/yourusername/task-reminder-system/issues)

### FAQ

**Q: How do I reset my tasks?**
A: Currently, you can delete tasks individually. A "Clear All" feature is planned.

**Q: Can I export my tasks?**
A: Export functionality is planned for a future release.

**Q: Is there a mobile app?**
A: Not yet, but the web app is fully responsive. A native mobile app is in the roadmap.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Authors

- **Your Name** - *Initial work* - [YourGitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- Thanks to the React team for the amazing framework
- Icons by [Lucide React](https://lucide.dev/)
- Inspiration from various task management tools
- Community contributors and testers

---

**⭐ If you found this project helpful, please consider giving it a star!**

**📢 Follow us for updates:** [Twitter](https://twitter.com/taskreminder) | [LinkedIn](https://linkedin.com/company/taskreminder)