import React, { useState, useEffect, useRef } from 'react';
import {
  BookOpen,
  Clock,
  ChevronRight,
  FlaskConical,
  Dna,
  Microscope,
  Activity,
  Layers,
} from 'lucide-react';
import { JournalItem } from '../../types/portfolio';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface JournalSectionProps {
  journalExplorations: JournalItem[];
}

/** Map journal status to a short badge variant class */
const statusVariant = (status: JournalItem['status']): string => {
  switch (status) {
    case 'Literature Exploration':
      return 'badge-lit';
    case 'Area of Interest':
      return 'badge-aoi';
    case 'Theoretical Study Note':
      return 'badge-theory';
    default:
      return 'badge-lit';
  }
};

/** Category icon resolver */
const categoryIcon = (category: string) => {
  if (category.toLowerCase().includes('molecular')) return <Dna size={13} aria-hidden="true" />;
  if (category.toLowerCase().includes('automation') || category.toLowerCase().includes('ai'))
    return <Activity size={13} aria-hidden="true" />;
  if (category.toLowerCase().includes('biochemistry') || category.toLowerCase().includes('quality'))
    return <FlaskConical size={13} aria-hidden="true" />;
  return <Microscope size={13} aria-hidden="true" />;
};

export const JournalSection: React.FC<JournalSectionProps> = ({ journalExplorations }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const articleRef = useRef<HTMLDivElement>(null);
  const helixRef = useRef<SVGSVGElement>(null);
  const activeEntry = journalExplorations[activeIndex];

  /* ── Entrance animations ── */
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Header stagger reveal
      gsap.from('.jour-anim-header', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 22,
        stagger: 0.1,
        duration: 0.75,
        ease: 'power3.out',
        clearProps: 'all',
      });

      // Reading room panel
      gsap.from('.jour-anim-panel', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
        },
        opacity: 0,
        y: 28,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
        clearProps: 'all',
      });

      // Subtle helix float loop
      if (helixRef.current) {
        gsap.to(helixRef.current, {
          y: -14,
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

  /* ── Animate article panel on tab change ── */
  const handleSelect = (index: number) => {
    if (index === activeIndex) return;
    setActiveIndex(index);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !articleRef.current) return;

    gsap.fromTo(
      articleRef.current,
      { opacity: 0.4, y: 10 },
      { opacity: 1, y: 0, duration: 0.32, ease: 'power2.out', clearProps: 'all' }
    );
  };

  /* ── Keyboard navigation ── */
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      handleSelect((index + 1) % journalExplorations.length);
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      handleSelect((index - 1 + journalExplorations.length) % journalExplorations.length);
    }
  };

  return (
    <section
      id="journal"
      ref={sectionRef}
      className="journal-section section-spacing"
      aria-label="Research Journal and Literature Explorations"
    >
      {/* Background ambient glows */}
      <div className="jour-glow-left" aria-hidden="true" />
      <div className="jour-glow-right" aria-hidden="true" />

      {/* Procedural DNA helix — decorative background SVG */}
      <svg
        ref={helixRef}
        className="jour-helix-bg"
        viewBox="0 0 120 420"
        aria-hidden="true"
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Helix strand A */}
        {Array.from({ length: 9 }).map((_, i) => {
          const y = 24 + i * 42;
          const x1 = 20 + Math.sin((i / 8) * Math.PI * 2) * 36;
          const x2 = 100 - Math.sin((i / 8) * Math.PI * 2) * 36;
          const cp1y = y - 18;
          const cp2y = y + 18;
          return (
            <g key={i}>
              {/* Cross-rung */}
              <line
                x1={x1}
                y1={y}
                x2={x2}
                y2={y}
                stroke="rgba(182,95,109,0.18)"
                strokeWidth="1.2"
              />
              {/* Node A */}
              <circle cx={x1} cy={y} r="3.5" fill="rgba(182,95,109,0.22)" />
              {/* Node B */}
              <circle cx={x2} cy={y} r="3.5" fill="rgba(182,95,109,0.22)" />
              {/* Backbone curve segment A */}
              {i < 8 && (
                <path
                  d={`M ${x1} ${y} C ${x1 - 8} ${cp2y} ${20 + Math.sin(((i + 1) / 8) * Math.PI * 2) * 36 - 8} ${cp1y + 42} ${20 + Math.sin(((i + 1) / 8) * Math.PI * 2) * 36} ${y + 42}`}
                  stroke="rgba(182,95,109,0.14)"
                  strokeWidth="1.6"
                  fill="none"
                />
              )}
              {/* Backbone curve segment B */}
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
        {/* ── Section Header ── */}
        <div className="jour-header">
          <div className="jour-eyebrow-row jour-anim-header">
            <span className="jour-eyebrow">Research &amp; Literature Studies</span>
            <span className="jour-eyebrow-line" aria-hidden="true" />
          </div>

          <h2 className="jour-heading jour-anim-header">
            Reading Room &amp;{' '}
            <span className="text-script-accent">Explorations</span>
          </h2>

          <p className="jour-intro jour-anim-header">
            A curated collection of literature explorations, topical inquiries, and theoretical
            study notes — areas of genuine scientific curiosity, not published research.
          </p>

          {/* Explicit disclaimer */}
          <div className="jour-disclaimer-pill jour-anim-header" role="note">
            <BookOpen size={12} aria-hidden="true" />
            <span>
              Literature Explorations Only · Not Published Research · No Clinical Data
            </span>
          </div>
        </div>

        {/* ── Reading Room — Master Detail Layout ── */}
        <div className="jour-reading-room">

          {/* Index Tabs */}
          <nav
            className="jour-index-panel jour-anim-panel"
            role="tablist"
            aria-label="Journal explorations index"
          >
            <div className="jour-index-header">
              <Layers size={14} aria-hidden="true" />
              <span>Exploration Index</span>
            </div>

            {journalExplorations.map((entry, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={entry.id}
                  type="button"
                  role="tab"
                  id={`jour-tab-${entry.id}`}
                  aria-selected={isActive}
                  aria-controls="jour-article-panel"
                  className={`jour-index-item${isActive ? ' is-active' : ''}`}
                  onClick={() => handleSelect(idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                >
                  <div className="jour-index-num" aria-hidden="true">
                    {entry.number}
                  </div>

                  <div className="jour-index-info">
                    <span className="jour-index-title">{entry.title}</span>
                    <div className="jour-index-meta">
                      <span className={`jour-status-badge ${statusVariant(entry.status)}`}>
                        {entry.status}
                      </span>
                    </div>
                  </div>

                  <ChevronRight
                    size={15}
                    className="jour-index-arrow"
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </nav>

          {/* Article Reading Pane */}
          <article
            ref={articleRef}
            id="jour-article-panel"
            role="tabpanel"
            aria-labelledby={`jour-tab-${activeEntry.id}`}
            className="jour-article-pane jour-anim-panel"
          >
            {/* Pane Header */}
            <div className="jour-pane-top">
              <div className="jour-pane-meta-row">
                <div className="jour-pane-category-badge">
                  {categoryIcon(activeEntry.category)}
                  <span>{activeEntry.category}</span>
                </div>

                <span className={`jour-status-badge ${statusVariant(activeEntry.status)}`}>
                  {activeEntry.status}
                </span>
              </div>

              <div className="jour-pane-read-time">
                <Clock size={12} aria-hidden="true" />
                <span>{activeEntry.estimatedReadTime}</span>
              </div>
            </div>

            {/* Explicit non-research disclaimer */}
            <div className="jour-exploration-note" role="note" aria-label="Classification notice">
              <BookOpen size={15} aria-hidden="true" />
              <p>
                <strong>Exploration Note:</strong> This entry is classified as a{' '}
                <em>{activeEntry.status}</em> and is not a published paper, clinical study,
                or experimental finding. It reflects personal academic curiosity only.
              </p>
            </div>

            {/* Title */}
            <h3 className="jour-pane-title">{activeEntry.title}</h3>

            {/* Summary */}
            <div className="jour-summary-block">
              <div className="jour-block-label">
                <BookOpen size={12} aria-hidden="true" />
                <span>Exploration Summary</span>
              </div>
              <p className="jour-summary-text">{activeEntry.summary}</p>
            </div>

            {/* Key Inquiries */}
            <div className="jour-inquiries-block">
              <div className="jour-block-label">
                <Activity size={12} aria-hidden="true" />
                <span>Key Theoretical Inquiries</span>
              </div>
              <ul className="jour-inquiry-list" aria-label="Theoretical inquiries">
                {activeEntry.keyInquiries.map((inq, idx) => (
                  <li key={idx} className="jour-inquiry-item">
                    <span className="jour-inquiry-dot" aria-hidden="true" />
                    <span>{inq}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Related Interests */}
            <div className="jour-interests-block">
              <div className="jour-block-label">
                <Dna size={12} aria-hidden="true" />
                <span>Related Areas of Interest</span>
              </div>
              <div className="jour-interest-pills">
                {activeEntry.relatedInterests.map((interest, idx) => (
                  <span key={idx} className="jour-interest-pill">
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Entry counter */}
            <div className="jour-pane-footer">
              <span className="jour-entry-counter">
                Entry{' '}
                <span className="jour-entry-num">{activeEntry.number}</span>{' '}
                of 0{journalExplorations.length}
              </span>
              <div className="jour-nav-dots" aria-hidden="true">
                {journalExplorations.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`jour-nav-dot${idx === activeIndex ? ' is-active' : ''}`}
                    onClick={() => handleSelect(idx)}
                    aria-label={`Go to exploration ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};
