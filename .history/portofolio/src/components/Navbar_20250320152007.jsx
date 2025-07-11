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
  background: linear-gradient(to bottom, ${props => props.theme.colors.primary} 80%, rgba(0, 0, 0, 0));
  transition: all 0.3s ease;
  overflow: hidden;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
`;

const Logo = styled(Link)`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 2.8rem;
  font-weight: 900;
  letter-spacing: 0.05em;
  position: relative;
  z-index: 2;
  background: linear-gradient(45deg, #000 0%, #fff 50%, #000 100%);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: none;
  animation: gradientShift 3s ease infinite;
  border: 2px solid transparent;
  padding: 0.2em 0.4em;
  border-image: linear-gradient(45deg, #fff, #000) 1;
  animation: gradientShift 3s ease infinite, borderShift 3s ease infinite;

  @keyframes gradientShift {
    0% { background-position: 0% 50% }
    50% { background-position: 100% 50% }
    100% { background-position: 0% 50% }
  }

  @keyframes borderShift {
    0% { border-image: linear-gradient(45deg, #fff, #000) 1 }
    50% { border-image: linear-gradient(45deg, #000, #fff) 1 }
    100% { border-image: linear-gradient(45deg, #fff, #000) 1 }
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
  transition: all 0.3s ease;
  
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
  color: ${props => props.theme.colors.primary === '#000000' ? props.theme.colors.secondary : props.theme.colors.primary};
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
  
  ${NavItem}:hover & {
    color: ${props => props.theme.colors.accent};
    transform: translateY(-2px);
  }
  
  &.active {
    color: ${props => props.theme.colors.accent};
    text-shadow: 0 0 10px ${props => props.theme.colors.accent},
                0 0 20px ${props => props.theme.colors.accent},
                0 0 30px ${props => props.theme.colors.accent};
  }
  
  &::before {
    content: '';
    position: absolute;
    top: -150%;
    left: 0;
    width: 100%;
    height: 150%;
    background: ${props => props.theme.colors.accent};
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    transform: translateY(0);
    z-index: -1;
  }
  
  ${NavItem}:hover &::before {
    transform: translateY(150%);
    animation: liquidFill 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  @keyframes liquidFill {
    0% {
      transform: translateY(0);
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
    50% {
      transform: translateY(75%);
      border-bottom-left-radius: 50%;
      border-bottom-right-radius: 50%;
    }
    100% {
      transform: translateY(150%);
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
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