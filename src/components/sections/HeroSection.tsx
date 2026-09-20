import React, { useEffect, useRef } from 'react';
import {
  BookOpen,
  FlaskConical,
  Award,
  HeartPulse,
  Linkedin,
  Instagram,
  Mail,
  ArrowRight,
  FileDown,
  Microscope,
  ChevronDown,
} from 'lucide-react';
import { HeroData, ProfileData, ContactData } from '../../types/portfolio';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  hero: HeroData;
  profile: ProfileData;
  contact: ContactData;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  hero,
  profile,
  contact,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statBarRef = useRef<HTMLDivElement>(null);

  // GSAP Entrance & Parallax Interaction
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      // Controlled sequence: 1. Eyebrow -> 2. Heading -> 3. Bio -> 4. CTAs -> 5. Socials
      gsap.from('.hero-eyebrow-container', {
        opacity: 0,
        y: 16,
        duration: 0.65,
        delay: 0.1,
        ease: 'power3.out',
        clearProps: 'all',
      });

      gsap.from('.hero-heading', {
        opacity: 0,
        y: 22,
        duration: 0.75,
        delay: 0.26,
        ease: 'power3.out',
        clearProps: 'all',
      });

      gsap.from('.hero-bio', {
        opacity: 0,
        y: 18,
        duration: 0.7,
        delay: 0.44,
        ease: 'power3.out',
        clearProps: 'all',
      });

      gsap.from('.hero-cta-group', {
        opacity: 0,
        y: 18,
        duration: 0.7,
        delay: 0.62,
        ease: 'power3.out',
        clearProps: 'all',
      });

      gsap.from('.hero-socials-row', {
        opacity: 0,
        y: 14,
        duration: 0.6,
        delay: 0.78,
        ease: 'power3.out',
        clearProps: 'all',
      });

      // Arch Frame Entrance
      gsap.from('.hero-arch-container', {
        opacity: 0,
        scale: 0.96,
        duration: 1.0,
        ease: 'power3.out',
        delay: 0.25,
        clearProps: 'all',
      });

      // Floating Annotations Entrance
      gsap.from('.hero-float-elem', {
        opacity: 0,
        scale: 0.85,
        duration: 0.8,
        stagger: 0.14,
        ease: 'back.out(1.4)',
        delay: 0.52,
        clearProps: 'all',
      });

      // Floating Stat Bar Reveal
      gsap.from(statBarRef.current, {
        opacity: 0,
        y: 24,
        duration: 0.85,
        delay: 0.88,
        ease: 'power3.out',
        clearProps: 'all',
      });

      // Gentle continuous idle floating animation on badges
      gsap.to('.hero-stamp-badge', {
        y: -6,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to('.hero-polaroid-card', {
        y: 6,
        duration: 3.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.4,
      });

      // Scroll-based layered parallax: portrait slides up, content fades slightly
      gsap.to('.hero-arch-container', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
        y: -60,
        ease: 'none',
      });

      gsap.to('.hero-content', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
        y: -30,
        opacity: 0.6,
        ease: 'none',
      });

      gsap.to('.hero-stat-bar', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
        },
        y: -10,
        ease: 'none',
      });
    }, sectionRef);

    // Subtle pointer parallax response on the visual frame
    const handleMouseMove = (e: MouseEvent) => {
      if (!visualRef.current) return;
      const { innerWidth, innerHeight } = window;
      const nx = e.clientX / innerWidth - 0.5;
      const ny = e.clientY / innerHeight - 0.5;

      gsap.to('.hero-arch-container', {
        x: nx * 12,
        y: ny * 12,
        duration: 0.75,
        ease: 'power1.out',
      });

      gsap.to('.hero-stamp-badge', {
        x: nx * 22,
        y: ny * 22 - 3,
        rotation: nx * 4,
        duration: 0.65,
        ease: 'power1.out',
      });

      gsap.to('.hero-polaroid-card', {
        x: nx * -16,
        y: ny * -16 + 3,
        rotation: ny * -3,
        duration: 0.7,
        ease: 'power1.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      ctx.revert();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Icon mapping for stats
  const getStatIcon = (id: string) => {
    switch (id) {
      case 'stat-degree':
        return <BookOpen size={20} />;
      case 'stat-techniques':
        return <FlaskConical size={20} />;
      case 'stat-certs':
        return <Award size={20} />;
      case 'stat-mission':
      default:
        return <HeartPulse size={20} />;
    }
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="hero-section"
      aria-label="Introduction and Hero"
    >
      {/* Chapter watermark numeral */}
      <span className="section-watermark-num" aria-hidden="true">01</span>

      {/* Subtle Ambient Background Watermarks */}
      <div className="hero-ambient-glow" aria-hidden="true" />
      <div className="hero-ambient-glow-left" aria-hidden="true" />

      <div className="container-custom">
        {/* Main Hero Split Grid */}
        <div className="hero-grid">
          {/* Left Column: Semantic Copy & CTAs */}
          <div ref={contentRef} className="hero-content">
            <div className="hero-eyebrow-container hero-anim-item">
              <span className="hero-eyebrow">{hero.eyebrow}</span>
              <span className="hero-eyebrow-line" aria-hidden="true" />
            </div>

            <h1 className="hero-heading hero-anim-item">
              {hero.headingPrefix}{' '}
              <span className="text-script-accent">{hero.headingAccent}</span>
            </h1>

            <p className="hero-bio hero-anim-item">
              {hero.shortBio}
            </p>

            {/* Action Buttons */}
            <div className="hero-cta-group hero-anim-item">
              <a href={hero.primaryCta.href} className="btn-primary">
                <span>{hero.primaryCta.label}</span>
                <ArrowRight size={16} aria-hidden="true" />
              </a>

              <a
                href={hero.secondaryCta.href}
                download
                className="btn-outline"
                aria-label="Download Resume document"
              >
                <FileDown size={16} aria-hidden="true" />
                <span>{hero.secondaryCta.label}</span>
              </a>
            </div>

            {/* Social Channels (Strictly verified channels: LinkedIn, Instagram, Email) */}
            <div className="hero-socials-row hero-anim-item">
              <span className="hero-socials-label">Connect</span>

              <a
                href={contact.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social-icon-btn"
                aria-label="Visit Drishti's LinkedIn profile (opens in new tab)"
              >
                <Linkedin size={16} />
              </a>

              <a
                href={contact.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social-icon-btn"
                aria-label="Visit Drishti's Instagram profile (opens in new tab)"
              >
                <Instagram size={16} />
              </a>

              <a
                href={`mailto:${contact.socials.email}`}
                className="hero-social-icon-btn"
                aria-label={`Send email to ${contact.socials.email}`}
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Right Column: Visual Stage (Arch Frame, Portrait & Annotations) */}
          <div className="hero-visual-col">
            <div ref={visualRef} style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
              {/* Floating Scientific Seal Badge */}
              <div
                className="hero-stamp-badge hero-float-elem"
                aria-label="Accurate Results - Brighter Tomorrows Scientific Seal"
              >
                <Microscope size={18} color="var(--color-accent-primary)" />
                <span className="hero-stamp-text" style={{ marginTop: '2px' }}>
                  ACCURATE<br />RESULTS
                </span>
              </div>

              {/* Architectural Arch Frame with Verified Hero Portrait */}
              <div className="hero-arch-container">
                <img
                  src={hero.heroImage}
                  alt={`${profile.fullName}, ${profile.professionalTitle}`}
                  className="hero-portrait-img"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>

              {/* Floating Polaroid Note with Handwritten Caption */}
              <div className="hero-polaroid-card hero-float-elem">
                <span className="hero-polaroid-text">
                  {hero.polaroidNotes[0]?.text || 'Small Steps Big Impact ♡'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Stat Bar (Approved Reference Bottom Component) */}
        <div ref={statBarRef} className="hero-stat-bar">
          <div className="hero-stat-surface">
            {hero.stats.map((stat) => (
              <div key={stat.id} className="hero-stat-item">
                <div className="hero-stat-icon-wrapper" aria-hidden="true">
                  {getStatIcon(stat.id)}
                </div>
                <div className="hero-stat-info">
                  <span className="hero-stat-value">{stat.value}</span>
                  <span className="hero-stat-label">{stat.label}</span>
                </div>
              </div>
            ))}

            {/* Editorial Quote matching reference mockup */}
            <div className="hero-quote-item">
              <p>{hero.quote}</p>
            </div>
          </div>
        </div>

        {/* Scroll To Explore Indicator */}
        <a
          href="#about"
          className="hero-scroll-indicator"
          aria-label="Scroll to About section"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <div className="hero-mouse-icon" aria-hidden="true">
            <div className="hero-mouse-wheel" />
          </div>
          <span>Scroll to explore</span>
          <ChevronDown size={14} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
};
