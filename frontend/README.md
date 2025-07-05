# Log System Frontend

A modern, responsive React application for log management and monitoring with a professional UI/UX design.

## 🎨 Features

- ✅ **Modern React 18** with hooks and functional components
- ✅ **Responsive Design** with Tailwind CSS
- ✅ **Real-time Log Filtering** with multiple criteria
- ✅ **Professional UI** with proper loading states and error handling
- ✅ **Statistics Dashboard** showing log counts by level
- ✅ **Advanced Filtering** with active filter indicators
- ✅ **Clean Architecture** with separated concerns
- ✅ **TypeScript Ready** with proper type definitions

## 🚀 Quick Start

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:3000`

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── FilterBar.jsx   # Log filtering interface
│   └── LogList.jsx     # Log display component
├── services/           # API services
│   └── api.js         # API client and functions
├── App.jsx            # Main application component
├── index.jsx          # Application entry point
└── index.css          # Global styles
```

## 🎯 Components

### FilterBar
Professional filtering interface with:
- Message search with real-time filtering
- Log level dropdown
- Resource ID filtering
- Date range selection
- Active filter indicators
- Clear all filters functionality

### LogList
Advanced log display with:
- Color-coded log levels with icons
- Formatted timestamps
- Structured metadata display
- Responsive grid layout
- Empty state handling
- Professional styling

## 🔌 API Integration

The frontend integrates with the backend API through the `api.js` service:

```javascript
import { logAPI } from './services/api';

// Get logs with filters
const logs = await logAPI.getLogs({ level: 'error' });

// Get statistics
const stats = await logAPI.getLogStats();

// Search logs
const results = await logAPI.searchLogs('error message');
```

## 🎨 Styling

Built with **Tailwind CSS** for:
- Responsive design
- Consistent spacing and colors
- Professional appearance
- Dark mode ready (can be easily added)
- Custom component styling

## 🔧 Configuration

The application is configured through:
- `vite.config.js` - Build configuration
- `tailwind.config.js` - Styling configuration
- `postcss.config.js` - CSS processing
- Environment variables for API endpoints

## 🚀 Deployment

1. Build the application:
```bash
npm run build
```

2. The built files will be in the `dist/` directory

3. Deploy to your preferred hosting service (Netlify, Vercel, etc.)

## 🔍 Development

### Adding New Features
1. Create components in `src/components/`
2. Add API functions in `src/services/api.js`
3. Update the main App component as needed
4. Add proper error handling and loading states

### Styling Guidelines
- Use Tailwind CSS classes
- Follow the existing color scheme
- Ensure responsive design
- Add proper hover and focus states

### Code Quality
- Run `npm run lint` before committing
- Follow React best practices
- Use functional components with hooks
- Add proper error boundaries

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Follow the existing code style
2. Add proper error handling
3. Ensure responsive design
4. Test on multiple browsers
5. Update documentation

## 📄 License

ISC License 