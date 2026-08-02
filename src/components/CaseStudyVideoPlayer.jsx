import React, { useState, useRef } from 'react';

export const CaseStudyVideoPlayer = ({ videoUrl, poster }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="relative w-full aspect-video bg-slate-950 flex items-center justify-center overflow-hidden">
      <video
        ref={videoRef}
        src={videoUrl}
        poster={poster}
        controls={isPlaying}
        onClick={() => {
          if (isPlaying && videoRef.current) {
            videoRef.current.pause();
            setIsPlaying(false);
          }
        }}
        className="w-full h-full object-contain outline-none"
      />
      {!isPlaying && (
        <button
          onClick={handlePlayClick}
          className="absolute inset-0 w-full h-full flex items-center justify-center bg-gradient-radial from-black/50 via-black/30 to-transparent hover:from-black/60 hover:via-black/40 transition-all duration-300 group border-none outline-none z-30 cursor-pointer"
        >
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-2xl transform transition-transform group-hover:scale-110 duration-200 animate-play-pulse">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#0F172A" className="ml-1">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
        </button>
      )}
    </div>
  );
};

export default CaseStudyVideoPlayer;
