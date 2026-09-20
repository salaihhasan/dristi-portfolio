import React, { useState, useEffect, useRef } from 'react';
import {
  Droplets,
  Activity,
  Bug,
  Layers,
  ShieldCheck,
  AlertCircle,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  ChevronRight as ArrowIcon,
  Sparkles,
  Target,
  FlaskConical,
  GraduationCap,
  Clock,
  Dna,
  Microscope,
} from 'lucide-react';
import { ProjectItem, JournalItem } from '../../types/portfolio';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ProjectsSectionProps {
  academicProjects: ProjectItem[];
  journalExplorations: JournalItem[];
}

type AcademicTab = 'concepts' | 'literature';

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  academicProjects,
  journalExplorations,
}) => {
  const [activeTab, setActiveTab] = useState<AcademicTab>('concepts');
  const [projectIndex, setProjectIndex] = useState(0);
  const [journalIndex, setJournalIndex] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const dossierRef = useRef<HTMLDivElement>(null);
  const journalPaneRef = useRef<HTMLDivElement>(null);
  const helixRef = useRef<SVGSVGElement>(null);

  const selectedProject = academicProjects[projectIndex] || academicProjects[0];
  const selectedJournal = journalExplorations[journalIndex] || journalExplorations[0];

  // ScrollTrigger entrance animations
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from('.proj-anim-header', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 24,
        stagger: 0.09,
        duration: 0.8,
        ease: 'power3.out',
        clearProps: 'all',
      });

      gsap.from('.proj-anim-content', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
        },
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: 'power3.out',
        clearProps: 'all',
      });

      // Featured dossier masked reveal
      gsap.from('.project-dossier-card', {
        scrollTrigger: {
          trigger: '.project-dossier-card',
          start: 'top 80%',
        },
        opacity: 0,
        y: 20,
        duration: 0.75,
        ease: 'power3.out',
        clearProps: 'all',
      });

      // Registry rows staggered entry
      gsap.from('.proj-academic-index-row', {
        scrollTrigger: {
          trigger: '.proj-academic-index-grid',
          start: 'top 82%',
        },
        opacity: 0,
        x: 15,
        stagger: 0.08,
        duration: 0.6,
        ease: 'power2.out',
        clearProps: 'all',
      });

      // Subtle DNA float loop
      if (helixRef.current) {
        gsap.to(helixRef.current, {
          y: -12,
          duration: 6,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  // Animate tab change
  const handleTabChange = (tab: AcademicTab) => {
    if (tab === activeTab) return;
    setActiveTab(tab);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    gsap.fromTo(
      '.proj-tab-panel',
      { opacity: 0.4, y: 10 },
      { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out', clearProps: 'all' }
    );
  };

  // Animate dossier on project change
  const handleSelectProject = (index: number) => {
    if (index === projectIndex || index < 0 || index >= academicProjects.length) return;
    setProjectIndex(index);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !dossierRef.current) return;

    gsap.fromTo(
      dossierRef.current,
      { opacity: 0.45, y: 10 },
      { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out', clearProps: 'all' }
    );
  };

  // Animate journal pane on journal change
  const handleSelectJournal = (index: number) => {
    if (index === journalIndex || index < 0 || index >= journalExplorations.length) return;
    setJournalIndex(index);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !journalPaneRef.current) return;

    gsap.fromTo(
      journalPaneRef.current,
      { opacity: 0.45, y: 10 },
      { opacity: 1, y: 0, duration: 0.32, ease: 'power2.out', clearProps: 'all' }
    );
  };

  // Keyboard navigation for project selector
  const handleProjectKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      handleSelectProject((index + 1) % academicProjects.length);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      handleSelectProject((index - 1 + academicProjects.length) % academicProjects.length);
    }
  };

  // Keyboard navigation for journal selector
  const handleJournalKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      handleSelectJournal((index + 1) % journalExplorations.length);
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      handleSelectJournal((index - 1 + journalExplorations.length) % journalExplorations.length);
    }
  };

  // Icon mapping for project category
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Hematology':
        return <Droplets size={14} aria-hidden="true" />;
      case 'Biochemistry':
        return <Activity size={14} aria-hidden="true" />;
      case 'Microbiology':
        return <Bug size={14} aria-hidden="true" />;
      case 'Histopathology':
        return <Layers size={14} aria-hidden="true" />;
      case 'Quality Control':
      default:
        return <ShieldCheck size={14} aria-hidden="true" />;
    }
  };

  // Category icon resolver for journal
  const getJournalCategoryIcon = (category: string) => {
    if (category.toLowerCase().includes('molecular')) return <Dna size={13} aria-hidden="true" />;
    if (category.toLowerCase().includes('automation') || category.toLowerCase().includes('ai'))
      return <Activity size={13} aria-hidden="true" />;
    if (category.toLowerCase().includes('biochemistry') || category.toLowerCase().includes('quality'))
      return <FlaskConical size={13} aria-hidden="true" />;
    return <Microscope size={13} aria-hidden="true" />;
  };

  const getJournalStatusClass = (status: JournalItem['status']) => {
    switch (status) {
      case 'Literature Exploration':
        return 'proj-badge-lit';
      case 'Area of Interest':
        return 'proj-badge-aoi';
      case 'Theoretical Study Note':
        return 'proj-badge-theory';
      default:
        return 'proj-badge-lit';
    }
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="projects-section section-spacing chapter-divider"
      aria-label="Projects and Academic Work"
    >
      {/* Anchor for backward compatibility with direct #journal links */}
      <span id="journal" className="sr-only" aria-hidden="true" />

      {/* Chapter watermark numeral */}
      <span className="section-watermark-num" aria-hidden="true">05</span>

      {/* Background ambient glows */}
      <div className="projects-ambient-glow" aria-hidden="true" />
      <div className="projects-ambient-glow-right" aria-hidden="true" />


      {/* Procedural DNA helix — decorative ambient SVG */}
      <svg
        ref={helixRef}
        className="proj-helix-bg"
        viewBox="0 0 120 420"
        aria-hidden="true"
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
      >
        {Array.from({ length: 9 }).map((_, i) => {
          const y = 24 + i * 42;
          const x1 = 20 + Math.sin((i / 8) * Math.PI * 2) * 36;
          const x2 = 100 - Math.sin((i / 8) * Math.PI * 2) * 36;
          const cp1y = y - 18;
          const cp2y = y + 18;
          return (
            <g key={i}>
              <line
                x1={x1}
                y1={y}
                x2={x2}
                y2={y}
                stroke="rgba(182,95,109,0.18)"
                strokeWidth="1.2"
              />
              <circle cx={x1} cy={y} r="3.5" fill="rgba(182,95,109,0.22)" />
              <circle cx={x2} cy={y} r="3.5" fill="rgba(182,95,109,0.22)" />
              {i < 8 && (
                <path
                  d={`M ${x1} ${y} C ${x1 - 8} ${cp2y} ${20 + Math.sin(((i + 1) / 8) * Math.PI * 2) * 36 - 8} ${cp1y + 42} ${20 + Math.sin(((i + 1) / 8) * Math.PI * 2) * 36} ${y + 42}`}
                  stroke="rgba(182,95,109,0.14)"
                  strokeWidth="1.6"
                  fill="none"
                />
              )}
              {i < 8 && (
                <path
                  d={`M ${x2} ${y} C ${x2 + 8} ${cp2y} ${100 - Math.sin(((i + 1) / 8) * Math.PI * 2) * 36 + 8} ${cp1y + 42} ${100 - Math.sin(((i + 1) / 8) * Math.PI * 2) * 36} ${y + 42}`}
                  stroke="rgba(182,95,109,0.14)"
                  strokeWidth="1.6"
                  fill="none"
                />
              )}
            </g>
          );
        })}
      </svg>

      <div className="container-custom">
        {/* ==================================================================
            SECTION HEADER
            ================================================================== */}
        <div className="projects-header">
          <div className="projects-eyebrow-container proj-anim-header">
            <span className="projects-eyebrow">05 &bull; Academic Work &amp; Literature</span>
            <span className="projects-eyebrow-line" aria-hidden="true" />
          </div>

          <h2 className="projects-heading proj-anim-header">
            <span className="text-highlight-rose">Projects</span> &amp;{' '}
            <span className="text-script-accent">Academic Work</span>
          </h2>

          <p className="projects-intro-text proj-anim-header">
            Academic study frameworks, theoretical laboratory protocols, and literature inquiries developed around Medical Laboratory Technology learning — strictly conceptual exercises, not published clinical research.
          </p>

          {/* Prominent Global Academic Disclaimer Badge */}
          <div className="projects-disclaimer-pill proj-anim-header" role="note">
            <BookOpen size={12} aria-hidden="true" />
            <span>Academic Concepts &bull; Theoretical Frameworks Only (No Patient Data)</span>
          </div>
        </div>

        {/* ==================================================================
            COMPACT INTERNAL TAB SWITCHER
            ================================================================== */}
        <div className="proj-tabs-nav proj-anim-header" role="tablist" aria-label="Academic Work views">
          <button
            type="button"
            role="tab"
            id="tab-concepts"
            aria-selected={activeTab === 'concepts'}
            aria-controls="panel-concepts"
            className={`proj-tab-btn ${activeTab === 'concepts' ? 'is-active' : ''}`}
            onClick={() => handleTabChange('concepts')}
          >
            <FlaskConical size={14} aria-hidden="true" />
            <span>Academic Concepts</span>
            <span className="proj-tab-count">{academicProjects.length}</span>
          </button>

          <button
            type="button"
            role="tab"
            id="tab-literature"
            aria-selected={activeTab === 'literature'}
            aria-controls="panel-literature"
            className={`proj-tab-btn ${activeTab === 'literature' ? 'is-active' : ''}`}
            onClick={() => handleTabChange('literature')}
          >
            <BookOpen size={14} aria-hidden="true" />
            <span>Literature</span>
            <span className="proj-tab-count">{journalExplorations.length}</span>
          </button>
        </div>

        {/* ==================================================================
            TAB 1: ACADEMIC CONCEPTS & FRAMEWORKS
            ================================================================== */}
        {activeTab === 'concepts' && (
          <div
            id="panel-concepts"
            role="tabpanel"
            aria-labelledby="tab-concepts"
            className="proj-tab-panel proj-anim-content"
          >
            {/* Academic Work Index Registry — Primary Selector / Navigation (Placed Above) */}
            <div className="proj-academic-index-section" style={{ marginBottom: 'var(--space-xl)' }}>
              <div className="proj-academic-index-header">
                <Layers size={14} aria-hidden="true" />
                <span>Academic Framework Registry &bull; {academicProjects.length} Studies</span>
              </div>

              <div
                className="proj-academic-index-grid"
                role="tablist"
                aria-label="Select an academic framework to inspect"
              >
                {academicProjects.map((proj, index) => {
                  const isSelected = index === projectIndex;

                  return (
                    <button
                      key={proj.id}
                      type="button"
                      role="tab"
                      id={`proj-tab-${proj.id}`}
                      aria-selected={isSelected}
                      aria-controls="project-dossier-panel"
                      className={`proj-academic-index-row ${isSelected ? 'is-selected' : ''}`}
                      onClick={() => handleSelectProject(index)}
                      onKeyDown={(e) => handleProjectKeyDown(e, index)}
                    >
                      <div className="proj-idx-left">
                        <span className="proj-idx-num">{proj.number}</span>
                        <div className="proj-idx-content">
                          <span className="proj-idx-title">{proj.title}</span>
                          <div className="proj-idx-meta">
                            <span className="proj-idx-cat">{proj.category}</span>
                            <span aria-hidden="true">&bull;</span>
                            <span className="proj-idx-status">{proj.status}</span>
                          </div>
                        </div>
                      </div>

                      <div className="proj-idx-arrow-box" aria-hidden="true">
                        {isSelected ? <ArrowIcon size={16} /> : getCategoryIcon(proj.category)}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Featured Concept Dossier Card (Sitting Underneath Registry) */}
            <article
              ref={dossierRef}
              id="project-dossier-panel"
              className="project-dossier-card"
              aria-live="polite"
            >
              {/* Top Meta: Category Badge & Status Chip */}
              <div className="project-dossier-top">
                <div className="project-category-badge">
                  {getCategoryIcon(selectedProject.category)}
                  <span>
                    NO. {selectedProject.number} &bull; {selectedProject.category}
                  </span>
                </div>

                <div className="project-status-chip">
                  <FlaskConical size={12} aria-hidden="true" />
                  <span>{selectedProject.status}</span>
                </div>
              </div>

              {/* Explicit Conceptual Disclaimer Banner */}
              <div className="project-disclaimer-banner" role="note">
                <AlertCircle size={16} aria-hidden="true" />
                <p className="project-disclaimer-text">
                  <strong>Academic Specification:</strong> {selectedProject.conceptDisclaimer}
                </p>
              </div>

              {/* Title */}
              <h3 className="project-dossier-title">{selectedProject.title}</h3>

              {/* Diagnostic Objective */}
              <div className="project-block">
                <div className="project-block-title">
                  <Target size={13} aria-hidden="true" />
                  <span>Primary Diagnostic Objective</span>
                </div>
                <p className="project-block-desc">{selectedProject.objective}</p>
              </div>

              {/* Theoretical Methodology Framework */}
              <div className="project-block">
                <div className="project-block-title">
                  <BookOpen size={13} aria-hidden="true" />
                  <span>Theoretical Methodology Framework</span>
                </div>
                <p className="project-block-desc">{selectedProject.methodologyFramework}</p>
              </div>

              {/* Theoretical Techniques */}
              <div className="project-block">
                <div className="project-block-title">
                  <Sparkles size={13} aria-hidden="true" />
                  <span>Theoretical Techniques &amp; Protocols</span>
                </div>
                <div className="project-tech-pills-wrap">
                  {selectedProject.theoreticalTechniques.map((tech, idx) => (
                    <span key={idx} className="project-tech-pill">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Intended Learning Outcome */}
              <div className="project-learning-card">
                <div className="project-learning-title">
                  <GraduationCap size={14} aria-hidden="true" />
                  <span>Intended Learning Outcome</span>
                </div>
                <p className="project-learning-text">
                  {selectedProject.intendedLearningOutcome}
                </p>
              </div>

              {/* Bottom Pagination Controls */}
              <div className="project-dossier-controls">
                <span className="project-pagination-text">
                  <span className="project-pagination-current">
                    {selectedProject.number}
                  </span>{' '}
                  / 0{academicProjects.length}
                </span>

                <div className="project-nav-buttons">
                  <button
                    type="button"
                    className="project-nav-btn"
                    aria-label="Previous academic project framework"
                    disabled={projectIndex === 0}
                    onClick={() => handleSelectProject(projectIndex - 1)}
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    className="project-nav-btn"
                    aria-label="Next academic project framework"
                    disabled={projectIndex === academicProjects.length - 1}
                    onClick={() => handleSelectProject(projectIndex + 1)}
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </article>
          </div>
        )}

        {/* ==================================================================
            TAB 2: LITERATURE EXPLORATIONS
            ================================================================== */}
        {activeTab === 'literature' && (
          <div
            id="panel-literature"
            role="tabpanel"
            aria-labelledby="tab-literature"
            className="proj-tab-panel proj-anim-content"
          >
            <div className="proj-lit-reading-room">
              {/* Left Column: Literature Exploration Index */}
              <nav
                className="proj-lit-index-panel"
                role="tablist"
                aria-label="Journal explorations index"
              >
                <div className="proj-lit-index-header">
                  <Layers size={14} aria-hidden="true" />
                  <span>Exploration Index</span>
                </div>

                {journalExplorations.map((entry, idx) => {
                  const isActive = idx === journalIndex;
                  return (
                    <button
                      key={entry.id}
                      type="button"
                      role="tab"
                      id={`jour-tab-${entry.id}`}
                      aria-selected={isActive}
                      aria-controls="proj-lit-article-panel"
                      className={`proj-lit-index-item${isActive ? ' is-active' : ''}`}
                      onClick={() => handleSelectJournal(idx)}
                      onKeyDown={(e) => handleJournalKeyDown(e, idx)}
                    >
                      <div className="proj-lit-index-num" aria-hidden="true">
                        {entry.number}
                      </div>

                      <div className="proj-lit-index-info">
                        <span className="proj-lit-index-title">{entry.title}</span>
                        <div className="proj-lit-index-meta">
                          <span className={`proj-lit-status-badge ${getJournalStatusClass(entry.status)}`}>
                            {entry.status}
                          </span>
                        </div>
                      </div>

                      <ArrowIcon
                        size={15}
                        className="proj-lit-index-arrow"
                        aria-hidden="true"
                      />
                    </button>
                  );
                })}
              </nav>

              {/* Right Column: Article Reading Pane */}
              <article
                ref={journalPaneRef}
                id="proj-lit-article-panel"
                role="tabpanel"
                aria-labelledby={`jour-tab-${selectedJournal.id}`}
                className="proj-lit-article-pane"
              >
                {/* Pane Header */}
                <div className="proj-lit-pane-top">
                  <div className="proj-lit-pane-meta-row">
                    <div className="proj-lit-pane-cat-badge">
                      {getJournalCategoryIcon(selectedJournal.category)}
                      <span>{selectedJournal.category}</span>
                    </div>

                    <span className={`proj-lit-status-badge ${getJournalStatusClass(selectedJournal.status)}`}>
                      {selectedJournal.status}
                    </span>
                  </div>

                  <div className="proj-lit-pane-read-time">
                    <Clock size={12} aria-hidden="true" />
                    <span>{selectedJournal.estimatedReadTime}</span>
                  </div>
                </div>

                {/* Explicit non-research disclaimer */}
                <div className="proj-lit-exploration-note" role="note" aria-label="Classification notice">
                  <BookOpen size={15} aria-hidden="true" />
                  <p>
                    <strong>Exploration Note:</strong> This entry is classified as a{' '}
                    <em>{selectedJournal.status}</em> and is not a published paper, clinical study,
                    or experimental finding. It reflects personal academic curiosity only.
                  </p>
                </div>

                {/* Title */}
                <h3 className="proj-lit-pane-title">{selectedJournal.title}</h3>

                {/* Summary */}
                <div className="proj-lit-block">
                  <div className="proj-lit-block-label">
                    <BookOpen size={12} aria-hidden="true" />
                    <span>Exploration Summary</span>
                  </div>
                  <p className="proj-lit-block-desc">{selectedJournal.summary}</p>
                </div>

                {/* Key Inquiries */}
                <div className="proj-lit-block">
                  <div className="proj-lit-block-label">
                    <Activity size={12} aria-hidden="true" />
                    <span>Key Theoretical Inquiries</span>
                  </div>
                  <ul className="proj-lit-inquiry-list" aria-label="Theoretical inquiries">
                    {selectedJournal.keyInquiries.map((inq, idx) => (
                      <li key={idx} className="proj-lit-inquiry-item">
                        <span className="proj-lit-inquiry-dot" aria-hidden="true" />
                        <span>{inq}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Related Interests */}
                <div className="proj-lit-block">
                  <div className="proj-lit-block-label">
                    <Dna size={12} aria-hidden="true" />
                    <span>Related Areas of Interest</span>
                  </div>
                  <div className="proj-lit-interest-pills">
                    {selectedJournal.relatedInterests.map((interest, idx) => (
                      <span key={idx} className="proj-lit-interest-pill">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Entry counter footer */}
                <div className="proj-lit-pane-footer">
                  <span className="proj-lit-entry-counter">
                    Entry{' '}
                    <span className="proj-lit-entry-num">{selectedJournal.number}</span>{' '}
                    of 0{journalExplorations.length}
                  </span>
                  <div className="proj-lit-nav-dots" aria-hidden="true">
                    {journalExplorations.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className={`proj-lit-nav-dot${idx === journalIndex ? ' is-active' : ''}`}
                        onClick={() => handleSelectJournal(idx)}
                        aria-label={`Go to exploration ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </article>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
