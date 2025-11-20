import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaBars, FaTimes, FaPencilRuler, FaHome, FaUser, FaCode, FaEnvelope } from 'react-icons/fa';

const NavContainer = styled(motion.nav).attrs(props => ({
  'data-skills-section': props.isSkillsSection,
  'data-is-open': props.isOpen
}))`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 1rem 2rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 4;
  background: ${props => props.isSkillsSection ? 'linear-gradient(to bottom, #000 80%, rgba(0, 0, 0, 0))' : 'linear-gradient(to bottom, #fff 80%, rgba(255, 255, 255, 0))'};  
  color: ${props => props.isSkillsSection ? '#fff' : '#000'};
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: visible;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transform-origin: bottom;
  animation: ${props => props.isSkillsSection ? 'fadeInFromBottom' : 'fadeInFromTop'} 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 1rem 1.5rem;
    ${props => props.isOpen && `
      background: transparent;
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
    `}
  }

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

  @keyframes fadeInFromTop {
    from {
      opacity: 0;
      transform: translateY(-30px);
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
  z-index: 6;
  background: ${props => props.isSkillsSection ? 
    'linear-gradient(45deg, #000 0%, #fff 50%, #000 100%)' : 
    'linear-gradient(45deg, #fff 0%, #000 50%, #fff 100%)'};
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: none;
  animation: gradientShift 6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  padding: 0.2em 0.4em;
  border: 2px solid transparent;
  border-image: ${props => props.isSkillsSection ? 
    'linear-gradient(45deg, #fff, #000) 1' : 
    'linear-gradient(45deg, #000, #fff) 1'};
  display: inline-block;
    
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    ${props => props.isOpen && `
      position: absolute;
      top: 2rem;
      left: 50%;
      transform: translateX(-50%);
      font-size: 2.5rem;
      border: none;
    `}
  }

  @keyframes gradientShift {
    0% { background-position: 0% 50%; opacity: 0.8 }
    25% { background-position: 100% 50%; opacity: 0.9 }
    50% { background-position: 0% 50%; opacity: 1 }
    75% { background-position: 100% 50%; opacity: 0.9 }
    100% { background-position: 0% 50%; opacity: 0.8 }
  }
`;

// Mobile menu overlay
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

// Desktop navigation buttons container
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

// Mobile link wrapper
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


// Navigation links container for desktop
const NavLinks = styled.div.attrs(props => ({
  'data-open': props.isOpen,
  'data-skills-section': props.isSkillsSection
}))`
  display: flex;
  gap: 2.5rem;
  position: absolute;
  top: 50%;
  right: 2rem;
  transform: translateY(-50%);
  z-index: 5;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: none; /* Hide in mobile view as we'll use MobileMenu instead */
  }
`;

// Individual navigation item for desktop
const NavItem = styled(motion.div)`
  position: relative;
  padding: 0.2rem 0.8rem;
  overflow: hidden;
  border-radius: 4px;
  background: transparent;
  border: 2px solid transparent;
  border-image: linear-gradient(45deg, #000, #fff, #000) 1;
  transition: all 0.3s ease;
  animation: borderPrism 6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  
  @keyframes borderPrism {
    0% { border-image: linear-gradient(45deg, #000, transparent, #fff) 1 }
    20% { border-image: linear-gradient(45deg, #fff, #000, transparent) 1 }
    40% { border-image: linear-gradient(45deg, transparent, #fff, #000) 1 }
    60% { border-image: linear-gradient(45deg, #000, transparent, #fff) 1 }
    80% { border-image: linear-gradient(45deg, #fff, #000, transparent) 1 }
    100% { border-image: linear-gradient(45deg, #000, transparent, #fff) 1 }
  }
  
  &:hover {
    transform: scale(1.05);
    border-image: linear-gradient(45deg, #4B0082, #000, #4B0082) 1;
    background: linear-gradient(45deg, rgba(75, 0, 130, 0.1), transparent);
    box-shadow: 0 0 15px rgba(75, 0, 130, 0.3);
  }
`;

// Desktop NavLink
const NavLink = styled(Link)`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 1.5rem;
  font-weight: 900;
  letter-spacing: 0.05em;
  position: relative;
  z-index: 2;
  background: ${props => props.isSkillsSection ? 
    'linear-gradient(45deg, #fff 0%, #000 50%, #fff 100%)' : 
    'linear-gradient(45deg, #000 0%, #fff 50%, #000 100%)'};
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: ${props => props.isSkillsSection ? 
    '0 0 1px rgba(255, 255, 255, 0.5)' : 
    '0 0 1px rgba(0, 0, 0, 0.5)'};
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
    background: ${props => props.isSkillsSection ? 
      'linear-gradient(45deg, #000 0%, #fff 50%, #000 100%)' : 
      'linear-gradient(45deg, #fff 0%, #000 50%, #fff 100%)'};
    background-size: 200% 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: ${props => props.isSkillsSection ? 
      '0 0 2px rgba(255, 255, 255, 0.7)' : 
      '0 0 2px rgba(0, 0, 0, 0.7)'};
    animation: gradientShift 3s ease infinite;
  }
`;

// Mobile menu icon
const MobileNavIcon = styled.div`
  font-size: 20px;
  margin-right: 15px;
  color: inherit; /* Inherit color from parent for hover effects */
  transition: all 0.3s ease; /* Add transition for smooth hover effect */
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
    color: ${props => props.isSkillsSection ? '#fff' : '#000'};
  }
`;

const AboutNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSkillsSection, setIsSkillsSection] = useState(false);
  const location = useLocation();
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);
  
  // Handle scroll position for navbar color change
  useEffect(() => {
    const handleScroll = () => {
      const skillsSection = document.querySelector('.SkillsSection');
      if (skillsSection) {
        const skillsRect = skillsSection.getBoundingClientRect();
        setIsSkillsSection(skillsRect.top <= 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
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
    <>
      {/* Mobile Menu Overlay - Moved outside NavContainer to ensure full screen coverage */}
      {isOpen && <MobileMenuOverlay isOpen={isOpen} onClick={toggleMenu} />}
      
      <NavContainer
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          isSkillsSection={isSkillsSection}
          isOpen={isOpen}>
        <Logo 
          to="/" 
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
          isSkillsSection={isSkillsSection}
          isOpen={isOpen}
        >
          Miron Nicolae
        </Logo>
        
        <MobileMenuButton 
          onClick={toggleMenu} 
          isSkillsSection={isSkillsSection}
          isOpen={isOpen}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </MobileMenuButton>
        
        <NavLinks isSkillsSection={isSkillsSection}>
          <NavItem 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}>
            <NavLink to="/" className={location.pathname === '/' ? 'active' : ''} isSkillsSection={isSkillsSection}>
              Home
            </NavLink>
          </NavItem>
          
          <NavItem>
            <NavLink to="/about" className={location.pathname === '/about' ? 'active' : ''} isSkillsSection={isSkillsSection}>
              About Me
            </NavLink>
          </NavItem>
          
          <NavItem>
            <NavLink to="/projects" className={location.pathname === '/projects' ? 'active' : ''} isSkillsSection={isSkillsSection}>
              Projects
            </NavLink>
          </NavItem>
          
          <NavItem>
            <NavLink to="/contact" className={location.pathname === '/contact' ? 'active' : ''} isSkillsSection={isSkillsSection}>
              Contact Me
            </NavLink>
          </NavItem>
        </NavLinks>
        
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
              About Me
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
              Contact Me
            </MobileNavLink>
          </MobileNavItem>
        </MobileMenu>
      </NavContainer>
    </>
  );
};

export default AboutNavbar;