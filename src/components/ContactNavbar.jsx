import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import { FiHome, FiUser, FiFolder, FiMail } from 'react-icons/fi';

const NavContainer = styled(motion.nav)`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 calc(1rem * 2);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(0,0,0,0.9);
  height: 6rem;
  box-shadow: 0 0 40px rgba(0,0,0,0.03);
  color: #fff;
`;

const Logo = styled.div`
  font-weight: 700;
  font-size: 1.5rem;
  color: #fff;
`;

const NavLinks = styled.ul`
  position: relative;
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  
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
  }
`;

const NavItem = styled.li`
  position: relative;
  
  &:last-child::before {
    content: '';
    position: absolute;
    left: -8rem;
    bottom: -1.25rem;
    height: 0.5rem;
    width: 2px;
    background: #C4151C;
    box-shadow:
      0 -0.5rem #C4151C,
      0 -0.5rem #C4151C,
      0 0 3rem 0.5rem #C4151C,
      2rem 0 0 rgba(255, 255, 255, 0.2),
      -3rem 0 0 rgba(255, 255, 255, 0.2),
      6rem 0 0 rgba(255, 255, 255, 0.2),
      -6rem 0 0 rgba(255, 255, 255, 0.2),
      9rem 0 0 rgba(255, 255, 255, 0.2),
      -9rem 0 0 rgba(255, 255, 255, 0.2),
      12rem 0 0 rgba(255, 255, 255, 0.2),
      -12rem 0 0 rgba(255, 255, 255, 0.2),
      15rem 0 0 rgba(255, 255, 255, 0.2),
      -15rem 0 0 rgba(255, 255, 255, 0.2),
      18rem 0 0 rgba(255, 255, 255, 0.2),
      -18rem 0 0 rgba(255, 255, 255, 0.2),
      21rem 0 0 rgba(255, 255, 255, 0.2),
      -21rem 0 0 rgba(255, 255, 255, 0.2);
    transition: 500ms ease all;
  }
`;

const NavLink = styled(Link)`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  align-items: center;
  justify-content: center;
  height: 3.5rem;
  width: 10rem;
  color: #fff;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 600;
  transition: all 500ms ease;
  cursor: pointer;

  svg {
    stroke: #fff;
    transition: all 500ms ease;
    width: 24px;
    height: 24px;
  }

  &:hover {
    color: #ff4d5a;
    
    svg {
      stroke: #ff4d5a;
    }
  }

  &:hover span {
    opacity: 1;
    transform: translate(0);
  }

  &.active svg {
    stroke: #ff4d5a;
  }`

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  z-index: 2;
  cursor: pointer;
  
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
      <Logo>
        <strong>Miron Nicolae</strong>
      </Logo>
      
      <MobileMenuButton onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </MobileMenuButton>
      
      <NavLinks isOpen={isOpen}>
        <NavItem>
          <NavLink to="/" className={location.pathname === '/' ? 'active' : ''}>
            <FiHome />
            <span>Home</span>
          </NavLink>
        </NavItem>
        
        <NavItem>
          <NavLink to="/about" className={location.pathname === '/about' ? 'active' : ''}>
            <FiUser />
            <span>About</span>
          </NavLink>
        </NavItem>
        
        <NavItem>
          <NavLink to="/projects" className={location.pathname === '/projects' ? 'active' : ''}>
            <FiFolder />
            <span>Projects</span>
          </NavLink>
        </NavItem>
        
        <NavItem>
          <NavLink to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>
            <FiMail />
            <span>Contact</span>
          </NavLink>
        </NavItem>
      </NavLinks>
    </NavContainer>
  );
};

export default ContactNavbar;