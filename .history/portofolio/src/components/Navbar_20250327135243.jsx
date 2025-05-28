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
  background: ${({ isAboutPage, isServicesSection }) => 
    isServicesSection
      ? 'linear-gradient(to bottom, #4B0082 80%, rgba(75, 0, 130, 0))'
      : isAboutPage 
        ? 'linear-gradient(to bottom, #fff 80%, rgba(255, 255, 255, 0))'
        : 'linear-gradient(to bottom, #000 80%, rgba(0, 0, 0, 0))'};
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transform-origin: top;
  opacity: ${({ isServicesSection }) => isServicesSection ? 0 : 1};
  transform: translateY(${({ isServicesSection }) => isServicesSection ? '-100%' : '0'});
  animation: ${({ isServicesSection }) => isServicesSection ? 'slideDown' : 'none'} 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
`;

const Logo = styled(motion(Link))`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 2rem;
  font-weight: 900;
  letter-spacing: 0.05em;
  position: relative;
  z-index: 2;
  color: ${({ isServicesSection }) => isServicesSection ? '#4B0082' : 'inherit'};
  border: ${({ isServicesSection }) => isServicesSection ? '2px solid #4B0082' : 'none'};
  padding: 0.2em 0.4em;
  text-decoration: none;
  transition: all 0.3s ease;
  
  ${({ isServicesSection }) => !isServicesSection && `
    background: linear-gradient(45deg, #000 0%, #fff 50%, #000 100%);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: none;
    animation: gradientShift 6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    border-image: linear-gradient(45deg, #fff, #000) 1;
  `}
`;

const NavItem = styled(motion.div)`
  position: relative;
  padding: 0.2rem 0.8rem;
  overflow: hidden;
  border-radius: ${({ isServicesSection }) => isServicesSection ? '25px' : '4px'};
  background: ${({ isServicesSection }) => 
    isServicesSection
      ? 'transparent'
      : 'transparent'};
  border: 2px solid ${({ isServicesSection }) => 
    isServicesSection
      ? '#4B0082'
      : 'transparent'};
  transition: all 0.3s ease;
  
  ${({ isServicesSection }) => !isServicesSection && `
    border-image: linear-gradient(45deg, #fff, #000, #fff) 1;
    animation: borderPrism 6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  `}
  
  &:hover {
    transform: scale(1.05);
    ${({ isServicesSection }) => isServicesSection
      ? `
        background: #4B0082;
        border-color: #4B0082;
        box-shadow: 0 0 15px rgba(75, 0, 130, 0.3);
        a {
          color: white;
        }
      `
      : `
        text-shadow: 0 0 8px rgba(75, 0, 130, 0.9);
        background: linear-gradient(45deg, rgba(75, 0, 130, 0.1), transparent);
        box-shadow: 0 0 15px rgba(75, 0, 130, 0.3);
      `
    }
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

const NavItem = styled(motion.div)`
  position: relative;
  padding: 0.2rem 0.8rem;
  overflow: hidden;
  border-radius: 4px;
  background: transparent;
  border: 2px solid transparent;
  border-image: ${({ isServicesSection }) =>
    isServicesSection
      ? 'linear-gradient(45deg, #4B0082, #9400D3, #4B0082) 1'
      : 'linear-gradient(45deg, #fff, #000, #fff) 1'};
  transition: all 0.3s ease;
  animation: ${({ isServicesSection }) =>
    isServicesSection ? 'serviceBorderPrism' : 'borderPrism'} 6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  
  @keyframes serviceBorderPrism {
    0% { border-image: linear-gradient(45deg, #4B0082, transparent, #9400D3) 1 }
    20% { border-image: linear-gradient(45deg, #9400D3, #4B0082, transparent) 1 }
    40% { border-image: linear-gradient(45deg, transparent, #9400D3, #4B0082) 1 }
    60% { border-image: linear-gradient(45deg, #4B0082, transparent, #9400D3) 1 }
    80% { border-image: linear-gradient(45deg, #9400D3, #4B0082, transparent) 1 }
    100% { border-image: linear-gradient(45deg, #4B0082, transparent, #9400D3) 1 }
  }

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
    text-shadow: ${({ isServicesSection }) =>
      isServicesSection
        ? '0 0 8px rgba(148, 0, 211, 0.9)'
        : '0 0 8px rgba(75, 0, 130, 0.9)'};
    background-position: 100% 50%;

    transform: scale(1.05);
    border-image: ${({ isServicesSection }) =>
      isServicesSection
        ? 'linear-gradient(45deg, #9400D3, #4B0082, #9400D3) 1'
        : 'linear-gradient(45deg, #4B0082, #fff, #4B0082) 1'};
    background: ${({ isServicesSection }) =>
      isServicesSection
        ? 'linear-gradient(45deg, rgba(148, 0, 211, 0.1), transparent)'
        : 'linear-gradient(45deg, rgba(75, 0, 130, 0.1), transparent)'};
    box-shadow: ${({ isServicesSection }) =>
      isServicesSection
        ? '0 0 15px rgba(148, 0, 211, 0.3)'
        : '0 0 15px rgba(75, 0, 130, 0.3)'};
  }
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
  background: ${({ isAboutPage, isServicesSection }) => 
    isServicesSection
      ? 'linear-gradient(45deg, #4B0082 0%, #9400D3 50%, #4B0082 100%)'
      : isAboutPage 
        ? 'linear-gradient(45deg, #000 0%, #fff 50%, #000 100%)'
        : 'linear-gradient(45deg, #fff 0%, #000 50%, #fff 100%)'};
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: ${({ isAboutPage, isServicesSection }) => 
    isServicesSection
      ? '0 0 2px rgba(148, 0, 211, 0.7)'
      : isAboutPage 
        ? '0 0 1px rgba(0, 0, 0, 0.5)'
        : '0 0 1px rgba(255, 255, 255, 0.5)'};
  animation: gradientShift 6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  padding: 0.15em 0.3em;
  transition: transform 0.3s ease, text-shadow 0.3s ease;

  @keyframes gradientShift {
    0% { background-position: 0% 50%; opacity: 0.8 }
    25% { background-position: 100% 50%; opacity: 0.9 }
    50% { background-position: 0% 50%; opacity: 1 }
    75% { background-position: 100% 50%; opacity: 0.9 }
    100% { background-position: 0% 50%; opacity: 0.8 }
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
  const [isServicesSection, setIsServicesSection] = useState(false);
  const location = useLocation();
  
  // Handle scroll progress and section detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollProgress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      document.documentElement.style.setProperty('--scroll-progress', scrollProgress.toString());
      
      // Detect Services section
      const servicesSection = document.querySelector('section:nth-of-type(2)');
      if (servicesSection) {
        const rect = servicesSection.getBoundingClientRect();
        setIsServicesSection(rect.top <= 0 && rect.bottom >= 0);
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
  
  const isAboutPage = location.pathname === '/about';

  return (
    <NavContainer 
      isAboutPage={isAboutPage} 
      isServicesSection={isServicesSection}
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}>
      <Logo 
        to="/" 
        isAboutPage={isAboutPage} 
        isServicesSection={isServicesSection}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        Miron Nicolae
      </Logo>
      
      <MobileMenuButton onClick={toggleMenu} isAboutPage={isAboutPage}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </MobileMenuButton>
      
      <NavLinks isOpen={isOpen} isAboutPage={isAboutPage}>
        <NavItem 
          className={location.pathname === '/' ? 'active' : ''}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}>
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