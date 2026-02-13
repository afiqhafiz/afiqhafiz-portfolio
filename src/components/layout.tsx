import type { ReactNode } from 'react';
import React, { useEffect, useState } from 'react';
import Header from './header';
import Footer from './footer';

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-dark-900 text-white font-sans overflow-x-hidden">
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="orb orb-1 -top-40 -left-40" />
        <div className="orb orb-2 top-1/3 -right-40" />
        <div className="orb orb-3 bottom-0 left-1/3" />
      </div>

      {/* Cursor Glow Effect */}
      <div
        className="cursor-glow hidden lg:block"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          opacity: isVisible ? 1 : 0,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
