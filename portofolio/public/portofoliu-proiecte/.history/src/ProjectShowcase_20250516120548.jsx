import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const projects = [
  { id: 1, title: "Project Alpha", description: "React + Node.js App" },
  { id: 2, title: "Project Beta", description: "E-commerce Platform" },
  { id: 3, title: "Project Gamma", description: "AI Image Classifier" },
  { id: 4, title: "Project Delta", description: "Mobile App (Flutter)" },
];

export default function ProjectShowcase() {
  const [activeProject, setActiveProject] = useState(null);

  const handleHover = (project) => {
    setActiveProject(project);
  };

  const handleLeave = () => {
    setActiveProject(null);
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
            onMouseEnter={() => handleHover(project)}
            onMouseLeave={handleLeave}
            whileHover={{ scale: 1.05 }}
            className="w-48 p-4 bg-gray-800 rounded-2xl cursor-pointer shadow-lg hover:shadow-yellow-400 transition"
          >
            <h3 className="text-xl font-semibold">{project.title}</h3>
          </motion.div>
        ))}
      </div>

      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 space-y-8 pr-4">
        {projects.slice(2, 4).map((project) => (
          <motion.div
            key={project.id}
            onMouseEnter={() => handleHover(project)}
            onMouseLeave={handleLeave}
            whileHover={{ scale: 1.05 }}
            className="w-48 p-4 bg-gray-800 rounded-2xl cursor-pointer shadow-lg hover:shadow-purple-400 transition"
          >
            <h3 className="text-xl font-semibold">{project.title}</h3>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {activeProject && (
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0, scale: 0.5, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -100 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <motion.div
              className="bg-gradient-to-br from-yellow-400 to-pink-500 text-black p-10 rounded-3xl shadow-2xl w-[400px] text-center pointer-events-auto"
              layoutId={`project-${activeProject.id}`}
            >
              <h2 className="text-3xl font-bold mb-4">{activeProject.title}</h2>
              <p className="text-lg">{activeProject.description}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}