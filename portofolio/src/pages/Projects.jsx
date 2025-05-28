import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import projectIcon from '../assets/project-icon.svg';

const ProjectsSection = styled.section`
  min-height: 100vh;
  padding: 0;
  background: #000000;
  color: ${props => props.theme.colors.secondary};
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: repeating-linear-gradient(
      ${() => Math.random() * 360}deg,
      rgba(148, 0, 211, 0.3),
      rgba(148, 0, 211, 0.3) 3px,
      transparent 3px,
      transparent 60px
    );
    z-index: 1;
    box-shadow: 0 0 15px rgba(148, 0, 211, 0.5);
    animation: neonPulse 2s infinite;
    transform: skew(${() => Math.random() * 20 - 10}deg);
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: repeating-linear-gradient(
      ${() => Math.random() * -360}deg,
      rgba(148, 0, 211, 0.2),
      rgba(148, 0, 211, 0.2) 3px,
      transparent 3px,
      transparent 90px
    );
    z-index: 1;
    box-shadow: 0 0 20px rgba(148, 0, 211, 0.6);
    animation: neonPulse 2s infinite reverse;
    transform: rotate(${() => Math.random() * 15 - 7.5}deg);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: repeating-linear-gradient(
      ${() => Math.random() * 180}deg,
      rgba(148, 0, 211, 0.15),
      rgba(148, 0, 211, 0.15) 2px,
      transparent 2px,
      transparent 120px
    );
    z-index: 1;
    box-shadow: 0 0 25px rgba(148, 0, 211, 0.4);
    animation: neonPulse 3s infinite;
    transform: rotate(${() => Math.random() * 30 - 15}deg) scale(1.2);
  }

  @keyframes neonPulse {
    0% { opacity: 0.8; }
    50% { opacity: 1; }
    100% { opacity: 0.8; }
  }
`;

const ProjectIcon = styled(motion.img)`
  width: 300px;
  height: 300px;
  position: relative;
  z-index: 2;
  opacity: ${props => props.isActive ? 0 : 1};
  transition: all 0.3s ease;
  filter: drop-shadow(0 0 10px rgba(148, 0, 211, 0.7));
  
  &:hover {
    filter: drop-shadow(0 0 15px rgba(148, 0, 211, 1));
    transform: scale(1.05);
  }
`;

const ProjectsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
`;

const ProjectColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5rem;
  position: absolute;
  top: -8rem;
  transform: translateY(-50%);
  
  &.left {
    left: 5rem;
  }
  
  &.right {
    right: 5rem;
  }
`;

const ProjectCard = styled(motion.div)`
  display: grid;
  width: 15rem;
  height: 15rem;
  position: relative;
  cursor: pointer;
  --bc: #9400D3;
  --bs: 10px;
  --cs: 20px;
  grid-template-rows: var(--cs) auto 1fr;
  transition: all 0.3s ease;
  filter: drop-shadow(0 0 30px rgba(148, 0, 211, 0.7));

  &::before {
    content: "";
    grid-area: 2/1/4/2;
    background-color: var(--bc);
    clip-path: polygon(
      var(--cs) 0,
      100% 0,
      100% calc(100% - var(--cs)),
      calc(50% + var(--cs)) calc(100% - var(--cs)),
      50% 100%,
      0% 100%,
      0 var(--cs)
    );
  }

  img {
    grid-area: 2/1/4/2;
    width: 100%;
    height: 100%;
    object-fit: cover;
    --em: .5;
    clip-path: polygon(
      calc(var(--cs) + var(--bs) * var(--em)) var(--bs),
      calc(100% - var(--bs)) var(--bs),
      calc(100% - var(--bs)) calc(100% - var(--cs) - var(--bs)),
      calc(50% + var(--cs) - var(--bs) * var(--em)) calc(100% - var(--cs) - var(--bs)),
      calc(50% - var(--bs) * var(--em)) calc(100% - var(--bs)),
      var(--bs) calc(100% - var(--bs)),
      var(--bs) calc(var(--cs) + var(--bs) * var(--em))
    );
  }

  figcaption {
    grid-area: 1/1/2/2;
    justify-self: end;
    min-width: 50%;
    min-height: calc(var(--cs) * 2 + var(--bs));
    display: grid;
    place-items: center;
    text-align: center;
    background-color: var(--bc);
    color: #a3bfc6;
    font-size: 1rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    clip-path: polygon(
      var(--cs) 0,
      100% 0,
      100% 100%,
      0 100%,
      0 var(--cs)
    );
  }

  &:hover {
    --bc: rgba(148, 0, 211, 1);
    transform: scale(1.02);
    figcaption {
      color: #FFFFFF;
    }
  }
`;



const ActiveProjectOverlay = styled(motion.div)`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  top: -8rem;
  transform: translateY(-50%);
`;

const ActiveProjectCard = styled(motion.div)`
  display: grid;
  width: 70rem;
  min-height: 35rem;
  position: relative;
  pointer-events: auto;
  --bc: #9400D3;
  --bs: 15px;
  --cs: 30px;
  grid-template-rows: var(--cs) auto 1fr;
  filter: drop-shadow(0 0 30px rgba(148, 0, 211, 0.7));
  
  &::before {
    content: "";
    grid-area: 2/1/4/2;
    background-color: var(--bc);
    clip-path: polygon(
      var(--cs) 0,
      100% 0,
      100% calc(100% - var(--cs)),
      calc(50% + var(--cs)) calc(100% - var(--cs)),
      50% 100%,
      0% 100%,
      0 var(--cs)
    );
  }

  .content-wrapper {
    grid-area: 2/1/4/2;
    margin: var(--bs);
    margin-top: calc(var(--cs) + var(--bs));
    margin-bottom: calc(var(--cs) + var(--bs));
    display: flex;
    gap: 2rem;
    clip-path: polygon(
      calc(var(--cs)) 0,
      calc(100% - var(--bs)) 0,
      calc(100% - var(--bs)) calc(100% - var(--cs)),
      calc(50% + var(--cs)) calc(100% - var(--cs)),
      50% 100%,
      var(--bs) 100%,
      var(--bs) var(--cs)
    );
  }

  figcaption {
    grid-area: 1/1/2/2;
    justify-self: end;
    min-width: 50%;
    min-height: calc(var(--cs) * 2 + var(--bs));
    display: grid;
    place-items: center;
    text-align: center;
    background-color: var(--bc);
    color: #a3bfc6;
    font-size: 1.5rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    clip-path: polygon(
      var(--cs) 0,
      100% 0,
      100% 100%,
      0 100%,
      0 var(--cs)
    );
  }
`;

const ActiveProjectTitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.secondary};
`;

const ActiveProjectFullTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 600;
  color: #FFFFFF;
  margin-bottom: 0.1rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 0 0 10px rgba(148, 0, 211, 0.7);
`;

const ActiveProjectDescription = styled.p`
  font-size: 1.25rem;
  color: ${props => props.theme.colors.secondary};
`;

// Project data
const projects = [
  { 
    id: 1, 
    title: 'Travel Website', 
    fullTitle: 'Interactive Travel Booking Website Platform',
    description: 'A modern, responsive design for a travel booking platform with intuitive navigation and immersive visual experience.',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  { 
    id: 2, 
    title: 'Game Store', 
    fullTitle: 'Digital Gaming Marketplace Platform',
    description: 'Digital marketplace for gamers with personalized recommendations and seamless checkout experience.',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  { 
    id: 3, 
    title: 'Sticker Shop', 
    fullTitle: 'Custom Sticker and Poster E-commerce Platform',
    description: 'E-commerce platform for artists to sell custom stickers and posters with focus on showcasing artwork.',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  { 
    id: 4, 
    title: 'Mobile App', 
    fullTitle: 'Enterprise Mobile Application Development Platform',
    description: 'UI/UX design for an IT company specializing in mobile app development with focus on user engagement.',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
];

const CarouselContainer = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  height: 500px;
  overflow: hidden;
`;

const CarouselItem = styled(motion.div)`
  position: absolute;
  width: 250px;
  height: 400px;
  border-radius: 15px;
  overflow: hidden;
  border: 1px solid rgba(75, 0, 130, 0.4);
  box-shadow: 12px 12px 2px 1px rgba(75, 0, 130, 0.4);
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    box-shadow: -12px 12px 2px -1px rgba(75, 0, 130, 0.4);
    transform: scale(1.02);
  }
`;

const CarouselImage = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%);
  }
`;

const CarouselContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1.5rem;
  z-index: 3;
`;

const CarouselTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: white;
`;

const QualityBox = styled(motion.div)`
  position: absolute;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.8);
  border: 1px solid ${props => props.theme.colors.accent};
  border-radius: 10px;
  color: white;
  font-size: 0.9rem;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  z-index: 10;
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

const ProjectImage = styled.div`
  flex: 0.6;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  border-radius: 1rem;
  min-width: 25rem;
  border: 1px solid rgba(148, 0, 211, 0.4);
  box-shadow: 0 0 20px rgba(148, 0, 211, 0.2);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.4));
    border-radius: 1rem;
  }
`;

const ProjectDetails = styled.div`
  flex: 0.4;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem;
  background: #000000;
  border-radius: 1rem;
  border: 1px solid rgba(148, 0, 211, 0.3);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: repeating-linear-gradient(
      ${() => Math.random() * 360}deg,
      rgba(148, 0, 211, 0.3),
      rgba(148, 0, 211, 0.3) 3px,
      transparent 3px,
      transparent 60px
    );
    z-index: 1;
    box-shadow: 0 0 15px rgba(148, 0, 211, 0.5);
    animation: neonPulse 2s infinite;
    transform: skew(${() => Math.random() * 20 - 10}deg);
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: repeating-linear-gradient(
      ${() => Math.random() * -360}deg,
      rgba(148, 0, 211, 0.2),
      rgba(148, 0, 211, 0.2) 3px,
      transparent 3px,
      transparent 90px
    );
    z-index: 1;
    box-shadow: 0 0 20px rgba(148, 0, 211, 0.6);
    animation: neonPulse 2s infinite reverse;
    transform: rotate(${() => Math.random() * 15 - 7.5}deg);
  }

  > * {
    position: relative;
    z-index: 2;
  }
`;

const ViewProjectButton = styled.button`
  background: ${props => props.theme.colors.accent};
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
`;

const Projects = () => {
  const [activeProject, setActiveProject] = useState(null);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [isTitleVisible, setIsTitleVisible] = useState(true);

  const handleClick = (project) => {
    if (project === activeProject) {
      setActiveProject(null);
      setIsTitleVisible(true);
    } else {
      setActiveProject(project);
      setIsTitleVisible(false);
    }
  };

  const handleHover = (project) => {
    setHoveredProject(project);
  };

  const handleHoverEnd = () => {
    setHoveredProject(null);
  };

  const handleViewProject = (e) => {
    e.stopPropagation();
    // Add navigation logic here
    console.log('View project clicked');
  };
  
  return (
    <ProjectsSection>
      <ProjectIcon
        src={projectIcon}
        alt="Projects"
        isActive={!isTitleVisible}
        initial={{ opacity: 1, y: 0, rotate: 0 }}
        animate={{ 
          opacity: isTitleVisible ? 1 : 0,
          y: isTitleVisible ? 0 : -50,
          rotate: isTitleVisible ? [0, 5, -5, 0] : 0
        }}
        transition={{ 
          duration: 0.5,
          rotate: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      />
      
      <ProjectsContainer>
        <ProjectColumn className="left">
          {projects.slice(0, 2).map((project) => (
            <ProjectCard
              key={project.id}
              onClick={() => handleClick(project)}
              onHoverStart={() => handleHover(project)}
              onHoverEnd={handleHoverEnd}
              animate={{
                scale: hoveredProject?.id === project.id ? 1.05 : 1,
                transition: { duration: 0.3 }
              }}
            >
              <img src={project.image} alt={project.title} />
              <figcaption>{project.title}</figcaption>
            </ProjectCard>
          ))}
        </ProjectColumn>

        <ProjectColumn className="right">
          {projects.slice(2, 4).map((project) => (
            <ProjectCard
              key={project.id}
              onClick={() => handleClick(project)}
              onHoverStart={() => handleHover(project)}
              onHoverEnd={handleHoverEnd}
              animate={{
                scale: hoveredProject?.id === project.id ? 1.05 : 1,
                transition: { duration: 0.3 }
              }}
            >
              <img src={project.image} alt={project.title} />
              <figcaption>{project.title}</figcaption>
            </ProjectCard>
          ))}
        </ProjectColumn>

        <AnimatePresence>
          {activeProject && (
            <ActiveProjectOverlay>
              <ActiveProjectCard
                key={activeProject.id}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                onClick={() => handleClick(null)}
              >
                <figcaption>{activeProject.title}</figcaption>
                <div className="content-wrapper">
                  <ProjectImage image={activeProject.image} />
                  <ProjectDetails>
                    <ActiveProjectFullTitle>{activeProject.fullTitle}</ActiveProjectFullTitle>
                    <ActiveProjectDescription>{activeProject.description}</ActiveProjectDescription>
                    <ViewProjectButton onClick={handleViewProject}>View Project</ViewProjectButton>
                  </ProjectDetails>
                </div>
              </ActiveProjectCard>
            </ActiveProjectOverlay>
          )}
        </AnimatePresence>
      </ProjectsContainer>
    </ProjectsSection>
  );
};

export default Projects;