import React from 'react';
import { NavigationItem } from '../../types/portfolio';

interface ScrollIndicatorProps {
  navigationItems: NavigationItem[];
  activeSectionId: string;
}

export const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({
  navigationItems,
  activeSectionId,
}) => {
  const activeIndex = navigationItems.findIndex((item) => item.id === activeSectionId);
  const activeItem = navigationItems[activeIndex] || navigationItems[0];
  const totalCount = String(navigationItems.length).padStart(2, '0');
  const currentNumber = activeItem.sectionNumber;

  const handleNodeClick = (href: string) => {
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside
      className="side-progress-tracker"
      aria-label="Page scroll position tracker"
    >
      <div className="side-counter-badge" aria-live="polite">
        <span>{currentNumber}</span>
        <span style={{ fontSize: '10px', color: 'var(--color-text-subtle)', margin: '0 2px' }}>/</span>
        <span style={{ fontSize: '11px', color: 'var(--color-text-subtle)' }}>{totalCount}</span>
      </div>

      <div className="side-track-line" role="navigation" aria-label="Section shortcuts">
        {navigationItems.map((item) => {
          const isActive = activeSectionId === item.id;
          return (
            <button
              key={item.id}
              type="button"
              className={`side-track-node ${isActive ? 'active' : ''}`}
              onClick={() => handleNodeClick(item.href)}
              aria-label={`Scroll to ${item.label} (Section ${item.sectionNumber})`}
              title={`${item.sectionNumber} — ${item.label}`}
            />
          );
        })}
      </div>
    </aside>
  );
};
