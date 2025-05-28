import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: linear-gradient(to bottom, ${props => props.theme.colors.primary} 80%, rgba(0, 0, 0, 0));
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
  background: linear-gradient(45deg, #000 0%, #fff 50%, #000 100%);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: none;
  animation: gradientShift 3s ease infinite;
  border: 2px solid transparent;
  padding: 0.2em 0.4em;
  border-image: linear-gradient(45deg, #fff, #000) 1;
  animation: gradientShift 3s ease infinite, borderShift 3s ease infinite;

  @keyframes gradientShift {
    0% { background-position: 0% 50% }
    50% { background-position: 100% 50% }
    100% { background-position: 0% 50% }
  }

  @keyframes borderShift {
    0% { border-image: linear-gradient(45deg, #fff, #000) 1 }
    50% { border-image: linear-gradient(45deg, #000, #fff) 1 }
    100% { border-image: linear-gradient(45deg, #fff, #000) 1 }
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.95);
    justify-content: center;
    align-items: center;
    z-index: 1;
    padding: 1rem 2rem;
  }
`;

const NavItem = styled.div`
  position: relative;
  padding: 0.3rem 1rem;
  overflow: hidden;
  border-radius: 4px;
  background: linear-gradient(45deg, #000 0%, #fff 50%, #000 100%);
  background-size: 200% 200%;
  animation: gradientShift 3s ease infinite;
  border: 2px solid transparent;
  border-image: linear-gradient(45deg, #fff, #000) 1;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    border-image: linear-gradient(45deg, #000, #fff) 1;
  }
  
  @keyframes gradientShift {
    0% { background-position: 0% 50% }
    50% { background-position: 100% 50% }
    100% { background-position: 0% 50% }
  }
`;

const NavLink = styled(Link)`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 1.5rem;
  font-weight: 900;
  letter-spacing: 0.05em;
  position: relative;
  z-index: 2;
  background: linear-gradient(45deg, #000 0%, #fff 50%, #000 100%);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: none;
  animation: gradientShift 3s ease infinite;
  border: 2px solid transparent;
  padding: 0.2em 0.4em;
  border-image: linear-gradient(45deg, #fff, #000) 1;
  animation: gradientShift 3s ease infinite, borderShift 3s ease infinite;
  
  &.active {
    background: linear-gradient(45deg, #fff 0%, #000 50%, #fff 100%);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: gradientShift 3s ease infinite;
  }



const MobileMenuButton = styled.button`
  display: none;
  color: ${props => props.theme.colors.secondary};
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
  
  return (
    <NavContainer>
      <Logo to="/">Miron Nicolae</Logo>
      
      <MobileMenuButton onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </MobileMenuButton>
      
      <NavLinks isOpen={isOpen}>
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