import React, { useState, useEffect, useRef } from 'react';
import {
  Microscope,
  RotateCw,
  Thermometer,
  Flame,
  Scan,
  Waves,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Sliders,
  ChevronRight as ArrowIcon,
} from 'lucide-react';
import { LaboratoryInstrument } from '../../types/portfolio';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface InstrumentsSectionProps {
  instruments: LaboratoryInstrument[];
}

export const InstrumentsSection: React.FC<InstrumentsSectionProps> = ({ instruments }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const chamberRef = useRef<HTMLDivElement>(null);
  const selectedInstrument = instruments[currentIndex] || instruments[0];

  // ScrollTrigger entrance animations
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from('.inst-anim-header', {
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

      gsap.from('.inst-anim-showcase', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        opacity: 0,
        y: 28,
        duration: 0.85,
        ease: 'power3.out',
        clearProps: 'all',
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  // Animate chamber on instrument selection
  const handleSelectInstrument = (index: number) => {
    if (index === currentIndex || index < 0 || index >= instruments.length) return;
    setCurrentIndex(index);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !chamberRef.current) return;

    gsap.fromTo(
      chamberRef.current,
      { opacity: 0.45, y: 10 },
      { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out', clearProps: 'all' }
    );
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      handleSelectInstrument((index + 1) % instruments.length);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      handleSelectInstrument((index - 1 + instruments.length) % instruments.length);
    }
  };

  // Icon mapping for instruments
  const getInstrumentIcon = (id: string) => {
    switch (id) {
      case 'inst-microscope':
        return <Microscope size={18} aria-hidden="true" />;
      case 'inst-centrifuge':
        return <RotateCw size={18} aria-hidden="true" />;
      case 'inst-incubator':
        return <Thermometer size={18} aria-hidden="true" />;
      case 'inst-oven':
        return <Flame size={18} aria-hidden="true" />;
      case 'inst-colorimeter':
        return <Scan size={18} aria-hidden="true" />;
      case 'inst-waterbath':
      default:
        return <Waves size={18} aria-hidden="true" />;
    }
  };

  // Procedural SVG Technical Schematic Blueprint
  const renderInstrumentSchematic = (id: string) => {
    switch (id) {
      case 'inst-microscope':
        return (
          <svg
            className="instrument-schematic-svg"
            viewBox="0 0 400 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* Calibration Grid Lines */}
            <line x1="40" y1="170" x2="360" y2="170" stroke="var(--color-border-soft)" strokeDasharray="3 3" />
            <line x1="200" y1="20" x2="200" y2="170" stroke="var(--color-accent-subtle)" strokeDasharray="4 4" />
            {/* Base Foot */}
            <path d="M140 170 H260 L245 155 H155 Z" fill="var(--color-bg-secondary)" stroke="var(--color-accent-primary)" strokeWidth="1.5" />
            {/* Substage Illuminator */}
            <circle cx="200" cy="150" r="14" fill="var(--color-accent-subtle)" stroke="var(--color-accent-primary)" strokeWidth="1.2" />
            {/* Stage Platform */}
            <rect x="150" y="115" width="100" height="8" rx="2" fill="var(--color-border-soft)" stroke="var(--color-text-dark)" strokeWidth="1.2" />
            <rect x="175" y="112" width="50" height="3" fill="#FFF" stroke="var(--color-accent-primary)" strokeWidth="1" />
            {/* Objectives Turret */}
            <circle cx="200" cy="85" r="12" fill="var(--color-bg-secondary)" stroke="var(--color-accent-primary)" strokeWidth="1.5" />
            <line x1="200" y1="85" x2="200" y2="112" stroke="var(--color-accent-primary)" strokeWidth="2.5" />
            <line x1="192" y1="85" x2="182" y2="105" stroke="var(--color-text-muted)" strokeWidth="1.8" />
            <line x1="208" y1="85" x2="218" y2="105" stroke="var(--color-text-muted)" strokeWidth="1.8" />
            {/* Arm & Ocular Head */}
            <path d="M225 155 C245 140 245 80 210 65 L225 35" fill="none" stroke="var(--color-accent-primary)" strokeWidth="2" strokeLinecap="round" />
            <rect x="220" y="28" width="14" height="10" rx="2" transform="rotate(-30 220 28)" fill="var(--color-bg-secondary)" stroke="var(--color-text-dark)" strokeWidth="1.2" />
            {/* Ray Path */}
            <line x1="200" y1="140" x2="200" y2="112" stroke="var(--color-accent-primary)" strokeWidth="1" strokeDasharray="2 2" />
            {/* Labels */}
            <text x="270" y="45" fill="var(--color-text-subtle)" fontSize="9" fontFamily="var(--font-sans)">OCULAR 10X</text>
            <text x="270" y="95" fill="var(--color-accent-primary)" fontSize="9" fontWeight="600" fontFamily="var(--font-sans)">OBJECTIVE 100X OIL</text>
            <text x="75" y="122" fill="var(--color-text-subtle)" fontSize="9" fontFamily="var(--font-sans)">SPECIMEN STAGE</text>
          </svg>
        );

      case 'inst-centrifuge':
        return (
          <svg
            className="instrument-schematic-svg"
            viewBox="0 0 400 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* Outer Chamber */}
            <circle cx="200" cy="100" r="75" fill="var(--color-bg-secondary)" stroke="var(--color-border-soft)" strokeWidth="1.5" />
            <circle cx="200" cy="100" r="62" fill="none" stroke="var(--color-accent-subtle)" strokeWidth="1.2" strokeDasharray="4 3" />
            {/* Rotor Center */}
            <circle cx="200" cy="100" r="14" fill="var(--color-bg-surface)" stroke="var(--color-accent-primary)" strokeWidth="2" />
            {/* Balanced Opposing Tube Holders */}
            <g transform="rotate(0 200 100)">
              <rect x="194" y="42" width="12" height="34" rx="4" fill="var(--color-accent-subtle)" stroke="var(--color-accent-primary)" strokeWidth="1.2" />
              <rect x="194" y="124" width="12" height="34" rx="4" fill="var(--color-accent-subtle)" stroke="var(--color-accent-primary)" strokeWidth="1.2" />
            </g>
            <g transform="rotate(60 200 100)">
              <rect x="194" y="42" width="12" height="34" rx="4" fill="var(--color-bg-surface)" stroke="var(--color-text-muted)" strokeWidth="1.2" />
              <rect x="194" y="124" width="12" height="34" rx="4" fill="var(--color-bg-surface)" stroke="var(--color-text-muted)" strokeWidth="1.2" />
            </g>
            <g transform="rotate(120 200 100)">
              <rect x="194" y="42" width="12" height="34" rx="4" fill="var(--color-bg-surface)" stroke="var(--color-text-muted)" strokeWidth="1.2" />
              <rect x="194" y="124" width="12" height="34" rx="4" fill="var(--color-bg-surface)" stroke="var(--color-text-muted)" strokeWidth="1.2" />
            </g>
            {/* Centrifugal Radial Force Vector Arc */}
            <path d="M260 70 A72 72 0 0 1 270 115" fill="none" stroke="var(--color-accent-primary)" strokeWidth="1.5" strokeDasharray="3 2" />
            <polygon points="270,119 266,112 274,113" fill="var(--color-accent-primary)" />
            {/* Labels */}
            <text x="65" y="65" fill="var(--color-text-subtle)" fontSize="9" fontFamily="var(--font-sans)">BALANCED ROTOR</text>
            <text x="290" y="95" fill="var(--color-accent-primary)" fontSize="9" fontWeight="600" fontFamily="var(--font-sans)">RCF / RPM VECTOR</text>
            <text x="65" y="150" fill="var(--color-text-subtle)" fontSize="9" fontFamily="var(--font-sans)">SERUM SEPARATION</text>
          </svg>
        );

      case 'inst-incubator':
        return (
          <svg
            className="instrument-schematic-svg"
            viewBox="0 0 400 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* Outer Insulated Box */}
            <rect x="120" y="30" width="160" height="140" rx="6" fill="var(--color-bg-secondary)" stroke="var(--color-border-soft)" strokeWidth="1.5" />
            {/* Inner Thermal Chamber */}
            <rect x="135" y="45" width="130" height="110" rx="3" fill="var(--color-bg-surface)" stroke="var(--color-accent-subtle)" strokeWidth="1.2" />
            {/* Perforated Trays */}
            <line x1="135" y1="80" x2="265" y2="80" stroke="var(--color-border-soft)" strokeWidth="1.5" strokeDasharray="4 2" />
            <line x1="135" y1="120" x2="265" y2="120" stroke="var(--color-border-soft)" strokeWidth="1.5" strokeDasharray="4 2" />
            {/* Petri Dishes on Trays */}
            <ellipse cx="170" cy="76" rx="14" ry="4" fill="var(--color-accent-subtle)" stroke="var(--color-accent-primary)" strokeWidth="1" />
            <ellipse cx="230" cy="76" rx="14" ry="4" fill="var(--color-accent-subtle)" stroke="var(--color-accent-primary)" strokeWidth="1" />
            <ellipse cx="195" cy="116" rx="16" ry="4" fill="var(--color-accent-subtle)" stroke="var(--color-accent-primary)" strokeWidth="1" />
            {/* Thermal Convection Currents */}
            <path d="M150 145 Q145 130 150 115 T150 85" fill="none" stroke="var(--color-accent-primary)" strokeWidth="1" strokeDasharray="3 3" />
            <path d="M250 145 Q255 130 250 115 T250 85" fill="none" stroke="var(--color-accent-primary)" strokeWidth="1" strokeDasharray="3 3" />
            {/* Digital Thermostat Display */}
            <rect x="175" y="14" width="50" height="14" rx="2" fill="var(--color-bg-surface)" stroke="var(--color-accent-primary)" strokeWidth="1" />
            <text x="184" y="24" fill="var(--color-accent-primary)" fontSize="8" fontWeight="700" fontFamily="var(--font-sans)">37.0 °C</text>
            {/* Labels */}
            <text x="45" y="80" fill="var(--color-text-subtle)" fontSize="9" fontFamily="var(--font-sans)">PETRI CULTURES</text>
            <text x="290" y="115" fill="var(--color-accent-primary)" fontSize="9" fontWeight="600" fontFamily="var(--font-sans)">LAMINAR AIRFLOW</text>
          </svg>
        );

      case 'inst-oven':
        return (
          <svg
            className="instrument-schematic-svg"
            viewBox="0 0 400 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* Oven Enclosure */}
            <rect x="120" y="30" width="160" height="140" rx="6" fill="var(--color-bg-secondary)" stroke="var(--color-border-soft)" strokeWidth="1.5" />
            <rect x="135" y="45" width="130" height="98" rx="2" fill="var(--color-bg-surface)" stroke="var(--color-text-muted)" strokeWidth="1.2" />
            {/* Heating Elements at Bottom */}
            <path d="M140 135 Q150 128 160 135 T180 135 T200 135 T220 135 T240 135 T260 135" fill="none" stroke="var(--color-accent-primary)" strokeWidth="1.8" />
            {/* Glassware Shelf */}
            <line x1="135" y1="88" x2="265" y2="88" stroke="var(--color-border-soft)" strokeWidth="1.5" />
            {/* Glassware Outlines (Beaker & Pipette Canister) */}
            <path d="M165 88 L165 65 L180 65 L180 88 Z" fill="var(--color-accent-subtle)" stroke="var(--color-accent-primary)" strokeWidth="1" />
            <rect x="205" y="60" width="35" height="28" rx="2" fill="var(--color-accent-subtle)" stroke="var(--color-accent-primary)" strokeWidth="1" />
            {/* Thermal Radiant Rays */}
            <line x1="150" y1="125" x2="150" y2="95" stroke="var(--color-accent-primary)" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="200" y1="125" x2="200" y2="95" stroke="var(--color-accent-primary)" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="250" y1="125" x2="250" y2="95" stroke="var(--color-accent-primary)" strokeWidth="1" strokeDasharray="2 2" />
            {/* Temperature Gauge */}
            <circle cx="200" cy="155" r="7" fill="var(--color-bg-surface)" stroke="var(--color-accent-primary)" strokeWidth="1.2" />
            <line x1="200" y1="155" x2="203" y2="151" stroke="var(--color-accent-primary)" strokeWidth="1.2" />
            {/* Labels */}
            <text x="40" y="80" fill="var(--color-text-subtle)" fontSize="9" fontFamily="var(--font-sans)">GLASSWARE STERILIZATION</text>
            <text x="290" y="140" fill="var(--color-accent-primary)" fontSize="9" fontWeight="600" fontFamily="var(--font-sans)">160°C DRY HEAT</text>
          </svg>
        );

      case 'inst-colorimeter':
        return (
          <svg
            className="instrument-schematic-svg"
            viewBox="0 0 400 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* Optical Axis Line */}
            <line x1="50" y1="100" x2="350" y2="100" stroke="var(--color-border-soft)" strokeDasharray="4 3" />
            {/* 1. Light Source */}
            <circle cx="90" cy="100" r="16" fill="var(--color-bg-secondary)" stroke="var(--color-accent-primary)" strokeWidth="1.5" />
            <circle cx="90" cy="100" r="6" fill="var(--color-accent-primary)" />
            {/* Collimating Ray Lines */}
            <line x1="106" y1="100" x2="150" y2="100" stroke="var(--color-accent-primary)" strokeWidth="2.5" />
            {/* 2. Optical Filter */}
            <rect x="150" y="70" width="10" height="60" rx="2" fill="var(--color-accent-subtle)" stroke="var(--color-text-dark)" strokeWidth="1.2" />
            {/* Monochromatic Beam */}
            <line x1="160" y1="100" x2="210" y2="100" stroke="var(--color-accent-primary)" strokeWidth="2.5" />
            {/* 3. Sample Cuvette */}
            <rect x="210" y="65" width="28" height="70" rx="3" fill="rgba(243, 228, 225, 0.85)" stroke="var(--color-accent-primary)" strokeWidth="1.5" />
            <path d="M214 78 H234 V130 H214 Z" fill="rgba(182, 95, 109, 0.25)" />
            {/* Transmitted Light Beam */}
            <line x1="238" y1="100" x2="280" y2="100" stroke="var(--color-accent-primary)" strokeWidth="1.5" strokeDasharray="3 2" />
            {/* 4. Photocell Detector */}
            <rect x="280" y="75" width="12" height="50" rx="2" fill="var(--color-bg-secondary)" stroke="var(--color-text-dark)" strokeWidth="1.2" />
            {/* Output Galvanometer */}
            <path d="M292 100 H320 V125 H340" fill="none" stroke="var(--color-accent-primary)" strokeWidth="1.2" />
            <rect x="315" y="125" width="40" height="22" rx="3" fill="var(--color-bg-surface)" stroke="var(--color-accent-primary)" strokeWidth="1.2" />
            <text x="322" y="139" fill="var(--color-accent-primary)" fontSize="8" fontWeight="700" fontFamily="var(--font-sans)">OD 0.42</text>
            {/* Labels */}
            <text x="65" y="60" fill="var(--color-text-subtle)" fontSize="9" fontFamily="var(--font-sans)">LIGHT SOURCE</text>
            <text x="135" y="55" fill="var(--color-text-subtle)" fontSize="9" fontFamily="var(--font-sans)">FILTER (λ)</text>
            <text x="195" y="50" fill="var(--color-accent-primary)" fontSize="9" fontWeight="600" fontFamily="var(--font-sans)">CUVETTE (Io → It)</text>
            <text x="260" y="60" fill="var(--color-text-subtle)" fontSize="9" fontFamily="var(--font-sans)">PHOTOCELL</text>
          </svg>
        );

      case 'inst-waterbath':
      default:
        return (
          <svg
            className="instrument-schematic-svg"
            viewBox="0 0 400 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* Outer Chamber Tank */}
            <rect x="110" y="45" width="180" height="120" rx="6" fill="var(--color-bg-secondary)" stroke="var(--color-border-soft)" strokeWidth="1.5" />
            {/* Water Fluid Level Meniscus */}
            <path d="M120 75 Q160 72 200 75 T280 75 V155 H120 Z" fill="rgba(243, 228, 225, 0.75)" stroke="var(--color-accent-subtle)" strokeWidth="1" />
            {/* Stainless Steel Test Tube Rack */}
            <rect x="135" y="70" width="130" height="70" rx="3" fill="none" stroke="var(--color-text-muted)" strokeWidth="1.2" strokeDasharray="4 2" />
            {/* Test Tubes In Rack */}
            <rect x="150" y="55" width="12" height="60" rx="4" fill="var(--color-bg-surface)" stroke="var(--color-accent-primary)" strokeWidth="1.2" />
            <rect x="175" y="55" width="12" height="60" rx="4" fill="var(--color-bg-surface)" stroke="var(--color-accent-primary)" strokeWidth="1.2" />
            <rect x="200" y="55" width="12" height="60" rx="4" fill="var(--color-bg-surface)" stroke="var(--color-accent-primary)" strokeWidth="1.2" />
            <rect x="225" y="55" width="12" height="60" rx="4" fill="var(--color-bg-surface)" stroke="var(--color-accent-primary)" strokeWidth="1.2" />
            {/* Heating Element Coil */}
            <path d="M130 150 Q145 142 160 150 T190 150 T220 150 T250 150 T270 150" fill="none" stroke="var(--color-accent-primary)" strokeWidth="2" />
            {/* Fluid Thermal Ripples */}
            <path d="M130 115 Q140 110 150 115" stroke="var(--color-accent-primary)" strokeWidth="1" fill="none" />
            <path d="M250 115 Q260 110 270 115" stroke="var(--color-accent-primary)" strokeWidth="1" fill="none" />
            {/* Temperature Tag */}
            <rect x="170" y="24" width="60" height="15" rx="2" fill="var(--color-bg-surface)" stroke="var(--color-accent-primary)" strokeWidth="1" />
            <text x="178" y="35" fill="var(--color-accent-primary)" fontSize="8" fontWeight="700" fontFamily="var(--font-sans)">37°C – 56°C</text>
            {/* Labels */}
            <text x="40" y="90" fill="var(--color-text-subtle)" fontSize="9" fontFamily="var(--font-sans)">SEROLOGICAL TUBES</text>
            <text x="295" y="110" fill="var(--color-accent-primary)" fontSize="9" fontWeight="600" fontFamily="var(--font-sans)">THERMAL STABILITY</text>
          </svg>
        );
    }
  };

  return (
    <section
      id="instruments"
      ref={sectionRef}
      className="instruments-section section-spacing"
      aria-label="Laboratory Instrumentation Showcase"
    >
      <div className="instruments-ambient-glow" aria-hidden="true" />
      <div className="instruments-ambient-glow-left" aria-hidden="true" />

      <div className="container-custom">
        {/* Section Header */}
        <div className="instruments-header">
          <div className="instruments-eyebrow-container inst-anim-header">
            <span className="instruments-eyebrow">Laboratory Instrumentation &amp; Equipment</span>
            <span className="instruments-eyebrow-line" aria-hidden="true" />
          </div>

          <h2 className="instruments-heading inst-anim-header">
            Analytical Equipment &{' '}
            <span className="text-script-accent">Bench Operation</span>
          </h2>

          <p className="instruments-intro-text inst-anim-header">
            Hands-on familiarity with core laboratory hardware utilized across clinical hematology,
            biochemistry, microbiology, and sample processing workflows.
          </p>
        </div>

        {/* Interactive Master-Detail Showcase */}
        <div className="instruments-showcase-grid inst-anim-showcase">
          {/* Main Featured Chamber Display */}
          <article
            ref={chamberRef}
            id="instrument-chamber-panel"
            className="instrument-chamber"
            aria-live="polite"
          >
            {/* Top Metadata */}
            <div className="instrument-chamber-meta">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="instrument-index-tag">NO. {selectedInstrument.number}</span>
                <span className="instrument-category-tag">{selectedInstrument.category}</span>
              </div>

              <div className="instrument-experience-pill">
                <span className="instrument-pulse-dot" aria-hidden="true" />
                <span>{selectedInstrument.experienceType}</span>
              </div>
            </div>

            {/* Technical Schematic Stage */}
            <div className="instrument-schematic-stage">
              {renderInstrumentSchematic(selectedInstrument.id)}
              <span className="instrument-schematic-watermark">
                FIG {selectedInstrument.number} &bull; CLINICAL BLUEPRINT
              </span>
            </div>

            {/* Instrument Name & Description */}
            <h3 className="instrument-chamber-name">{selectedInstrument.name}</h3>
            <p className="instrument-chamber-desc">{selectedInstrument.description}</p>

            {/* Key Functional Highlights */}
            <div className="instrument-functions-card">
              <div className="instrument-functions-title">
                <Sliders size={13} aria-hidden="true" />
                <span>Operational Functions & Protocol</span>
              </div>

              <div className="instrument-functions-list">
                {selectedInstrument.keyFunctions.map((fn, idx) => (
                  <div key={idx} className="instrument-function-item">
                    <CheckCircle2 size={14} aria-hidden="true" />
                    <span>{fn}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Chamber Bottom Controls */}
            <div className="instrument-chamber-controls">
              <span className="instrument-pagination-text">
                <span className="instrument-pagination-current">
                  {selectedInstrument.number}
                </span>{' '}
                / 0{instruments.length}
              </span>

              <div className="instrument-nav-buttons">
                <button
                  type="button"
                  className="instrument-nav-btn"
                  aria-label="Previous laboratory instrument"
                  disabled={currentIndex === 0}
                  onClick={() => handleSelectInstrument(currentIndex - 1)}
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  className="instrument-nav-btn"
                  aria-label="Next laboratory instrument"
                  disabled={currentIndex === instruments.length - 1}
                  onClick={() => handleSelectInstrument(currentIndex + 1)}
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </article>

          {/* Instrument Registry / Selector List */}
          <div className="instrument-registry-wrap">
            <div className="instrument-registry-header">
              <span className="instrument-registry-title">Instrument Registry</span>
              <span className="instrument-registry-count">{instruments.length} Equipment</span>
            </div>

            <div
              className="instrument-index-list"
              role="tablist"
              aria-label="Select an instrument to inspect"
            >
              {instruments.map((inst, index) => {
                const isSelected = index === currentIndex;

                return (
                  <button
                    key={inst.id}
                    type="button"
                    role="tab"
                    id={`inst-tab-${inst.id}`}
                    aria-selected={isSelected}
                    aria-controls="instrument-chamber-panel"
                    className={`instrument-index-item ${isSelected ? 'is-selected' : ''}`}
                    onClick={() => handleSelectInstrument(index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                  >
                    <div className="instrument-index-left">
                      <div className="instrument-index-num" aria-hidden="true">
                        {inst.number}
                      </div>

                      <div className="instrument-index-info">
                        <span className="instrument-index-name">{inst.name}</span>
                        <span className="instrument-index-cat">{inst.category}</span>
                      </div>
                    </div>

                    <div className="instrument-index-icon-wrap" aria-hidden="true">
                      {isSelected ? <ArrowIcon size={16} /> : getInstrumentIcon(inst.id)}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
