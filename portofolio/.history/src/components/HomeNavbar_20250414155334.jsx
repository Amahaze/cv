import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaPencilRuler, FaHome, FaUser, FaFolderOpen, FaEnvelope } from 'react-icons/fa';

const NavContainer = styled.nav`
  display: flex;
  flex-direction: column;
  width: 60px;
  background-color: rgba(44, 44, 44, 0.8);
  backdrop-filter: blur(10px);
  padding: 10px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
`;

const LogoContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin: 15px 0 30px 0;
  color: white;
  cursor: pointer;
  overflow: visible;
  height: 40px;
`;

const LogoIcon = styled.div`
  font-size: 24px;
  z-index: 2;
  padding: 8px;
  transition: transform 0.3s ease;
  background-color: white;
  color: black;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
  }
`;

const LogoText = styled.span`
  white-space: nowrap;
  opacity: 0;
  transform: translateX(-20px);
  transition: all 0.3s ease;
  color: white;
  position: absolute;
  left: 50px;
  background-color: rgba(68, 68, 68, 0.8);
  backdrop-filter: blur(5px);
  padding: 6px 10px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 600;
  font-family: ${props => props.theme.fonts.heading};
  
  ${LogoContainer}:hover & {
    opacity: 1;
    transform: translateX(0);
  }
`;

const NavButton = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin: 15px 0;
  color: white;
  cursor: pointer;
  overflow: visible;
  height: 40px;
`;

const NavIcon = styled(Link)`
  font-size: 18px;
  z-index: 2;
  padding: 8px;
  transition: transform 0.3s ease;
  background-color: white;
  color: black;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
  }
`;

const NavLabel = styled.span`
  white-space: nowrap;
  opacity: 0;
  transform: translateX(-20px);
  transition: all 0.3s ease;
  color: white;
  position: absolute;
  left: 50px;
  background-color: rgba(68, 68, 68, 0.8);
  backdrop-filter: blur(5px);
  padding: 6px 10px;
  border-radius: 5px;
  font-size: 14px;
  
  ${NavButton}:hover & {
    opacity: 1;
    transform: translateX(0);
  }
`;

const HomeNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <NavContainer>
      <LogoContainer>
        <LogoIcon>
          <FaPencilRuler />
        </LogoIcon>
        <LogoText>Miron Nicolae</LogoText>
      </LogoContainer>
      
      <NavButton>
        <NavIcon to="/">
          <FaHome />
        </NavIcon>
        <NavLabel>Home</NavLabel>
      </NavButton>
      
      <NavButton>
        <NavIcon to="/about">
          <FaUser />
        </NavIcon>
        <NavLabel>About</NavLabel>
      </NavButton>
      
      <NavButton>
        <NavIcon to="/projects">
          <FaFolderOpen />
        </NavIcon>
        <NavLabel>Projects</NavLabel>
      </NavButton>
      
      <NavButton>
        <NavIcon to="/contact">
          <FaEnvelope />
        </NavIcon>
        <NavLabel>Contact</NavLabel>
      </NavButton>
    </NavContainer>
  );
};

export default HomeNavbar;
