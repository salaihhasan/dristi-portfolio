import React from 'react';

interface SectionPlaceholderProps {
  id: string;
  sectionNumber: string;
  title: string;
  isHero?: boolean;
}

export const SectionPlaceholder: React.FC<SectionPlaceholderProps> = ({
  id,
  sectionNumber,
  title,
  isHero = false,
}) => {
  return (
    <section
      id={id}
      className="section-spacing"
      style={{
        minHeight: isHero ? 'calc(100vh - 72px)' : '75vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottom: '1px dashed var(--color-border-soft)',
        backgroundColor: id === 'about' || id === 'experience' || id === 'contact' 
          ? 'rgba(243, 228, 225, 0.25)' 
          : 'var(--color-bg-primary)',
      }}
      aria-label={`${title} Section Placeholder`}
    >
      <div className="container-custom" style={{ textAlign: 'center' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'var(--space-xs)',
            padding: '0.35rem 1rem',
            backgroundColor: 'var(--color-accent-subtle)',
            borderRadius: 'var(--radius-full)',
            color: 'var(--color-accent-primary)',
            fontSize: 'var(--fs-xs)',
            fontWeight: 'var(--fw-semibold)',
            marginBottom: 'var(--space-md)',
            letterSpacing: 'var(--tracking-wide)',
          }}
        >
          <span>SECTION {sectionNumber}</span>
          <span>&bull;</span>
          <span>SCAFFOLDING STRUCTURAL PLACEHOLDER</span>
        </div>

        <h2 className="text-section-title" style={{ marginBottom: 'var(--space-sm)' }}>
          {title}
        </h2>

        <p
          className="text-body"
          style={{
            maxWidth: '540px',
            margin: '0 auto',
            color: 'var(--color-text-subtle)',
            fontSize: 'var(--fs-sm)',
          }}
        >
          Target section container for <code>#{id}</code>. Shell layout, navigation anchors, smooth scrolling, and scroll-spy observer active. Section content and UI components pending Step 5.
        </p>
      </div>
    </section>
  );
};
