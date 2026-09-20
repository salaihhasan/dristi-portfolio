import React, { useEffect, useRef } from 'react';
import { X, FileDown } from 'lucide-react';
import { NavigationItem } from '../../types/portfolio';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navigationItems: NavigationItem[];
  activeSectionId: string;
  resumeUrl: string;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  navigationItems,
  activeSectionId,
  resumeUrl,
}) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Close on Escape key and trap focus when open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      closeButtonRef.current?.focus();
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleLinkClick = (href: string) => {
    onClose();
    const targetEl = document.querySelector(href);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className={`mobile-drawer-backdrop ${isOpen ? 'open' : ''}`}
      onClick={onClose}
      aria-hidden={!isOpen}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
    >
      <div
        className="mobile-drawer-panel"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside drawer
      >
        <div className="mobile-drawer-header">
          <div>
            <span className="brand-title">Dristi.</span>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            className="mobile-toggle-btn"
            onClick={onClose}
            aria-label="Close navigation menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="mobile-drawer-nav" aria-label="Mobile Menu Links">
          {navigationItems.map((item) => {
            const isActive = activeSectionId === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.href);
                }}
              >
                <span>{item.label}</span>
                <span className="text-xs text-subtle">{item.sectionNumber}</span>
              </a>
            );
          })}
        </nav>

        <div className="mobile-drawer-footer">
          <a
            href={resumeUrl}
            download
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center' }}
            onClick={onClose}
          >
            <FileDown size={16} />
            <span>Download Resume</span>
          </a>
        </div>
      </div>
    </div>
  );
};
