import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaBars, FaTimes, FaPencilRuler, FaHome, FaUser, FaCode, FaEnvelope } from 'react-icons/fa';

const NavContainer = styled(motion.nav)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 30px;
  background: ${props => props.isScrolled ? 'linear-gradient(135deg, rgba(75, 0, 130, 1) 20%, rgba(148, 0, 211, 0) 100%)' : 'linear-gradient(90deg, #000000 0%, #000000 60%, #ffffff 100%)'};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  opacity: ${props => props.isScrolled ? '0.95' : '1'};
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 100;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  animation: ${props => props.isScrolled ? 'fadeInNavbar' : 'fadeInFromTop'} 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;

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

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    background: rgba(0, 0, 0, 0.95); /* Simplified background for mobile */
    padding: 15px 20px; /* Adjusted padding for mobile */
    z-index: 100; /* Ensure navbar stays on top */
  }
`;

// Logo container with animation
const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    z-index: 30; /* Ensure logo stays above mobile menu */
  }
`;

// Icon for logo
const LogoIcon = styled.div`
  font-size: 30px;
  margin-right: 10px;
  color: #fff;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 34px; /* Larger icon on mobile */
  }
`;

// Text that slides in from the left
const LogoText = styled.span`
  font-size: 22px;
  font-weight: bold;
  transform: ${props => props.slideIn ? 'translateX(0)' : 'translateX(-100%)'};
  opacity: ${props => props.slideIn ? '1' : '0'};
  transition: transform 1s ease, opacity 1s ease;
  color: #fff;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 24px; /* Larger text on mobile */
  }
`;

// Navigation buttons container for desktop
const NavButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 120px; /* Space between buttons */
  padding-left: 50px;
  padding-right: 80px;
  z-index: 10;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: none; /* Hide desktop navigation on mobile */
  }
`;

// Mobile menu container
const MobileMenu = styled.div`
  display: none;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%; /* Take full width of screen */
    height: 100vh;
    background-color: #000000; /* Solid black background */
    z-index: 20;
    padding-top: 80px;
    transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(-100%)')};
    transition: transform 0.3s ease-in-out;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.3);
  }
`;

// Overlay for mobile menu
const MobileMenuOverlay = styled.div`
  display: none;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.8); /* Darker overlay for better contrast */
    z-index: 15;
  }
`;

// Individual navigation item
const NavItem = styled.div`
  position: relative;
  width: 55px;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
  z-index: 2;
`;

// Mobile link wrapper - MOVED BEFORE MobileNavItem
const MobileNavLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center; /* Center the content */
  text-decoration: none;
  color: #ffffff;
  font-size: 18px;
  font-weight: 500;
  width: 100%; /* Take full width */
  transition: all 0.3s ease; /* Add transition for smooth hover effect */
  
  &:hover {
    color: #ff4d5a; /* Brighter color on hover */
    transform: scale(1.05); /* Slight scale effect on hover */
    
    /* Make both icon and text change color on hover */
    & > * {
      color: #ff4d5a;
    }
  }
  
  &.active {
    color: #ff4d5a;
    
    /* Make both icon and text change color when active */
    & > * {
      color: #ff4d5a;
    }
  }
`;

// Mobile navigation item
const MobileNavItem = styled.div`
  width: 100%;
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  text-align: center; /* Center text */
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1); /* Slightly lighter on hover */
    
    /* Apply hover effect to the link and all its children when hovering over the item */
    & > ${MobileNavLink} {
      color: #ff4d5a;
      transform: scale(1.05);
      
      & > * {
        color: #ff4d5a;
      }
    }
  }
  
  &.active {
    background-color: rgba(255, 77, 90, 0.2); /* Slightly more visible active state */
  }
`;

// Circular button wrapper with link for desktop
const NavIconWrapper = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: ${props => props.isScrolled ? '#9400D3' : '#FFFFFF'};
  color: ${props => props.isScrolled ? '#FFFFFF' : '#000000'};
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background-color: #e0f0ff;
    transform: scale(1.1);
  }
`;

// Icon inside the circular button
const NavIcon = styled.div`
  font-size: 24px;
  color: ${props => props.isScrolled ? '#FFFFFF' : '#333'};
`;

// Mobile menu icon
const MobileNavIcon = styled.div`
  font-size: 20px;
  margin-right: 15px;
  color: inherit; /* Inherit color from parent for hover effects */
  transition: all 0.3s ease; /* Add transition for smooth hover effect */
`;

// Text that appears on hover for desktop
const NavText = styled.span`
  position: absolute;
  left: 100%;
  background-color: ${props => props.isScrolled ? '#4B0082' : '#e0f0ff'};
  color: ${props => props.isScrolled ? '#FFFFFF' : '#000000'};
  font-size: 14px;
  padding: 10px 15px;
  border-radius: 25px;
  opacity: 0;
  white-space: nowrap;
  transform: translateX(10px);
  transition: all 0.3s ease;
  z-index: 1;
  
  /* Ensure the text is positioned correctly relative to the icon */
  top: 50%;
  transform: translateY(-50%) translateX(10px);
  
  ${NavItem}:hover & {
    opacity: 1;
    transform: translateY(-50%) translateX(15px);
  }
`;

// Mobile menu button
const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: #fff;
  font-size: 2rem;
  cursor: pointer;
  z-index: 30; /* Increased z-index to ensure it appears above other elements */
  transition: all 0.3s ease;
  padding: 10px;
  
  &:hover {
    color: #ff4d5a;
    transform: scale(1.2);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: block;
  }
`;

const HomeNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [slideIn, setSlideIn] = useState(false);
  const location = useLocation();

  // Handle scroll position for navbar color change
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
  
  // Animate logo text on load
  useEffect(() => {
    // Slight delay to make the animation noticeable
    const timer = setTimeout(() => {
      setSlideIn(true);
    }, 300);
    
    return () => clearTimeout(timer);
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
      
      <LogoContainer id="logo">
        <LogoIcon>
          <FaPencilRuler />
        </LogoIcon>
        <LogoText slideIn={slideIn}>Miron Nicolae</LogoText>
      </LogoContainer>
      
      <MobileMenuButton onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </MobileMenuButton>
      
      {/* Desktop Navigation */}
      <NavButtons>
        {/* Home button */}
        <NavItem>
          <NavIconWrapper to="/" isScrolled={isScrolled} className={location.pathname === '/' ? 'active' : ''}>
            <NavIcon isScrolled={isScrolled}>
              <FaHome />
            </NavIcon>
            <NavText isScrolled={isScrolled}>Home</NavText>
          </NavIconWrapper>
        </NavItem>
        
        {/* About button */}
        <NavItem>
          <NavIconWrapper to="/about" isScrolled={isScrolled} className={location.pathname === '/about' ? 'active' : ''}>
            <NavIcon isScrolled={isScrolled}>
              <FaUser />
            </NavIcon>
            <NavText isScrolled={isScrolled}>About</NavText>
          </NavIconWrapper>
        </NavItem>
        
        {/* Projects button */}
        <NavItem>
          <NavIconWrapper to="/projects" isScrolled={isScrolled} className={location.pathname === '/projects' ? 'active' : ''}>
            <NavIcon isScrolled={isScrolled}>
              <FaCode />
            </NavIcon>
            <NavText isScrolled={isScrolled}>Projects</NavText>
          </NavIconWrapper>
        </NavItem>
        
        {/* Contact button */}
        <NavItem>
          <NavIconWrapper to="/contact" isScrolled={isScrolled} className={location.pathname === '/contact' ? 'active' : ''}>
            <NavIcon isScrolled={isScrolled}>
              <FaEnvelope />
            </NavIcon>
            <NavText isScrolled={isScrolled}>Contact</NavText>
          </NavIconWrapper>
        </NavItem>
      </NavButtons>
      
      {/* Mobile Menu Overlay */}
      <MobileMenuOverlay isOpen={isOpen} onClick={toggleMenu} />
      
      {/* Mobile Menu */}
      <MobileMenu isOpen={isOpen}>
        <MobileNavItem className={location.pathname === '/' ? 'active' : ''}>
          <MobileNavLink to="/" onClick={toggleMenu}>
            <MobileNavIcon><FaHome /></MobileNavIcon>
            Home
          </MobileNavLink>
        </MobileNavItem>
        
        <MobileNavItem className={location.pathname === '/about' ? 'active' : ''}>
          <MobileNavLink to="/about" onClick={toggleMenu}>
            <MobileNavIcon><FaUser /></MobileNavIcon>
            About
          </MobileNavLink>
        </MobileNavItem>
        
        <MobileNavItem className={location.pathname === '/projects' ? 'active' : ''}>
          <MobileNavLink to="/projects" onClick={toggleMenu}>
            <MobileNavIcon><FaCode /></MobileNavIcon>
            Projects
          </MobileNavLink>
        </MobileNavItem>
        
        <MobileNavItem className={location.pathname === '/contact' ? 'active' : ''}>
          <MobileNavLink to="/contact" onClick={toggleMenu}>
            <MobileNavIcon><FaEnvelope /></MobileNavIcon>
            Contact
          </MobileNavLink>
        </MobileNavItem>
      </MobileMenu>
    </NavContainer>
  );
};

export default HomeNavbar;