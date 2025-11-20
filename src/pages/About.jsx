import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGraduationCap, FaCode, FaLanguage, FaStar, FaBook } from 'react-icons/fa';

// Block 1: Work Experience
const ExperienceSection = styled.section`
  padding: 8rem 2rem 4rem;
  background-color: #ffffff;
  color: #000000;
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
    background-color: #000000;
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
  color: #000000;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100%;
    height: 3px;
    background: #4B0082;
  }
`;

const ExperienceItem = styled(motion.div)`
  margin-bottom: 2rem;
  padding: 1.5rem;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  border-left: 4px solid #4B0082;
`;

const ExperienceTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const ExperienceCompany = styled.h4`
  font-size: 1.2rem;
  color: #4B0082;
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
    top: 100px;
    left: 35%;
    background-image: url('https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
    z-index: 3;
  }

  &:nth-child(2) {
    top: 200px;
    left: 15%;
    background-image: url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
    z-index: 2;
  }

  &:nth-child(3) {
    top: 300px;
    left: 55%;
    background-image: url('https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
    z-index: 1;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
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
    background-image: url('https://commons.wikimedia.org/wiki/Special:FilePath/Shelves%20of%20Language%20Books%20in%20Library.JPG');
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
const SkillsSection = styled.section.attrs({ className: 'SkillsSection' })`
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
  max-width: 100%;
  overflow-wrap: anywhere;
  word-break: break-word;
  text-align: center;
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
  min-height: 400px;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: column;
  }
`;

const QualitiesColumn = styled.div`
  flex: 1;
`;

const QualitiesTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
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

const QualitiesScene = styled.div`
  width: 500px;
  height: 500px;
  transform-style: preserve-3d;
  transition: transform 1s;
  position: relative;
  perspective:100%;
  transform: ${props => props.cubeTransform};
  transform-origin: center center;
  /* Ensure cube is centered */
  display: flex;
  justify-content: center;
  align-items: center;`;

const QualityFace = styled(motion.div)`
  position: absolute;
  width: 350px;
  height: 350px;
  background: ${props => props.theme.colors.accent};
  border: 2px solid #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  color: white;
  backface-visibility: hidden;
  opacity: 0.95;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  transition: opacity 0.3s ease;
  transform-origin: center;
  
  /* Set equal distance for all faces */
  &.front  { transform: rotateY(0deg) translateZ(175px); }
  &.back   { transform: rotateY(180deg) translateZ(175px); }
  &.right  { transform: rotateY(90deg) translateZ(175px); }
  &.left   { transform: rotateY(-90deg) translateZ(175px); }
  &.top    { transform: rotateX(90deg) translateZ(175px); }
  &.bottom { transform: rotateX(-90deg) translateZ(175px); }

  &:hover {
    opacity: 1;
  }`;

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
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.accent};
  font-size: 0.9rem;
  transition: color 0.3s ease;
  margin-bottom: 0.5rem;
  
  &:hover {
    color: white;
  }
  
  &:last-child {
    margin-bottom: 0;
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
  
  // State for cube rotation and visible face
  const [currentFaceIndex, setCurrentFaceIndex] = useState(0);
  const [cubeTransform, setCubeTransform] = useState('rotateX(0deg) rotateY(0deg)');

  // Define faces array with their rotations
  const faces = [
    { name: 'front',   x: 0,   y: 0,    text: 'Problem Solver' },
    { name: 'back',    x: 0,   y: 180,  text: 'Team Player' },
    { name: 'right',   x: 0,   y: 90,   text: 'Creative Thinker' },
    { name: 'left',    x: 0,   y: -90,  text: 'Detail Oriented' },
    { name: 'top',     x: 90,  y: 0,    text: 'Fast Learner' },
    { name: 'bottom',  x: -90, y: 0,    text: 'Adaptable' }
  ];

  // Function to rotate to a specific face
  const rotateToFace = (index) => {
    const face = faces[index];
    setCubeTransform(`rotateX(${face.x}deg) rotateY(${face.y}deg)`);
    setCurrentFaceIndex(index);
  };

  // Function to rotate to a random new face
  const rotateRandomlyToNewFace = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * faces.length);
    } while (newIndex === currentFaceIndex);
    rotateToFace(newIndex);
  };

  // Initialize and rotate cube every 3 seconds
  useEffect(() => {
    rotateToFace(currentFaceIndex);
    const interval = setInterval(rotateRandomlyToNewFace, 3000);
    return () => clearInterval(interval);
  }, []);
  
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
            <EducationImage 
              initial="hidden"
              animate={controlsEducation}
              variants={fadeInLeft}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            />
            <EducationImage 
              initial="hidden"
              animate={controlsEducation}
              variants={fadeInLeft}
              transition={{ delay: 0.4 }}
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
                <SkillName>HTML/CSS/JS</SkillName>
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
                <SkillName>AI Tools</SkillName>
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
                <SkillName>Figma</SkillName>
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
            
            <QualitiesScene style={{ transform: cubeTransform }}>
              {faces.map(face => (
                <QualityFace key={face.name} className={face.name}>
                  <div className="text">{face.text}</div>
                </QualityFace>
              ))}
            </QualitiesScene>
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
              <CourseProvider>Google</CourseProvider>
              <CourseDate>January 2024 - Present</CourseDate>
              <CourseDescription>
                Comprehensive UX design program covering user research, wireframing, prototyping, and usability testing. Learning to create user-centered designs using industry-standard tools and methodologies.
              </CourseDescription>
              <div className="certificate-links">
                <CertificateLink href="/Build.UI.pdf" target="_blank">
                  UI Certificate <FaGraduationCap style={{ marginLeft: '0.5rem' }} />
                </CertificateLink>
                <CertificateLink href="/Build.Prot.pdf" target="_blank">
                  Prototyping Certificate <FaGraduationCap style={{ marginLeft: '0.5rem' }} />
                </CertificateLink>
                <CertificateLink href="/Figma.pdf" target="_blank">
                  Figma Certificate <FaGraduationCap style={{ marginLeft: '0.5rem' }} />
                </CertificateLink>
              </div>
            </CourseItem>
            
            <CourseItem variants={fadeInUp}>
              <CourseTitle>WordPress Development</CourseTitle>
              <CourseProvider>Udemy</CourseProvider>
              <CourseDate>July 2023 - August 2023</CourseDate>
              <CourseDescription>
                Advanced WordPress development course covering theme customization, plugin development, and best practices for creating scalable and maintainable WordPress websites.
              </CourseDescription>
              <CertificateLink href="/Certificat_Miron_Nicolae.png" target="_blank">
                View Certificate <FaGraduationCap style={{ marginLeft: '0.5rem' }} />
              </CertificateLink>
            </CourseItem>
            
            <CourseItem variants={fadeInUp}>
              <CourseTitle>Accessibility in Design</CourseTitle>
              <CourseProvider>Coursera</CourseProvider>
              <CourseDate>September 2023 - December 2023</CourseDate>
              <CourseDescription>
                In-depth study of accessibility principles and practices in digital design. Learning to create inclusive designs that work for users of all abilities.
              </CourseDescription>
              <div className="certificate-links">
                <CertificateLink href="/Start.UX.pdf" target="_blank">
                  Getting Started <FaGraduationCap style={{ marginLeft: '0.5rem' }} />
                </CertificateLink>
                <CertificateLink href="/Fond.of.UX.pdf" target="_blank">
                  Fundamentals <FaGraduationCap style={{ marginLeft: '0.5rem' }} />
                </CertificateLink>
                <CertificateLink href="/Conduct.UX.pdf" target="_blank">
                  Conducting Research <FaGraduationCap style={{ marginLeft: '0.5rem' }} />
                </CertificateLink>
              </div>
            </CourseItem>
          </CoursesList>
        </CoursesContainer>
      </CoursesSection>
    </>
  );
};

export default About;