import "./Contact.css";
import { useState, useEffect } from "react";

export default function Contact() {
  const [timecode, setTimecode] = useState("02:15:30:12");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const hrs = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      const secs = String(now.getSeconds()).padStart(2, '0');
      const frames = String(Math.floor(Math.random() * 24)).padStart(2, '0');
      setTimecode(`${hrs}:${mins}:${secs}:${frames}`);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="contact-box">
          
          <div className="contact-monitor-header">
            <div className="monitor-left">
              <span className="record-dot"></span>
              <span>EXPORT // RENDER</span>
            </div>
            <div className="monitor-center">
              NOW-DM-ME \\ I'M All Ears !
            </div>
            <div className="monitor-right">
              {timecode}
            </div>
          </div>

          <div className="contact-content">
            <p className="small-title">
              Have a project?
            </p>

            <h2>
              Let's create something
              <span> amazing.</span>
            </h2>

            <p className="contact-text">
              I'm available for freelance projects, collaborations and creative work.
            </p>

            <div className="contact-links">
              <a href="mailto:mazen.alsadat2001@gmail.com?subject=Project Inquiry">
                Email ↗
              </a>

              <a 
                href="https://www.behance.net/elmotionaty"
                target="_blank"
                rel="noreferrer"
              >
                Behance ↗
              </a>

              <a 
                href="https://www.linkedin.com/in/mazen-alsaadat-0155a93a3/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn ↗
              </a>

              <a 
                href="https://wa.me/201111958142"
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp ↗
              </a>

              <a 
                href="https://drive.google.com/drive/u/0/folders/12z3mJJzZhXKoeGaHMDeE8uY5ZKE-sv-P"
                target="_blank"
                rel="noreferrer"
              >
                More Projects ↗
              </a>
            </div>
          </div>

          <div className="timeline-bar">
            <div className="timeline-progress"></div>
          </div>

        </div>
      </div>
    </section>
  );
}