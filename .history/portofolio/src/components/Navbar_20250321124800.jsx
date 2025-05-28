import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 1rem 2rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: ${({ isAboutPage }) => 
    isAboutPage 
      ? 'linear-gradient(to bottom, #fff 80%, rgba(255, 255, 255, 0))'
      : 'linear-gradient(to bottom, #000 80%, rgba(0, 0, 0, 0))'};
  transition: all 0.3s ease;
  overflow: hidden;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
`;

const Logo = styled(Link)`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 2rem;
  font-weight: 900;
  letter-spacing: 0.05em;
  position: relative;
  z-index: 2;
  background: ${({ isAboutPage }) => 
    isAboutPage 
      ? 'linear-gradient(45deg, #fff 0%, #000 50%, #fff 100%)'
      : 'linear-gradient(45deg, #000 0%, #fff 50%, #000 100%)'};
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: none;
  animation: gradientShift 6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  border: 2px solid transparent;
  padding: 0.2em 0.4em;
  border-image: ${({ isAboutPage }) => 
    isAboutPage 
      ? 'linear-gradient(45deg, #000, #fff) 1'
      : 'linear-gradient(45deg, #fff, #000) 1'};
  animation: gradientShift 6s cubic-bezier(0.4, 0, 0.2, 1) infinite, borderShift 6s cubic-bezier(0.4, 0, 0.2, 1) infinite;

  @keyframes gradientShift {
    0% { background-position: 0% 50% }
    25% { background-position: 50% 100% }
    50% { background-position: 100% 50% }
    75% { background-position: 50% 0% }
    100% { background-position: 0% 50% }
  }

  @keyframes borderShift {
    0% { border-image: linear-gradient(45deg, #fff, transparent, #000) 1 }
    25% { border-image: linear-gradient(45deg, #000, #fff, transparent) 1 }
    50% { border-image: linear-gradient(45deg, transparent, #000, #fff) 1 }
    75% { border-image: linear-gradient(45deg, #fff, transparent, #000) 1 }
    100% { border-image: linear-gradient(45deg, #000, #fff, transparent) 1 }
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2.5rem;
  margin-left: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${({ isAboutPage }) => 
      isAboutPage 
        ? 'rgba(255, 255, 255, 0.95)'
        : 'rgba(0, 0, 0, 0.95)'};
    justify-content: center;
    align-items: center;
    z-index: 1;
    padding: 1rem 2rem;
    margin-left: 0;
  }
`;

const NavItem = styled.div`
  position: relative;
  padding: 0.2rem 0.8rem;
  overflow: hidden;
  border-radius: 4px;
  background: transparent;
  border: 2px solid transparent;
  border-image: linear-gradient(45deg, #fff, #000, #fff) 1;
  transition: all 0.3s ease;
  animation: borderPrism 6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  
  @keyframes borderPrism {
    0% { border-image: linear-gradient(45deg, #fff, transparent, #000) 1 }
    20% { border-image: linear-gradient(45deg, #000, #fff, transparent) 1 }
    40% { border-image: linear-gradient(45deg, transparent, #000, #fff) 1 }
    60% { border-image: linear-gradient(45deg, #fff, transparent, #000) 1 }
    80% { border-image: linear-gradient(45deg, #000, #fff, transparent) 1 }
    100% { border-image: linear-gradient(45deg, #fff, transparent, #000) 1 }
  }
  
  &:hover {
    transform: scale(1.05);
    border-image: linear-gradient(45deg, #4B0082, #fff, #4B0082) 1;
    background: linear-gradient(45deg, rgba(75, 0, 130, 0.1), transparent);
    box-shadow: 0 0 15px rgba(75, 0, 130, 0.3);
  }
`;

const NavLink = styled(Link)`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 1.5rem;
  font-weight: 900;
  letter-spacing: 0.05em;
  position: relative;
  z-index: 2;
  background: ${({ isAboutPage }) => 
    isAboutPage 
      ? 'linear-gradient(45deg, #000 0%, #fff 50%, #000 100%)'
      : 'linear-gradient(45deg, #fff 0%, #000 50%, #fff 100%)'};
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: ${({ isAboutPage }) => 
    isAboutPage 
      ? '0 0 1px rgba(0, 0, 0, 0.5)'
      : '0 0 1px rgba(255, 255, 255, 0.5)'};
  animation: gradientShift 6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  padding: 0.15em 0.3em;

  @keyframes gradientShift {
    0% { background-position: 0% 50% }
    20% { background-position: 25% 75% }
    40% { background-position: 50% 100% }
    60% { background-position: 75% 75% }
    80% { background-position: 100% 50% }
    100% { background-position: 0% 50% }
  }
  
  &.active {
    background: linear-gradient(45deg, #000 0%, #fff 50%, #000 100%);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 0 2px rgba(255, 255, 255, 0.7);
    animation: gradientShift 3s ease infinite;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  color: ${({ isAboutPage }) => isAboutPage ? '#000' : '#fff'};
  font-size: 1.5rem;
  z-index: 2;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: block;
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  // Handle scroll progress for dynamic opacity
  useEffect(() => {
    const handleScroll = () => {
      const scrollProgress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      document.documentElement.style.setProperty('--scroll-progress', scrollProgress.toString());
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);
  
  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  
  const toggleMenu = () => setIsOpen(!isOpen);
  
  const isAboutPage = location.pathname === '/about';

  return (
    <NavContainer isAboutPage={isAboutPage}>
      <Logo to="/" isAboutPage={isAboutPage}>Miron Nicolae</Logo>
      
      <MobileMenuButton onClick={toggleMenu} isAboutPage={isAboutPage}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </MobileMenuButton>
      
      <NavLinks isOpen={isOpen} isAboutPage={isAboutPage}>
        <NavItem className={location.pathname === '/' ? 'active' : ''}>
          <NavLink to="/" className={location.pathname === '/' ? 'active' : ''}>
            Home
          </NavLink>
        </NavItem>
        
        <NavItem className={location.pathname === '/about' ? 'active' : ''}>
          <NavLink to="/about" className={location.pathname === '/about' ? 'active' : ''}>
            About Me
          </NavLink>
        </NavItem>
        
        <NavItem className={location.pathname === '/projects' ? 'active' : ''}>
          <NavLink to="/projects" className={location.pathname === '/projects' ? 'active' : ''}>
            Projects
          </NavLink>
        </NavItem>
        
        <NavItem className={location.pathname === '/contact' ? 'active' : ''}>
          <NavLink to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>
            Contact Me
          </NavLink>
        </NavItem>
      </NavLinks>
    </NavContainer>
  );
};

export default Navbar;