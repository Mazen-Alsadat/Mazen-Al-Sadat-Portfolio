import { useState } from "react";
import { motion } from "framer-motion";
import showcaseItems from "../../data/showcase";
import "./WorkShowcase.css";

export default function WorkShowcase() {
  const [layoutMode, setLayoutMode] = useState("bento"); // 'bento' or 'list'

  return (
      <section id="work" className="work-showcase-section">
        <div className="container">
          
          {/* رأس القسم مع أدوات التبديل */}
          <div className="work-header">
            <div>
              <p className="work-tag">Selected Works</p>
              <h2>Featured Motion Projects</h2>
            </div>

            <div className="layout-switcher">
              <button 
                className={`switch-btn ${layoutMode === "bento" ? "active" : ""}`}
                onClick={() => setLayoutMode("bento")}
              >
                Bento Grid
              </button>
              <button 
                className={`switch-btn ${layoutMode === "list" ? "active" : ""}`}
                onClick={() => setLayoutMode("list")}
              >
                Immersive List
              </button>
            </div>
          </div>

          {/* حاوية الأعمال المتغيرة حسب التخطيط */}
          <motion.div 
            layout 
            className={`projects-grid ${layoutMode}`}
          >
            {showcaseItems.map((item, index) => (
              <motion.div
                layout
                key={item.id}
                className={`project-card-item ${index === 0 && layoutMode === "bento" ? "featured-span" : ""}`}
                data-cursor="Play Reel"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="project-media">
                  <video src={item.video} muted loop playsInline autoPlay />
                </div>
                <div className="project-info">
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.subtitle}</p>
                  </div>
                  <span className="project-year">{item.year}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>
  );
}