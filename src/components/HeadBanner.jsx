import React, { useEffect } from 'react';
import PersonHead from './PersonHead';
import BannerLogo from './BannerLogo';

function HeadBanner() {
  useEffect(() => {
    const baseWidth = 1440;
    const updateRatio = () => {
      const screenWidth = document.documentElement.clientWidth;
      const ratio = screenWidth < baseWidth ? screenWidth / baseWidth : 1;

      document.documentElement.style.setProperty('--ratio', ratio);
    };

    updateRatio();
    window.addEventListener('resize', updateRatio);

    return () => {
      window.removeEventListener('resize', updateRatio);
    };
  }, []);

  return (
    <div id="header">
      <div className="headBox">
        {/* 人頭組件  不考慮位置 */}
        <PersonHead />
      </div>
      <div className="logoBox">
        <BannerLogo />
      </div>
    </div>
  );
}

export default HeadBanner;
