import "./Portfolio.css";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import projects from "../../data/projects";

export default function Portfolio() {
  const [active, setActive] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [filter, setFilter] = useState("All");
  const [subFilter, setSubFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest");
  const [viewMode, setViewMode] = useState("track");
  const [showreelOpen, setShowreelOpen] = useState(false);
  const [modalTab, setModalTab] = useState("final");

  const sliderRef = useRef(null);
  const moved = useRef(false);
  const startPoint = useRef(0);
  const scrollLeftStart = useRef(0);

  const isGamingOrSports = (text) => {
    const t = String(text || "").toLowerCase();
    return (
      t.includes("gaming") ||
      t.includes("game") ||
      t.includes("جيمنج") ||
      t.includes("جيمينج") ||
      t.includes("ألعاب") ||
      t.includes("العاب") ||
      t.includes("montage") ||
      t.includes("كورة") ||
      t.includes("كرة") ||
      t.includes("football") ||
      t.includes("soccer") ||
      t.includes("sports") ||
      t.includes("sport") ||
      t.includes("رياضة") ||
      t.includes("رياضات")
    );
  };

  const isDeprioritizedProject = (project) => {
    const combined = [
      project.category,
      project.subCategory,
      project.type,
      project.tag,
    ]
      .filter(Boolean)
      .join(" ");
    return isGamingOrSports(combined);
  };

  const rawCategories = [
    ...new Set(projects.map((p) => p.category?.trim()).filter(Boolean)),
  ];
  const categories = [
    "All",
    ...[...rawCategories].sort((a, b) => {
      const aBack = isGamingOrSports(a) ? 1 : 0;
      const bBack = isGamingOrSports(b) ? 1 : 0;
      return aBack - bBack;
    }),
  ];

  const getSubCategoriesForCurrentFilter = () => {
    if (filter === "All") return [];
    let baseProjects = projects.filter(
      (p) => p.category?.trim().toLowerCase() === filter.trim().toLowerCase()
    );
    const subs = [
      ...new Set(baseProjects.map((p) => p.subCategory?.trim()).filter(Boolean)),
    ];
    if (subs.length === 0) return [];
    return [
      "All",
      ...[...subs].sort((a, b) => {
        const aBack = isGamingOrSports(a) ? 1 : 0;
        const bBack = isGamingOrSports(b) ? 1 : 0;
        return aBack - bBack;
      }),
    ];
  };

  const currentSubCategories = getSubCategoriesForCurrentFilter();

  const getCategoryCount = (cat) => {
    if (cat === "All") return projects.length;
    return projects.filter(
      (p) => p.category?.trim().toLowerCase() === cat.trim().toLowerCase()
    ).length;
  };

  const getSubCategoryCount = (subCat) => {
    if (filter === "All") return 0;
    let baseProjects = projects.filter(
      (p) => p.category?.trim().toLowerCase() === filter.trim().toLowerCase()
    );
    if (subCat === "All") return baseProjects.length;
    return baseProjects.filter(
      (p) => p.subCategory?.trim().toLowerCase() === subCat.trim().toLowerCase()
    ).length;
  };

  const getProjectDate = (project) => {
    const raw = project.date || project.year || "1970";
    const str = String(raw).trim();
    if (/^\d{4}$/.test(str)) {
      return new Date(`${str}-01-01`);
    }
    const parsed = new Date(str);
    return Number.isNaN(parsed.getTime()) ? new Date("1970") : parsed;
  };

  const filteredProjects = projects
    .filter((p) => {
      const matchesMain =
        filter === "All" ||
        p.category?.trim().toLowerCase() === filter.trim().toLowerCase();
      const matchesSub =
        filter === "All" ||
        subFilter === "All" ||
        p.subCategory?.trim().toLowerCase() === subFilter.trim().toLowerCase();
      return matchesMain && matchesSub;
    })
    .sort((a, b) => {
      const aBack = isDeprioritizedProject(a) ? 1 : 0;
      const bBack = isDeprioritizedProject(b) ? 1 : 0;
      if (aBack !== bBack) return aBack - bBack;

      const dateA = getProjectDate(a);
      const dateB = getProjectDate(b);
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        setActive(null);
        setShowreelOpen(false);
      }
    }

    if (active || showreelOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setActiveImageIndex(0);
      setModalTab("final");
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [active, showreelOpen]);

  function moveSlider(direction) {
    if (!sliderRef.current) return;
    const scrollAmount = window.innerWidth < 768 ? 310 : 800;
    sliderRef.current.scrollBy({
      left: direction * scrollAmount,
      behavior: "smooth",
    });
  }

  function handlePointerDown(e) {
    moved.current = false;
    startPoint.current = e.clientX;
    scrollLeftStart.current = sliderRef.current.scrollLeft;
  }

  function handlePointerMove(e) {
    if (!startPoint.current) return;
    const distance = Math.abs(e.clientX - startPoint.current);
    if (distance > 5) {
      moved.current = true;
      const walk = (e.clientX - startPoint.current) * 1.5;
      sliderRef.current.scrollLeft = scrollLeftStart.current - walk;
    }
  }

  function handlePointerUp() {
    startPoint.current = 0;
  }

  function openProject(project) {
    if (!moved.current) {
      setActive(project);
    }
  }

  return (
    <section className="portfolio" id="work">
      <div className="container">
        <div className="program-monitor-frame">
          <div className="monitor-top-bar">
            <div className="monitor-top-left">
              <span className="record-dot"></span>
            </div>
            <div className="monitor-top-center">NOW-YOU-SEE-ME \\ Right ?</div>
            <div className="monitor-top-right">01:20:15:00</div>
          </div>

          <div className="monitor-inner-content">
            <motion.div
              className="section-title"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2>
                My <span>Portfolio</span>
              </h2>
              <p>
                Curated masterworks in video editing, motion design, and
                high-end visual storytelling.
              </p>
            </motion.div>

            <div className="portfolio-header-row">
              <motion.div
                className="portfolio-filters"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                {categories.map((cat, index) => (
                  <button
                    key={index}
                    className={`filter-btn ${filter === cat ? "active" : ""}`}
                    onClick={() => {
                      setFilter(cat);
                      setSubFilter("All");
                      if (sliderRef.current)
                        sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
                    }}
                  >
                    {cat}
                    <span className="filter-count">{getCategoryCount(cat)}</span>
                  </button>
                ))}
              </motion.div>

              <div className="portfolio-actions-right">
                <button
                  className="filter-btn"
                  onClick={() =>
                    setSortOrder((prev) =>
                      prev === "newest" ? "oldest" : "newest"
                    )
                  }
                  title="Toggle Sort Order by Date"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <span>
                    {sortOrder === "newest" ? "Newest First" : "Oldest First"}
                  </span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    {sortOrder === "newest" ? (
                      <path d="M12 5l0 14M19 12l-7 7-7-7" />
                    ) : (
                      <path d="M12 19l0-14M5 12l7-7 7 7" />
                    )}
                  </svg>
                </button>

                <div className="view-switcher">
                  <button
                    className={`view-switch-btn ${viewMode === "track" ? "active" : ""}`}
                    onClick={() => setViewMode("track")}
                    title="Track View (2-Rows)"
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <rect x="3" y="4" width="18" height="6" rx="1" />
                      <rect x="3" y="14" width="18" height="6" rx="1" />
                    </svg>
                  </button>
                  <button
                    className={`view-switch-btn ${viewMode === "grid" ? "active" : ""}`}
                    onClick={() => setViewMode("grid")}
                    title="Grid View"
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <rect x="3" y="3" width="7" height="7" rx="1" />
                      <rect x="14" y="3" width="7" height="7" rx="1" />
                      <rect x="3" y="14" width="7" height="7" rx="1" />
                      <rect x="14" y="14" width="7" height="7" rx="1" />
                    </svg>
                  </button>
                  <button
                    className={`view-switch-btn ${viewMode === "timeline" ? "active" : ""}`}
                    onClick={() => setViewMode("timeline")}
                    title="Timeline View"
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <line x1="9" y1="3" x2="9" y2="21" />
                    </svg>
                  </button>
                </div>

                <motion.button
                  className="showreel-btn"
                  onClick={() => setShowreelOpen(true)}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <span className="showreel-icon">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <polygon points="6 3 20 12 6 21 6 3"></polygon>
                    </svg>
                  </span>
                  Watch Showreel
                </motion.button>
              </div>
            </div>

            {filter !== "All" && currentSubCategories.length > 0 && (
              <div className="portfolio-sub-filters">
                {currentSubCategories.map((subCat, index) => (
                  <button
                    key={index}
                    className={`sub-filter-btn ${subFilter === subCat ? "active" : ""}`}
                    onClick={() => {
                      setSubFilter(subCat);
                      if (sliderRef.current)
                        sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
                    }}
                  >
                    {subCat}
                    <span className="sub-filter-count">
                      {getSubCategoryCount(subCat)}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {viewMode === "track" ? (
              <div className="projects-slider">
                <button
                  className="slider-arrow"
                  onClick={() => moveSlider(-1)}
                  aria-label="Previous Projects"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>

                <div
                  ref={sliderRef}
                  className="projects-viewport"
                  tabIndex={0}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerLeave={handlePointerUp}
                  aria-label="Projects Slider"
                >
                  <div className="projects-track-grid">
                    <AnimatePresence mode="popLayout">
                      {filteredProjects.length > 0 ? (
                        filteredProjects.map((project) => (
                          <motion.div
                            key={project.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="project-wrapper-grid"
                          >
                            <div
                              className="project-card"
                              onClick={() => openProject(project)}
                            >
                              <div className="project-image">
                                <img
                                  src={project.thumbnail || "/placeholder.jpg"}
                                  alt={project.title}
                                  loading="lazy"
                                />

                                {project.preview && (
                                  <video
                                    src={project.preview}
                                    className="project-hover-video"
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                  />
                                )}

                                <div className="play-overlay">
                                  <div className="play-btn-circle">
                                    <svg
                                      width="20"
                                      height="20"
                                      viewBox="0 0 24 24"
                                      fill="currentColor"
                                    >
                                      <polygon points="6 3 20 12 6 21 6 3"></polygon>
                                    </svg>
                                  </div>
                                </div>
                              </div>

                              <div className="project-info">
                                <div>
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      marginBottom: "4px",
                                    }}
                                  >
                                    <span className="project-cat-subtitle">
                                      {project.subCategory || project.category}
                                    </span>
                                    {project.year && (
                                      <span
                                        style={{
                                          fontSize: "11px",
                                          opacity: 0.7,
                                          fontFamily: "monospace",
                                        }}
                                      >
                                        {project.year}
                                      </span>
                                    )}
                                  </div>
                                  <h3>{project.title}</h3>
                                </div>
                                <div className="view-project">
                                  Explore Project <span>↗</span>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        <div className="portfolio-empty">
                          No projects found in this category yet.
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <button
                  className="slider-arrow"
                  onClick={() => moveSlider(1)}
                  aria-label="Next Projects"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </div>
            ) : viewMode === "grid" ? (
              <div className="projects-static-grid">
                <AnimatePresence mode="wait">
                  {filteredProjects.length > 0 ? (
                    filteredProjects.map((project) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div
                          className="project-card"
                          onClick={() => openProject(project)}
                        >
                          <div className="project-image">
                            <img
                              src={project.thumbnail || "/placeholder.jpg"}
                              alt={project.title}
                              loading="lazy"
                            />

                            {project.preview && (
                              <video
                                src={project.preview}
                                className="project-hover-video"
                                autoPlay
                                muted
                                loop
                                playsInline
                              />
                            )}

                            <div className="play-overlay">
                              <div className="play-btn-circle">
                                <svg
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                >
                                  <polygon points="6 3 20 12 6 21 6 3"></polygon>
                                </svg>
                              </div>
                            </div>
                          </div>

                          <div className="project-info">
                            <div>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  marginBottom: "4px",
                                }}
                              >
                                <span className="project-cat-subtitle">
                                  {project.subCategory || project.category}
                                </span>
                                {project.year && (
                                  <span
                                    style={{
                                      fontSize: "11px",
                                      opacity: 0.7,
                                      fontFamily: "monospace",
                                    }}
                                  >
                                    {project.year}
                                  </span>
                                )}
                              </div>
                              <h3>{project.title}</h3>
                            </div>
                            <div className="view-project">
                              Explore Project <span>↗</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div
                      className="portfolio-empty"
                      style={{ gridColumn: "span 3" }}
                    >
                      No projects found in this category yet.
                    </div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="timeline-container-wrapper">
                <div className="projects-timeline-slider">
                  <button
                    className="slider-arrow"
                    onClick={() => moveSlider(-1)}
                    aria-label="Previous Projects"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                  </button>

                  <div className="timeline-viewport-box">
                    <div className="timeline-ruler">
                      <span>TIMELINE TRACKS // SEQUENCE 01</span>
                      <span>00:00:00:00</span>
                    </div>

                    <div
                      ref={sliderRef}
                      className="timeline-viewport"
                      tabIndex={0}
                      onPointerDown={handlePointerDown}
                      onPointerMove={handlePointerMove}
                      onPointerUp={handlePointerUp}
                      onPointerLeave={handlePointerUp}
                      aria-label="Projects Timeline Slider"
                    >
                      <div className="timeline-track-horizontal">
                        <AnimatePresence mode="wait">
                          {filteredProjects.length > 0 ? (
                            filteredProjects.map((project, index) => (
                              <motion.div
                                key={project.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                                className="timeline-clip-item"
                              >
                                <div className="timeline-clip-bar">
                                  <span className="clip-track-name">
                                    {project.subCategory || project.category}
                                  </span>
                                  <span className="clip-timecode">
                                    0{index}:15:00
                                  </span>
                                </div>

                                <div
                                  className="project-card timeline-card"
                                  onClick={() => openProject(project)}
                                >
                                  <div className="project-image">
                                    <img
                                      src={project.thumbnail || "/placeholder.jpg"}
                                      alt={project.title}
                                      loading="lazy"
                                    />

                                    {project.preview && (
                                      <video
                                        src={project.preview}
                                        className="project-hover-video"
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                      />
                                    )}

                                    <div className="play-overlay">
                                      <div className="play-btn-circle">
                                        <svg
                                          width="20"
                                          height="20"
                                          viewBox="0 0 24 24"
                                          fill="currentColor"
                                        >
                                          <polygon points="6 3 20 12 6 21 6 3"></polygon>
                                        </svg>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="project-info">
                                    <div>
                                      <div
                                        style={{
                                          display: "flex",
                                          justifyContent: "space-between",
                                          alignItems: "center",
                                          marginBottom: "4px",
                                        }}
                                      >
                                        <span className="project-cat-subtitle">
                                          {project.subCategory || project.category}
                                        </span>
                                        {project.year && (
                                          <span
                                            style={{
                                              fontSize: "11px",
                                              opacity: 0.7,
                                              fontFamily: "monospace",
                                            }}
                                          >
                                            {project.year}
                                          </span>
                                        )}
                                      </div>
                                      <h3>{project.title}</h3>
                                    </div>
                                    <div className="view-project">
                                      Explore Project <span>↗</span>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            ))
                          ) : (
                            <div className="portfolio-empty">
                              No projects found in this category yet.
                            </div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>

                  <button
                    className="slider-arrow"
                    onClick={() => moveSlider(1)}
                    aria-label="Next Projects"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                </div>

                <div className="mobile-swipe-hint">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                  اسحب يميناً ويساراً لتصفح التايملاين
                </div>
              </div>
            )}
          </div>
        </div>

        <AnimatePresence>
          {active && (
            <motion.div
              className="project-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActive(null)}
            >
              <motion.div
                className="modal-content"
                initial={{ scale: 0.85, y: 40, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.85, y: 40, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="close-modal"
                  onClick={() => setActive(null)}
                >
                  ×
                </button>

                <h2>{active.title}</h2>
                <p className="modal-desc">{active.description}</p>

                {active.btsImages && active.btsImages.length > 0 && (
                  <div className="modal-tabs">
                    <button
                      className={`modal-tab-btn ${modalTab === "final" ? "active" : ""}`}
                      onClick={() => {
                        setModalTab("final");
                        setActiveImageIndex(0);
                      }}
                    >
                      Final Output
                    </button>
                    <button
                      className={`modal-tab-btn ${modalTab === "bts" ? "active" : ""}`}
                      onClick={() => {
                        setModalTab("bts");
                        setActiveImageIndex(0);
                      }}
                    >
                      Behind The Scenes / Storyboard
                    </button>
                  </div>
                )}

                {modalTab === "final" ? (
                  active.embed ? (
                    <div className="modal-video">
                      <iframe
                        src={`${active.embed}?autoplay=1&title=0&byline=0&portrait=0`}
                        title={active.title}
                        loading="lazy"
                        allow="autoplay; fullscreen"
                      />
                    </div>
                  ) : active.images && active.images.length > 0 ? (
                    <div className="modal-gallery-container">
                      <div className="modal-main-image">
                        <img
                          src={active.images[activeImageIndex]}
                          alt={`${active.title} final`}
                        />
                        {active.images.length > 1 && (
                          <>
                            <button
                              className="gallery-nav-btn prev"
                              onClick={() =>
                                setActiveImageIndex((prev) =>
                                  prev === 0
                                    ? active.images.length - 1
                                    : prev - 1
                                )
                              }
                            >
                              ‹
                            </button>
                            <button
                              className="gallery-nav-btn next"
                              onClick={() =>
                                setActiveImageIndex((prev) =>
                                  prev === active.images.length - 1
                                    ? 0
                                    : prev + 1
                                )
                              }
                            >
                              ›
                            </button>
                          </>
                        )}
                      </div>
                      {active.images.length > 1 && (
                        <div className="gallery-thumbs-row">
                          {active.images.map((imgUrl, idx) => (
                            <div
                              key={idx}
                              className={`gallery-thumb ${activeImageIndex === idx ? "active" : ""}`}
                              onClick={() => setActiveImageIndex(idx)}
                            >
                              <img src={imgUrl} alt="thumb" />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : null
                ) : modalTab === "bts" && active.btsImages ? (
                  <div className="modal-gallery-container">
                    <div className="modal-main-image">
                      <img
                        src={active.btsImages[activeImageIndex]}
                        alt={`${active.title} bts`}
                      />
                      {active.btsImages.length > 1 && (
                        <>
                          <button
                            className="gallery-nav-btn prev"
                            onClick={() =>
                              setActiveImageIndex((prev) =>
                                prev === 0
                                  ? active.btsImages.length - 1
                                  : prev - 1
                              )
                            }
                          >
                            ‹
                          </button>
                          <button
                            className="gallery-nav-btn next"
                            onClick={() =>
                              setActiveImageIndex((prev) =>
                                prev === active.btsImages.length - 1
                                  ? 0
                                  : prev + 1
                              )
                            }
                          >
                            ›
                          </button>
                        </>
                      )}
                    </div>
                    {active.btsImages.length > 1 && (
                      <div className="gallery-thumbs-row">
                        {active.btsImages.map((imgUrl, idx) => (
                          <div
                            key={idx}
                            className={`gallery-thumb ${activeImageIndex === idx ? "active" : ""}`}
                            onClick={() => setActiveImageIndex(idx)}
                          >
                            <img src={imgUrl} alt="bts thumb" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : null}

                <div className="modal-meta">
                  <p>
                    <strong>Category:</strong>{" "}
                    {active.subCategory || active.category}
                  </p>
                  <p>
                    <strong>Year:</strong> {active.year}
                  </p>
                  {active.client && (
                    <p>
                      <strong>Client:</strong> {active.client}
                    </p>
                  )}
                  {active.role && (
                    <p>
                      <strong>Role:</strong> {active.role}
                    </p>
                  )}
                  {active.tools && (
                    <p style={{ gridColumn: "span 2" }}>
                      <strong>Tools:</strong> {active.tools.join(" • ")}
                    </p>
                  )}
                </div>

                {active.link && (
                  <a
                    href={active.link}
                    target="_blank"
                    rel="noreferrer"
                    className="behance-btn"
                  >
                    Open Project <span>↗</span>
                  </a>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showreelOpen && (
            <motion.div
              className="showreel-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowreelOpen(false)}
            >
              <div
                className="showreel-container"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="close-modal"
                  onClick={() => setShowreelOpen(false)}
                >
                  ×
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}