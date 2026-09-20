import React, { useEffect, useRef } from 'react';
import {
  Building2,
  HeartPulse,
  ShieldCheck,
  Globe,
  Camera,
} from 'lucide-react';
import { ClinicalExperienceItem } from '../../types/portfolio';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ExperienceSectionProps {
  clinicalExperience: ClinicalExperienceItem[];
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  clinicalExperience,
}) => {
  const sectionRef = useRef<HTMLElement>(null);

  // GSAP ScrollTrigger progressive timeline activation
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Header entrance — clip-path wipe + y
      gsap.from('.exp-anim-header', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 82%',
        },
        opacity: 0,
        y: 24,
        stagger: 0.1,
        duration: 0.75,
        ease: 'power3.out',
        clearProps: 'all',
      });

      // Progressive activation for each timeline milestone
      const items = gsap.utils.toArray<HTMLElement>('.exp-timeline-item');
      items.forEach((item) => {
        const node = item.querySelector('.exp-spine-node');
        const segment = item.querySelector('.exp-spine-segment');
        const card = item.querySelector('.exp-card');
        const bridge = item.querySelector('.exp-card-bridge');
        const chips = item.querySelectorAll('.exp-chip-item');
        const thumbImg = item.querySelector('.exp-thumb-img');
        const thumbFrame = item.querySelector('.exp-thumb-frame');

        // Progressive entrance: cards attach smoothly into the timeline
        gsap.set(card, { opacity: 0, y: 16, x: 24, scale: 0.98 });
        if (bridge) gsap.set(bridge, { scaleX: 0, transformOrigin: 'left center' });
        if (chips.length > 0) gsap.set(chips, { opacity: 0, x: -6 });
        if (segment) gsap.set(segment, { scaleY: 0, transformOrigin: 'top center' });
        if (thumbFrame) gsap.set(thumbFrame, { clipPath: 'inset(0 0 100% 0)', opacity: 1 });

        ScrollTrigger.create({
          trigger: item,
          start: 'top 80%',
          onEnter: () => {
            item.classList.add('is-active');

            const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

            // 1. Node pulse-activates
            if (node) {
              tl.to(node, { scale: 1.18, duration: 0.2 });
              tl.to(node, { scale: 1, duration: 0.16 }, '+=0');
            }

            // 2. Connecting bridge arm smoothly draws into card
            if (bridge) {
              tl.to(bridge, { scaleX: 1, duration: 0.22, ease: 'power2.out' }, '-=0.15');
            }

            // 3. Card smoothly attaches and locks into timeline
            tl.to(card, {
              opacity: 1,
              y: 0,
              x: 0,
              scale: 1,
              duration: 0.55,
              ease: 'power3.out',
              clearProps: 'opacity,transform',
            }, '-=0.18');

            // 4. Image reveals through mask
            if (thumbFrame) {
              tl.to(thumbFrame, {
                clipPath: 'inset(0 0 0% 0)',
                duration: 0.6,
                ease: 'power2.out',
              }, '-=0.35');
            }

            // 5. Subtle ken-burns on image
            if (thumbImg) {
              gsap.fromTo(thumbImg,
                { scale: 1.06 },
                { scale: 1, duration: 1.1, ease: 'power1.out', delay: 0.05 }
              );
            }

            // 6. Takeaway chips stagger in
            if (chips.length > 0) {
              tl.to(chips, { opacity: 1, x: 0, stagger: 0.05, duration: 0.25 }, '-=0.25');
            }

            // 7. Spine draws down to next node
            if (segment) {
              tl.to(segment, { scaleY: 1, duration: 0.65, ease: 'power1.inOut' }, '-=0.4');
            }

            // 7. Subtle parallax on image as user scrolls past
            if (thumbImg) {
              gsap.to(thumbImg, {
                scrollTrigger: {
                  trigger: item,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 1.5,
                },
                y: -15,
                ease: 'none',
              });
            }
          },
        });
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  // Icon mapping for exposure type
  const getExposureIcon = (type: string) => {
    switch (type) {
      case 'Clinical Lab Exposure':
        return <Building2 size={12} aria-hidden="true" />;
      case 'Community Healthcare Screening':
        return <HeartPulse size={12} aria-hidden="true" />;
      case 'Public Health Awareness':
        return <ShieldCheck size={12} aria-hidden="true" />;
      case 'Technology Conference':
      default:
        return <Globe size={12} aria-hidden="true" />;
    }
  };

  // Archival label for image overlay
  const getArchivalLabel = (id: string) => {
    switch (id) {
      case 'exp-hospital-visit':
        return 'PATHOLOGY LAB • FIELD VISIT';
      case 'exp-eye-camp':
        return 'COMMUNITY HEALTH • SCREENING';
      case 'exp-hand-hygiene':
        return 'PUBLIC HEALTH • WHO PROTOCOL';
      case 'exp-india-health':
      default:
        return 'HEALTHCARE EXPO • DIAGNOSTICS';
    }
  };

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="experience-section section-spacing chapter-divider"
      aria-label="Experience & Clinical Exposure"
    >
      {/* Chapter watermark numeral */}
      <span className="section-watermark-num" aria-hidden="true">04</span>

      <div className="experience-ambient-glow" aria-hidden="true" />
      <div className="experience-ambient-glow-right" aria-hidden="true" />


      <div className="container-custom">
        {/* ==================================================================
            SECTION HEADER
            ================================================================== */}
        <div className="experience-header">
          <div className="experience-eyebrow-container exp-anim-header">
            <span className="experience-eyebrow">04 &bull; Experience &amp; Clinical Exposure</span>
            <span className="experience-eyebrow-line" aria-hidden="true" />
          </div>

          <h2 className="experience-heading exp-anim-header">
            <span className="text-highlight-rose">Experience</span> &amp;{' '}
            <span className="text-script-accent">Clinical Exposure</span>
          </h2>

          <p className="experience-intro-text exp-anim-header">
            Hospital visits, practical training and healthcare outreach — connecting diagnostic theory to real-world medical laboratory practice and patient-centric healthcare.
          </p>
        </div>

        {/* ==================================================================
            OPTION A: CLEAN STRAIGHT VERTICAL CLINICAL TIMELINE
            ================================================================== */}
        <div className="exp-timeline-wrapper">
          <div className="exp-vertical-timeline" role="list">
            {/* Continuous spine connector line */}
            <div className="exp-timeline-spine" aria-hidden="true" />

            {clinicalExperience.map((exp, index) => {
              const isLast = index === clinicalExperience.length - 1;

              return (
                <article
                  key={exp.id}
                  className="exp-timeline-item"
                  role="listitem"
                >
                  {/* Timeline Spine Node Pip */}
                  <div className="exp-node-column" aria-hidden="true">
                    <div className="exp-spine-node">
                      <span className="exp-spine-node-num">{exp.number}</span>
                    </div>
                    {!isLast && <div className="exp-spine-segment" />}
                  </div>

                  {/* Compact Clinical Timeline Card with Progressive Connector Bridge */}
                  <div className="exp-card">
                    <div className="exp-card-bridge" aria-hidden="true" />
                    {/* Top Meta Strip */}
                    <div className="exp-card-topbar">
                      <div className="exp-card-pill-row">
                        <span className="exp-phase-tag">Phase {exp.number}</span>
                        <span className="exp-exposure-pill">
                          {getExposureIcon(exp.exposureType)}
                          <span>{exp.exposureType}</span>
                        </span>
                      </div>
                      <span className="exp-card-role">{exp.role}</span>
                    </div>

                    {/* Content & Media Flex Row */}
                    <div className="exp-card-inner">
                      {/* Text Column */}
                      <div className="exp-card-content">
                        <h3 className="exp-card-title">{exp.title}</h3>

                        <div className="exp-card-org">
                          <Building2 size={13} aria-hidden="true" />
                          <span>{exp.organizationOrEvent}</span>
                        </div>

                        <p className="exp-card-desc">{exp.description}</p>

                        </div>

                      {/* Compact Documentary Image Frame (if present) */}
                      {exp.image && (
                        <div className="exp-card-media">
                          <div className="exp-thumb-frame">
                            <img
                              src={exp.image}
                              alt={`${exp.title} — ${exp.role}`}
                              className="exp-thumb-img"
                              loading="lazy"
                            />
                            <div className="exp-thumb-badge" aria-hidden="true">
                              <Camera size={10} />
                              <span>{getArchivalLabel(exp.id)}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
