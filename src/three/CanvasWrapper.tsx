import React, { Component, ReactNode, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class WebGLErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

interface CanvasWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
  cameraPosition?: [number, number, number];
  fov?: number;
}

export const CanvasWrapper: React.FC<CanvasWrapperProps> = ({
  children,
  fallback = null,
  className = '',
  cameraPosition = [0, 0.2, 3.8],
  fov = 42,
}) => {
  return (
    <div className={className} style={{ width: '100%', height: '100%', position: 'relative' }}>
      <WebGLErrorBoundary fallback={fallback || <div style={{ padding: '2rem', textAlign: 'center' }}>Laboratory Visual</div>}>
        <Suspense fallback={fallback || <div style={{ width: '100%', height: '100%', backgroundColor: 'var(--color-bg-secondary)' }} />}>
          <Canvas
            camera={{ position: cameraPosition, fov }}
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            dpr={[1, 1.75]} // Cap device pixel ratio for performance
            style={{ pointerEvents: 'auto' }}
          >
            {/* Ambient Soft Laboratory Lighting */}
            <ambientLight intensity={0.75} color="#FAF6F3" />
            
            {/* Main Key Light (Warm blush clinical light) */}
            <directionalLight
              position={[4, 6, 4]}
              intensity={1.1}
              color="#FFF5F2"
              castShadow
            />

            {/* Subtle Cool Rim Light */}
            <directionalLight
              position={[-4, -2, -3]}
              intensity={0.45}
              color="#E5CECA"
            />

            {/* Specimen Stage Point Light */}
            <pointLight position={[0, 0.5, 1.2]} intensity={0.6} color="#B65F6D" />

            {children}
          </Canvas>
        </Suspense>
      </WebGLErrorBoundary>
    </div>
  );
};
