import React, { useState, useEffect, useRef } from 'react';

function PersonHead() {
  const [progress, setProgress] = useState(0);
  const leftEye = useRef(null);
  const rightEye = useRef(null);

  const handleMouseMove = (event) => {
    const mouseX = event.clientX;
    const windowWidth = document.body.clientWidth;

    if (leftEye && rightEye) {
      const leftRectX = leftEye.current.getBoundingClientRect().x;
      const rightRectX = rightEye.current.getBoundingClientRect().x;

      if (mouseX < leftRectX) {
        const ratio = mouseX / leftRectX;
        setProgress(Math.round(ratio * 49));
      } else if (mouseX >= leftRectX && mouseX <= rightRectX) {
        setProgress(50);
      } else {
        const ratio = (mouseX - rightRectX) / (windowWidth - rightRectX);
        setProgress(Math.round(51 + ratio * 49));
      }
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div id="person">
      <div className="charBox" style={{ '--eye_progress': progress }}>
        <div className="charBg" />

        <div className="leftEyeBox" ref={leftEye}>
          <div>
            <div className="leftEye" />
          </div>
        </div>

        <div className="rightEyeBox" ref={rightEye}>
          <div>
            <div className="rightEye" />
          </div>
        </div>

        <div className="char" />
      </div>
    </div>
  );
}

export default PersonHead;
