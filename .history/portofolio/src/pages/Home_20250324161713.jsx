import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaDesktop, FaMobileAlt, FaPencilRuler } from 'react-icons/fa';

// Hero Section (Block 1)
const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 6rem 2rem 4rem;
  overflow: hidden;
  gap: 4rem;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: column;
    padding-top: 8rem;
    text-align: center;
    gap: 2rem;
  }
`;

const HeroContent = styled.div`
  flex: 1;
  z-index: 2;
  max-width: 600px;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    margin-bottom: 3rem;
  }
`;

const HeroTitle = styled(motion.h1)`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 4rem;
  font-weight: 900;
  letter-spacing: 0.05em;
  position: relative;
  z-index: 2;
  background: linear-gradient(45deg, #000 0%, #fff 50%, #000 100%);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 2px rgba(255, 255, 255, 0.7);
  animation: gradientShift 6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  border: 4px solid transparent;
  padding: 0.2em 0.4em;
  border-image: linear-gradient(45deg, #fff, #000) 1;
  animation: gradientShift 6s cubic-bezier(0.4, 0, 0.2, 1) infinite, borderShift 6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  margin-bottom: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 3rem;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2.5rem;
  }
  
  @keyframes gradientShift {
    0% { background-position: 0% 50% }
    25% { background-position: 50% 100% }
    50% { background-position: 100% 50% }
    75% { background-position: 50% 0% }
    100% { background-position: 0% 50% }
  }

  @keyframes borderShift {
    0% { border-image: linear-gradient(45deg, #fff, transparent, #000) 1; border-width: 4px; }
    25% { border-image: linear-gradient(45deg, #000, #fff, transparent) 1; border-width: 5px; }
    50% { border-image: linear-gradient(45deg, transparent, #000, #fff) 1; border-width: 4px; }
    75% { border-image: linear-gradient(45deg, #fff, transparent, #000) 1; border-width: 5px; }
    100% { border-image: linear-gradient(45deg, #000, #fff, transparent) 1; border-width: 4px; }
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  margin-bottom: 3rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
`;

const HeroButton = styled(motion.a)`
  position: relative;
  padding: 0.8rem 1.5rem;
  overflow: hidden;
  border-radius: 4px;
  background: transparent;
  border: 2px solid transparent;
  border-image: linear-gradient(45deg, #fff, #000, #fff) 1;
  transition: all 0.3s ease;
  animation: borderPrism 6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  font-family: ${props => props.theme.fonts.heading};
  font-size: 1.5rem;
  font-weight: 900;
  letter-spacing: 0.05em;
  background: linear-gradient(45deg, #fff 0%, #000 50%, #fff 100%);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
  animation: gradientShift 6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  margin-top: 1rem;
  
  @keyframes borderPrism {
    0% { border-image: linear-gradient(45deg, #fff, transparent, #000) 1 }
    20% { border-image: linear-gradient(45deg, #000, #fff, transparent) 1 }
    40% { border-image: linear-gradient(45deg, transparent, #000, #fff) 1 }
    60% { border-image: linear-gradient(45deg, #fff, transparent, #000) 1 }
    80% { border-image: linear-gradient(45deg, #000, #fff, transparent) 1 }
    100% { border-image: linear-gradient(45deg, #fff, transparent, #000) 1 }
  }
  
  &:hover {
    transform: scale(1.05);
    border-image: linear-gradient(45deg, #4B0082, #fff, #4B0082) 1;
    background: linear-gradient(45deg, rgba(75, 0, 130, 0.1), transparent);
    box-shadow: 0 0 15px rgba(75, 0, 130, 0.3);
  }
`;

const HeroImageContainer = styled.div`
  flex: 1;
  position: relative;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    width: 100%;
    height: 500px;
  }
`;

const HeroImage = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 120%;
  height: 100%;
  background-image: url('https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
  background-size: cover;
  background-position: center;
  z-index: 1;
  filter: grayscale(100%);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, #000 0%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0) 100%);
  }
`;

const ProfileImage = styled(motion.div)`
  position: absolute;
  width: 600px;
  height: 600px;
  background-image: url('/colea.png');
  background-size: cover;
  background-position: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  z-index: 2;
  border-radius: 20px;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    width: 400px;
    height: 400px;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 300px;
    height: 300px;
  }
`;

// Services Section (Block 2)
const SectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
  color: ${props => props.theme.colors.secondary};
  
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

const ServicesSection = styled.section`
  padding: 8rem 0;
  background-color: ${props => props.theme.colors.primary};
  position: relative;
  overflow: hidden;
`;

const ServicesGrid = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  margin: 0;
  padding: 0;
`;

const ServiceCard = styled(motion.div)`
  position: relative;
  padding: 4rem 2rem;
  width: 100%;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  
  &:nth-child(1) {
    background: linear-gradient(135deg, #FF3366 0%, #FF6B6B 100%);
    clip-path: polygon(0 0, 100% 15%, 100% 85%, 0 100%);
    z-index: 3;
  }
  
  &:nth-child(2) {
    background: linear-gradient(135deg, #4B0082 0%, #9400D3 100%);
    margin-top: -50px;
    clip-path: polygon(0 15%, 100% 0, 100% 100%, 0 85%);
    z-index: 2;
  }
  
  &:nth-child(3) {
    background: linear-gradient(135deg, #00BCD4 0%, #2196F3 100%);
    margin-top: -50px;
    clip-path: polygon(0 0, 100% 15%, 100% 100%, 0 85%);
    z-index: 1;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 3rem 2rem;
    min-height: 250px;
  }
`;

const ServiceTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const ServiceDescription = styled.p`
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
`;

const ServiceIcon = styled.div`
  font-size: 2.5rem;
  color: white;
  margin-bottom: 1.5rem;
  
  svg {
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  }
`;

// Quote Section (Block 3)
const QuoteSection = styled.section`
  padding: 8rem 2rem 6rem;
  margin-top: -2rem;
  background-color: transparent;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 120%;
    background-image: url('https://media.tenor.com/ojVqJkGzNqMAAAAd/stars-night.gif');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0.6;
    z-index: -1;
    filter: brightness(0.8) contrast(1.2);
  }
`;

const QuoteContainer = styled(motion.div)`
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 3rem;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(15px);
  display: flex;
  align-items: center;
  gap: 3rem;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: column;
    padding: 2rem;
    gap: 2rem;
  }
`;

const QuoteText = styled.blockquote`
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  line-height: 1.8;
  margin-bottom: 2rem;
  position: relative;
  flex: 1;
  font-style: italic;
  text-align: left;
  
  &::before, &::after {
    content: '"';
    font-size: 5rem;
    color: ${props => props.theme.colors.accent};
    opacity: 0.7;
    position: absolute;
    font-family: 'Georgia', serif;
  }
  
  &::before {
    top: -2.5rem;
    left: -2rem;
  }
  
  &::after {
    bottom: -4.5rem;
    right: -2rem;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1.6rem;
    text-align: center;
  }
`;

const QuoteAuthor = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  min-width: 200px;

  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid ${props => props.theme.colors.accent};
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
  }

  p {
    font-style: italic;
    color: ${props => props.theme.colors.accent};
    font-size: 1.2rem;
    text-align: center;
    font-family: 'Playfair Display', serif;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    img {
      width: 120px;
      height: 120px;
    }
  }
`;


// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
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

const Home = () => {
  // Animation controls
  const controlsHero = useAnimation();
  const controlsServices = useAnimation();
  const controlsQuote = useAnimation();
  
  // Intersection observers
  const [refHero, inViewHero] = useInView({ threshold: 0.3, triggerOnce: true });
  const [refServices, inViewServices] = useInView({ threshold: 0.1, triggerOnce: true });
  const [refQuote, inViewQuote] = useInView({ threshold: 0.3, triggerOnce: true });
  
  // Start animations when sections come into view
  useEffect(() => {
    if (inViewHero) controlsHero.start('visible');
    if (inViewServices) controlsServices.start('visible');
    if (inViewQuote) controlsQuote.start('visible');
  }, [controlsHero, controlsServices, controlsQuote, inViewHero, inViewServices, inViewQuote]);
  
  return (
    <>
      {/* Hero Section - Block 1 */}
      <HeroSection ref={refHero}>
        <HeroContent>
          <HeroTitle 
            initial="hidden"
            animate={controlsHero}
            variants={fadeInLeft}
          >
            Miron Nicolae
          </HeroTitle>
          <HeroSubtitle 
            initial="hidden"
            animate={controlsHero}
            variants={fadeInLeft}
          >
            My name is Miron Nicolae, I am an ambitious person in my goals, at the moment I am actively studying the Frond-End branch and I really want to improve my skills and tend to new knowledge.
          </HeroSubtitle>
          <HeroButton 
            href="/about"
            initial="hidden"
            animate={controlsHero}
            variants={fadeInLeft}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get in Touch
          </HeroButton>
        </HeroContent>
        
        <HeroImageContainer>
          <HeroImage />
          <ProfileImage 
            initial="hidden"
            animate={controlsHero}
            variants={fadeInRight}
            whileHover={{ scale: 1.05 }}
          />
        </HeroImageContainer>
      </HeroSection>
      
      {/* Services Section - Block 2 */}
      <ServicesSection ref={refServices}>
        <SectionTitle>What I Do</SectionTitle>
        
        <ServicesGrid 
          as={motion.div}
          initial="hidden"
          animate={controlsServices}
          variants={staggerContainer}
        >
          <ServiceCard variants={fadeInUp}>
            <ServiceIcon>
              <FaDesktop />
            </ServiceIcon>
            <ServiceTitle>UI/UX Design</ServiceTitle>
            <ServiceDescription>
              Creating intuitive user interfaces and experiences that delight users and achieve business goals. I focus on user-centered design principles to ensure products are both beautiful and functional.
            </ServiceDescription>
          </ServiceCard>
          
          <ServiceCard variants={fadeInUp}>
            <ServiceIcon>
              <FaMobileAlt />
            </ServiceIcon>
            <ServiceTitle>Responsive Design</ServiceTitle>
            <ServiceDescription>
              Designing seamless experiences across all devices and screen sizes. I ensure your digital products look and function perfectly whether on desktop, tablet, or mobile.
            </ServiceDescription>
          </ServiceCard>
          
          <ServiceCard variants={fadeInUp}>
            <ServiceIcon>
              <FaPencilRuler />
            </ServiceIcon>
            <ServiceTitle>Prototyping & Wireframing</ServiceTitle>
            <ServiceDescription>
              Creating detailed wireframes and interactive prototypes to visualize concepts before development. This process helps identify usability issues early and ensures a smooth user journey.
            </ServiceDescription>
          </ServiceCard>
        </ServicesGrid>
      </ServicesSection>
      
      {/* Quote Section - Block 3 */}
      <QuoteSection ref={refQuote}>
        <QuoteContainer
          initial="hidden"
          animate={controlsQuote}
          variants={fadeInUp}
        >
          <QuoteText>
            Good design is actually a lot harder to notice than poor design, in part because good designs fit our needs so well that the design is invisible.
          </QuoteText>
          <QuoteAuthor>
            <img src="/don-norman.jpg" alt="Don Norman" />
            <p>— Don Norman</p>
            <p style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.7)' }}>The Design of Everyday Things</p>
          </QuoteAuthor>
        </QuoteContainer>
      </QuoteSection>
    </>
  );
};

export default Home;