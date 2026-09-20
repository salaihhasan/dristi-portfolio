import React, { useEffect, useRef } from 'react';
import {
  GraduationCap,
  Calendar,
  Building2,
  Award,
  CheckCircle2,
  BookOpen,
  Microscope,
  Sparkles,
} from 'lucide-react';
import { EducationItem } from '../../types/portfolio';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface EducationSectionProps {
  education: EducationItem[];
}

export const EducationSection: React.FC<EducationSectionProps> = ({ education }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const ledgerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      // Header entrance
      gsap.from('.edu-anim-header', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 24,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        clearProps: 'all',
      });

      // Timeline items staggered reveal
      gsap.from('.edu-anim-item', {
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 75%',
        },
        opacity: 0,
        x: -24,
        stagger: 0.16,
        duration: 0.85,
        ease: 'power3.out',
        clearProps: 'all',
      });

      // Visual Ledger card entrance
      gsap.from(ledgerRef.current, {
        scrollTrigger: {
          trigger: ledgerRef.current,
          start: 'top 75%',
        },
        opacity: 0,
        y: 26,
        scale: 0.96,
        duration: 0.85,
        ease: 'power3.out',
        clearProps: 'all',
      });

      // Smooth in/out scroll parallax depth on the ledger card
      if (ledgerRef.current) {
        gsap.to(ledgerRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
          y: -24,
          ease: 'none',
        });
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="education-section section-spacing chapter-divider"
      aria-label="Education and Academic Journey"
    >
      <div className="education-ambient-glow" aria-hidden="true" />

      <div className="container-custom">
        {/* Section Header */}
        <div className="education-header">
          <div className="education-eyebrow-container edu-anim-header">
            <span className="education-eyebrow">Academic Foundation &amp; Journey</span>
            <span className="education-eyebrow-line" aria-hidden="true" />
          </div>

          <h2 className="education-heading edu-anim-header">
            <span className="text-highlight-rose">Foundation</span> of{' '}
            <span className="text-script-accent">Scientific Discipline</span>
          </h2>

          <p className="education-intro-text edu-anim-header">
            A continuous progression from foundational secondary sciences in New Delhi to dedicated
            clinical laboratory technology at PW Institute of Innovation.
          </p>
        </div>

        {/* Main Grid: Timeline + Academic Ledger Visual */}
        <div className="education-grid">
          {/* Timeline Column */}
          <div ref={timelineRef} className="education-timeline" role="list">
            {education.map((item) => {
              const isOngoing = item.status === 'Ongoing';

              return (
                <div
                  key={item.id}
                  className="education-timeline-item edu-anim-item"
                  role="listitem"
                >
                  {/* Calibrated Node / Marker */}
                  <div
                    className={`education-node ${isOngoing ? 'is-active' : ''}`}
                    aria-hidden="true"
                  >
                    {isOngoing ? (
                      <GraduationCap size={18} />
                    ) : (
                      <CheckCircle2 size={18} />
                    )}
                  </div>

                  {/* Content Card */}
                  <article className={`education-card ${isOngoing ? 'is-current' : ''}`}>
                    {/* Top Metadata: Date Range & Status */}
                    <div className="education-card-meta">
                      <div className="education-date-badge">
                        <Calendar size={13} aria-hidden="true" />
                        <span>{item.yearRange}</span>
                      </div>

                      <div
                        className={`education-status-pill ${
                          isOngoing ? 'ongoing' : 'completed'
                        }`}
                      >
                        {isOngoing && <span className="education-pulse-dot" aria-hidden="true" />}
                        <span>{isOngoing ? 'Current Program' : 'Completed'}</span>
                      </div>
                    </div>

                    {/* Qualification Title */}
                    <h3 className="education-title">{item.qualification}</h3>

                    {/* Institution & Board */}
                    <div className="education-institution-row">
                      <span className="education-inst-name">
                        <Building2 size={14} color="var(--color-accent-primary)" aria-hidden="true" />
                        {item.institution}
                      </span>
                      <span className="education-board-tag">{item.boardOrUniversity}</span>
                    </div>

                    {/* Performance / Result Badge if available */}
                    {item.percentageOrGrade && (
                      <div className="education-grade-row">
                        <span className="education-grade-badge">
                          <Award size={13} aria-hidden="true" />
                          <span>Score: {item.percentageOrGrade}</span>
                        </span>
                      </div>
                    )}

                    {/* Description */}
                    <p className="education-desc">{item.description}</p>
                  </article>
                </div>
              );
            })}
          </div>

          {/* Right Column: Academic / Laboratory Visual Treatment (Ledger Card) */}
          <div ref={ledgerRef} className="education-visual-col">
            <div className="education-ledger-card">
              <div className="education-ledger-watermark" aria-hidden="true" />

              <div className="education-ledger-header">
                <div className="education-ledger-badge">
                  <Microscope size={13} aria-hidden="true" />
                  <span>Academic Dossier</span>
                </div>
                <h3 className="education-ledger-title">Clinical Laboratory Pathway</h3>
                <p className="education-ledger-subtitle">
                  PW Institute of Innovation &times; Mangalayatan University
                </p>
              </div>

              {/* Calibrated Measurement Marks (Burette / Pipette Ticks) */}
              <div
                className="education-ruler-track"
                aria-label="Chronological academic milestones"
              >
                <div className="education-ruler-tick">
                  <div className="education-ruler-mark tall" />
                  <span className="education-ruler-label">CLASS 10</span>
                </div>
                <div className="education-ruler-tick">
                  <div className="education-ruler-mark" />
                </div>
                <div className="education-ruler-tick">
                  <div className="education-ruler-mark" />
                </div>
                <div className="education-ruler-tick">
                  <div className="education-ruler-mark tall" />
                  <span className="education-ruler-label">CLASS 12 PCMB</span>
                </div>
                <div className="education-ruler-tick">
                  <div className="education-ruler-mark" />
                </div>
                <div className="education-ruler-tick">
                  <div className="education-ruler-mark" />
                </div>
                <div className="education-ruler-tick">
                  <div className="education-ruler-mark tall" />
                  <span className="education-ruler-label">B.VOC MLT</span>
                </div>
              </div>

              {/* Key Educational Highlights */}
              <div className="education-ledger-list">
                <div className="education-ledger-item">
                  <div className="education-ledger-icon-wrap" aria-hidden="true">
                    <BookOpen size={16} />
                  </div>
                  <div className="education-ledger-info">
                    <h4>Pre-Medical Analytical Rigor</h4>
                    <p>
                      Class 12 PCMB (Physics, Chemistry, Maths, Biology) with 80% and Class 10 with 90%
                      CBSE Board.
                    </p>
                  </div>
                </div>

                <div className="education-ledger-item">
                  <div className="education-ledger-icon-wrap" aria-hidden="true">
                    <Microscope size={16} />
                  </div>
                  <div className="education-ledger-info">
                    <h4>Clinical Immersion</h4>
                    <p>
                      Hands-on curriculum emphasizing biochemistry, hematology, microbiology, and modern
                      laboratory automation.
                    </p>
                  </div>
                </div>

                <div className="education-ledger-item">
                  <div className="education-ledger-icon-wrap" aria-hidden="true">
                    <Sparkles size={16} />
                  </div>
                  <div className="education-ledger-info">
                    <h4>Standard Protocol Focus</h4>
                    <p>
                      Commitment to diagnostic accuracy, biosafety SOPs, and reproducible bench results.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Handwritten Editorial Polaroid Note */}
            <div className="education-polaroid-note">
              <span className="education-polaroid-text">
                From scientific curiosity to bench precision ♡
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
