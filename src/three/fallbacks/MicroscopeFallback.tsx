import React from 'react';
import { Microscope } from 'lucide-react';

export const MicroscopeFallback: React.FC = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--color-bg-secondary)',
        padding: '2rem',
        textAlign: 'center',
      }}
      aria-label="Laboratory Microscope Visual"
    >
      <div
        style={{
          width: '120px',
          height: '120px',
          borderRadius: 'var(--radius-full)',
          backgroundColor: 'var(--color-bg-surface)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'var(--shadow-md)',
          border: '1px solid var(--color-border-soft)',
          marginBottom: '1rem',
        }}
      >
        <Microscope size={56} color="var(--color-accent-primary)" />
      </div>
      <span
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--fs-xs)',
          fontWeight: 'var(--fw-semibold)',
          textTransform: 'uppercase',
          letterSpacing: 'var(--tracking-wider)',
          color: 'var(--color-text-muted)',
        }}
      >
        Optical Diagnostics Stage
      </span>
    </div>
  );
};
