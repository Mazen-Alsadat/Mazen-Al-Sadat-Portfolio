import { motion } from "framer-motion";

export default function SectionWrapper({ children, id, className = "" }) {
  return (
    <motion.section
      id={id}
      className={`global-section-wrapper ${className}`}
      initial={{ opacity: 0, y: 120, scale: 0.92, filter: "blur(16px)" }}
      whileInView={{ 
        opacity: 1, 
        y: 0, 
        scale: 1,
        filter: "blur(0px)" 
      }}
      viewport={{ once: false, margin: "-80px" }}
      transition={{ 
        duration: 1, 
        ease: [0.16, 1, 0.3, 1] 
      }}
    >
      <div className="section-inner-glow"></div>
      {children}
    </motion.section>
  );
}