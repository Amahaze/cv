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
  background: ${props => props.isScrolled ? 'linear-gradient(135deg, rgba(75, 0, 130, 1) 0%, rgba(148, 0, 211, 0) 100%)' : 'linear-gradient(to bottom, #000 80%, rgba(0, 0, 0, 0))'};  
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
`;

// Logo container with animation
const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

// Icon for logo
const LogoIcon = styled.div`
  font-size: 30px;
  margin-right: 10px;
  color: #fff;
`;

// Text that slides in from the left
const LogoText = styled.span`
  font-size: 22px;
  font-weight: bold;
  transform: ${props => props.slideIn ? 'translateX(0)' : 'translateX(-100%)'};
  opacity: ${props => props.slideIn ? '1' : '0'};
  transition: transform 1s ease, opacity 1s ease;
  color: #fff;
`;

// Navigation buttons container
const NavButtons = styled.div`
  display: flex;
  gap: 120px; /* Space between buttons */
  padding-left: 50px;
  padding-right: 80px;
  
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
    gap: 15px;
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

// Circular button wrapper with link
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

// Text that appears on hover
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
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 2;
  
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
      
      <NavButtons isOpen={isOpen}>
        {/* Home button */}
        <NavItem>
          <NavIconWrapper to="/">
            <NavIcon>
              <FaHome />
            </NavIcon>
          </NavIconWrapper>
          <NavText>Home</NavText>
        </NavItem>
        
        {/* About button */}
        <NavItem>
          <NavIconWrapper to="/about">
            <NavIcon>
              <FaUser />
            </NavIcon>
          </NavIconWrapper>
          <NavText>About</NavText>
        </NavItem>
        
        {/* Projects button */}
        <NavItem>
          <NavIconWrapper to="/projects">
            <NavIcon>
              <FaCode />
            </NavIcon>
          </NavIconWrapper>
          <NavText>Projects</NavText>
        </NavItem>
        
        {/* Contact button */}
        <NavItem>
          <NavIconWrapper to="/contact">
            <NavIcon>
              <FaEnvelope />
            </NavIcon>
          </NavIconWrapper>
          <NavText>Contact</NavText>
        </NavItem>
      </NavButtons>
    </NavContainer>
  );
};

export default HomeNavbar;