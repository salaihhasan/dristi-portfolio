import React, { useState, useEffect, useRef } from 'react';
import {
  Droplets,
  Activity,
  ShieldCheck,
  Bug,
  Layers,
  Dna,
  Syringe,
  FlaskConical,
  Microscope,
  Pipette,
  CheckCircle2,
  Sliders,
  ChevronLeft,
  ChevronRight,
  ChevronRight as ArrowIcon,
  RotateCw,
  Thermometer,
  Flame,
  Scan,
  Waves,
} from 'lucide-react';
import {
  DiagnosticDiscipline,
  PracticalTechnique,
  LaboratoryInstrument,
} from '../../types/portfolio';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SkillsSectionProps {
  diagnosticDisciplines: DiagnosticDiscipline[];
  practicalTechniques: PracticalTechnique[];
  instruments: LaboratoryInstrument[];
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({
  diagnosticDisciplines,
  practicalTechniques,
  instruments,
}) => {
  const [activeInstrumentIndex, setActiveInstrumentIndex] = useState(0);
  const activeInstrumentIndexRef = useRef(0);
  const sectionRef = useRef<HTMLElement>(null);
  const instrumentsPinWrapperRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  // Mobile skills tab: switches between Disciplines and Bench Techniques
  const [activeSkillsTab, setActiveSkillsTab] = useState<'disciplines' | 'techniques'>('disciplines');


  // Keep ref synchronized
  useEffect(() => {
    activeInstrumentIndexRef.current = activeInstrumentIndex;
  }, [activeInstrumentIndex]);

  // Smooth programmatic scroll to instrument card
  const handleSelectInstrument = (index: number) => {
    if (index < 0 || index >= instruments.length) return;
    setActiveInstrumentIndex(index);
    activeInstrumentIndexRef.current = index;

    const st = scrollTriggerRef.current;
    if (st) {
      const targetProgress = index / (instruments.length - 1);
      const targetScroll = st.start + (st.end - st.start) * targetProgress;
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
    }
  };

  // Keyboard navigation for instrument list
  const handleInstrumentKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      handleSelectInstrument((index + 1) % instruments.length);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      handleSelectInstrument((index - 1 + instruments.length) % instruments.length);
    }
  };

  // GSAP ScrollTrigger entrance & pinned stacking deck animation
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Header entrance
      gsap.from('.skills-anim-header', {
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

      // Part 1: Disciplines stagger
      gsap.from('.skills-anim-discipline', {
        scrollTrigger: {
          trigger: '.skills-disciplines-list',
          start: 'top 80%',
        },
        opacity: 0,
        y: 20,
        stagger: 0.08,
        duration: 0.7,
        ease: 'power3.out',
        clearProps: 'all',
      });

      // Part 2: Techniques stagger
      gsap.from('.skills-anim-technique', {
        scrollTrigger: {
          trigger: '.skills-techniques-list',
          start: 'top 80%',
        },
        opacity: 0,
        y: 20,
        stagger: 0.09,
        duration: 0.7,
        ease: 'power3.out',
        clearProps: 'all',
      });

      // Part 3: PINNED STACKING INSTRUMENT CARDS
      // Screen locks in place; scrolling unfolds each card zooming up from below and fitting on top
      // Pin starts when the instrument section top touches the viewport top (card fully visible, not cut off)
      if (instrumentsPinWrapperRef.current && cardRefs.current.length > 0) {
        const pinDistance = window.innerHeight * 2.8;
        const cards = cardRefs.current;

        // Base card sits in place
        if (cards[0]) {
          gsap.set(cards[0], { y: 0, scale: 1, opacity: 1, zIndex: 1 });
        }

        // Subsequent cards start translated down below, ready to be drawn from bottom
        for (let i = 1; i < cards.length; i++) {
          if (cards[i]) {
            gsap.set(cards[i], {
              y: 360,
              scale: 0.94,
              opacity: 0,
              zIndex: i + 1,
            });
          }
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            id: 'instruments-pin-trigger',
            trigger: instrumentsPinWrapperRef.current,
            // Pin starts exactly when the top of the instruments block reaches the top of the viewport
            // so the card is fully visible before anything locks
            start: 'top top',
            end: () => `+=${pinDistance}`,
            pin: true,
            pinSpacing: true,
            scrub: 0.7,
            anticipatePin: 1,
            onUpdate: (self) => {
              const activeIdx = Math.min(
                Math.round(self.progress * (cards.length - 1)),
                cards.length - 1
              );
              setActiveInstrumentIndex(activeIdx);
              activeInstrumentIndexRef.current = activeIdx;
            },
          },
        });

        scrollTriggerRef.current = tl.scrollTrigger || null;

        // Build sequential stacking timeline:
        // Each card is drawn from the bottom of the stack and smoothly placed on top,
        // with 100% full visibility, original brightness, zero blur, and zero dark tint.
        for (let i = 1; i < cards.length; i++) {
          const card = cards[i];
          if (!card) continue;

          // Card i smoothly rises from bottom of stack and fits directly on top
          tl.to(card, {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
          });

          // Cards underneath maintain 100% visibility & original brightness (no black/dark filter)
          for (let p = 0; p < i; p++) {
            const prevCard = cards[p];
            if (!prevCard) continue;
            const depth = i - p;
            tl.to(
              prevCard,
              {
                y: -depth * 5,
                scale: Math.max(0.92, 1 - depth * 0.02),
                duration: 1,
                ease: 'power2.out',
              },
              '<'
            );
          }
        }
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [instruments.length]);

  // Icon mapping for diagnostic disciplines
  const getDisciplineIcon = (id: string) => {
    switch (id) {
      case 'disc-hematology':
        return <Droplets size={18} aria-hidden="true" />;
      case 'disc-biochem':
        return <Activity size={18} aria-hidden="true" />;
      case 'disc-immunology':
        return <ShieldCheck size={18} aria-hidden="true" />;
      case 'disc-microbiology':
        return <Bug size={18} aria-hidden="true" />;
      case 'disc-histopathology':
        return <Layers size={18} aria-hidden="true" />;
      case 'disc-molecular':
      default:
        return <Dna size={18} aria-hidden="true" />;
    }
  };

  // Icon mapping for practical bench techniques
  const getTechniqueIcon = (id: string) => {
    switch (id) {
      case 'tech-phlebotomy':
        return <Syringe size={20} aria-hidden="true" />;
      case 'tech-sample-processing':
        return <FlaskConical size={20} aria-hidden="true" />;
      case 'tech-microscopy':
        return <Microscope size={20} aria-hidden="true" />;
      case 'tech-staining':
      default:
        return <Pipette size={20} aria-hidden="true" />;
    }
  };

  // Icon mapping for laboratory instruments
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

  // Procedural SVG technical schematics
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
            {/* Microscope Base */}
            <path d="M120 180 H280 C270 165 250 160 200 160 C150 160 130 165 120 180 Z" fill="var(--color-bg-secondary)" stroke="var(--color-border-soft)" strokeWidth="1.5" />
            {/* Pillar & Stage */}
            <rect x="194" y="105" width="12" height="55" rx="2" fill="var(--color-accent-subtle)" stroke="var(--color-accent-primary)" strokeWidth="1.2" />
            <rect x="140" y="112" width="120" height="6" rx="2" fill="var(--color-bg-surface)" stroke="var(--color-text-dark)" strokeWidth="1.5" />
            {/* Substage Condenser */}
            <circle cx="200" cy="130" r="10" fill="none" stroke="var(--color-accent-primary)" strokeWidth="1" strokeDasharray="3 2" />
            {/* Objectives Nosepiece */}
            <circle cx="200" cy="85" r="14" fill="var(--color-bg-surface)" stroke="var(--color-accent-primary)" strokeWidth="1.5" />
            <rect x="188" y="90" width="8" height="18" rx="1" fill="var(--color-accent-primary)" opacity="0.85" />
            <rect x="204" y="90" width="8" height="18" rx="1" fill="var(--color-text-muted)" opacity="0.75" />
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
            <polygon points="270,118 266,110 274,112" fill="var(--color-accent-primary)" />
            {/* Labels */}
            <text x="45" y="55" fill="var(--color-text-subtle)" fontSize="9" fontFamily="var(--font-sans)">SYMMETRIC ROTOR</text>
            <text x="285" y="125" fill="var(--color-accent-primary)" fontSize="9" fontWeight="600" fontFamily="var(--font-sans)">3000–4000 RPM</text>
            <text x="70" y="150" fill="var(--color-text-subtle)" fontSize="9" fontFamily="var(--font-sans)">SERUM SEPARATION</text>
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
            {/* Double-Walled Insulated Chamber */}
            <rect x="120" y="30" width="160" height="140" rx="8" fill="var(--color-bg-secondary)" stroke="var(--color-border-soft)" strokeWidth="1.5" />
            <rect x="135" y="45" width="130" height="110" rx="4" fill="var(--color-bg-surface)" stroke="var(--color-accent-subtle)" strokeWidth="1" />
            {/* Perforated Incubation Shelves */}
            <line x1="135" y1="80" x2="265" y2="80" stroke="var(--color-accent-primary)" strokeWidth="1.5" strokeDasharray="5 3" />
            <line x1="135" y1="120" x2="265" y2="120" stroke="var(--color-accent-primary)" strokeWidth="1.5" strokeDasharray="5 3" />
            {/* Thermal Circulation Convection Loops */}
            <path d="M150 140 C145 105 145 65 160 55" fill="none" stroke="var(--color-accent-primary)" strokeWidth="1" strokeDasharray="2 2" />
            <path d="M250 55 C265 65 265 105 250 140" fill="none" stroke="var(--color-accent-primary)" strokeWidth="1" strokeDasharray="2 2" />
            {/* Optimal Temperature Tag */}
            <rect x="175" y="20" width="50" height="16" rx="2" fill="var(--color-accent-primary)" />
            <text x="183" y="32" fill="#FAF6F3" fontSize="9" fontWeight="700" fontFamily="var(--font-sans)">37.0°C</text>
            {/* Labels */}
            <text x="40" y="75" fill="var(--color-text-subtle)" fontSize="9" fontFamily="var(--font-sans)">STATIC AIRFLOW</text>
            <text x="285" y="100" fill="var(--color-accent-primary)" fontSize="9" fontWeight="600" fontFamily="var(--font-sans)">MICROBIAL GROWTH</text>
            <text x="285" y="115" fill="var(--color-text-subtle)" fontSize="9" fontFamily="var(--font-sans)">AGAR PLATES (24–48H)</text>
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
            {/* Insulated Heavy Chamber */}
            <rect x="110" y="30" width="180" height="140" rx="6" fill="var(--color-bg-secondary)" stroke="var(--color-border-soft)" strokeWidth="1.5" />
            <rect x="125" y="45" width="150" height="110" rx="3" fill="var(--color-bg-surface)" stroke="var(--color-border-soft)" strokeWidth="1.2" />
            {/* Radiant Heating Elements */}
            <line x1="125" y1="135" x2="275" y2="135" stroke="var(--color-accent-primary)" strokeWidth="2.5" />
            <line x1="125" y1="140" x2="275" y2="140" stroke="var(--color-accent-primary)" strokeWidth="1" />
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
            <line x1="292" y1="100" x2="330" y2="100" stroke="var(--color-accent-primary)" strokeWidth="1.5" />
            <circle cx="340" cy="100" r="10" fill="var(--color-bg-surface)" stroke="var(--color-accent-primary)" strokeWidth="1.5" />
            {/* Labels */}
            <text x="65" y="60" fill="var(--color-text-subtle)" fontSize="8" fontFamily="var(--font-sans)">LAMP</text>
            <text x="140" y="60" fill="var(--color-text-subtle)" fontSize="8" fontFamily="var(--font-sans)">FILTER</text>
            <text x="212" y="55" fill="var(--color-accent-primary)" fontSize="8" fontWeight="600" fontFamily="var(--font-sans)">CUVETTE</text>
            <text x="272" y="60" fill="var(--color-text-subtle)" fontSize="8" fontFamily="var(--font-sans)">DETECTOR</text>
            <text x="140" y="160" fill="var(--color-accent-primary)" fontSize="9" fontWeight="600" fontFamily="var(--font-sans)">BEER-LAMBERT ABSORBANCE (OD)</text>
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
            {/* Water Bath Reservoir Basin */}
            <rect x="110" y="70" width="180" height="95" rx="6" fill="var(--color-bg-secondary)" stroke="var(--color-border-soft)" strokeWidth="1.5" />
            {/* Liquid Level Line */}
            <line x1="120" y1="90" x2="280" y2="90" stroke="var(--color-accent-subtle)" strokeWidth="1.5" strokeDasharray="6 3" />
            {/* Submerged Rack & Test Tubes */}
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
      id="skills"
      ref={sectionRef}
      className="skills-section section-spacing chapter-divider"
      aria-label="Skills and Laboratory Instrumentation"
    >
      {/* Anchor for backward compatibility with direct #instruments links */}
      <span id="instruments" className="sr-only" aria-hidden="true" />

      {/* Chapter watermark numeral */}
      <span className="section-watermark-num" aria-hidden="true">03</span>

      {/* Calibration / lab technical grid texture */}
      <div className="skills-lab-grid lab-technical-grid" aria-hidden="true" />

      {/* Ambient background glows */}
      <div className="skills-ambient-glow" aria-hidden="true" />
      <div className="skills-ambient-glow-right" aria-hidden="true" />


      <div className="container-custom">
        {/* ==================================================================
            SECTION HEADER
            ================================================================== */}
        <div className="skills-header">
          <div className="skills-eyebrow-container skills-anim-header">
            <span className="skills-eyebrow">03 &bull; Laboratory Competencies &amp; Equipment</span>
            <span className="skills-eyebrow-line" aria-hidden="true" />
          </div>

          <h2 className="skills-heading skills-anim-header">
            <span className="text-highlight-rose">Skills</span> &amp;{' '}
            <span className="text-script-accent">Instruments</span>
          </h2>

          <p className="skills-intro-text skills-anim-header">
            A progressive diagnostic continuum connecting core biomedical science to hands-on bench execution and analytical laboratory hardware.
          </p>

          {/* Narrative Progression Strip */}
          <div className="skills-progression-nav skills-anim-header" aria-hidden="true">
            <div className="skills-prog-step is-active">
              <span className="skills-prog-num">01</span>
              <span className="skills-prog-label">Diagnostic Disciplines</span>
            </div>
            <span className="skills-prog-arrow">&rarr;</span>
            <div className="skills-prog-step is-active">
              <span className="skills-prog-num">02</span>
              <span className="skills-prog-label">Bench Techniques</span>
            </div>
            <span className="skills-prog-arrow">&rarr;</span>
            <div className="skills-prog-step is-active">
              <span className="skills-prog-num">03</span>
              <span className="skills-prog-label">Laboratory Instrumentation</span>
            </div>
          </div>
        </div>

        {/* ==================================================================
            MOBILE SKILLS TAB SWITCHER (visible only on ≤768px)
            Switches between Diagnostic Disciplines and Bench Techniques
            ================================================================== */}
        <div className="skills-mobile-tabs" role="tablist" aria-label="Skills categories">
          <button
            type="button"
            role="tab"
            aria-selected={activeSkillsTab === 'disciplines'}
            className={`skills-mobile-tab-btn${activeSkillsTab === 'disciplines' ? ' is-active' : ''}`}
            onClick={() => setActiveSkillsTab('disciplines')}
          >
            <span>Diagnostic Disciplines</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeSkillsTab === 'techniques'}
            className={`skills-mobile-tab-btn${activeSkillsTab === 'techniques' ? ' is-active' : ''}`}
            onClick={() => setActiveSkillsTab('techniques')}
          >
            <span>Bench Techniques</span>
          </button>
        </div>

        {/* ==================================================================
            PART 1: CORE DIAGNOSTIC DISCIPLINES (What She Knows)
            On mobile: shown only when activeSkillsTab === 'disciplines'
            ================================================================== */}
        <div className={`skills-part-block skills-part-tab-panel${activeSkillsTab === 'disciplines' ? ' is-tab-active' : ''}`}
          data-tab="disciplines">
          <div className="skills-part-header">
            <div className="skills-part-badge">Part 01 &bull; Academic Foundation</div>
            <h3 className="skills-part-title">Core Clinical Diagnostic Disciplines</h3>
            <p className="skills-part-sub">
              Core biomedical domains honed through formal Medical Laboratory Technology curriculum.
            </p>
          </div>

          <div className="skills-disciplines-list">
            {diagnosticDisciplines.map((disc, idx) => {
              const topicList = disc.topics.split(',').map((t) => t.trim());

              return (
                <div key={disc.id} className="skills-discipline-row skills-anim-discipline">
                  <div className="skills-disc-left">
                    <span className="skills-disc-index">0{idx + 1}</span>
                    <div className="skills-disc-icon-box">
                      {getDisciplineIcon(disc.id)}
                    </div>
                    <div className="skills-disc-meta">
                      <div className="skills-disc-code-row">
                        <span className="skills-disc-code">{disc.code}</span>
                      </div>
                      <h4 className="skills-disc-name">{disc.name}</h4>
                    </div>
                  </div>

                  <div className="skills-disc-topics">
                    {topicList.map((topic, ti) => (
                      <span key={ti} className="skills-topic-chip">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ==================================================================
            PART 2: PRACTICAL BENCH TECHNIQUES (What She Can Practically Do)
            On mobile: shown only when activeSkillsTab === 'techniques'
            ================================================================== */}
        <div className={`skills-part-block skills-part-tab-panel${activeSkillsTab === 'techniques' ? ' is-tab-active' : ''}`}
          data-tab="techniques">
          <div className="skills-part-header">
            <div className="skills-part-badge">Part 02 &bull; Bench Execution</div>
            <h3 className="skills-part-title">Practical Bench Techniques</h3>
            <p className="skills-part-sub">
              Routine diagnostic procedures and sample handling protocols executed in laboratory practical training.
            </p>
          </div>

          <div className="skills-techniques-list">
            {practicalTechniques.map((tech) => (
              <div key={tech.id} className="skills-technique-strip skills-anim-technique">
                <div className="skills-tech-header">
                  <div className="skills-tech-icon-box">
                    {getTechniqueIcon(tech.id)}
                  </div>
                  <div className="skills-tech-title-wrap">
                    <h4 className="skills-tech-name">{tech.name}</h4>
                    <span className="skills-tech-level">
                      <CheckCircle2 size={12} aria-hidden="true" />
                      {tech.level}
                    </span>
                  </div>
                </div>

                <p className="skills-tech-desc">{tech.description}</p>
              </div>
            ))}
          </div>

          {/* Compact Quality & Biosafety Assurance Notice */}
          <div className="skills-sop-notice">
            <ShieldCheck size={16} aria-hidden="true" />
            <p>
              <strong>Standard Operating Procedures &amp; Biosafety:</strong> Universal precautions,
              proper specimen accessioning, and quality control (QC) are observed during all bench workflows.
            </p>
          </div>
        </div>

        {/* ==================================================================
            PART 3: LABORATORY INSTRUMENTATION (PINNED STACKING CARDS)
            ================================================================== */}
        <div
          ref={instrumentsPinWrapperRef}
          className="skills-part-block skills-part-instruments instruments-pinned-container"
        >
          <div className="skills-part-header">
            <div className="skills-part-badge">Part 03 &bull; Hardware Exposure</div>
            <h3 className="skills-part-title">Laboratory Instrumentation &amp; Equipment</h3>
            <p className="skills-part-sub">
              Hands-on operational familiarity with core analytical hardware utilized across clinical testing and sample preparation. Scroll to unfold each analytical station.
            </p>
          </div>

          {/* Master-Detail Interactive Chamber Display with Stacking Deck */}
          <div className="instruments-showcase-grid">
            {/* Stacking Cards Stage */}
            <div className="instruments-stack-stage">
              {instruments.map((inst, index) => {
                const isActive = index === activeInstrumentIndex;

                return (
                  <article
                    key={inst.id}
                    ref={(el) => {
                      cardRefs.current[index] = el;
                    }}
                    id={`instrument-card-${inst.id}`}
                    className={`instrument-chamber instrument-stack-card ${
                      isActive ? 'is-active-card' : ''
                    }`}
                    aria-live={isActive ? 'polite' : 'off'}
                  >
                    {/* Top Metadata */}
                    <div className="instrument-chamber-meta">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span className="instrument-index-tag">NO. {inst.number}</span>
                        <span className="instrument-category-tag">{inst.category}</span>
                      </div>

                      <div className="instrument-experience-pill">
                        <span className="instrument-pulse-dot" aria-hidden="true" />
                        <span>{inst.experienceType}</span>
                      </div>
                    </div>

                    {/* Technical Schematic Stage */}
                    <div className="instrument-schematic-stage">
                      {renderInstrumentSchematic(inst.id)}
                      <span className="instrument-schematic-watermark">
                        FIG {inst.number} &bull; CLINICAL BLUEPRINT
                      </span>
                    </div>

                    {/* Instrument Name & Description */}
                    <h4 className="instrument-chamber-name">{inst.name}</h4>
                    <p className="instrument-chamber-desc">{inst.description}</p>

                    {/* Key Functional Highlights */}
                    <div className="instrument-functions-card">
                      <div className="instrument-functions-title">
                        <Sliders size={13} aria-hidden="true" />
                        <span>Operational Functions &amp; Protocol</span>
                      </div>

                      <div className="instrument-functions-list">
                        {inst.keyFunctions.map((fn, fIdx) => (
                          <div key={fIdx} className="instrument-function-item">
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
                          {inst.number}
                        </span>{' '}
                        / 0{instruments.length}
                      </span>

                      <div className="instrument-nav-buttons">
                        <button
                          type="button"
                          className="instrument-nav-btn"
                          aria-label="Previous laboratory instrument"
                          disabled={index === 0}
                          onClick={() => handleSelectInstrument(index - 1)}
                        >
                          <ChevronLeft size={18} />
                        </button>
                        <button
                          type="button"
                          className="instrument-nav-btn"
                          aria-label="Next laboratory instrument"
                          disabled={index === instruments.length - 1}
                          onClick={() => handleSelectInstrument(index + 1)}
                        >
                          <ChevronRight size={18} />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

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
                  const isSelected = index === activeInstrumentIndex;

                  return (
                    <button
                      key={inst.id}
                      type="button"
                      role="tab"
                      id={`inst-tab-${inst.id}`}
                      aria-selected={isSelected}
                      aria-controls={`instrument-card-${inst.id}`}
                      className={`instrument-index-item ${isSelected ? 'is-selected' : ''}`}
                      onClick={() => handleSelectInstrument(index)}
                      onKeyDown={(e) => handleInstrumentKeyDown(e, index)}
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

      </div>
    </section>
  );
};
