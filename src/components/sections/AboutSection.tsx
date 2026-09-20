import React, { useEffect, useRef } from 'react';
import {
  Target,
  Sparkles,
  Heart,
  TrendingUp,
  ArrowRight,
  Microscope as MicroscopeIcon,
  CheckCircle2,
} from 'lucide-react';
import { ProfileData } from '../../types/portfolio';
import { CanvasWrapper } from '../../three/CanvasWrapper';
import { ProceduralMicroscope } from '../../three/scenes/ProceduralMicroscope';
import { MicroscopeFallback } from '../../three/fallbacks/MicroscopeFallback';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AboutSectionProps {
  profile: ProfileData;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ profile }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);

  // GSAP ScrollTrigger Entrance Animations
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      // Content items reveal on scroll
      gsap.from('.about-anim-item', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        opacity: 0,
        y: 28,
        duration: 0.85,
        stagger: 0.1,
        ease: 'power3.out',
        clearProps: 'all',
      });

      // Visual arch entrance
      gsap.from('.about-arch-stage', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
        opacity: 0,
        scale: 0.94,
        duration: 1,
        ease: 'power3.out',
        clearProps: 'all',
      });

      // Floating badges and cards
      gsap.from('.about-float-badge', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
        },
        opacity: 0,
        y: 20,
        stagger: 0.15,
        duration: 0.8,
        ease: 'back.out(1.4)',
        clearProps: 'all',
      });

      // Bottom values bar reveal
      gsap.from(valuesRef.current, {
        scrollTrigger: {
          trigger: valuesRef.current,
          start: 'top 85%',
        },
        opacity: 0,
        y: 35,
        duration: 0.9,
        ease: 'power3.out',
        clearProps: 'all',
      });

      // Subtle scroll parallax depth movement on the microscope arch stage
      gsap.to('.about-arch-stage', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
        y: -30,
        ease: 'none',
      });
    }, sectionRef);

    // Mouse parallax for the 3D microscope arch container
    const handleMouseMove = (e: MouseEvent) => {
      if (!visualRef.current) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 12;
      const y = (e.clientY / innerHeight - 0.5) * 12;

      gsap.to(visualRef.current, {
        x,
        y,
        duration: 0.8,
        ease: 'power1.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      ctx.revert();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Icon mapping for core values
  const getValueIcon = (iconName: string) => {
    switch (iconName) {
      case 'Precision':
        return <Target size={22} aria-hidden="true" />;
      case 'Curiosity':
        return <Sparkles size={22} aria-hidden="true" />;
      case 'PeopleFirst':
        return <Heart size={22} aria-hidden="true" />;
      case 'LifelongGrowth':
      default:
        return <TrendingUp size={22} aria-hidden="true" />;
    }
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="about-section section-spacing chapter-divider"
      aria-label="About Drishti Sharma"
    >
      {/* Chapter watermark numeral */}
      <span className="section-watermark-num" aria-hidden="true">02</span>
      <div className="container-custom">
        {/* Main Editorial Split Grid */}
        <div className="about-grid">
          {/* Left Column: Narrative, Mission, and Key Focus Areas */}
          <div className="about-content">
            {/* Eyebrow */}
            <div className="about-eyebrow-container about-anim-item">
              <span className="about-eyebrow">About Drishti</span>
              <span className="about-eyebrow-line" aria-hidden="true" />
            </div>

            {/* Section Heading with Editorial Serif & Script Accent */}
            <h2 className="about-heading about-anim-item">
              <span className="text-highlight-rose">{profile.aboutHeadlinePrefix.split(' ')[0]}</span>{' '}
              {profile.aboutHeadlinePrefix.split(' ').slice(1).join(' ')}{' '}
              <span className="text-script-accent">{profile.aboutHeadlineAccent}</span>
            </h2>

            {/* Narrative Blocks */}
            <div className="about-narrative-group about-anim-item">
              <p className="about-lead-text">{profile.bioSummary}</p>
              <p className="about-body-text">{profile.whyMlt}</p>
              <p className="about-body-text">{profile.careerGoal}</p>
            </div>

            {/* Key Diagnostic & Laboratory Interests */}
            <div className="about-anim-item" style={{ marginTop: 'var(--space-sm)' }}>
              <span
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--fs-xs)',
                  fontWeight: 'var(--fw-semibold)',
                  letterSpacing: 'var(--tracking-wider)',
                  color: 'var(--color-text-subtle)',
                  textTransform: 'uppercase',
                  marginBottom: 'var(--space-xs)',
                }}
              >
                Key Laboratory Interests & Focus Areas
              </span>
              <div className="about-tags-container">
                {profile.mltInterests.map((interest, idx) => (
                  <span key={idx} className="about-interest-tag">
                    <CheckCircle2 size={13} color="var(--color-accent-primary)" aria-hidden="true" />
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Editorial Action Link */}
            <div className="about-cta-container about-anim-item">
              <a href="#education" className="btn-outline">
                <span>View Academic Journey</span>
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Right Column: 3D Procedural Microscope Arch Stage & Annotations */}
          <div className="about-visual-col">
            <div
              ref={visualRef}
              style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}
            >
              {/* Arch Stage with Interactive Three.js Microscope */}
              <div className="about-arch-stage" aria-label="Interactive 3D Laboratory Microscope">
                {/* Arch Top Watermark */}
                <div className="about-arch-watermark">
                  <span className="about-arch-watermark-text">
                    OPTICAL DIAGNOSTICS &bull; BENCH PRECISION
                  </span>
                </div>

                {/* 3D WebGL Canvas with Graceful Fallback */}
                <div className="about-canvas-container">
                  <CanvasWrapper fallback={<MicroscopeFallback />}>
                    <ProceduralMicroscope interactive={true} />
                  </CanvasWrapper>
                </div>
              </div>

              {/* Floating Polaroid Annotation */}
              <div className="about-polaroid-note about-float-badge">
                <MicroscopeIcon size={18} color="var(--color-accent-primary)" aria-hidden="true" />
                <span className="about-polaroid-text">Diagnosis Today A Healthier Tomorrow ♡</span>
              </div>

              {/* Stacked Laboratory Philosophy Annotations */}
              <div className="about-book-stack about-float-badge" aria-hidden="true">
                <span className="about-book-item">&bull; DIAGNOSE</span>
                <span className="about-book-item">&bull; UNDERSTAND</span>
                <span className="about-book-item">&bull; CREATE IMPACT</span>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values Pillar Bar (Approved Reference Bottom Component) */}
        <div ref={valuesRef} className="about-values-bar">
          <div className="about-values-surface">
            {profile.coreValues.map((val, idx) => (
              <div key={idx} className="about-value-card">
                <div className="about-value-icon-wrapper">
                  {getValueIcon(val.iconName)}
                </div>
                <div className="about-value-info">
                  <span className="about-value-title">{val.title}</span>
                  <span className="about-value-desc">{val.description}</span>
                </div>
              </div>
            ))}

            {/* Editorial Quote */}
            <div className="about-quote-container" aria-hidden="true">
              &ldquo;Science finds answers. People give them meaning.&rdquo;
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
