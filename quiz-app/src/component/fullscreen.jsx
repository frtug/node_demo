import React from 'react';
import './Fullscreen.css';

const FullscreenButton = () => {
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <button 
      className="fullscreen-button"
      onClick={toggleFullscreen}
      title="Toggle Fullscreen"
      aria-label="Toggle Fullscreen"
    >
      {document.fullscreenElement ? 'Exit Fullscreen' : 'Fullscreen'}
    </button>
  );
};

export default FullscreenButton;