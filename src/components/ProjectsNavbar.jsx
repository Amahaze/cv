import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

const NavContainer = styled(motion.nav).attrs({ id: 'projects-navbar' })`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0.5rem 2rem 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
  border-bottom: 4px solid #EE445F;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  transform-origin: bottom;
  animation: fadeInFromBottom 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: repeating-linear-gradient(
      45deg,
      transparent,
      transparent 25px,
      rgba(148, 0, 211, 0.1) 25px,
      rgba(148, 0, 211, 0.1) 27px
    );
    pointer-events: none;
  }

  @keyframes fadeInFromBottom {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

const Logo = styled(motion(Link))`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 1.8rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  position: relative;
  z-index: 2;
  color: #a3bfc6;
  text-decoration: none;
  transition: all 0.3s ease;
  padding: 0.2em 0.4em;

  &:hover {
    color: #FFFFFF;
    transform: scale(1.02);
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
    background-color: rgba(75, 0, 130, 0.95);
    justify-content: center;
    align-items: center;
    z-index: 1;
    padding: 0.5rem 2rem 0;
    margin-left: 0;
  }
`;

const NavItem = styled(motion.div)`
  position: relative;
  padding: 0.5rem 1.2rem;
  cursor: pointer;

  .hover {
    display: block;
    position: absolute;
    width: 0%;
    height: 100%;
    top: 0;
    left: 0;
    background: #EE445F;
    z-index: 0;
    opacity: 0;
    transition: all 0.4s ease;
  }

  &:hover .hover {
    width: 100%;
    opacity: 1;
  }
`

const NavLink = styled(Link)`
  font: 600 14px ${props => props.theme.fonts.main};
  letter-spacing: 2px;
  padding: 12px 16px;
  color: #a3bfc6;
  text-decoration: none;
  text-transform: uppercase;
  position: relative;
  z-index: 1;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #FFFFFF;
  }

  &.active {
    color: #FFFFFF;
    font-weight: 700;
  }
`

const MobileMenuButton = styled.button`
  display: none;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 2;
  padding: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    color: rgba(255, 255, 255, 1);
    transform: scale(1.1);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: block;
  }
`

const ProjectsNavbar = () => {
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
      <Logo 
        to="/" 
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        Miron Nicolae
      </Logo>
      
      <MobileMenuButton onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </MobileMenuButton>
      
      <NavLinks isOpen={isOpen}>
        <NavItem>
          <NavLink to="/" className={location.pathname === '/' ? 'active' : ''}>
            Home
          </NavLink>
          <span className="hover"></span>
        </NavItem>
        
        <NavItem>
          <NavLink to="/about" className={location.pathname === '/about' ? 'active' : ''}>
            About Me
          </NavLink>
          <span className="hover"></span>
        </NavItem>
        
        <NavItem>
          <NavLink to="/projects" className={location.pathname === '/projects' ? 'active' : ''}>
            Projects
          </NavLink>
          <span className="hover"></span>
        </NavItem>
        
        <NavItem>
          <NavLink to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>
            Contact Me
          </NavLink>
          <span className="hover"></span>
        </NavItem>
      </NavLinks>
    </NavContainer>
  );
};

export default ProjectsNavbar;