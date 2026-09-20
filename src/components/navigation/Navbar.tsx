import React, { useState } from 'react';
import { Menu, FileDown } from 'lucide-react';
import { NavigationItem } from '../../types/portfolio';
import { MobileMenu } from './MobileMenu';

interface NavbarProps {
  brandName: string;
  brandSubtitle: string;
  navigationItems: NavigationItem[];
  activeSectionId: string;
  resumeUrl: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  brandName,
  brandSubtitle,
  navigationItems,
  activeSectionId,
  resumeUrl,
}) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="navbar-header" role="banner">
        <div className="container-custom navbar-container">
          {/* Brand Mark */}
          <a href="#hero" className="brand-wrapper" aria-label={`${brandName} Home`}>
            <span className="brand-title">{brandName}</span>
            <span className="brand-tagline">
              <span>{brandSubtitle.split('·')[0]?.trim()}</span>
              <span>{brandSubtitle.split('·')[1]?.trim()}</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="nav-menu-desktop" aria-label="Main Navigation">
            {navigationItems.map((item) => {
              const isActive = activeSectionId === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className={`nav-link-item ${isActive ? 'active' : ''}`}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Action Area & Mobile Trigger */}
          <div className="nav-actions">
            <a
              href={resumeUrl}
              download
              className="nav-cta-btn"
              aria-label="Download Resume document"
            >
              <FileDown size={15} />
              <span>Resume</span>
            </a>

            <button
              type="button"
              className="mobile-toggle-btn"
              onClick={() => setIsMobileOpen(true)}
              aria-label="Open mobile navigation menu"
              aria-expanded={isMobileOpen}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <MobileMenu
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        navigationItems={navigationItems}
        activeSectionId={activeSectionId}
        resumeUrl={resumeUrl}
      />
    </>
  );
};
