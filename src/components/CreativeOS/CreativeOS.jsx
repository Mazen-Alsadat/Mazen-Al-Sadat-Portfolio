import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import projects from "../../data/projects";
import "./CreativeOS.css";

export default function CreativeOS() {
  const [windows, setWindows] = useState({
    projects: true, // نافذة المشاريع تفتح افتراضياً
    showreel: false,
    about: false,
  });
  
  const [activeWindow, setActiveWindow] = useState("projects");
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentTime, setCurrentTime] = useState("");

  // تحديث الساعة في شريط النظام العلوي
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleWindow = (windowName) => {
    setWindows((prev) => ({ ...prev, [windowName]: !prev[windowName] }));
    setActiveWindow(windowName);
  };

  const closeWindow = (windowName, e) => {
    e.stopPropagation();
    setWindows((prev) => ({ ...prev, [windowName]: false }));
  };

  return (
    <div className="creative-os-desktop">
      {/* Top Menu Bar */}
      <div className="os-topbar">
        <div className="os-topbar-left">
          <span className="os-apple-icon">🎬</span>
          <span className="os-menu-title">Studio OS v2.6</span>
          <span className="os-menu-item">File</span>
          <span className="os-menu-item">Edit</span>
          <span className="os-menu-item">View</span>
          <span className="os-menu-item">Window</span>
        </div>
        <div className="os-topbar-right">
          <span className="os-sys-icon">🔋 100%</span>
          <span className="os-sys-icon">📶 Wi-Fi</span>
          <span className="os-clock">{currentTime}</span>
        </div>
      </div>

      {/* Desktop Workspace & Icons */}
      <div className="os-workspace">
        <div className="os-desktop-icons">
          <div className="os-icon" onClick={() => toggleWindow("projects")}>
            <span className="icon-emoji">📁</span>
            <span className="icon-label">Projects.folder</span>
          </div>
          <div className="os-icon" onClick={() => toggleWindow("showreel")}>
            <span className="icon-emoji">🎞️</span>
            <span className="icon-label">Showreel.mp4</span>
          </div>
          <div className="os-icon" onClick={() => toggleWindow("about")}>
            <span className="icon-emoji">👤</span>
            <span className="icon-label">About_Me.txt</span>
          </div>
        </div>

        {/* WINDOW 1: PROJECTS FOLDER */}
        <AnimatePresence>
          {windows.projects && (
            <motion.div
              className={`os-window ${activeWindow === "projects" ? "active" : ""}`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={() => setActiveWindow("projects")}
              style={{ top: "60px", left: "80px" }}
            >
              <div className="os-window-header">
                <div className="os-window-buttons">
                  <span className="close-btn" onClick={(e) => closeWindow("projects", e)}></span>
                  <span className="min-btn"></span>
                  <span className="max-btn"></span>
                </div>
                <div className="os-window-title">📁 Finder — /Projects/Editing</div>
              </div>
              <div className="os-window-body">
                <div className="os-projects-grid">
                  {projects.map((project) => (
                    <div 
                      key={project.id} 
                      className="os-file-card"
                      onClick={() => setSelectedProject(project)}
                    >
                      <img src={project.thumbnail} alt={project.title} />
                      <div className="os-file-info">
                        <h4>{project.title}</h4>
                        <span>{project.category}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* WINDOW 2: SHOWREEL PLAYER */}
        <AnimatePresence>
          {windows.showreel && (
            <motion.div
              className={`os-window ${activeWindow === "showreel" ? "active" : ""}`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={() => setActiveWindow("showreel")}
              style={{ top: "100px", right: "100px", width: "600px" }}
            >
              <div className="os-window-header">
                <div className="os-window-buttons">
                  <span className="close-btn" onClick={(e) => closeWindow("showreel", e)}></span>
                  <span className="min-btn"></span>
                  <span className="max-btn"></span>
                </div>
                <div className="os-window-title">🎞️ QuickTime Player — Showreel_2026.mp4</div>
              </div>
              <div className="os-window-body" style={{ padding: 0 }}>
                <div className="os-video-container">
                  <iframe
                    src="https://player.vimeo.com/video/YOUR_SHOWREEL_ID?autoplay=1"
                    title="Showreel"
                    allow="autoplay; fullscreen"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* WINDOW 3: ABOUT TEXT */}
        <AnimatePresence>
          {windows.about && (
            <motion.div
              className={`os-window ${activeWindow === "about" ? "active" : ""}`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={() => setActiveWindow("about")}
              style={{ top: "150px", left: "300px", width: "450px" }}
            >
              <div className="os-window-header">
                <div className="os-window-buttons">
                  <span className="close-btn" onClick={(e) => closeWindow("about", e)}></span>
                  <span className="min-btn"></span>
                  <span className="max-btn"></span>
                </div>
                <div className="os-window-title">📄 TextEdit — About_Me.txt</div>
              </div>
              <div className="os-window-body text-body">
                <h3>Hello, I am a Cinematic Video Editor & Motion Designer.</h3>
                <p>I craft high-end visual stories, commercial ads, and immersive digital experiences using Premiere Pro, After Effects, and DaVinci Resolve.</p>
                <br />
                <p><strong>Status:</strong> Available for freelance & global projects.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* PROJECT DETAILS MODAL INSIDE OS */}
        {selectedProject && (
          <div className="os-modal-overlay" onClick={() => setSelectedProject(null)}>
            <div className="os-modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="os-modal-close" onClick={() => setSelectedProject(null)}>×</button>
              <h2>{selectedProject.title}</h2>
              <img src={selectedProject.thumbnail} alt="" />
              <p>{selectedProject.description}</p>
            </div>
          </div>
        )}
      </div>

      {/* Dock / Taskbar at Bottom */}
      <div className="os-dock">
        <div className="dock-item" onClick={() => toggleWindow("projects")} title="Projects">
          📁
        </div>
        <div className="dock-item" onClick={() => toggleWindow("showreel")} title="Showreel">
          🎞️
        </div>
        <div className="dock-item" onClick={() => toggleWindow("about")} title="About Me">
          👤
        </div>
      </div>
    </div>
  );
}