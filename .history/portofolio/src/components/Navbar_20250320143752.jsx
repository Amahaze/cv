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
  background: linear-gradient(45deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  background-size: 400% 400%;
  animation: backgroundShift 8s ease infinite;
  backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;

  @keyframes backgroundShift {
    0% { background-position: 0% 50% }
    50% { background-position: 100% 50% }
    100% { background-position: 0% 50% }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, transparent, ${props => props.theme.colors.primary});
    opacity: 0.3;
    pointer-events: none;
  }
`;

const Logo = styled(Link)`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 1.8rem;
  font-weight: 700;
  position: relative;
  z-index: 2;
  background: linear-gradient(45deg, #000, #fff);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientShift 3s ease infinite;

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
    top: 0;
    left: 0;
    width: 100%;
    height: 0;
    background: #000000;
    transition: height 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
    clip-path: polygon(0 0, 100% 0, 100% 100%, 85% 90%, 70% 100%, 55% 95%, 40% 100%, 25% 92%, 10% 100%, 0 95%);
    z-index: -1;
  }
  
  &:hover::before {
    height: 100%;
    animation: liquidFill 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  @keyframes liquidFill {
    0% { height: 0; clip-path: polygon(0 0, 100% 0, 100% 0, 85% 0, 70% 0, 55% 0, 40% 0, 25% 0, 10% 0, 0 0); }
    50% { clip-path: polygon(0 0, 100% 0, 100% 50%, 85% 45%, 70% 50%, 55% 42%, 40% 50%, 25% 45%, 10% 50%, 0 48%); }
    100% { height: 100%; clip-path: polygon(0 0, 100% 0, 100% 100%, 85% 90%, 70% 100%, 55% 95%, 40% 100%, 25% 92%, 10% 100%, 0 95%); }
  }
`;

const NavLink = styled(Link)`
  font-size: 1rem;
  font-weight: 500;
  color: ${props => props.theme.colors.secondary};
  transition: color 0.3s ease;
  
  ${NavItem}:hover & {
    color: #ffffff;
    transform: translateY(-2px);
  }
  
  &.active {
    color: ${props => props.theme.colors.accent};
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