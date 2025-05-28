import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGraduationCap, FaCode, FaLanguage, FaStar, FaBook } from 'react-icons/fa';

// Block 1: Work Experience
const ExperienceSection = styled.section`
  padding: 8rem 2rem 4rem;
  background-color: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.primary};
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
    background-color: ${props => props.theme.colors.primary};
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

const ExperienceContainer = styled.div`
  display: flex;
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: column;
  }
`;

const ExperienceContent = styled.div`
  flex: 1;
  padding-right: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding-right: 0;
    margin-bottom: 3rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: ${props => props.theme.colors.primary};
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100%;
    height: 3px;
    background: ${props => props.theme.colors.accent};
  }
`;

const ExperienceItem = styled(motion.div)`
  margin-bottom: 2rem;
  padding: 1.5rem;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  border-left: 4px solid ${props => props.theme.colors.accent};
`;

const ExperienceTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const ExperienceCompany = styled.h4`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.accent};
  margin-bottom: 1rem;
`;

const ExperienceDate = styled.p`
  font-size: 0.9rem;
  color: rgba(0, 0, 0, 0.6);
  margin-bottom: 1rem;
`;

const ExperienceDescription = styled.p`
  line-height: 1.6;
`;

const ExperienceImageContainer = styled.div`
  flex: 1;
  position: relative;
  min-height: 400px;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    min-height: 300px;
  }
`;

const ExperienceImage = styled(motion.div)`
  position: absolute;
  width: 250px;
  height: 500px;
  background-size: cover;
  background-position: center;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  
  &:nth-child(1) {
    top: 0;
    right: 35%;
    background-image: url('https://images.unsplash.com/photo-1551033406-611cf9a28f67?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80');
    z-index: 3;
  }
  
  &:nth-child(2) {
    top: 100px;
    right: 15%;
    background-image: url('https://images.unsplash.com/photo-1581287053822-fd7bf4f4bfec?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80');
    z-index: 2;
  }
  
  &:nth-child(3) {
    top: 200px;
    right: 55%;
    background-image: url('https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80');
    z-index: 1;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    width: 150px;
    height: 300px;
  }
`;

// Block 2: Education
const EducationSection = styled.section`
  padding: 6rem 2rem;
  position: relative;
  overflow: hidden;
  background: linear-gradient(to bottom, ${props => props.theme.colors.secondary} 0%, ${props => props.theme.colors.primary} 100%);
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

const EducationContainer = styled.div`
  display: flex;
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: column-reverse;
  }
`;

const EducationImageContainer = styled.div`
  flex: 1;
  position: relative;
  min-height: 400px;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    min-height: 300px;
    margin-bottom: 2rem;
  }
`;

const EducationImage = styled(motion.div)`
  position: absolute;
  width: 250px;
  height: 500px;
  background-size: cover;
  background-position: center;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  
  &:nth-child(1) {
    top: 0;
    left: 35%;
    background-image: url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
    z-index: 3;
  }

  &:nth-child(2) {
    top: 100px;
    left: 15%;
    background-image: url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80');
    z-index: 2;
  }

  &:nth-child(3) {
    top: 200px;
    left: 55%;
    background-image: url('https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80');
    z-index: 1;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    height: 300px;
  }
`;

const EducationContent = styled.div`
  flex: 1;
  padding-left: 2rem;
  color: ${props => props.theme.colors.secondary};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding-left: 0;
  }
`;

const EducationTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: ${props => props.theme.colors.secondary};
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100%;
    height: 3px;
    background: ${props => props.theme.colors.accent};
  }
`;

const EducationItem = styled(motion.div)`
  margin-bottom: 2rem;
  padding: 1.5rem;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  border-left: 4px solid ${props => props.theme.colors.accent};
`;

const EducationDegree = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const EducationSchool = styled.h4`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.accent};
  margin-bottom: 1rem;
`;

const EducationDate = styled.p`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 1rem;
`;

const EducationDescription = styled.p`
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
`;

// Block 3: Skills & Languages
const SkillsSection = styled.section`
  padding: 6rem 2rem;
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.secondary};
`;

const SkillsContainer = styled.div`
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  gap: 3rem;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: column;
  }
`;

const SkillsColumn = styled.div`
  flex: 1;
`;

const SkillsTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100%;
    height: 3px;
    background: ${props => props.theme.colors.accent};
  }
`;

const SkillsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1.5rem;
`;

const SkillItem = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 1.5rem;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const SkillIcon = styled.div`
  font-size: 2rem;
  color: ${props => props.theme.colors.accent};
  margin-bottom: 1rem;
`;

const SkillName = styled.h3`
  font-size: 1.1rem;
`;

const LanguagesList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1.5rem;
`;

const LanguageItem = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 1.5rem;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const LanguageName = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
`;

const LanguageLevel = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
`;

const LanguageStar = styled.span`
  color: ${props => props.theme.colors.accent};
  margin: 0 2px;
  font-size: 1rem;
`;

// Block 4: Qualities & Hobbies
const QualitiesSection = styled.section`
  padding: 6rem 2rem;
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.secondary};
`;

const QualitiesContainer = styled.div`
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  gap: 3rem;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: column;
  }
`;

const QualitiesColumn = styled.div`
  flex: 1;
`;

const QualitiesTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100%;
    height: 3px;
    background: ${props => props.theme.colors.accent};
  }
`;

const QualitiesCarousel = styled.div`
  position: relative;
  height: 300px;
  perspective: 1000px;
`;

const QualityItem = styled(motion.div)`
  position: absolute;
  width: 200px;
  height: 100px;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  font-weight: 500;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  backface-visibility: hidden;
  transform-style: preserve-3d;
`;

const HobbiesContainer = styled.div`
  background-color: #3a2a18;
  border-radius: 15px;
  padding: 2rem;
  position: relative;
  overflow: hidden;
`;

const HobbiesTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100%;
    height: 3px;
    background: ${props => props.theme.colors.accent};
  }
`;

const HobbiesList = styled.ul`
  list-style: none;
  margin-top: 2rem;
`;

const HobbyItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
`;

const HobbyIcon = styled.span`
  font-size: 1.5rem;
  margin-right: 1rem;
  color: ${props => props.theme.colors.accent};
`;

// Block 5: Courses & Certifications
const CoursesSection = styled.section`
  padding: 6rem 2rem;
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.secondary};
`;

const CoursesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const CoursesTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 3rem;
  text-align: center;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 0;
    width: 100%;
    height: 3px;
    background: ${props => props.theme.colors.accent};
  }
`;

const CoursesList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const CourseItem = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const CourseTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.accent};
`;

const CourseProvider = styled.h4`
  font-size: 1rem;
  margin-bottom: 1rem;
  color: rgba(255, 255, 255, 0.7);
`;

const CourseDate = styled.p`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 1rem;
`;

const CourseDescription = styled.p`
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: rgba(255, 255, 255, 0.8);
`;

const CertificateLink = styled.a`
  display: inline-flex;
  align-items: center;
  color: ${props => props.theme.colors.accent};
  font-size: 0.9rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: white;
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

const About = () => {
  // Animation controls
  const controlsExperience = useAnimation();
  const controlsEducation = useAnimation();
  const controlsSkills = useAnimation();
  const controlsQualities = useAnimation();
  const controlsCourses = useAnimation();
  
  // Intersection observers
  const [refExperience, inViewExperience] = useInView({ threshold: 0.1, triggerOnce: true });
  const [refEducation, inViewEducation] = useInView({ threshold: 0.1, triggerOnce: true });
  const [refSkills, inViewSkills] = useInView({ threshold: 0.1, triggerOnce: true });
  const [refQualities, inViewQualities] = useInView({ threshold: 0.1, triggerOnce: true });
  const [refCourses, inViewCourses] = useInView({ threshold: 0.1, triggerOnce: true });
  
  // Start animations when sections come into view
  useEffect(() => {
    if (inViewExperience) controlsExperience.start('visible');
    if (inViewEducation) controlsEducation.start('visible');
    if (inViewSkills) controlsSkills.start('visible');
    if (inViewQualities) controlsQualities.start('visible');
    if (inViewCourses) controlsCourses.start('visible');
  }, [controlsExperience, controlsEducation, controlsSkills, controlsQualities, controlsCourses, 
      inViewExperience, inViewEducation, inViewSkills, inViewQualities, inViewCourses]);
  
  return (
    <>
      {/* Block 1: Work Experience */}
      <ExperienceSection ref={refExperience}>
        <BackgroundLines />
        <ExperienceContainer>
          <ExperienceContent>
            <SectionTitle>Work Experience</SectionTitle>
            
            <motion.div
              initial="hidden"
              animate={controlsExperience}
              variants={staggerContainer}
            >
              <ExperienceItem variants={fadeInUp}>
                <ExperienceTitle>Freelance Front-End Developer</ExperienceTitle>
                <ExperienceCompany>Self-Employed</ExperienceCompany>
                <ExperienceDate>September 2019 - May 2021</ExperienceDate>
                <ExperienceDescription>
                  Designed and developed responsive websites using HTML, CSS, and JavaScript, with intermediate knowledge of React.js and Bootstrap for enhanced user experience. Successfully completed projects for small businesses and clients, providing tailored web solutions.
                </ExperienceDescription>
              </ExperienceItem>
              
              <ExperienceItem variants={fadeInUp}>
                <ExperienceTitle>Freelance WordPress Developer</ExperienceTitle>
                <ExperienceCompany>Self-Employed</ExperienceCompany>
                <ExperienceDate>July 2023 - August 2023</ExperienceDate>
                <ExperienceDescription>
                  Utilized WordPress to create functional and aesthetically pleasing websites, improving development efficiency by 50%. Gained expertise in customizing themes, plugins, and overall website functionality. Received contemporary information from course mentors and applied knowledge in real work.
                </ExperienceDescription>
              </ExperienceItem>
              
              <ExperienceItem variants={fadeInUp}>
                <ExperienceTitle>Professional Summary</ExperienceTitle>
                <ExperienceCompany>Front-End Developer</ExperienceCompany>
                <ExperienceDate>Present</ExperienceDate>
                <ExperienceDescription>
                  I am a dedicated and ambitious individual with experience in both administrative and front-end development roles. My professional background includes communication with clients on freelance operations, where I demonstrated strong leadership skills in client relations. Additionally, I have a growing proficiency in front-end development, with a solid foundation in HTML, CSS, JavaScript, Bootstrap, and React.js. Currently pursuing further education in Information Technology and Engineering, with a strong interest in UX Design and Web Development.
                </ExperienceDescription>
              </ExperienceItem>
            </motion.div>
          </ExperienceContent>
          
          <ExperienceImageContainer>
            <ExperienceImage 
              initial="hidden"
              animate={controlsExperience}
              variants={fadeInRight}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            />
            <ExperienceImage 
              initial="hidden"
              animate={controlsExperience}
              variants={fadeInRight}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            />
            <ExperienceImage 
              initial="hidden"
              animate={controlsExperience}
              variants={fadeInRight}
              transition={{ delay: 0.4 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            />
          </ExperienceImageContainer>
        </ExperienceContainer>
      </ExperienceSection>
      
      {/* Block 2: Education */}
      <EducationSection ref={refEducation}>
        <DiagonalDivider />
        <EducationContainer>
          <EducationImageContainer>
            <EducationImage 
              initial="hidden"
              animate={controlsEducation}
              variants={fadeInLeft}
              whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            />
          </EducationImageContainer>
          
          <EducationContent>
            <EducationTitle>Education</EducationTitle>
            
            <motion.div
              initial="hidden"
              animate={controlsEducation}
              variants={staggerContainer}
            >
              <EducationItem variants={fadeInUp}>
                <EducationDegree>Bachelor's in Information Technology</EducationDegree>
                <EducationSchool>Universitatea Liberă Internațională din Moldova</EducationSchool>
                <EducationDate>September 2021 - Present</EducationDate>
                <EducationDescription>
                  Currently pursuing a degree in Information Technology, focusing on modern development practices and technologies.
                </EducationDescription>
              </EducationItem>
              
              <EducationItem variants={fadeInUp}>
                <EducationDegree>Electromechanical Engineer</EducationDegree>
                <EducationSchool>Centrul de Excelență în Energetică și Electronică</EducationSchool>
                <EducationDate>September 2017 - 2021</EducationDate>
                <EducationDescription>
                  Completed comprehensive training in electromechanical engineering, developing a strong foundation in technical problem-solving and system design.
                </EducationDescription>
              </EducationItem>
            </motion.div>
          </EducationContent>
        </EducationContainer>
      </EducationSection>
      
      {/* Block 3: Skills & Languages */}
      <SkillsSection ref={refSkills}>
        <SkillsContainer>
          <SkillsColumn>
            <SkillsTitle>Technical Skills</SkillsTitle>
            
            <SkillsList
              as={motion.div}
              initial="hidden"
              animate={controlsSkills}
              variants={staggerContainer}
            >
              <SkillItem variants={fadeInUp}>
                <SkillIcon>
                  <FaCode />
                </SkillIcon>
                <SkillName>HTML/CSS/JavaScript</SkillName>
              </SkillItem>
              
              <SkillItem variants={fadeInUp}>
                <SkillIcon>
                  <FaCode />
                </SkillIcon>
                <SkillName>React.js</SkillName>
              </SkillItem>
              
              <SkillItem variants={fadeInUp}>
                <SkillIcon>
                  <FaCode />
                </SkillIcon>
                <SkillName>Bootstrap</SkillName>
              </SkillItem>
              
              <SkillItem variants={fadeInUp}>
                <SkillIcon>
                  <FaCode />
                </SkillIcon>
                <SkillName>WordPress</SkillName>
              </SkillItem>
              
              <SkillItem variants={fadeInUp}>
                <SkillIcon>
                  <FaCode />
                </SkillIcon>
                <SkillName>Photoshop</SkillName>
              </SkillItem>
              
              <SkillItem variants={fadeInUp}>
                <SkillIcon>
                  <FaCode />
                </SkillIcon>
                <SkillName>Premier Pro</SkillName>
              </SkillItem>
            </SkillsList>
          </SkillsColumn>
          
          <SkillsColumn>
            <SkillsTitle>Languages</SkillsTitle>
            
            <LanguagesList
              as={motion.div}
              initial="hidden"
              animate={controlsSkills}
              variants={staggerContainer}
            >
              <LanguageItem variants={fadeInUp}>
                <LanguageName>English (Strong)</LanguageName>
                <LanguageLevel>
                  <LanguageStar>★</LanguageStar>
                  <LanguageStar>★</LanguageStar>
                  <LanguageStar>★</LanguageStar>
                  <LanguageStar>★</LanguageStar>
                  <LanguageStar>★</LanguageStar>
                </LanguageLevel>
              </LanguageItem>
              
              <LanguageItem variants={fadeInUp}>
                <LanguageName>Romana (Native)</LanguageName>
                <LanguageLevel>
                  <LanguageStar>★</LanguageStar>
                  <LanguageStar>★</LanguageStar>
                  <LanguageStar>★</LanguageStar>
                  <LanguageStar>★</LanguageStar>
                  <LanguageStar>★</LanguageStar>
                </LanguageLevel>
              </LanguageItem>
              
              <LanguageItem variants={fadeInUp}>
                <LanguageName>Russian (Native)</LanguageName>
                <LanguageLevel>
                  <LanguageStar>★</LanguageStar>
                  <LanguageStar>★</LanguageStar>
                  <LanguageStar>★</LanguageStar>
                  <LanguageStar>★</LanguageStar>
                  <LanguageStar>★</LanguageStar>
                </LanguageLevel>
              </LanguageItem>
              
              <LanguageItem variants={fadeInUp}>
                <LanguageName>French (Novice)</LanguageName>
                <LanguageLevel>
                  <LanguageStar>★</LanguageStar>
                  <LanguageStar>★</LanguageStar>
                  <LanguageStar style={{ opacity: 0.3 }}>★</LanguageStar>
                  <LanguageStar style={{ opacity: 0.3 }}>★</LanguageStar>
                  <LanguageStar style={{ opacity: 0.3 }}>★</LanguageStar>
                </LanguageLevel>
              </LanguageItem>
            </LanguagesList>
          </SkillsColumn>
        </SkillsContainer>
      </SkillsSection>
      
      {/* Block 4: Qualities & Hobbies */}
      <QualitiesSection ref={refQualities}>
        <QualitiesContainer>
          <QualitiesColumn>
            <QualitiesTitle>Personal Qualities</QualitiesTitle>
            
            <QualitiesCarousel>
              <QualityItem
                initial={{ rotateY: 0, x: 0, y: 0 }}
                animate={{ rotateY: 360, x: [0, 100, 0], y: [0, -50, 0] }}
                transition={{ duration: 20, repeat: Infinity, repeatType: "loop" }}
                style={{ top: "30%", left: "10%" }}
              >
                Ambitious
              </QualityItem>
              
              <QualityItem
                initial={{ rotateY: 0, x: 0, y: 0 }}
                animate={{ rotateY: 360, x: [0, -80, 0], y: [0, 60, 0] }}
                transition={{ duration: 15, repeat: Infinity, repeatType: "loop", delay: 2 }}
                style={{ top: "50%", left: "50%" }}
              >
                Adaptable
              </QualityItem>
              
              <QualityItem
                initial={{ rotateY: 0, x: 0, y: 0 }}
                animate={{ rotateY: 360, x: [0, 60, 0], y: [0, 80, 0] }}
                transition={{ duration: 18, repeat: Infinity, repeatType: "loop", delay: 1 }}
                style={{ top: "10%", left: "40%" }}
              >
                Detail-Oriented
              </QualityItem>
              
              <QualityItem
                initial={{ rotateY: 0, x: 0, y: 0 }}
                animate={{ rotateY: 360, x: [0, -100, 0], y: [0, -70, 0] }}
                transition={{ duration: 22, repeat: Infinity, repeatType: "loop", delay: 3 }}
                style={{ top: "70%", left: "20%" }}
              >
                Responsible
              </QualityItem>
            </QualitiesCarousel>
          </QualitiesColumn>
          
          <QualitiesColumn>
            <HobbiesContainer>
              <HobbiesTitle>Hobbies & Interests</HobbiesTitle>
              
              <HobbiesList>
                <HobbyItem>
                  <HobbyIcon>⚽</HobbyIcon>
                  Football (1-2 times per week)
                </HobbyItem>
                
                <HobbyItem>
                  <HobbyIcon>🎮</HobbyIcon>
                  Computer Games
                </HobbyItem>
                
                <HobbyItem>
                  <HobbyIcon>📚</HobbyIcon>
                  Japanese Literature
                </HobbyItem>
                
                <HobbyItem>
                  <HobbyIcon>📖</HobbyIcon>
                  Provence Region Books
                </HobbyItem>
                
                <HobbyItem>
                  <HobbyIcon>🎬</HobbyIcon>
                  Japanese Animation (Anime)
                </HobbyItem>
              </HobbiesList>
            </HobbiesContainer>
          </QualitiesColumn>
        </QualitiesContainer>
      </QualitiesSection>
      
      {/* Block 5: Courses & Certifications */}
      <CoursesSection ref={refCourses}>
        <CoursesContainer>
          <CoursesTitle>Courses & Certifications</CoursesTitle>
          
          <CoursesList
            as={motion.div}
            initial="hidden"
            animate={controlsCourses}
            variants={staggerContainer}
          >
            <CourseItem variants={fadeInUp}>
              <CourseTitle>UX Designer</CourseTitle>
              <CourseProvider>Coursera</CourseProvider>
              <CourseDate>September 2024 - Present</CourseDate>
              <CourseDescription>
                Currently pursuing UX Design certification to enhance user interface design skills and understanding of user experience principles.
              </CourseDescription>
              <CertificateLink href="#">
                <FaBook style={{ marginRight: '8px' }} /> View Certificate
              </CertificateLink>
            </CourseItem>
            
            <CourseItem variants={fadeInUp}>
              <CourseTitle>WordPress Development</CourseTitle>
              <CourseProvider>PlayDev</CourseProvider>
              <CourseDate>July 2023 - August 2023</CourseDate>
              <CourseDescription>
                Completed intensive training in WordPress development, focusing on theme customization, plugin development, and website optimization.
              </CourseDescription>
              <CertificateLink href="#">
                <FaBook style={{ marginRight: '8px' }} /> View Certificate
              </CertificateLink>
            </CourseItem>
            
            <CourseItem variants={fadeInUp}>
              <CourseTitle>Video Editing - Premier Pro</CourseTitle>
              <CourseProvider>Andrey Sobol</CourseProvider>
              <CourseDate>November 2024 - Present</CourseDate>
              <CourseDescription>
                Learning advanced video editing techniques and post-production workflows using Adobe Premier Pro.
              </CourseDescription>
              <CertificateLink href="#">
                <FaBook style={{ marginRight: '8px' }} /> View Certificate
              </CertificateLink>
            </CourseItem>
            
            <CourseItem variants={fadeInUp}>
              <CourseTitle>Accessibility in Design</CourseTitle>
              <CourseProvider>Google UX Design Certificate</CourseProvider>
              <CourseDate>Completed: August 2020</CourseDate>
              <CourseDescription>
                Studied inclusive design practices to create products that are accessible to users of all abilities, following WCAG guidelines and best practices.
              </CourseDescription>
              <CertificateLink href="#">
                <FaBook style={{ marginRight: '8px' }} /> View Certificate
              </CertificateLink>
            </CourseItem>
          </CoursesList>
        </CoursesContainer>
      </CoursesSection>
    </>
  );
};

export default About;