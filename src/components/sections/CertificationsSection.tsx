import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  Award,
  X,
  ChevronLeft,
  ChevronRight,
  FileCheck2,
  ExternalLink,
  Users,
  Sparkles,
  CheckCircle2,
  Calendar,
  Building2,
  BadgeCheck,
  ShieldAlert,
} from 'lucide-react';
import { CertificationItem, LeadershipItem } from '../../types/portfolio';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CertificationsSectionProps {
  certifications: CertificationItem[];
  leadershipAndVolunteering: LeadershipItem[];
}

/* ── Category Color Palette ── */
const categoryColorMap: Record<string, string> = {
  'Healthcare & Biotechnology': '#B65F6D',
  'AI & Emerging Technology': '#5F7EB6',
  'Prompting & Data': '#6B8A6B',
  'Product & Professional': '#9B7B5A',
  'Digital Skills': '#7A6BB6',
  'Academic Recognition': '#B68F5F',
};

const getCategoryColor = (category: string) =>
  categoryColorMap[category] ?? '#B65F6D';

export const CertificationsSection: React.FC<CertificationsSectionProps> = ({
  certifications,
  leadershipAndVolunteering,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const featuredFrameRef = useRef<HTMLDivElement>(null);

  /* ── State ── */
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [featuredIndex, setFeaturedIndex] = useState(0);

  // Active modal item (can be image-based or metadata-based)
  const [activeModalItem, setActiveModalItem] = useState<CertificationItem | null>(null);

  // Mobile show-more toggle for credential shelf
  const [showAllCerts, setShowAllCerts] = useState(false);


  /* Verified credentials with high-res document image attachments */
  const verifiedCerts = useMemo(
    () => certifications.filter((c) => c.hasImageAttachment && Boolean(c.image)),
    [certifications]
  );

  const currentFeatured = verifiedCerts[featuredIndex] || verifiedCerts[0];

  /* Filter categories extracted directly from real data */
  const categories = useMemo(() => {
    const cats = Array.from(new Set(certifications.map((c) => c.category)));
    return ['All', ...cats];
  }, [certifications]);

  /* Filtered certificates list */
  const filteredCertifications = useMemo(() => {
    if (selectedCategory === 'All') return certifications;
    return certifications.filter((c) => c.category === selectedCategory);
  }, [certifications, selectedCategory]);

  /* ── Modal Controls ── */
  const openModal = useCallback((item: CertificationItem) => {
    setActiveModalItem(item);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setActiveModalItem(null);
    document.body.style.overflow = '';
  }, []);

  /* Keyboard Escape listener */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeModal]);

  /* Reset body overflow on unmount */
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  /* ── Featured Navigation ── */
  const handleFeaturedNav = (dir: 1 | -1) => {
    const nextIndex = (featuredIndex + dir + verifiedCerts.length) % verifiedCerts.length;
    setFeaturedIndex(nextIndex);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !featuredFrameRef.current) return;

    gsap.fromTo(
      featuredFrameRef.current,
      { opacity: 0.45, x: dir * 18 },
      { opacity: 1, x: 0, duration: 0.35, ease: 'power2.out', clearProps: 'all' }
    );
  };

  /* ── Subtle Physical Document Tilt on Mouse Move ── */
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const frame = featuredFrameRef.current;
    if (!frame) return;
    const rect = frame.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const tiltX = (y / (rect.height / 2)) * -4;
    const tiltY = (x / (rect.width / 2)) * 4;

    gsap.to(frame, {
      rotateX: tiltX,
      rotateY: tiltY,
      duration: 0.4,
      ease: 'power1.out',
      transformPerspective: 800,
    });
  };

  const handleMouseLeave = () => {
    const frame = featuredFrameRef.current;
    if (!frame) return;
    gsap.to(frame, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  /* ── GSAP Entrance Animations ── */
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from('.cert-anim-header', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' },
        opacity: 0,
        y: 20,
        stagger: 0.08,
        duration: 0.7,
        ease: 'power3.out',
        clearProps: 'all',
      });

      gsap.from('.cert-anim-tier1', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        opacity: 0,
        y: 28,
        duration: 0.8,
        ease: 'power3.out',
        clearProps: 'all',
      });

      gsap.from('.cert-milestone-entry', {
        scrollTrigger: { trigger: '.cert-milestone-track-card', start: 'top 80%' },
        opacity: 0,
        y: 16,
        stagger: 0.08,
        duration: 0.6,
        ease: 'power2.out',
        clearProps: 'all',
      });

      gsap.from('.cert-anim-shelf', {
        scrollTrigger: { trigger: '.cert-shelf-area', start: 'top 80%' },
        opacity: 0,
        y: 24,
        duration: 0.75,
        ease: 'power3.out',
        clearProps: 'all',
      });

      // Stagger in individual credential shelf cards
      gsap.from('.cert-card', {
        scrollTrigger: { trigger: '.cert-shelf-grid', start: 'top 85%' },
        opacity: 0,
        y: 16,
        stagger: 0.05,
        duration: 0.5,
        ease: 'power2.out',
        clearProps: 'all',
      });

      // Featured physical certificate document entrance reveal
      if (featuredFrameRef.current) {
        gsap.from(featuredFrameRef.current, {
          scrollTrigger: { trigger: featuredFrameRef.current, start: 'top 82%' },
          opacity: 0,
          scale: 0.94,
          rotateY: -6,
          duration: 0.9,
          ease: 'power3.out',
          clearProps: 'all',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* ── Filter change with smooth transition ── */
  const handleCategoryChange = (cat: string) => {
    if (cat === selectedCategory) return;
    setSelectedCategory(cat);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    gsap.fromTo(
      '.cert-shelf-grid',
      { opacity: 0.45, y: 8 },
      { opacity: 1, y: 0, duration: 0.28, ease: 'power2.out', clearProps: 'all' }
    );
  };

  return (
    <>
      <section
        id="achievements"
        ref={sectionRef}
        className="certs-section section-spacing chapter-divider"
        aria-label="Milestones and Credentials"
      >
        {/* Backward-compatible anchor for legacy links */}
        <span id="certifications" className="sr-only" aria-hidden="true" />

        {/* Chapter watermark numeral */}
        <span className="section-watermark-num" aria-hidden="true">06</span>

        {/* Ambient atmospheric glows */}
        <div className="certs-glow-left" aria-hidden="true" />
        <div className="certs-glow-right" aria-hidden="true" />

        <div className="container-custom">
          {/* ================================================================
              1. SECTION HEADER
              ================================================================ */}
          <div className="certs-header">
            <div className="certs-eyebrow-row cert-anim-header">
              <span className="certs-eyebrow">06 · Achievements &amp; Credentials</span>
              <span className="certs-eyebrow-line" aria-hidden="true" />
            </div>

            <h2 className="certs-heading cert-anim-header">
              <span className="text-highlight-rose">Milestones</span> &amp;{' '}
              <span className="text-script-accent">Credentials</span>
            </h2>

            <p className="certs-intro cert-anim-header">
              Certifications, recognitions and meaningful milestones collected throughout the academic journey.
            </p>
          </div>

          {/* ================================================================
              2 & 3. TOP TIER: FEATURED CREDENTIAL + MILESTONE JOURNEY TRACK
              ================================================================ */}
          <div className="certs-top-tier cert-anim-tier1">
            {/* ── LEFT: Physical Document Featured Showcase ── */}
            {currentFeatured && (
              <div className="cert-featured-card">
                <div className="cert-tier-heading-row">
                  <div className="cert-pill-badge">
                    <Award size={13} aria-hidden="true" />
                    <span>Featured Credentials ({verifiedCerts.length})</span>
                  </div>
                  {/* Direct Switcher Tabs for Both Verified Certificates */}
                  <div className="cert-featured-switcher-tabs" role="tablist" aria-label="Select featured certificate">
                    {verifiedCerts.map((vc, vIdx) => (
                      <button
                        key={vc.id}
                        type="button"
                        role="tab"
                        aria-selected={featuredIndex === vIdx}
                        className={`cert-featured-tab-btn ${featuredIndex === vIdx ? 'is-active' : ''}`}
                        onClick={() => setFeaturedIndex(vIdx)}
                      >
                        <span>{vIdx === 0 ? 'AI in Healthcare' : 'Beyond the Lab'}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Physical Certificate Frame */}
                <div
                  ref={featuredFrameRef}
                  className="cert-physical-frame"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => openModal(currentFeatured)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openModal(currentFeatured);
                    }
                  }}
                  aria-label={`Open certificate preview: ${currentFeatured.title}`}
                >
                  {/* Parchment Grid Texture */}
                  <div className="cert-parchment-texture" aria-hidden="true" />

                  {/* Corner Accent Brackets */}
                  <span className="cert-corner cert-corner-tl" aria-hidden="true" />
                  <span className="cert-corner cert-corner-tr" aria-hidden="true" />
                  <span className="cert-corner cert-corner-bl" aria-hidden="true" />
                  <span className="cert-corner cert-corner-br" aria-hidden="true" />

                  {/* Certificate Image Preview */}
                  <div className="cert-physical-img-wrap">
                    <img
                      src={currentFeatured.image}
                      alt={`${currentFeatured.title} issued by ${currentFeatured.issuingOrganization}`}
                      className="cert-physical-img"
                      loading="lazy"
                    />
                    <div className="cert-frame-hover-hint" aria-hidden="true">
                      <ExternalLink size={20} />
                      <span>Inspect Credential</span>
                    </div>
                  </div>

                  {/* Embossed Wax / Lab Seal Stamp Motif */}
                  <div className="cert-embossed-seal" aria-hidden="true">
                    <svg viewBox="0 0 100 100" className="cert-seal-svg">
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="rgba(182, 95, 109, 0.45)"
                        strokeWidth="1.5"
                        strokeDasharray="3 2"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="38"
                        fill="none"
                        stroke="rgba(182, 95, 109, 0.35)"
                        strokeWidth="1"
                      />
                      <path
                        id="sealCurve"
                        d="M 22,50 A 28,28 0 1,1 78,50 A 28,28 0 1,1 22,50"
                        fill="none"
                      />
                      <text className="cert-seal-text" fontSize="7.2">
                        <textPath href="#sealCurve" startOffset="50%" textAnchor="middle">
                          VERIFIED CREDENTIAL • ACADEMIC RECORD
                        </textPath>
                      </text>
                      <circle cx="50" cy="50" r="13" fill="rgba(182, 95, 109, 0.08)" />
                    </svg>
                    <div className="cert-seal-center-icon">
                      <FileCheck2 size={15} />
                    </div>
                  </div>
                </div>

                {/* Document Information & Pagination */}
                <div className="cert-featured-info">
                  <div className="cert-featured-meta-line">
                    <span
                      className="cert-category-tag"
                      style={{ color: getCategoryColor(currentFeatured.category) }}
                    >
                      {currentFeatured.category}
                    </span>
                    <span className="cert-dot-separator" aria-hidden="true">
                      •
                    </span>
                    <span className="cert-featured-date">
                      <Calendar size={12} aria-hidden="true" />
                      {currentFeatured.issueDate}
                    </span>
                  </div>

                  <h3 className="cert-featured-title">{currentFeatured.title}</h3>

                  <div className="cert-issuer-row">
                    <Building2 size={14} aria-hidden="true" />
                    <span className="cert-issuer-name">
                      {currentFeatured.issuingOrganization}
                    </span>
                  </div>

                  {currentFeatured.description && (
                    <p className="cert-featured-desc">{currentFeatured.description}</p>
                  )}

                  {/* Navigation between verified certificate assets */}
                  <div className="cert-featured-footer">
                    {verifiedCerts.length > 1 && (
                      <div className="cert-pager-controls">
                        <button
                          type="button"
                          className="cert-pager-btn"
                          onClick={() => handleFeaturedNav(-1)}
                          aria-label="Previous verified certificate"
                        >
                          <ChevronLeft size={16} />
                        </button>

                        <span className="cert-pager-label">
                          0{featuredIndex + 1} / 0{verifiedCerts.length}
                        </span>

                        <button
                          type="button"
                          className="cert-pager-btn"
                          onClick={() => handleFeaturedNav(1)}
                          aria-label="Next verified certificate"
                        >
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    )}

                    <button
                      type="button"
                      className="cert-inspect-btn"
                      onClick={() => openModal(currentFeatured)}
                      aria-label={`Open full view of ${currentFeatured.title}`}
                    >
                      <ExternalLink size={13} aria-hidden="true" />
                      <span>View Full Certificate</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ── RIGHT: Milestone Journey Track (Leadership & Extracurriculars) ── */}
            <div className="cert-milestone-track-card">
              <div className="cert-tier-heading-row">
                <div className="cert-pill-badge">
                  <Users size={13} aria-hidden="true" />
                  <span>Milestone Journey Track</span>
                </div>
                <span className="cert-track-count">
                  {leadershipAndVolunteering.length} Extracurricular Milestones
                </span>
              </div>

              <div className="cert-milestones-list" role="list">
                {leadershipAndVolunteering.map((item, idx) => (
                  <article
                    key={item.id}
                    className="cert-milestone-entry"
                    role="listitem"
                  >
                    {/* Visual Connector Column */}
                    <div className="cert-m-node-col" aria-hidden="true">
                      <span className="cert-m-node-pip">0{idx + 1}</span>
                      {idx < leadershipAndVolunteering.length - 1 && (
                        <span className="cert-m-node-line" />
                      )}
                    </div>

                    {/* Milestone Content */}
                    <div className="cert-m-body">
                      <div className="cert-m-header">
                        <span className="cert-m-role">{item.role}</span>
                        <h4 className="cert-m-title">{item.title}</h4>
                      </div>

                      <p className="cert-m-desc">{item.description}</p>

                      {item.keyTakeaways && item.keyTakeaways.length > 0 && (
                        <div className="cert-m-chips">
                          {item.keyTakeaways.map((chip, ci) => (
                            <span key={ci} className="cert-m-chip">
                              <Sparkles size={9} aria-hidden="true" />
                              {chip}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>

          {/* ================================================================
              4 & 5. BOTTOM TIER: COMPACT INTERACTIVE CREDENTIAL SHELF
              ================================================================ */}
          <div className="cert-shelf-area cert-anim-shelf">
            <div className="cert-shelf-topbar">
              <div className="cert-shelf-heading-block">
                <div className="cert-pill-badge">
                  <FileCheck2 size={13} aria-hidden="true" />
                  <span>Credential Shelf</span>
                </div>
                <h3 className="cert-shelf-title">
                  All Accreditations &amp; Knowledge Domains
                </h3>
              </div>

              {/* Statistics Pill */}
              <div className="cert-shelf-stats" aria-label="Credentials summary statistics">
                <span className="cert-stat-badge">
                  <strong>{certifications.length}</strong> Certifications
                </span>
                <span className="cert-stat-divider" aria-hidden="true" />
                <span className="cert-stat-badge">
                  <strong>{verifiedCerts.length}</strong> Verified Assets
                </span>
                <span className="cert-stat-divider" aria-hidden="true" />
                <span className="cert-stat-badge">
                  <strong>{categories.length - 1}</strong> Domains
                </span>
              </div>
            </div>

            {/* Category Filter Chips */}
            <div
              className="cert-filter-bar"
              role="tablist"
              aria-label="Filter certificates by domain"
            >
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat;
                const count =
                  cat === 'All'
                    ? certifications.length
                    : certifications.filter((c) => c.category === cat).length;

                return (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    className={`cert-filter-chip${isSelected ? ' is-active' : ''}`}
                    onClick={() => handleCategoryChange(cat)}
                  >
                    {cat !== 'All' && (
                      <span
                        className="cert-filter-dot"
                        style={{ background: getCategoryColor(cat) }}
                        aria-hidden="true"
                      />
                    )}
                    <span className="cert-filter-label">{cat}</span>
                    <span className="cert-filter-count">{count}</span>
                  </button>
                );
              })}
            </div>

            {/* Credential Grid Cards */}
            <div className={`cert-shelf-grid${showAllCerts ? ' certs-show-all' : ''}`} role="list">
              {filteredCertifications.map((cert) => {
                const hasAsset = cert.hasImageAttachment && Boolean(cert.image);

                return (
                  <article
                    key={cert.id}
                    className={`cert-card${hasAsset ? ' has-verified-asset' : ''}`}
                    role="listitem"
                    onClick={() => openModal(cert)}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        openModal(cert);
                      }
                    }}
                    aria-label={`View details for ${cert.title}`}
                  >
                    <div className="cert-card-header">
                      <span
                        className="cert-card-category"
                        style={{ color: getCategoryColor(cert.category) }}
                      >
                        <span
                          className="cert-card-cat-dot"
                          style={{ background: getCategoryColor(cert.category) }}
                          aria-hidden="true"
                        />
                        {cert.category}
                      </span>

                      {hasAsset ? (
                        <span className="cert-card-badge-verified" title="Physical certificate on record">
                          <BadgeCheck size={12} aria-hidden="true" />
                          <span>Verified</span>
                        </span>
                      ) : (
                        <span className="cert-card-badge-record" title="Accreditation record">
                          <CheckCircle2 size={11} aria-hidden="true" />
                          <span>Record</span>
                        </span>
                      )}
                    </div>

                    <h4 className="cert-card-title">{cert.title}</h4>

                    <div className="cert-card-meta">
                      <span className="cert-card-org">{cert.issuingOrganization}</span>
                      <span className="cert-card-date">{cert.issueDate}</span>
                    </div>

                    {cert.description && (
                      <p className="cert-card-desc">{cert.description}</p>
                    )}

                    <div className="cert-card-footer">
                      <span className="cert-card-action">
                        <ExternalLink size={12} aria-hidden="true" />
                        <span>{hasAsset ? 'Inspect Certificate' : 'Review Details'}</span>
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Mobile Show-More Button — only visible on ≤640px screens, only when there are more than 4 certs */}
            {filteredCertifications.length > 4 && (
              <button
                type="button"
                className="cert-show-more-btn"
                onClick={() => setShowAllCerts((prev) => !prev)}
                aria-expanded={showAllCerts}
              >
                {showAllCerts
                  ? 'Show less ↑'
                  : `Show ${filteredCertifications.length - 4} more credentials ↓`}
              </button>
            )}
          </div>
        </div>
      </section>


      {/* ====================================================================
          UNIVERSAL CREDENTIAL MODAL / LIGHTBOX
          ==================================================================== */}
      {activeModalItem && (
        <div
          className="cert-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label={`Credential: ${activeModalItem.title}`}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="cert-modal-container">
            <button
              type="button"
              className="cert-modal-close-btn"
              onClick={closeModal}
              aria-label="Close modal"
              autoFocus
            >
              <X size={20} />
            </button>

            {/* Scenario A: Full Document Image Preview */}
            {activeModalItem.hasImageAttachment && activeModalItem.image ? (
              <div className="cert-modal-doc-view">
                <div className="cert-modal-img-container">
                  <img
                    src={activeModalItem.image}
                    alt={`${activeModalItem.title} — ${activeModalItem.issuingOrganization}`}
                    className="cert-modal-full-img"
                  />
                </div>

                <div className="cert-modal-doc-footer">
                  <div className="cert-modal-doc-text">
                    <span
                      className="cert-category-tag"
                      style={{ color: getCategoryColor(activeModalItem.category) }}
                    >
                      {activeModalItem.category}
                    </span>
                    <h3 className="cert-modal-doc-title">{activeModalItem.title}</h3>
                    <span className="cert-modal-doc-sub">
                      Issued by <strong>{activeModalItem.issuingOrganization}</strong> • {activeModalItem.issueDate}
                    </span>
                  </div>

                  <div className="cert-verified-pill">
                    <BadgeCheck size={14} aria-hidden="true" />
                    <span>Verified Credential Asset</span>
                  </div>
                </div>
              </div>
            ) : (
              /* Scenario B: Academic & Professional Credential Dossier Plaque */
              <div className="cert-modal-plaque-view">
                <div className="cert-plaque-top">
                  <span
                    className="cert-category-tag"
                    style={{ color: getCategoryColor(activeModalItem.category) }}
                  >
                    {activeModalItem.category}
                  </span>
                  <span className="cert-plaque-status">
                    <CheckCircle2 size={13} aria-hidden="true" />
                    <span>Accreditation On Record</span>
                  </span>
                </div>

                <h3 className="cert-plaque-title">{activeModalItem.title}</h3>

                <div className="cert-plaque-meta-grid">
                  <div className="cert-plaque-meta-cell">
                    <span className="cert-plaque-label">Issuing Authority</span>
                    <span className="cert-plaque-val">{activeModalItem.issuingOrganization}</span>
                  </div>
                  <div className="cert-plaque-meta-cell">
                    <span className="cert-plaque-label">Date Conferred</span>
                    <span className="cert-plaque-val">{activeModalItem.issueDate}</span>
                  </div>
                  <div className="cert-plaque-meta-cell">
                    <span className="cert-plaque-label">Credential Status</span>
                    <span className="cert-plaque-val">Completed &amp; Validated</span>
                  </div>
                </div>

                {activeModalItem.description && (
                  <div className="cert-plaque-desc-block">
                    <span className="cert-plaque-label">Curriculum / Focus Area</span>
                    <p className="cert-plaque-desc">{activeModalItem.description}</p>
                  </div>
                )}

                <div className="cert-plaque-footer-notice">
                  <ShieldAlert size={14} aria-hidden="true" />
                  <span>
                    Verified against official institutional completion record. Full certificate transcripts available upon academic request.
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
