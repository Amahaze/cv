import React, { useState, useEffect, useRef } from 'react';
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
`;

const ProjectsBlocks = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
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

  @keyframes neonPulse {
    0% { opacity: 0.8; }
    50% { opacity: 1; }
    100% { opacity: 0.8; }
  }
`;

const ProjectsSeparator = styled.div`
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, rgba(148,0,211,0.6), rgba(148,0,211,0.2));
  box-shadow: 0 0 15px rgba(148, 0, 211, 0.5);
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

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    position: static;
    top: auto;
    transform: none;
    flex-direction: row;
    gap: 2rem;
    justify-content: center;
    align-items: center;
    
    &.left, &.right {
      left: auto;
      right: auto;
    }
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
  width: clamp(28rem, 60vw, 50rem);
  max-width: calc(100% - 40rem);
  min-height: 35rem;
  position: relative;
  pointer-events: auto;
  margin: 0 2rem;
  --bc: #9400D3;
  --bs: 15px;
  --cs: 30px;
  grid-template-rows: var(--cs) auto 1fr;
  filter: drop-shadow(0 0 30px rgba(148, 0, 211, 0.7));

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    width: clamp(26rem, 55vw, 46rem);
    max-width: calc(100% - 36rem);
  }

  @media (max-width: ${props => props.theme.breakpoints.laptop}) {
    width: clamp(24rem, 60vw, 40rem);
    max-width: calc(100% - 30rem);
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    width: clamp(22rem, 90vw, 36rem);
    max-width: calc(100% - 4rem);
  }

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

const ProjectViewSection = styled.section`
  width: 100%;
  padding: 3rem 2rem;
  border-top: none;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const ProjectViewTitle = styled.h2`
  font-size: 2rem;
  color: ${props => props.theme.colors.secondary};
`;

const ProjectViewInner = styled.div`
  width: 100%;
  max-width: 1200px;
`;

const ProjectDivider = styled.div`
  height: 3px;
  width: 100%;
  background: linear-gradient(90deg, rgba(148,0,211,0.6), rgba(148,0,211,0.2));
  box-shadow: 0 0 15px rgba(148, 0, 211, 0.5);
  margin-bottom: 1.5rem;
`;

const ProjectViewHeading = styled.h2`
  font-size: 2rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #FFFFFF;
  text-shadow: 0 0 10px rgba(148, 0, 211, 0.6);
  margin-bottom: 1rem;
`;

const ProjectViewDescription = styled.p`
  font-size: 1.1rem;
  color: ${props => props.theme.colors.secondary};
  max-width: 900px;
`;

const DescriptionBlocks = styled.div`
  margin-top: 2rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
`;

const DescriptionCard = styled.div`
  display: grid;
  position: relative;
  --bc: #ffffff;
  --bs: 15px;
  --cs: 30px;
  grid-template-rows: var(--cs) auto 1fr;
  filter: drop-shadow(0 0 20px rgba(148, 0, 211, 0.4));

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
    padding: 2rem;
    border-radius: 1rem;
    clip-path: polygon(
      calc(var(--cs)) 0,
      calc(100% - var(--bs)) 0,
      calc(100% - var(--bs)) calc(100% - var(--cs)),
      calc(50% + var(--cs)) calc(100% - var(--cs)),
      50% 100%,
      var(--bs) 100%,
      var(--bs) var(--cs)
    );
    background: #f6f6f6;
    color: #111111;
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
    color: #111111;
    font-size: 1.2rem;
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

const DescriptionRow = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
`;

const DeploymentRow = styled(DescriptionRow)`
  flex-wrap: nowrap;
  align-items: stretch;
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    flex-wrap: wrap;
  }
`;
const ServicesRow = styled(DescriptionRow)`
  flex-wrap: nowrap;
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    flex-wrap: wrap;
  }
`;

const DescriptionText = styled(motion.div)`
  flex: 1 1 420px;
  font-size: 1.05rem;
  line-height: 1.6;
  color: #111111;
`;

const DescriptionImage = styled(motion.div)`
  flex: 1 1 420px;
  min-height: 280px;
  border-radius: 12px;
  background-image: url('/blocuriExample.PNG');
  background-size: cover;
  background-position: center;
  border: 2px solid rgba(148, 0, 211, 0.6);
  box-shadow: 0 0 22px rgba(148, 0, 211, 0.35), inset 0 0 14px rgba(148, 0, 211, 0.4);
  position: relative;
  overflow: hidden;
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    box-shadow: inset 0 0 40px rgba(0, 0, 0, 0.15);
  }
`;

const OverviewImage = styled(motion.div)`
  width: 100%;
  height: 60vh;
  max-height: 820px;
  min-height: 320px;
  border-radius: 12px;
  background-image: url('/verginia.PNG');
  background-size: cover;
  background-position: center;
  border: 2px solid rgba(148, 0, 211, 0.6);
  box-shadow: 0 0 22px rgba(148, 0, 211, 0.35), inset 0 0 14px rgba(148, 0, 211, 0.4);
  position: relative;
  overflow: hidden;
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    box-shadow: inset 0 0 40px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    height: 50vh;
  }

  @media (max-width: ${props => props.theme.breakpoints.laptop}) {
    height: 45vh;
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    height: 38vh;
  }
`;
const MoldanOverviewImage = styled(OverviewImage)`
  background-image: url('/moldan.gif');
`;
const MolDanServiceOverviewImage = styled(OverviewImage)`
  background-image: url('/molServicePrew.PNG');
`;
const FootballOverviewImage = styled(OverviewImage)`
  background-image: url('/fotbal.PNG');
`;

const I18nGif = styled(motion.div)`
  flex: 1 1 420px;
  min-height: 280px;
  border-radius: 12px;
  background-image: url('/langueExample.gif');
  background-size: cover;
  background-position: center;
  border: 2px solid rgba(148, 0, 211, 0.6);
  box-shadow: 0 0 22px rgba(148, 0, 211, 0.35), inset 0 0 14px rgba(148, 0, 211, 0.4);
  position: relative;
  overflow: hidden;
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    box-shadow: inset 0 0 40px rgba(0, 0, 0, 0.15);
  }
`;

const ResolutionGrid = styled.div`
  display: grid;
  grid-template-columns: 1.4fr 1fr 0.85fr;
  gap: 1rem;
  margin-top: 1rem;
  align-items: center;
  justify-items: center;
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 1rem;
  align-items: center;
  justify-items: center;
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const ResolutionImage = styled(motion.img)`
  --resH: 300px;
  height: auto;
  width: auto;
  max-height: var(--resH);
  max-width: 100%;
  border-radius: 12px;
  display: block;
  border: 2px solid rgba(148, 0, 211, 0.6);
  box-shadow: 0 0 22px rgba(148, 0, 211, 0.35), inset 0 0 14px rgba(148, 0, 211, 0.2);

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    --resH: 280px;
  }
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    --resH: 240px;
  }
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    --resH: 200px;
  }
`;

const PcResolutionImage = styled(ResolutionImage)`
  transform: scale(1.1);
  transform-origin: center;
`;

const TabletResolutionImage = styled(ResolutionImage)`
  transform: scale(0.94);
  transform-origin: center;
`;

const MobileResolutionImage = styled(ResolutionImage)`
  transform: scale(0.94);
  transform-origin: center;
`;

const ContactImage = styled(motion.img)`
  flex: 1 1 420px;
  border-radius: 12px;
  width: 100%;
  height: auto;
  border: 2px solid rgba(148, 0, 211, 0.6);
  box-shadow: 0 0 22px rgba(148, 0, 211, 0.35), inset 0 0 14px rgba(148, 0, 211, 0.2);
`;

const DeploymentImage = styled(ContactImage)`
  height: auto;
  max-height: 320px;
  width: auto;
  max-width: 100%;
  object-fit: contain;
  align-self: flex-start;
  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    max-height: 300px;
  }
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    max-height: 260px;
  }
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    max-height: 220px;
  }
`;

const DescriptionActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.25rem;
  width: 100%;
`;

const ExternalLinkButton = styled.a`
  background: ${props => props.theme.colors.accent};
  color: white;
  text-decoration: none;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  display: inline-block;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
`;

// Project data
const projects = [
  { 
    id: 1, 
    title: 'Verginia.ro', 
    fullTitle: 'Verginia.ro',
    description: '',
    centralDescription: 'The Verginia.ro site is a website for medical instruments. It was built based on an already existing design. In this project, I worked as a full-stack developer.',
    image: '/verginia.PNG'
  },
  { 
    id: 2, 
    title: 'Moldan.md', 
    fullTitle: 'Moldan.md',
    centralDescription: 'The Moldan project is based on WordPress. In this project, I was hired to restore the site back to normal after it had been reverted from a backup.',
    image: '/moldanView.PNG'
  },
  { 
    id: 3, 
    title: 'MolDanService', 
    fullTitle: 'MolDanService',
    centralDescription: 'MolDanService is a website that provides authorized medical services, and it is built on WordPress.',
    image: '/molServicePrew.PNG'
  },
  { 
    id: 4, 
    title: 'Football Predictor', 
    fullTitle: 'Football Predictor',
    centralDescription: 'This project is an interesting one where I created a Python application for predicting football matches, using confusion matrix techniques and a logistic regression model',
    image: '/fotbal.PNG'
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
  const [showProjectView, setShowProjectView] = useState(false);
  const [viewProject, setViewProject] = useState(null);
  const separatorRef = useRef(null);

  const handleClick = (project) => {
    if (project === activeProject) {
      setActiveProject(null);
      setIsTitleVisible(true);
      setShowProjectView(false);
    } else {
      setActiveProject(project);
      setIsTitleVisible(false);
      setShowProjectView(false);
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
    setViewProject(activeProject);
    setShowProjectView(true);
  };

  useEffect(() => {
    if (showProjectView && separatorRef.current) {
      const rectTop = separatorRef.current.getBoundingClientRect().top + window.scrollY;
      const navbar = document.getElementById('projects-navbar');
      const offset = navbar ? navbar.offsetHeight : 0;
      window.scrollTo({ top: Math.max(rectTop - offset - 8, 0), behavior: 'smooth' });
    }
  }, [showProjectView]);
  
  return (
    <ProjectsSection>
      <ProjectsBlocks>
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
                    <ActiveProjectDescription>{activeProject.centralDescription || activeProject.description}</ActiveProjectDescription>
                    <ViewProjectButton onClick={handleViewProject}>View Project</ViewProjectButton>
                  </ProjectDetails>
                </div>
                </ActiveProjectCard>
              </ActiveProjectOverlay>
            )}
          </AnimatePresence>
        </ProjectsContainer>
      </ProjectsBlocks>

      {showProjectView && <ProjectsSeparator ref={separatorRef} />}

      {showProjectView && viewProject && (
        <ProjectViewSection>
          <ProjectViewInner>
            <ProjectDivider />
            <ProjectViewHeading>{viewProject.fullTitle || viewProject.title}</ProjectViewHeading>
            {viewProject.description && (
              <ProjectViewDescription>
                {viewProject.description}
              </ProjectViewDescription>
            )}
            <DescriptionBlocks>
              {viewProject?.title === 'Verginia.ro' && (
                <>
                  <DescriptionCard>
                    <figcaption>Project Overview</figcaption>
                    <div className="content-wrapper">
                      {viewProject.description && (
                        <p>
                          {viewProject.description}
                        </p>
                      )}
                      <OverviewImage
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                      />
                </div>
              </DescriptionCard>
              
                  <DescriptionCard>
                    <figcaption>Architecture & Platform</figcaption>
                    <div className="content-wrapper">
                      <DescriptionRow>
                        <DescriptionText
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                        >
                          <p>
                            Once I received this project, I began by selecting the platform for building the website. I chose React + Vite due to their strong performance optimization and the simplified development workflow they provide.
                          </p>
                          <p>
                            The site is structured using a block-based architecture, where each section corresponds to its own block. I selected this approach to ensure maximum flexibility and ease of maintenance for future developers. Any major change will affect only the relevant block, while the rest of the structure remains intact.
                          </p>
                        </DescriptionText>
                        <DescriptionImage
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.06 }}
                        />
                      </DescriptionRow>
                    </div>
                  </DescriptionCard>
                  <DescriptionCard>
                    <figcaption>Multilingual i18n</figcaption>
                    <div className="content-wrapper">
                      <DescriptionRow>
                        <I18nGif
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                        />
                        <DescriptionText
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.06 }}
                        >
                          <p>
                            The website is also fully compatible with i18n language technology, which significantly reduces the need to manually create separate divs for three different languages directly in the main code. With this system, the language can be switched dynamically and instantly without requiring a page reload, making the multilingual experience seamless and efficient for users while simplifying maintenance for developers.
                          </p>
                        </DescriptionText>
                      </DescriptionRow>
                    </div>
                  </DescriptionCard>
                  <DescriptionCard>
                    <figcaption>Resolution</figcaption>
                    <div className="content-wrapper">
                      <DescriptionText
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                      >
                        <p>
                          The website is fully compliant with industry standards, including effective responsiveness across all major platforms—desktop computers, tablets, and smartphones. This ensures that users enjoy a seamless and consistent experience regardless of the device they are using, with layouts, navigation, and content automatically adapting to different screen sizes and resolutions.
                        </p>
                      </DescriptionText>
                      <ResolutionGrid>
                        <PcResolutionImage
                          src={'/pcView.PNG'}
                          alt={'Desktop view'}
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                        />
                        <TabletResolutionImage
                          src={'/tabletView.PNG'}
                          alt={'Tablet view'}
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.06 }}
                        />
                        <MobileResolutionImage
                          src={'/mobileView.PNG'}
                          alt={'Mobile view'}
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.12 }}
                        />
                      </ResolutionGrid>
                    </div>
                  </DescriptionCard>
                  <DescriptionCard>
                    <figcaption>News Panel</figcaption>
                    <div className="content-wrapper">
                      <DescriptionText
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                      >
                        <p>
                          On the ‘News’ page, a fully functional news management system has been implemented, allowing the administrator to create, delete, edit, and add news articles. I opted for a simple yet effective technology stack based on API calls and JSON, as the site does not require a large or complex database for these functionalities. Each news article is automatically saved in JSON format and is loaded dynamically whenever the site is accessed. This approach ensures efficient performance, easy maintenance, and a seamless user experience, while keeping the system lightweight and highly responsive.
                        </p>
                      </DescriptionText>
                      <NewsGrid>
                        <ResolutionImage
                          src={'/newsPage.PNG'}
                          alt={'News page'}
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                        />
                        <ResolutionImage
                          src={'/addArticle.PNG'}
                          alt={'Add article'}
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.06 }}
                        />
                      </NewsGrid>
                    </div>
                  </DescriptionCard>
                  <DescriptionCard>
                    <figcaption>Contact Form</figcaption>
                    <div className="content-wrapper">
                      <DescriptionRow>
                        <DescriptionText
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                        >
                          <p>
                            For the subsequent configurations, the contact form was integrated using EmailJS. This setup allows direct interaction with the client’s Outlook account, enabling messages submitted through the form to be received seamlessly. This approach ensures reliable communication between the website and the client, providing a smooth and efficient message delivery system without requiring additional backend infrastructure.
                          </p>
                        </DescriptionText>
                        <ContactImage
                          src={'/contactForm.PNG'}
                          alt={'Contact form'}
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.06 }}
                        />
                      </DescriptionRow>
                    </div>
                  </DescriptionCard>
                  <DescriptionCard>
                    <figcaption>Deployment & SSL</figcaption>
                    <div className="content-wrapper">
                      <DeploymentRow>
                        <DescriptionText
                          style={{ order: 1, flex: '0.6 1 480px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                        >
                          <p>
                            Upon completion of the website, I deployed it to the client’s server and performed all the necessary configurations to ensure it functions correctly. Additionally, I activated the SSL certificate to secure the site and guarantee safe connections for users. With these final steps completed, the project was successfully finalized. To view the live website, please click the button below.
                          </p>
                        </DescriptionText>
                        <DeploymentImage
                          style={{ order: 2, flex: '0.4 1 360px' }}
                          src={'/sslKey.PNG'}
                          alt={'SSL certificate activation'}
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.06 }}
                        />
                      </DeploymentRow>
                      <DescriptionActions>
                        <ExternalLinkButton href={'https://verginia.ro/'} target={'_blank'} rel={'noopener noreferrer'}>
                          Visit Live Website
                        </ExternalLinkButton>
                      </DescriptionActions>
                    </div>
                  </DescriptionCard>
                </>
              )}
              {viewProject?.title === 'Moldan.md' && (
                <>
                  <DescriptionCard>
                    <figcaption>Project Overview</figcaption>
                    <div className="content-wrapper">
                      <MoldanOverviewImage
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                      />
                    </div>
                  </DescriptionCard>
                  <DescriptionCard>
                    <figcaption>Site Restoration</figcaption>
                    <div className="content-wrapper">
                      <DescriptionRow>
                        <DescriptionText
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                        >
                          <p>
                            Once I received this project, I was granted full authorization to begin working on the site. As a first step, I created an additional backup as a safety measure, ensuring that I could quickly restore the site if needed.
                          </p>
                          <p>
                            The client provided me with a list of visual and structural issues that had to be corrected—most of which were caused by an unsuccessful server-side backup restoration.
                          </p>
                          <p>
                            Several elements had been disrupted, including mismatched images, misaligned columns and rows, and various layout inconsistencies where boxes and sections appeared with incorrect or uneven dimensions. My task was to identify and systematically fix these issues, restoring the website to its proper and professional appearance.
                          </p>
                        </DescriptionText>
                        <ContactImage
                          src={'/moldanClients.PNG'}
                          alt={'Moldan clients view'}
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.06 }}
                        />
                      </DescriptionRow>
                    </div>
                  </DescriptionCard>
                  <DescriptionCard>
                    <figcaption>Corrections & Enhancements</figcaption>
                    <div className="content-wrapper">
                      <DescriptionRow>
                        <ContactImage
                          src={'/moldanContact.gif'}
                          alt={'Contact form updates'}
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                        />
                        <DescriptionText
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.06 }}
                        >
                          <p>
                            Several issues needed to be addressed, including replacing incorrect or mismatched images, adjusting the column and row structure where various boxes had inconsistent sizes, and reloading the 3D blocks along with their borders.
                          </p>
                          <p>
                            Additionally, I restored the language settings to ensure proper multilingual functionality, added new information where required, revised and improved existing content, and implemented as well as corrected the updated contact forms.
                          </p>
                          <p>
                            These steps were essential to bring the website back to a stable, visually coherent, and fully functional state.
                          </p>
                        </DescriptionText>
                        <ContactImage
                          src={'/moldanBock.gif'}
                          alt={'3D blocks and borders'}
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.12 }}
                        />
                      </DescriptionRow>
                    </div>
                  </DescriptionCard>
                  <DescriptionCard>
                    <figcaption>Challenges & Approach</figcaption>
                    <div className="content-wrapper">
                      <DescriptionText
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                      >
                        <p>
                          However, several challenges appeared during the process. The foundation of this website was built using Porto and WPBakery—two environments that were relatively new to me at the time. Nevertheless, I quickly familiarized myself with their documentation and workflow, which allowed me to address the issues efficiently.
                        </p>
                        <p>
                          A major complication was that many of Porto’s standard editing methods were unavailable, most likely because the backup restoration did not properly reload or recognize certain components. As a result, many adjustments had to be performed manually through code editing within WordPress.
                        </p>
                        <p>
                          To achieve this, I identified the necessary elements using Chrome’s developer tools and applied the required modifications by adding custom attributes and styles directly inside WordPress. This approach ensured full restoration of the site’s appearance and functionality despite the limitations imposed by the corrupted backup.
                        </p>
                      </DescriptionText>
                      <DescriptionActions>
                        <ExternalLinkButton href={'https://moldan.md/'} target={'_blank'} rel={'noopener noreferrer'}>
                          Visit Live Website
                        </ExternalLinkButton>
                      </DescriptionActions>
                    </div>
                  </DescriptionCard>
                </>
              )}
              {viewProject?.title === 'MolDanService' && (
                <>
                  <DescriptionCard>
                    <figcaption>Project Overview</figcaption>
                    <div className="content-wrapper">
                      <MolDanServiceOverviewImage
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                      />
                    </div>
                  </DescriptionCard>
                  <DescriptionCard>
                    <figcaption>Architecture & Platform</figcaption>
                    <div className="content-wrapper">
                      <DescriptionRow>
                        <DescriptionText
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                        >
                          <p>
                            The MoldanService project is quite similar to the Moldan project, as both follow the same overall website structure and layout approach. However, MoldanService differs slightly in terms of its internal organization and page structure.
                          </p>
                          <p>
                            For this project, I performed many of the same tasks as in the previous Moldan site, including manually correcting various elements directly in the code to ensure full functionality and visual consistency.
                          </p>
                          <p>
                            During the restructuring process, I worked with Porto, WPBakery, 3D Blocks, and several additional components to successfully restore and optimize the website. These tools allowed me to refine the site’s layout, adjust design elements, and ensure that everything operated smoothly and according to the required standards.
                          </p>
                        </DescriptionText>
                        <ContactImage
                          src={'/mdolserviceOt.PNG'}
                          alt={'MolDanService architecture example'}
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.06 }}
                        />
                      </DescriptionRow>
                    </div>
                  </DescriptionCard>
                  <DescriptionCard>
                    <figcaption>Services Overview</figcaption>
                    <div className="content-wrapper">
                      <ServicesRow>
                        <DescriptionText
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                        >
                          <p>
                            The website showcases a comprehensive range of authorized medical services, designed with a strong emphasis on clarity, professionalism, and ease of navigation. Each content section is structured to highlight the company’s core medical solutions — including CT systems, MRI systems, Faraday cages, X-Ray equipment, oxygen and nitrogen generators, as well as specialized helium liquid refilling services — allowing visitors to quickly understand the organization’s expertise and service scope.
                          </p>
                          <p>
                            Service blocks are presented in a clean, accessible layout, ensuring that both medical professionals and potential partners can find relevant information with minimal effort. Descriptive texts accompany each image and service category, offering a clear overview of capabilities, technical strengths, and long-term maintenance possibilities.
                          </p>
                          <p>
                            The platform’s architecture is designed to remain scalable and flexible, supporting future extensions such as: presentation of strategic partners, complete turnkey solutions for MRI/CT/X-Ray diagnostic centers, advanced maintenance programs, and new medical equipment integrations. This ensures that the site can evolve naturally alongside the company's expanding portfolio of services.
                          </p>
                          <p>
                            Additionally, the structure emphasizes trust and accessibility by providing well-defined contact sections, working hours, and essential points of communication. The overall presentation follows industry standards for medical service providers, aligning visual clarity with technical precision to deliver a reliable and professional user experience.
                          </p>
                        </DescriptionText>
                        <ContactImage
                          src={'/moldService.PNG'}
                          alt={'MolDanService services overview'}
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.06 }}
                        />
                      </ServicesRow>
                      <DescriptionActions>
                        <ExternalLinkButton href={'https://moldanservice.md/ro/'} target={'_blank'} rel={'noopener noreferrer'}>
                          Visit Live Website
                        </ExternalLinkButton>
                      </DescriptionActions>
                    </div>
                  </DescriptionCard>
                </>
              )}
              {viewProject?.title === 'Football Predictor' && (
                <>
                  <DescriptionCard>
                    <figcaption>Project Overview</figcaption>
                    <div className="content-wrapper">
                      <FootballOverviewImage
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                      />
                    </div>
                  </DescriptionCard>
                  <DescriptionCard>
                    <figcaption>Data & Preprocessing</figcaption>
                    <div className="content-wrapper">
                      <DescriptionRow>
                        <DescriptionText
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                        >
                          <p>
                            Data is sourced from football-data.co.uk, Kaggle, and Transfermarkt; cleaned to remove incomplete matches and anomalies. Features include recent form, goal difference, streaks, and point gaps.
                          </p>
                          <p>
                            Teams are encoded, splits use stratification to keep class balance, and variables are standardized for stable learning.
                          </p>
                        </DescriptionText>
                      </DescriptionRow>
                      <ContactImage
                        src={'/fotblaMactvh.PNG'}
                        alt={'Match data and processing overview'}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.06 }}
                      />
                    </div>
                  </DescriptionCard>
                  <DescriptionCard>
                    <figcaption>Approach & Model</figcaption>
                    <div className="content-wrapper">
                      <DescriptionRow>
                        <DescriptionText
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                        >
                          <p>
                            Multiclass logistic regression predicts home win, draw, or away win using engineered features (form, goal differential, home/away, streaks). Coefficients remain interpretable for transparent decisions.
                          </p>
                        </DescriptionText>
                        <ContactImage
                          src={'/fotblaTeam.PNG'}
                          alt={'Team features and model overview'}
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.06 }}
                        />
                      </DescriptionRow>
                      <NewsGrid>
                        <ContactImage
                          src={'/homeStats.PNG'}
                          alt={'Home stats'}
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.08 }}
                        />
                        <ContactImage
                          src={'/awayStats.PNG'}
                          alt={'Away stats'}
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.10 }}
                        />
                      </NewsGrid>
                    </div>
                  </DescriptionCard>
                  <DescriptionCard>
                    <figcaption>Evaluation</figcaption>
                    <div className="content-wrapper">
                      <DescriptionRow>
                        <DescriptionText
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                        >
                          <p>
                            Performance is assessed with a confusion matrix and class metrics (accuracy, precision, recall). Stratified splits preserve class balance; error patterns guide feature updates and threshold tuning.
                          </p>
                        </DescriptionText>
                      </DescriptionRow>
                      <ContactImage
                        src={'/precison.PNG'}
                        alt={'Precision metrics'}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.06 }}
                      />
                    </div>
                  </DescriptionCard>
                  <DescriptionCard>
                    <figcaption>Application & Extensions</figcaption>
                    <div className="content-wrapper">
                      <DescriptionRow>
                        <DescriptionText
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                        >
                          <p>
                            A simple UI supports manual input or CSV uploads for upcoming matches. The design prioritizes accessibility and interpretability of predictions for non-experts.
                          </p>
                          <p>
                            Future growth includes more features, alternative models (Random Forest, ensembles), calibrated probabilities, and expansion to other sports.
                          </p>
                        </DescriptionText>
                      </DescriptionRow>
                      <DescriptionActions>
                        <ExternalLinkButton href={'/teza_MIRON_Nicolae_(09.05.2025).docx'} download>
                          Download Visualization File
                        </ExternalLinkButton>
                      </DescriptionActions>
                    </div>
                  </DescriptionCard>
                </>
              )}
            </DescriptionBlocks>
          </ProjectViewInner>
        </ProjectViewSection>
      )}
    </ProjectsSection>
  );
};

export default Projects;