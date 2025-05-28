import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const projects = [
  {
    id: 1,
    title: "Messaging App",
    details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet.",
    image: "https://via.placeholder.com/300x200?text=Messaging+App"
  },
  {
    id: 2,
    title: "E-commerce Platform",
    details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet.",
    image: "https://via.placeholder.com/300x200?text=E-commerce+Platform"
  },
  {
    id: 3,
    title: "AI Image Classifier",
    details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet.",
    image: "https://via.placeholder.com/300x200?text=AI+Image+Classifier"
  },
  {
    id: 4,
    title: "Mobile App (Flutter)",
    details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet.",
    image: "https://via.placeholder.com/300x200?text=Mobile+App"
  }
];

export default function ProjectShowcase() {
  const [activeProject, setActiveProject] = useState(null);

  const handleClick = (project) => {
    setActiveProject(project);
  };

  return (
    <div className="relative min-h-screen bg-gray-900 text-white overflow-hidden">
      <h1 className="text-5xl font-bold text-center pt-20 mb-20 font-mono tracking-wide">
        Projects
      </h1>

      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 space-y-8 pl-4">
        {projects.slice(0, 2).map((project) => (
          <motion.div
            key={project.id}
            onClick={() => handleClick(project)}
            className="w-60 h-40 bg-gray-800 rounded-xl cursor-pointer shadow-lg overflow-hidden relative group"
            style={{ backgroundImage: `url(${project.image})`, backgroundSize: 'cover' }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <h3 className="text-xl font-semibold">{project.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 space-y-8 pr-4">
        {projects.slice(2, 4).map((project) => (
          <motion.div
            key={project.id}
            onClick={() => handleClick(project)}
            className="w-60 h-40 bg-gray-800 rounded-xl cursor-pointer shadow-lg overflow-hidden relative group"
            style={{ backgroundImage: `url(${project.image})`, backgroundSize: 'cover' }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <h3 className="text-xl font-semibold">{project.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {activeProject && (
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <motion.div
              className="bg-white text-black p-10 rounded-3xl shadow-2xl w-[600px] text-center"
              layoutId={`project-${activeProject.id}`}
            >
              <img src={activeProject.image} alt={activeProject.title} className="rounded-xl mb-4 w-full h-60 object-cover" />
              <h2 className="text-3xl font-bold mb-2">{activeProject.title}</h2>
              <p className="text-lg mb-4">{activeProject.details}</p>
              <button className="mt-2 px-6 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition">
                View Project
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}