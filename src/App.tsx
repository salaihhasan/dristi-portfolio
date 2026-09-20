import React, { useMemo } from 'react';
import { portfolioData } from './data/portfolioData';
import { useLenis } from './animations/useLenis';
import { useScrollSpy } from './hooks/useScrollSpy';
import { Navbar } from './components/navigation/Navbar';
import { ScrollIndicator } from './components/navigation/ScrollIndicator';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { EducationSection } from './components/sections/EducationSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { CertificationsSection } from './components/sections/CertificationsSection';
import { ContactSection } from './components/sections/ContactSection';

export const App: React.FC = () => {
  // Initialize Lenis smooth scroll synchronized with GSAP ScrollTrigger
  useLenis();

  // Extract section IDs from centralized navigation data
  const sectionIds = useMemo(
    () => portfolioData.navigation.map((item) => item.id),
    []
  );

  // Active section tracked via scroll spy
  const activeSectionId = useScrollSpy(sectionIds, 'hero');

  return (
    <div className="app-shell" style={{ paddingTop: '72px' }}>
      {/* Skip to Content Link for Keyboard Accessibility */}
      <a
        href="#hero"
        style={{
          position: 'absolute',
          top: '-100px',
          left: '1rem',
          zIndex: 9999,
          padding: '0.75rem 1.5rem',
          backgroundColor: 'var(--color-accent-primary)',
          color: 'var(--color-text-inverse)',
          borderRadius: 'var(--radius-sm)',
          fontWeight: 'var(--fw-semibold)',
          transition: 'top 0.2s ease',
        }}
        onFocus={(e) => {
          e.currentTarget.style.top = '1rem';
        }}
        onBlur={(e) => {
          e.currentTarget.style.top = '-100px';
        }}
      >
        Skip to main content
      </a>

      {/* Sticky Global Navigation */}
      <Navbar
        brandName={portfolioData.hero.brandName}
        brandSubtitle={portfolioData.hero.brandSubtitle}
        navigationItems={portfolioData.navigation}
        activeSectionId={activeSectionId}
        resumeUrl={portfolioData.contact.resumeDownloadUrl}
      />

      {/* Vertical Section Progress Indicator (Desktop) */}
      <ScrollIndicator
        navigationItems={portfolioData.navigation}
        activeSectionId={activeSectionId}
      />

      {/* Main Content Layout */}
      <main id="main-content">
        {/* Step 5.1: Hero Section Implementation */}
        <HeroSection
          hero={portfolioData.hero}
          profile={portfolioData.profile}
          contact={portfolioData.contact}
        />

        {/* Step 5.2: About Section Implementation */}
        <AboutSection profile={portfolioData.profile} />

        {/* Step 5.3: Education Section Implementation */}
        <EducationSection education={portfolioData.education} />

        {/* Unified Skills & Instruments Section */}
        <SkillsSection
          diagnosticDisciplines={portfolioData.diagnosticDisciplines}
          practicalTechniques={portfolioData.practicalTechniques}
          instruments={portfolioData.instruments}
        />

        {/* Step 5.6: Clinical Experience Section Implementation */}
        <ExperienceSection clinicalExperience={portfolioData.clinicalExperience} />

        {/* Unified Projects & Academic Work Section */}
        <ProjectsSection
          academicProjects={portfolioData.academicProjects}
          journalExplorations={portfolioData.journalExplorations}
        />

        {/* Step 5.9: Certifications & Achievements Section Implementation */}
        <CertificationsSection
          certifications={portfolioData.certifications}
          leadershipAndVolunteering={portfolioData.leadershipAndVolunteering}
        />

        {/* Step 5.10: Contact Section Implementation — Final Section */}
        <ContactSection
          contact={portfolioData.contact}
          profile={portfolioData.profile}
          hero={portfolioData.hero}
        />
      </main>
    </div>
  );
};

export default App;

