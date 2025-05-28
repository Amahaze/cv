import React from 'react';
import styled from 'styled-components';
import { FaGithub, FaLinkedin, FaBehance, FaDribbble } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background-color: ${props => props.theme.colors.gray};
  padding: 3rem 0;
  margin-top: 0;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FooterTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.accent};
`;

const FooterLink = styled.a`
  color: ${props => props.theme.colors.secondary};
  transition: color 0.3s ease;
  font-size: 0.9rem;
  
  &:hover {
    color: ${props => props.theme.colors.accent};
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    justify-content: center;
  }
`;

const SocialIcon = styled.a`
  color: ${props => props.theme.colors.secondary};
  font-size: 1.5rem;
  transition: color 0.3s ease, transform 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.colors.accent};
    transform: translateY(-3px);
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>Miron Nicolae</FooterTitle>
          <p>UX Designer passionate about creating beautiful and functional user experiences.</p>
          <SocialLinks>
            <SocialIcon href="https://github.com/" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </SocialIcon>
            <SocialIcon href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </SocialIcon>
            <SocialIcon href="https://behance.net/" target="_blank" rel="noopener noreferrer">
              <FaBehance />
            </SocialIcon>
            <SocialIcon href="https://dribbble.com/" target="_blank" rel="noopener noreferrer">
              <FaDribbble />
            </SocialIcon>
          </SocialLinks>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Quick Links</FooterTitle>
          <FooterLink href="/">Home</FooterLink>
          <FooterLink href="/about">About Me</FooterLink>
          <FooterLink href="/projects">Projects</FooterLink>
          <FooterLink href="/contact">Contact Me</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Contact</FooterTitle>
          <FooterLink href="mailto:contact@mironnicolae.com">contact@mironnicolae.com</FooterLink>
          <FooterLink href="tel:+40123456789">+40 123 456 789</FooterLink>
          <p>Bucharest, Romania</p>
        </FooterSection>
      </FooterContent>
      
      <div className="container">
        <Copyright>
          &copy; {new Date().getFullYear()} Miron Nicolae. All rights reserved.
        </Copyright>
      </div>
    </FooterContainer>
  );
};

export default Footer;