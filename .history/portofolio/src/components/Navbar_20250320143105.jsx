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
  background: linear-gradient(45deg, #000, #fff);
  background-size: 400% 400%;
  animation: backgroundShift 8s ease infinite;
  backdrop-filter: blur(5px);

  @keyframes backgroundShift {
    0% { background-position: 0% 50% }
    50% { background-position: 100% 50% }
    100% { background-position: 0% 50% }
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
  padding: 0.5rem 0;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -100%;
    left: 50%;
    transform: translateX(-50%);
    width: 10px;
    height: 100%;
    background: #fff;
    border-radius: 50%;
    transition: top 0.3s ease;
    filter: blur(2px);
  }
  
  &:hover::before {
    top: 100%;
    animation: dropletFall 0.6s ease-in;
  }

  @keyframes dropletFall {
    0% { top: -100%; width: 10px; }
    50% { width: 20px; }
    100% { top: 100%; width: 10px; }
  }
`;

const NavLink = styled(Link)`
  font-size: 1rem;
  font-weight: 500;
  color: ${props => props.theme.colors.secondary};
  transition: color 0.3s ease;
  mix-blend-mode: difference;
  
  &:hover {
    color: #fff;
  }
  
  &.active {
    color: #fff;
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