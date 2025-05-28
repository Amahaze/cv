
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import HomeNavbar from './components/HomeNavbar';
import AboutNavbar from './components/AboutNavbar';
import ProjectsNavbar from './components/ProjectsNavbar';
import ContactNavbar from './components/ContactNavbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import GlobalStyles from './styles/GlobalStyles';

const theme = {
  colors: {
    primary: '#000000',
    secondary: '#ffffff',
    accent: '#ff4d5a',
    gray: '#333333',
    lightGray: '#f5f5f5'
  },
  fonts: {
    main: "'Poppins', sans-serif",
    heading: "'Playfair Display', serif"
  },
  breakpoints: {
    mobile: '576px',
    tablet: '768px',
    laptop: '992px',
    desktop: '1200px'
  }
};

const NavbarSelector = () => {
  const location = useLocation();
  
  switch(location.pathname) {
    case '/about':
      return <AboutNavbar />;
    case '/projects':
      return <ProjectsNavbar />;
    case '/contact':
      return <ContactNavbar />;
    default:
      return <HomeNavbar />;
  }
};

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <NavbarSelector />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </ThemeProvider>
    </Router>
  );
}

export default App;