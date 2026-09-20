import React, { useEffect, useRef } from 'react';
import { Mail, Linkedin, Instagram, FileDown, MapPin, ArrowRight } from 'lucide-react';
import { ContactData, ProfileData, HeroData } from '../../types/portfolio';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ContactSectionProps {
  contact: ContactData;
  profile: ProfileData;
  hero: HeroData;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ contact, profile, hero }) => {
  const sectionRef = useRef<HTMLElement>(null);

  /* ── GSAP entrance animations ── */
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from('.ct-anim-header', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        opacity: 0,
        y: 28,
        stagger: 0.1,
        duration: 0.85,
        ease: 'power3.out',
        clearProps: 'all',
      });

      gsap.from('.ct-anim-links', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        opacity: 0,
        y: 20,
        stagger: 0.08,
        duration: 0.65,
        ease: 'power2.out',
        clearProps: 'all',
      });

      gsap.from('.ct-anim-deco', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        opacity: 0,
        scale: 0.92,
        duration: 1.1,
        ease: 'power3.out',
        clearProps: 'all',
      });

      /* Slow drift on the decorative element */
      gsap.to('.ct-deco-inner', {
        y: -10,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="ct-section section-spacing chapter-divider"
      aria-label="Contact and Connect"
    >
      {/* Chapter watermark numeral */}
      <span className="section-watermark-num" aria-hidden="true">07</span>

      {/* Ambient glows */}
      <div className="ct-glow-left" aria-hidden="true" />
      <div className="ct-glow-right" aria-hidden="true" />

      {/* Subtle horizontal rule separator */}
      <div className="ct-separator" aria-hidden="true" />


      <div className="container-custom">
        <div className="ct-inner-grid">

          {/* ── Left: Editorial Closing ── */}
          <div className="ct-closing-col">

            {/* Eyebrow */}
            <div className="ct-eyebrow-row ct-anim-header">
              <span className="ct-eyebrow">07 · Contact &amp; Connect</span>
              <span className="ct-eyebrow-line" aria-hidden="true" />
            </div>

            {/* Headline */}
            <h2 className="ct-headline ct-anim-header">
              {contact.closingHeadline.replace('.', '')}
              <span className="text-script-accent">.</span>
            </h2>

            {/* Subtext */}
            <p className="ct-subtext ct-anim-header">
              {contact.subtext}
            </p>

            {/* Location — no address, city only */}
            <div className="ct-location ct-anim-header">
              <MapPin size={14} aria-hidden="true" />
              <span>{contact.location}</span>
            </div>

            {/* ── Contact Links ── */}
            <div className="ct-links-group">

              {/* Email */}
              <a
                href={`mailto:${contact.email}`}
                className="ct-link-card ct-anim-links"
                aria-label={`Send email to ${contact.email}`}
              >
                <div className="ct-link-icon-wrap ct-link-email">
                  <Mail size={18} aria-hidden="true" />
                </div>
                <div className="ct-link-text">
                  <span className="ct-link-label">Email</span>
                  <span className="ct-link-value">{contact.email}</span>
                </div>
                <ArrowRight size={16} className="ct-link-arrow" aria-hidden="true" />
              </a>

              {/* LinkedIn */}
              <a
                href={contact.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="ct-link-card ct-anim-links"
                aria-label="Visit LinkedIn profile (opens in new tab)"
              >
                <div className="ct-link-icon-wrap ct-link-linkedin">
                  <Linkedin size={18} aria-hidden="true" />
                </div>
                <div className="ct-link-text">
                  <span className="ct-link-label">LinkedIn</span>
                  <span className="ct-link-value">Drishti Sharma</span>
                </div>
                <ArrowRight size={16} className="ct-link-arrow" aria-hidden="true" />
              </a>

              {/* Instagram */}
              <a
                href={contact.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="ct-link-card ct-anim-links"
                aria-label="Visit Instagram profile (opens in new tab)"
              >
                <div className="ct-link-icon-wrap ct-link-instagram">
                  <Instagram size={18} aria-hidden="true" />
                </div>
                <div className="ct-link-text">
                  <span className="ct-link-label">Instagram</span>
                  <span className="ct-link-value">@sharma_drishtiii</span>
                </div>
                <ArrowRight size={16} className="ct-link-arrow" aria-hidden="true" />
              </a>
            </div>

            {/* Resume Download CTA */}
            <div className="ct-resume-row ct-anim-links">
              <a
                href={contact.resumeDownloadUrl}
                download
                className="btn-primary ct-resume-btn"
                aria-label="Download Drishti Sharma's resume"
              >
                <FileDown size={16} aria-hidden="true" />
                Download CV
              </a>
              <p className="ct-resume-note">
                Medical Laboratory Technology · B.Voc
              </p>
            </div>
          </div>

          {/* ── Right: Decorative Editorial Visual ── */}
          <div className="ct-deco-col ct-anim-deco" aria-hidden="true">
            <div className="ct-deco-inner">

              {/* Large editorial letterform / monogram */}
              <div className="ct-monogram-frame">
                <span className="ct-monogram-letter">D.</span>

                {/* Technical ruled lines */}
                <div className="ct-rule-lines">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="ct-rule-line"
                      style={{ opacity: 0.12 + i * 0.06 }}
                    />
                  ))}
                </div>

                {/* Corner marks */}
                <span className="ct-deco-corner ct-deco-tl" />
                <span className="ct-deco-corner ct-deco-tr" />
                <span className="ct-deco-corner ct-deco-bl" />
                <span className="ct-deco-corner ct-deco-br" />

                {/* Accent orbit ring */}
                <div className="ct-orbit-ring" />

                {/* Small floating data labels */}
                <div className="ct-data-chip ct-chip-1">B.Voc MLT</div>
                <div className="ct-data-chip ct-chip-2">New Delhi</div>
                <div className="ct-data-chip ct-chip-3">Healthcare</div>
              </div>

              {/* Subtitle beneath monogram */}
              <p className="ct-deco-caption">
                {profile.professionalTitle}
              </p>
              <p className="ct-deco-sub">
                {hero.brandName} &nbsp;·&nbsp; {profile.institution}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Site Footer ── */}
      <footer className="ct-footer" role="contentinfo">
        <div className="container-custom">
          <div className="ct-footer-inner">
            {/* Brand */}
            <div className="ct-footer-brand">
              <span className="ct-footer-brandname">{hero.brandName}</span>
              <span className="ct-footer-brandtag">{hero.brandSubtitle}</span>
            </div>

            {/* Centre copy */}
            <p className="ct-footer-copy">
              &copy; {new Date().getFullYear()} {profile.fullName} &bull; Medical Laboratory Technology Portfolio
            </p>

            {/* Right: minimal icon links */}
            <div className="ct-footer-socials">
              <a
                href={`mailto:${contact.email}`}
                aria-label="Email"
                className="ct-footer-icon"
              >
                <Mail size={15} />
              </a>
              <a
                href={contact.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="ct-footer-icon"
              >
                <Linkedin size={15} />
              </a>
              <a
                href={contact.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="ct-footer-icon"
              >
                <Instagram size={15} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
};
