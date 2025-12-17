# HSC Distinguished Achievers - React Application

A modern, searchable React application displaying the 2025 HSC Distinguished Achievers data.

## 🎯 Project Overview

This project transforms the original Infogram HTML infographic into a fully functional React application with enhanced search capabilities, pagination, and a premium modern design.

## ✨ Features

- **🔍 Real-time Search**: Search by family name, first name, school name, or course
- **📊 20,440+ Student Records**: Complete database of HSC Distinguished Achievers
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **🎨 Modern UI**: Dark theme with glassmorphism effects and smooth animations
- **⚡ Fast Performance**: Optimized with React hooks and memoization
- **📄 Pagination**: Easy navigation through large datasets
- **♿ Accessible**: Semantic HTML and keyboard navigation support
- **📈 Analytics**: Integrated Vercel Analytics and Speed Insights for performance monitoring

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd "hsc distinguished achievers/hsc-achievers-react"
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

## 📁 Project Structure

```
hsc-achievers-react/
├── src/
│   ├── data/
│   │   └── students.json      # Extracted student data
│   ├── App.jsx                # Main application component
│   ├── App.css                # Application styles
│   ├── main.jsx               # React entry point
│   └── index.css              # Global styles
├── index.html                 # HTML template
└── package.json               # Dependencies and scripts
```

## 🎨 Design Features

- **Color Scheme**: Modern dark theme with accent colors (#2aa9e1, #00a69e)
- **Typography**: Montserrat for headings, Inter for body text
- **Effects**: Glassmorphism, smooth transitions, hover animations
- **Layout**: Responsive grid with mobile-first approach

## 📊 Data Extraction

The student data was extracted from the original Infogram HTML file using a custom Node.js script (`extract-data.js`) that:

1. Parses the embedded JSON data structure
2. Extracts student information including:
   - Family Name
   - First Name/s
   - School Name
   - Up to 8 courses per student
3. Converts to a clean JSON format for React consumption

## 🛠️ Technologies Used

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and dev server
- **CSS3**: Custom styling with modern features
- **Google Fonts**: Montserrat and Inter typefaces
- **Vercel Analytics**: Page view and user interaction tracking
- **Vercel Speed Insights**: Real-time performance monitoring

## 📝 Key Components

### Search Functionality
- Filters across all student fields
- Case-insensitive matching
- Real-time results update
- Clear button for quick reset

### Pagination
- 50 students per page
- Previous/Next navigation
- Current page indicator
- Automatic reset on search

### Table Display
- Sticky header for easy reference
- Hover effects for better UX
- Course badges with color coding
- Responsive column layout

## 🎯 Future Enhancements

Potential improvements for future versions:

- [ ] Advanced filtering (by school, course, etc.)
- [ ] Sort functionality (alphabetical, by school)
- [ ] Export to CSV/PDF
- [ ] Student detail modal
- [ ] Statistics dashboard
- [ ] Dark/Light theme toggle
- [ ] Bookmark favorite students
- [ ] Share individual student achievements

## 📄 License

This project displays publicly available HSC achievement data.

## 🙏 Acknowledgments

- Data source: NSW Education Standards Authority (NESA)
- Original infographic: Infogram platform
- Design inspiration: Modern web design trends

---

**Built with ❤️ using React and Vite**
