'use client';

import React from 'react';

const WaveGraphic = () => {
  return (
    <div className="absolute -bottom-18 left-0 w-full z-[-1] pointer-events-none">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1536 600"
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-auto"
      >
        {/* Deep wave layer */}
        <path
          d="M0,420 C200,340 400,540 600,460 C800,380 1000,500 1200,440 C1400,380 1600,500 1800,440 L1800,600 L0,600 Z"
          fill="#003366"
        />

        {/* Mid wave layer */}
        <path
          d="M0,440 C180,360 380,560 580,480 C780,400 980,520 1180,460 C1380,400 1580,520 1780,460 L1780,600 L0,600 Z"
          fill="#005599"
          opacity="0.8"
        />

        {/* Light top wave layer */}
        <path
          d="M0,470 C160,390 360,590 560,510 C760,430 960,550 1160,490 C1360,430 1560,550 1760,490 L1760,600 L0,600 Z"
          fill="#ffffff"
          opacity="0.5"
        />
      </svg>
    </div>
  );
};

export default WaveGraphic;
