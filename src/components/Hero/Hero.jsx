import "./Hero.css";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform
} from "framer-motion";

import { 
  useEffect, 
  useRef,
  useState
} from "react";

import showcaseItems from "../../data/showcase";

function VideoCard({
  item,
  rotateX,
  rotateY,
  glowX,
  glowY
}){

  const videoRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(()=>{
    const video = videoRef.current;
    const observer = new IntersectionObserver(
      (entries)=>{
        entries.forEach(entry=>{
          if(entry.isIntersecting){
            video?.play().catch(()=>{});
          }else{
            video?.pause();
          }
        });
      },
      { threshold:.5 }
    );

    if(cardRef.current){
      observer.observe(cardRef.current);
    }

    return()=>{
      if(cardRef.current){
        observer.unobserve(cardRef.current);
      }
    };
  },[]);

  return(
    <motion.div
      ref={cardRef}
      className="showcase-card"
      style={{
        rotateX,
        rotateY,
        transformStyle:"preserve-3d"
      }}
    >
      <motion.div
        className="card-glow"
        style={{
          x:glowX,
          y:glowY
        }}
      />

      <div className="card-video">
        <video
          ref={videoRef}
          src={item.video}
          muted
          loop
          playsInline
          preload="metadata"
        />
      </div>

      <div className="card-overlay"/>

      <div className="card-content">
        <h3>
          {item.title}
          <br/>
          {item.subtitle}
        </h3>
        <span>
          {item.year}
        </span>
      </div>
    </motion.div>
  );
}

export default function Hero(){

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX,{
    stiffness:70,
    damping:20
  });

  const smoothY = useSpring(mouseY,{
    stiffness:70,
    damping:20
  });

  const rotateX = useTransform(
    smoothY,
    [-.5,.5],
    [10,-10]
  );

  const rotateY = useTransform(
    smoothX,
    [-.5,.5],
    [-10,10]
  );

  const glowX = useTransform(
    smoothX,
    [-.5,.5],
    [-40,40]
  );

  const glowY = useTransform(
    smoothY,
    [-.5,.5],
    [-40,40]
  );

  const [isTechOpen, setIsTechOpen] = useState(false);
  const techDropdownRef = useRef(null);

  const [isColorOpen, setIsColorOpen] = useState(false);
  const colorDropdownRef = useRef(null);
  const [activeColorName, setActiveColorName] = useState("Emerald");

  const colorsList = [
    { name: "Emerald", value: "#10b981" },
    { name: "Electric Cyan", value: "#06b6d4" },
    { name: "Vivid Purple", value: "#8b5cf6" },
    { name: "Sunset Orange", value: "#f97316" },
    { name: "Hot Pink", value: "#ec4899" },
    { name: "Neon Lime", value: "#84cc16" },
    { name: "Golden Amber", value: "#f59e0b" }
  ];

  const handleColorChange = (colorObj) => {
    document.documentElement.style.setProperty('--accent', colorObj.value);
    setActiveColorName(colorObj.name);
    setIsColorOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (techDropdownRef.current && !techDropdownRef.current.contains(event.target)) {
        setIsTechOpen(false);
      }
      if (colorDropdownRef.current && !colorDropdownRef.current.contains(event.target)) {
        setIsColorOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const heroCardClasses=[
    "hero-main-card",
    "hero-left-card",
    "hero-right-card",
    "hero-bottom-card",
    "hero-small-left",
    "hero-small-right",
    "hero-extra-card"
  ];

  function handleMouse(e){
    if(window.innerWidth < 700) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(
      (e.clientX - rect.left) / rect.width - .5
    );
    mouseY.set(
      (e.clientY - rect.top) / rect.height - .5
    );
  }

  function reset(){
    mouseX.set(0);
    mouseY.set(0);
  }

  return(
    <section className="hero">
      <div className="container hero-layout">

        <motion.div 
          className="hero-text"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          
          <div className="hero-status-container">
            
            <div className="hero-badge">
              <span className="badge-dot"></span>
              Available for Projects
            </div>

            <div className="tech-dropdown-wrapper" ref={techDropdownRef}>
              <button 
                className="tech-toggle-btn"
                onClick={() => setIsTechOpen(!isTechOpen)}
              >
                <span>Software & Tools</span>
                <span className={`arrow-icon ${isTechOpen ? 'open' : ''}`}>▾</span>
              </button>

              {isTechOpen && (
                <motion.div 
                  className="tech-popover-menu"
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="tech-popover-header">Core Tech Stack</div>
                  <div className="tech-items-list">
                    <div className="tech-item">
                      <span className="tech-dot ae"></span> After Effects
                    </div>
                    <div className="tech-item">
                      <span className="tech-dot ae"></span> Premiere Pro
                    </div>
                    <div className="tech-item">
                      <span className="tech-dot blender"></span> Photoshop
                    </div>
                    <div className="tech-item">
                      <span className="tech-dot blender"></span> Illustrator
                    </div>
                      <div className="tech-item">
                      <span className="tech-dot premiere"></span> Davinci Reslove
                    </div>
                    <div className="tech-item">
                      <span className="tech-dot premiere"></span> Ai
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="tech-dropdown-wrapper" ref={colorDropdownRef}>
              <button 
                className="tech-toggle-btn"
                onClick={() => setIsColorOpen(!isColorOpen)}
              >
                <span>Theme: {activeColorName}</span>
                <span className={`arrow-icon ${isColorOpen ? 'open' : ''}`}>▾</span>
              </button>

              {isColorOpen && (
                <motion.div 
                  className="tech-popover-menu color-popover"
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="tech-popover-header">Accent Color</div>
                  <div className="tech-items-list color-scroll-box">
                    {colorsList.map((c) => (
                      <button 
                        key={c.name}
                        className="tech-item color-option-btn"
                        onClick={() => handleColorChange(c)}
                      >
                        <span className="tech-dot" style={{ backgroundColor: c.value, boxShadow: `0 0 8px ${c.value}` }}></span> 
                        {c.name}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

          </div>

          <p className="hero-tag">
            Senior Motion Graphics Designer
          </p>

          <h1>
            Creating
            <span>
              Visual Stories
            </span>
            That Move
          </h1>

          <p className="hero-desc">
            I create motion graphics, animations, video editing, and visual experiences for brands and digital platforms.
          </p>

          <div className="hero-buttons">
            <a href="#work" className="primary-btn">
              View Work
            </a>
            <a href="#contact" className="secondary-btn">
              Contact
            </a>
          </div>

        </motion.div>

        <motion.div 
          className="program-monitor-frame hero-monitor-container"
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        >
          
          <div className="monitor-top-bar">
            <div className="monitor-top-left">
              <span className="record-dot"></span>
              <span className="monitor-version-text"></span>
            </div>
            <div className="monitor-top-center">
              CAN-YOU-SEE-ME \\ Huh ?
            </div>
            <div className="monitor-top-right">
              01:12:40:18
            </div>
          </div>

          <div
            className="showcase-list monitor-inner-content"
            onMouseMove={handleMouse}
            onMouseLeave={reset}
          >
            {
              showcaseItems.map((item,index)=>(
                <motion.div
                  key={item.id}
                  className={heroCardClasses[index] || "hero-extra-card"}
                  animate={
                    window.innerWidth > 700
                      ? {
                          y:[0,-14,0],
                          rotate:[
                            0,
                            index % 2 === 0 ? 2.5 : -2.5,
                            0
                          ]
                        }
                      : {}
                  }
                  transition={{
                    duration:6 + index * .5,
                    repeat:Infinity,
                    ease:"easeInOut"
                  }}
                >
                  <VideoCard
                    item={item}
                    rotateX={window.innerWidth > 700 ? rotateX : 0}
                    rotateY={window.innerWidth > 700 ? rotateY : 0}
                    glowX={window.innerWidth > 700 ? glowX : 0}
                    glowY={window.innerWidth > 700 ? glowY : 0}
                  />
                </motion.div>
              ))
            }
          </div>

        </motion.div>

      </div>
    </section>
  );
}