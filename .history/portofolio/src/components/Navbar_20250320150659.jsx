import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: linear-gradient(
    to bottom,
    ${props => `${props.theme.colors.primary}ee`} 0%,
    ${props => `${props.theme.colors.primary}99`} 35%,
    ${props => `${props.theme.colors.primary}55`} 70%,
    ${props => `${props.theme.colors.primary}00`} 100%
  );
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  transition: all 0.3s ease;
  overflow: hidden;
`;

const Logo = styled(Link)`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 2.8rem;
  font-weight: 900;
  letter-spacing: 0.05em;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 2;
  background: linear-gradient(45deg, #000, #fff, #7928ca, #ff0080);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientShift 6s ease infinite;

  @keyframes gradientShift {
    0% { background-position: 0% 50% }
    50% { background-position: 100% 50% }
    100% { background-position: 0% 50% }
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2.5rem;
  
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
    padding: 2rem;
  }
`;

const NavItem = styled.div`
  position: relative;
  padding: 0.5rem 1.5rem;
  overflow: hidden;
  border-radius: 4px;
  
  &::before {
    content: '';
    position: absolute;
    top: -100%;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${props => props.theme.colors.primary === '#000000' ? props.theme.colors.secondary : props.theme.colors.primary};
    transform: translateY(0);
    transition: transform 1s cubic-bezier(0.645, 0.045, 0.355, 1);
    clip-path: polygon(0 0, 100% 0, 100% 100%, 90% 95%, 80% 100%, 70% 97%, 60% 100%, 50% 98%, 40% 100%, 30% 97%, 20% 100%, 10% 98%, 0 100%);
    z-index: -1;
  }
  
  &:hover::before {
    transform: translateY(100%);
    animation: liquidFill 1s cubic-bezier(0.645, 0.045, 0.355, 1);
  }

  @keyframes liquidFill {
    0% { 
      transform: translateY(0);
      clip-path: polygon(0 0, 100% 0, 100% 0, 90% 0, 80% 0, 70% 0, 60% 0, 50% 0, 40% 0, 30% 0, 20% 0, 10% 0, 0 0); 
    }
    25% { 
      clip-path: polygon(0 0, 100% 0, 100% 25%, 90% 23%, 80% 25%, 70% 22%, 60% 25%, 50% 23%, 40% 25%, 30% 22%, 20% 25%, 10% 23%, 0 25%); 
    }
    50% { 
      clip-path: polygon(0 0, 100% 0, 100% 50%, 90% 47%, 80% 50%, 70% 48%, 60% 50%, 50% 47%, 40% 50%, 30% 48%, 20% 50%, 10% 47%, 0 50%); 
    }
    75% { 
      clip-path: polygon(0 0, 100% 0, 100% 75%, 90% 72%, 80% 75%, 70% 73%, 60% 75%, 50% 72%, 40% 75%, 30% 73%, 20% 75%, 10% 72%, 0 75%); 
    }
    100% { 
      transform: translateY(100%);
      clip-path: polygon(0 0, 100% 0, 100% 100%, 90% 97%, 80% 100%, 70% 98%, 60% 100%, 50% 97%, 40% 100%, 30% 98%, 20% 100%, 10% 97%, 0 100%); 
    }
  }
`;

const NavLink = styled(Link)`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${props => props.theme.colors.secondary};
  transition: all 0.3s ease;
  background: linear-gradient(45deg, ${props => props.theme.colors.secondary}, ${props => props.theme.colors.accent});
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientShift 6s ease infinite;
  
  ${NavItem}:hover & {
    color: ${props => props.theme.colors.primary === '#000000' ? props.theme.colors.primary : props.theme.colors.secondary};
    transform: translateY(-2px);
    background: ${props => props.theme.colors.primary === '#000000' ? 'linear-gradient(45deg, #000, #000)' : 'linear-gradient(45deg, #fff, #fff)'};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  &.active {
    background: linear-gradient(45deg, ${props => props.theme.colors.accent}, #7928ca);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: gradientShift 6s ease infinite;
  }
`;


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