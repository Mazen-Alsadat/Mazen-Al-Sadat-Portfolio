import "./About.css";
import { motion } from "framer-motion";
import { useState } from "react";

export default function About() {
  const [activeSkill, setActiveSkill] = useState(0);

  const skillsData = [
    { 
      id: 0, 
      name: "After Effects", 
      category: "Motion Graphics", 
      desc: "Crafting complex visual effects, motion graphics, and high-end animations with precision timing.", 
      timecode: "01:20:15:00", 
      fps: "60fps" 
    },
    { 
      id: 1, 
      name: "Premiere Pro", 
      category: "Video Editing", 
      desc: "Seamless cuts, pacing, rhythm, and professional narrative flow for commercial brand films.", 
      timecode: "03:45:10:12", 
      fps: "24fps" 
    },
    { 
      id: 2, 
      name: "Davinci Resolve", 
      category: "Color Grading", 
      desc: "Cinematic color grading, custom LUTs creation, and precise mood balancing for visual impact.", 
      timecode: "05:12:30:04", 
      fps: "60fps" 
    },
    { 
      id: 3, 
      name: "Photoshop & Illustrator", 
      category: "Visual Design", 
      desc: "Designing custom assets, detailed storyboards, and scalable vector graphics for video production.", 
      timecode: "02:10:05:18", 
      fps: "Static" 
    },
    { 
      id: 4, 
      name: "AI Driven Tools", 
      category: "Next-Gen Workflow", 
      desc: "Leveraging cutting-edge AI workflows to supercharge efficiency, ideation, and creative output.", 
      timecode: "00:50:20:02", 
      fps: "Dynamic" 
    },
  ];

  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about-grid">
          {/* Left Side: Bio */}
          <div className="about-title">
            <h2>About <span>Me</span></h2>
            <p className="about-intro-text">
              I'm Mazen, a Senior Motion Graphics Designer and Video Editor specialized in high-end visual storytelling.
            </p>
            <p className="about-sub-text">
              I help brands communicate their core ideas through clean design, cinematic motion, and creative technical solutions.
            </p>
          </div>

          {/* Right Side: Transparent Integrated NLE Suite Panel */}
          <div className="nle-suite-panel">
            <div className="nle-monitor-box">
              <div className="monitor-top-bar">
                <span className="rec-light"></span>
                <span className="bar-title-text">NOW-YOU-KNOW-ME \\ HI !</span>
                <span className="tc-code">{skillsData[activeSkill].timecode}</span>
              </div>
              <div className="monitor-viewport">
                <motion.div 
                  key={activeSkill}
                  initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="viewport-content"
                >
                  <span className="viewport-cat">{skillsData[activeSkill].category}</span>
                  <h3>{skillsData[activeSkill].name}</h3>
                  <p>{skillsData[activeSkill].desc}</p>
                  <div className="viewport-meta">
                    <span>FPS: {skillsData[activeSkill].fps}</span>
                    <span>STATUS: ACTIVE</span>
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="nle-timeline-box">
              <div className="timeline-grid-header">
                <span>TIMELINE TRACKS</span>
                <span>00:00:00</span>
              </div>
              <div className="tracks-list">
                {skillsData.map((skill, index) => (
                  <div 
                    key={skill.id}
                    className={`track-row ${activeSkill === index ? "selected" : ""}`}
                    onClick={() => setActiveSkill(index)}
                  >
                    <span className="track-id">V{index + 1}</span>
                    <div className="track-fill-line">
                      <span className="track-name-label">{skill.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}