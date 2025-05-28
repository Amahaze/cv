import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaPencilRuler, FaHome, FaUser, FaFolderOpen, FaEnvelope } from 'react-icons/fa';

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
  background: ${props => props.isScrolled ? '#2196F3' : 'linear-gradient(to bottom, #000 80%, rgba(0, 0, 0, 0))'};  
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

const LogoContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
  z-index: 2;
  overflow: visible;
`;

const LogoIcon = styled(motion.div)`
  font-size: 2rem;
  color: #fff;
`;

const Logo = styled(motion(Link))`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 2rem;
  font-weight: 900;
  letter-spacing: 0.05em;
  position: relative;
  z-index: 2;
  color: #fff;
  text-shadow: 0 0 1px rgba(255, 255, 255, 0.3);
  padding: 0.2em 0.4em;
  display: flex;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
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
  padding: 0.15rem;
  overflow: visible;
  display: flex;
  align-items: center;
  justify-content: flex-start; /* Align to start to make space for text */
  width: 40px;
  height: 40px;
  margin-right: 120px; /* Increased spacing to avoid overlap during hover */
  
  &:hover ${NavText} {
    opacity: 1;
    visibility: visible;
    transform: translateX(0);
  }
  
  &:last-child {
    margin-right: 0;
  }
`;

const NavText = styled(motion.span)`
  position: absolute;
  left: 50px; /* Position text to the right of the icon */
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transform: translateX(-30px); /* Start more to the left for better slide effect */
  transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.4s ease;
  display: inline-block;
  color: #FFFFFF;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  pointer-events: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);
  letter-spacing: 0.5px;
  z-index: 1; /* Lower z-index so it appears behind the icon */
  transform-origin: left center;
  will-change: transform, opacity, visibility;
`;

const NavIconWrapper = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center; /* Center the icon */
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #FFFFFF;
  color: #000000;
  transition: all 0.3s ease;
  position: relative;
  z-index: 5;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
  }
  
  ${NavItem}:hover & + ${NavText} {
    opacity: 1;
    visibility: visible;
    transform: translateX(0);
    transition: opacity 0.3s ease 0.1s, visibility 0.3s ease 0.1s, transform 0.4s ease 0.1s;
  }
`

const NavIcon = styled(motion.div)`
  font-size: 1.2rem;
  color: #000000;
`;


const NavLink = styled(Link)`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 1.2rem;
  font-weight: 900;
  letter-spacing: 0.05em;
  position: relative;
  z-index: 2;
  color: ${props => props.isScrolled ? '#FFFFFF' : '#D3D3D3'};
  text-shadow: 0 0 1px rgba(211, 211, 211, 0.3);
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
    text-shadow: 0 0 2px rgba(211, 211, 211, 0.7);
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
      <LogoContainer>
        <LogoIcon
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
        >
          <FaPencilRuler />
        </LogoIcon>
        <Logo 
          to="/" 
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "auto", opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          isScrolled={isScrolled}
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Miron Nicolae
          </motion.span>
        </Logo>
      </LogoContainer>
      
      <MobileMenuButton onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </MobileMenuButton>
      
      <NavLinks isOpen={isOpen}>
        <NavItem 
          transition={{ duration: 0.2 }}
          isScrolled={isScrolled}>
          <NavIconWrapper to="/">
            <NavIcon><FaHome /></NavIcon>
          </NavIconWrapper>
          <NavText
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto" }}
            transition={{ duration: 0.3 }}
          >
            Home
          </NavText>
        </NavItem>
        
        <NavItem
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          isScrolled={isScrolled}>
          <NavIconWrapper to="/about">
            <NavIcon><FaUser /></NavIcon>
          </NavIconWrapper>
          <NavText
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto" }}
            transition={{ duration: 0.3 }}
          >
            About Me
          </NavText>
        </NavItem>
        
        <NavItem
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          isScrolled={isScrolled}>
          <NavIconWrapper to="/projects">
            <NavIcon><FaFolderOpen /></NavIcon>
          </NavIconWrapper>
          <NavText
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto" }}
            transition={{ duration: 0.3 }}
          >
            Projects
          </NavText>
        </NavItem>
        
        <NavItem
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          isScrolled={isScrolled}>
          <NavIconWrapper to="/contact">
            <NavIcon><FaEnvelope /></NavIcon>
          </NavIconWrapper>
          <NavText
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto" }}
            transition={{ duration: 0.3 }}
          >
            Contact Me
          </NavText>
        </NavItem>
      </NavLinks>
    </NavContainer>
  );
};

export default HomeNavbar;