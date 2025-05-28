import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

// Block 1: Contact Information
const ContactSection = styled.section`
  padding: 8rem 2rem 4rem;
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.secondary};
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background: ${props => props.theme.colors.accent};
  }
`;

const ContactContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

// Email Block
const EmailBlock = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 2.5rem;
  position: relative;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: -50px;
    left: -50px;
    width: 200px;
    height: 200px;
    background: linear-gradient(45deg, ${props => props.theme.colors.accent}, transparent);
    border-radius: 50%;
    opacity: 0.1;
    z-index: 0;
  }
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }
`;

const ContactIcon = styled.div`
  font-size: 2.5rem;
  color: ${props => props.theme.colors.accent};
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
`;

const ContactTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
`;

const ContactText = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
  position: relative;
  z-index: 1;
`;

const ContactLink = styled.a`
  color: ${props => props.theme.colors.accent};
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: white;
  }
`;

// Phone Block
const PhoneBlock = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 2.5rem;
  position: relative;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="%23ff4d5a" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>');
    background-position: center;
    background-repeat: no-repeat;
    background-size: 300px;
    opacity: 0.05;
    z-index: 0;
  }
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }
`;

// Location Block
const LocationBlock = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 2.5rem;
  position: relative;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &::before {
    content: '';
    position: absolute;
    bottom: -50px;
    right: -50px;
    width: 200px;
    height: 200px;
    background: linear-gradient(225deg, ${props => props.theme.colors.accent}, transparent);
    border-radius: 50%;
    opacity: 0.1;
    z-index: 0;
  }
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }
`;

// Block 2: Contact Form
const FormSection = styled.section`
  padding: 6rem 2rem;
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.secondary};
`;

const FormContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 3rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 2rem;
  }
`;

const FormTitle = styled.h3`
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const ContactForm = styled(motion.form)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  &.full-width {
    grid-column: span 2;
    
    @media (max-width: ${props => props.theme.breakpoints.mobile}) {
      grid-column: span 1;
    }
  }
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
`;

const FormInput = styled.input`
  width: 100%;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  color: white;
  font-family: ${props => props.theme.fonts.main};
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.accent};
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  color: white;
  font-family: ${props => props.theme.fonts.main};
  resize: vertical;
  min-height: 150px;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.accent};
  }
`;

const FormButton = styled(motion.button)`
  grid-column: span 2;
  padding: 1rem 2rem;
  background: linear-gradient(90deg, ${props => props.theme.colors.accent}, #ff8f9a);
  color: white;
  border: none;
  border-radius: 30px;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin-top: 1rem;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(255, 77, 90, 0.3);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-column: span 1;
  }
`;

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const Contact = () => {
  // Animation controls
  const controlsContact = useAnimation();
  const controlsForm = useAnimation();
  
  // Intersection observers
  const [refContact, inViewContact] = useInView({ threshold: 0.1, triggerOnce: true });
  const [refForm, inViewForm] = useInView({ threshold: 0.1, triggerOnce: true });
  
  // Start animations when sections come into view
  useEffect(() => {
    if (inViewContact) controlsContact.start('visible');
    if (inViewForm) controlsForm.start('visible');
  }, [controlsContact, controlsForm, inViewContact, inViewForm]);
  
  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
    alert('Thank you for your message! I will get back to you soon.');
  };
  
  return (
    <>
      {/* Block 1: Contact Information */}
      <ContactSection ref={refContact}>
        <SectionTitle>Get In Touch</SectionTitle>
        
        <ContactContainer
          as={motion.div}
          initial="hidden"
          animate={controlsContact}
          variants={staggerContainer}
        >
          <EmailBlock variants={fadeInUp}>
            <ContactIcon>
              <FaEnvelope />
            </ContactIcon>
            <ContactTitle>Email</ContactTitle>
            <ContactText>
              <ContactLink href="mailto:nicolae.miron.2001@gmail.com">nicolae.miron.2001@gmail.com</ContactLink>
            </ContactText>
          </EmailBlock>
          
          <PhoneBlock variants={fadeInUp}>
            <ContactIcon>
              <FaPhone />
            </ContactIcon>
            <ContactTitle>Phone</ContactTitle>
            <ContactText>
              <ContactLink href="tel:+37369301514">+373 69 301 514</ContactLink>
            </ContactText>
          </PhoneBlock>
          
          <LocationBlock variants={fadeInUp}>
            <ContactIcon>
              <FaMapMarkerAlt />
            </ContactIcon>
            <ContactTitle>Location</ContactTitle>
            <ContactText>r.Ialoveni s.Nimoreni</ContactText>
          </LocationBlock>
        </ContactContainer>
      </ContactSection>
      
      {/* Block 2: Contact Form */}
      <FormSection ref={refForm}>
        <FormContainer>
          <FormTitle>Send Me a Message</FormTitle>
          
          <ContactForm
            onSubmit={handleSubmit}
            initial="hidden"
            animate={controlsForm}
            variants={fadeInUp}
          >
            <FormGroup>
              <FormLabel>Name</FormLabel>
              <FormInput type="text" required />
            </FormGroup>
            
            <FormGroup>
              <FormLabel>Email</FormLabel>
              <FormInput type="email" required />
            </FormGroup>
            
            <FormGroup>
              <FormLabel>Phone</FormLabel>
              <FormInput type="tel" />
            </FormGroup>
            
            <FormGroup>
              <FormLabel>Subject</FormLabel>
              <FormInput type="text" />
            </FormGroup>
            
            <FormGroup className="full-width">
              <FormLabel>Message</FormLabel>
              <FormTextarea required></FormTextarea>
            </FormGroup>
            
            <FormButton
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Message
            </FormButton>
          </ContactForm>
        </FormContainer>
      </FormSection>
    </>
  );
};

export default Contact;