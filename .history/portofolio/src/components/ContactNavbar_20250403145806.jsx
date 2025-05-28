import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

const NavContainer = styled(motion.nav)`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 1rem 2rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: linear-gradient(to bottom, #FF3366 80%, rgba(255, 51, 102, 0));
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transform-origin: bottom;
  animation: fadeInFromBottom 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;

  @keyframes fadeInFromBottom {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Logo = styled(motion(Link))`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 2rem;
  font-weight: 900;
  letter-spacing: 0.05em;
  position: relative;
  z-index: 2;
  background: linear-gradient(45deg, #fff 0%, #000 50%, #fff 100%);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: none;
  animation: gradientShift 6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  padding: 0.2em 0.4em;
  border: 2px solid transparent;
  border-image: linear-gradient(45deg, #FF6B6B, #FF3366) 1;

  @keyframes gradientShift {
    0% { background-position: 0% 50%; opacity: 0.8 }
    25% { background-position: 100% 50%; opacity: 0.9 }
    50% { background-position: 0% 50%; opacity: 1 }
    75% { background-position: 100% 50%; opacity: 0.9 }
    100% { background-position: 0% 50%; opacity: 0.8 }
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
    background-color: rgba(255, 51, 102, 0.95);
    justify-content: center;
    align-items: center;
    z-index: 1;
    padding: 1rem 2rem;
    margin-left: 0;
  }
`;

const NavItem = styled(motion.div)`
  position: relative;
  padding: 0.2rem 0.8rem;
  overflow: hidden;
  border-radius: 4px;
  background: transparent;
  border: 2px solid transparent;
  border-image: linear-gradient(45deg, #FF6B6B, #FF3366, #FF6B6B) 1;
  transition: all 0.3s ease;
  animation: borderPrism 6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  
  @keyframes borderPrism {
    0% { border-image: linear-gradient(45deg, #FF3366, transparent, #FF6B6B) 1 }
    20% { border-image: linear-gradient(45deg, #FF6B6B, #FF3366, transparent) 1 }
    40% { border-image: linear-gradient(45deg, transparent, #FF6B6B, #FF3366) 1 }
    60% { border-image: linear-gradient(45deg, #FF3366, transparent, #FF6B6B) 1 }
    80% { border-image: linear-gradient(45deg, #FF6B6B, #FF3366, transparent) 1 }
    100% { border-image: linear-gradient(45deg, #FF3366, transparent, #FF6B6B) 1 }
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
  background: linear-gradient(45deg, #fff 0%, #000 50%, #fff 100%);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
  animation: gradientShift 6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  padding: 0.15em 0.3em;
  transition: transform 0.3s ease, text-shadow 0.3s ease;

  @keyframes gradientShift {
    0% { background-position: 0% 50%; opacity: 0.8 }
    25% { background-position: 100% 50%; opacity: 0.9 }
    50% { background-position: 0% 50%; opacity: 1 }
    75% { background-position: 100% 50%; opacity: 0.9 }
    100% { background-position: 0% 50%; opacity: 0.8 }
  }
  
  &.active {
    background: linear-gradient(45deg, #FF6B6B 0%, #FF3366 50%, #FF6B6B 100%);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 0 2px rgba(255, 51, 102, 0.7);
    animation: gradientShift 3s ease infinite;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  color: #fff;
  font-size: 1.5rem;
  z-index: 2;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: block;
  }
`;

const ContactNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
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
    <NavContainer
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}>
      <Logo 
        to="/" 
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        Miron Nicolae
      </Logo>
      
      <MobileMenuButton onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </MobileMenuButton>
      
      <NavLinks isOpen={isOpen}>
        <NavItem 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}>
          <NavLink to="/" className={location.pathname === '/' ? 'active' : ''}>
            Home
          </NavLink>
        </NavItem>
        
        <NavItem>
          <NavLink to="/about" className={location.pathname === '/about' ? 'active' : ''}>
            About Me
          </NavLink>
        </NavItem>
        
        <NavItem>
          <NavLink to="/projects" className={location.pathname === '/projects' ? 'active' : ''}>
            Projects
          </NavLink>
        </NavItem>
        
        <NavItem>
          <NavLink to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>
            Contact Me
          </NavLink>
        </NavItem>
      </NavLinks>
    </NavContainer>
  );
};

export default ContactNavbar;