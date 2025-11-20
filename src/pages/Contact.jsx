import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

// Block 1: Contact Information
const ContactSection = styled.section`
  padding: 8rem 2rem 4rem;
  background-color: #000000;
  color: #ffffff;
  position: relative;
  overflow: hidden;
`;

const BackgroundLines = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  opacity: 0.1;
  pointer-events: none;
  
  &::before, &::after {
    content: '';
    position: absolute;
    background-color: #ffffff;
  }
  
  &::before {
    width: 3px;
    height: 100%;
    left: 20%;
    transform: skewX(-20deg);
  }
  
  &::after {
    width: 100%;
    height: 3px;
    top: 40%;
    transform: skewY(-15deg);
  }
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
  position: relative;
  z-index: 2;
  
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
  transition: all 0.3s ease;
  border: 2px solid ${props => props.theme.colors.accent};
  
  &::before {
    content: '';
    position: absolute;
    top: -50px;
    left: -50px;
    width: 200px;
    height: 200px;
    background: linear-gradient(45deg, #4B0082, transparent);
    border-radius: 50%;
    opacity: 0.1;
    z-index: 0;
  }
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(75, 0, 130, 0.3);
    background: linear-gradient(45deg, rgba(75, 0, 130, 0.1), transparent);
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
  transition: all 0.3s ease;
  border: 2px solid ${props => props.theme.colors.accent};
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="%234B0082" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>');
    background-position: center;
    background-repeat: no-repeat;
    background-size: 300px;
    opacity: 0.05;
    z-index: 0;
  }
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(75, 0, 130, 0.3);
    background: linear-gradient(45deg, rgba(75, 0, 130, 0.1), transparent);
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
  transition: all 0.3s ease;
  border: 2px solid ${props => props.theme.colors.accent};
  
  &::before {
    content: '';
    position: absolute;
    bottom: -50px;
    right: -50px;
    width: 200px;
    height: 200px;
    background: linear-gradient(225deg, #4B0082, transparent);
    border-radius: 50%;
    opacity: 0.1;
    z-index: 0;
  }
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(75, 0, 130, 0.3);
    background: linear-gradient(45deg, rgba(75, 0, 130, 0.1), transparent);
  }
`;

// Block 2: Contact Form
const FormSection = styled.section`
  padding: 6rem 2rem;
  position: relative;
  overflow: hidden;
  background: linear-gradient(to bottom, #000000 0%, #ffffff 100%);
  color: #ffffff;
`;

const DiagonalDivider = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, transparent 49.5%, ${props => props.theme.colors.accent} 49.5%, ${props => props.theme.colors.accent} 50.5%, transparent 50.5%);
    background-size: 20px 20px;
    opacity: 0.2;
  }
`;

const FormContainer = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 10px;
  position: relative;
  z-index: 2;
`;

const Screen = styled.div`
  position: relative;
  background: #3e3e3e;
  border-radius: 15px;
  
  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 20px;
    right: 20px;
    bottom: 0;
    border-radius: 15px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, .4);
    z-index: -1;
  }
`;

const ScreenHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  background: #4d4d4f;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
`;

const ScreenHeaderLeft = styled.div`
  margin-right: auto;
`;

const ScreenHeaderButton = styled.div`
  display: inline-block;
  width: 8px;
  height: 8px;
  margin-right: 3px;
  border-radius: 8px;
  background: ${props => props.color || 'white'};
`;

const ScreenHeaderRight = styled.div`
  display: flex;
`;

const ScreenHeaderEllipsis = styled.div`
  width: 3px;
  height: 3px;
  margin-left: 2px;
  border-radius: 8px;
  background: #999;
`;

const ScreenBody = styled.div`
  display: flex;
  
  @media screen and (max-width: 520px) {
    flex-direction: column;
  }
`;

const ScreenBodyItem = styled.div`
  flex: 1;
  padding: 50px;
  
  &.left {
    display: flex;
    flex-direction: column;
  }
  
  @media screen and (max-width: 520px) {
    padding: 0;
    &.left {
      margin-bottom: 30px;
    }
  }
`;

const AppTitle = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  color: #ff4d5a;
  font-size: 26px;
  
  &:after {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    bottom: -10px;
    width: 25px;
    height: 4px;
    background: #ff4d5a;
  }
  
  @media screen and (max-width: 520px) {
    flex-direction: row;
    span {
      margin-right: 12px;
    }
    &:after {
      display: none;
    }
  }
`;

const AppContact = styled.div`
  margin-top: auto;
  font-size: 8px;
  color: #888;
`;

const AppForm = styled.form`
  width: 100%;
`;

const AppFormGroup = styled.div`
  margin-bottom: 15px;
  
  &.message {
    margin-top: 40px;
  }
  
  &.buttons {
    margin-bottom: 0;
    text-align: right;
  }
`;

const AppFormControl = styled.input`
  width: 100%;
  padding: 10px 0;
  background: none;
  border: none;
  border-bottom: 1px solid #666;
  color: #ddd;
  font-size: 14px;
  text-transform: uppercase;
  outline: none;
  transition: border-color .2s;
  
  &::placeholder {
    color: #666;
  }
  
  &:focus {
    border-bottom-color: #ddd;
  }
`;

const AppFormButton = styled.button`
  background: none;
  border: none;
  color: #ff4d5a;
  font-size: 14px;
  cursor: pointer;
  outline: none;
  margin-right: 15px;
  
  &:last-child {
    margin-right: 0;
  }
  
  &:hover {
    color: #b9134f;
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
  const [fromName, setFromName] = useState('');
  const [fromEmail, setFromEmail] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [message, setMessage] = useState('');
  
  // Intersection observers
  const [refContact, inViewContact] = useInView({ threshold: 0.1, triggerOnce: true });
  const [refForm, inViewForm] = useInView({ threshold: 0.1, triggerOnce: true });
  
  // Start animations when sections come into view
  useEffect(() => {
    if (inViewContact) controlsContact.start('visible');
    if (inViewForm) controlsForm.start('visible');
  }, [controlsContact, controlsForm, inViewContact, inViewForm]);
  useEffect(() => {
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (publicKey) emailjs.init(publicKey);
  }, []);
  
  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const serviceId = 'service_263h2x7';
    const templateId = 'template_h06dj0k';
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (!publicKey) {
      alert('Email service is not configured. Please set VITE_EMAILJS_PUBLIC_KEY.');
      return;
    }
    emailjs
      .sendForm(serviceId, templateId, e.target, publicKey)
      .then(() => {
        alert('Message sent successfully. Thank you!');
        setFromName('');
        setFromEmail('');
        setContactNo('');
        setMessage('');
      })
      .catch(() => {
        alert('There was an issue sending your message. Please try again later.');
      });
  };
  
  return (
    <>
      {/* Block 1: Contact Information */}
      <ContactSection ref={refContact}>
        <BackgroundLines />
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
        <DiagonalDivider />
        <FormContainer>
          <Screen>
            <ScreenHeader>
              <ScreenHeaderLeft>
                <ScreenHeaderButton color="#ed1c6f" className="close" />
                <ScreenHeaderButton color="#e8e925" className="maximize" />
                <ScreenHeaderButton color="#74c54f" className="minimize" />
              </ScreenHeaderLeft>
              <ScreenHeaderRight>
                <ScreenHeaderEllipsis />
                <ScreenHeaderEllipsis />
                <ScreenHeaderEllipsis />
              </ScreenHeaderRight>
            </ScreenHeader>
            
            <ScreenBody>
              <ScreenBodyItem className="left">
                <AppTitle>
                  <span>CONTACT</span>
                  <span>US</span>
                </AppTitle>
                <AppContact>CONTACT INFO : +373 69 301 514</AppContact>
              </ScreenBodyItem>
              
              <ScreenBodyItem>
                <AppForm onSubmit={handleSubmit}>
                  <input type="hidden" name="title" value="Website Contact" />
                  <AppFormGroup>
                    <AppFormControl placeholder="NAME" name="name" value={fromName} onChange={(e) => setFromName(e.target.value)} />
                    <input type="hidden" name="from_name" value={fromName} />
                  </AppFormGroup>
                  <AppFormGroup>
                    <AppFormControl placeholder="EMAIL" name="email" type="email" value={fromEmail} onChange={(e) => setFromEmail(e.target.value)} />
                    <input type="hidden" name="from_email" value={fromEmail} />
                  </AppFormGroup>
                  <AppFormGroup>
                    <AppFormControl placeholder="CONTACT NO" name="phone_number" value={contactNo} onChange={(e) => setContactNo(e.target.value)} />
                  </AppFormGroup>
                  <AppFormGroup className="message">
                    <AppFormControl placeholder="MESSAGE" name="message" value={message} onChange={(e) => setMessage(e.target.value)} />
                  </AppFormGroup>
                  <AppFormGroup className="buttons">
                    <AppFormButton type="button" onClick={() => { setFromName(''); setFromEmail(''); setContactNo(''); setMessage(''); }}>CANCEL</AppFormButton>
                    <AppFormButton type="submit">SEND</AppFormButton>
                  </AppFormGroup>
                </AppForm>
              </ScreenBodyItem>
            </ScreenBody>
          </Screen>
        </FormContainer>
      </FormSection>
    </>
  );
};

export default Contact;