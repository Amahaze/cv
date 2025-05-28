import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

const NavContainer = styled(motion.nav)`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 1.5rem 2rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: ${props => props.isScrolled ? 'linear-gradient(to bottom, rgba(173, 216, 230, 1) 0%, rgba(173, 216, 230, 0.8) 50%, rgba(173, 216, 230, 0) 100%)' : 'linear-gradient(to bottom, #000 80%, rgba(0, 0, 0, 0))'};  
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: ${props => props.isScrolled ? 1 : 1};
  transform: translateY(${props => props.isScrolled ? '0' : '0'});
  animation: ${props => props.isScrolled ? 'fadeInNavbar' : 'fadeInFromTop'} 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  overflow: hidden;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transform-origin: top;

  @keyframes fadeInNavbar {
    0% {
      opacity: 0;
      transform: translateY(-100%);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeInFromTop {
    0% {
      opacity: 0;
      transform: translateY(-30px);
    }
    100% {
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
  color: #F5F5F5;
  text-shadow: 0 0 1px rgba(245, 245, 245, 0.3);
  padding: 0.2em 0.4em;

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
    background-color: rgba(0, 0, 0, 0.95);
    justify-content: center;
    align-items: center;
    z-index: 1;
    padding: 1rem 2rem;
    margin-left: 0;
  }
`;

const NavItem = styled(motion.div)`
  position: relative;
  padding: 0.5rem 1.2rem;
  overflow: hidden;
  transition: all 0.3s ease;
  border-radius: 50px;
  background-color: #F5F5F5;
  border: none;
  
  &:hover {
    transform: scale(1.15);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    background-color: #000;
    
    a {
      color: #F5F5F5;
    }
  }
`;

const NavLink = styled(Link)`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 1.5rem;
  font-weight: 900;
  letter-spacing: 0.05em;
  position: relative;
  z-index: 2;
  color: #000;
  text-shadow: none;
  padding: 0.15em 0.3em;
  transition: all 0.3s ease;
  display: inline-block;

  @keyframes gradientShift {
    0% { background-position: 0% 50%; opacity: 0.8 }
    25% { background-position: 100% 50%; opacity: 0.9 }
    50% { background-position: 0% 50%; opacity: 1 }
    75% { background-position: 100% 50%; opacity: 0.9 }
    100% { background-position: 0% 50%; opacity: 0.8 }
  }
  
  &.active {
    text-shadow: 0 0 2px rgba(255, 255, 255, 0.7);
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

const HomeNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll position
  useEffect(() => {
    const handleScroll = () => {
      const servicesSection = document.querySelector('#services-section');
      const quoteSection = document.querySelector('section:nth-of-type(3)');
      
      if (servicesSection && quoteSection) {
        const servicesRect = servicesSection.getBoundingClientRect();
        const quoteRect = quoteSection.getBoundingClientRect();
        
        // Transition to Block 2 design when entering services section
        // Return to Block 1 design when entering quote section
        setIsScrolled(servicesRect.top <= 100 && quoteRect.top > 100);
      }
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
    <NavContainer
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      isScrolled={isScrolled}>
      <Logo 
        to="/" 
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
        isScrolled={isScrolled}
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
          transition={{ duration: 0.2 }}
          isScrolled={isScrolled}>
          <NavLink to="/" className={location.pathname === '/' ? 'active' : ''}>
            Home
          </NavLink>
        </NavItem>
        
        <NavItem>
          <NavLink to="/about">
            About Me
          </NavLink>
        </NavItem>
        
        <NavItem>
          <NavLink to="/projects">
            Projects
          </NavLink>
        </NavItem>
        
        <NavItem>
          <NavLink to="/contact">
            Contact Me
          </NavLink>
        </NavItem>
      </NavLinks>
    </NavContainer>
  );
};

export default HomeNavbar;