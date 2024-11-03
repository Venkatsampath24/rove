import React, { useEffect, useRef, useState } from 'react';
import { Fireworks } from 'fireworks-js';
import celebrationAudio from '../assets/Venkat.mp3';
import '../index.css';

const FireworkAnimation = () => {
  const fireworksRef = useRef(null);
  const [showName, setShowName] = useState(false);
  const audioRef = useRef(new Audio(celebrationAudio));
  const fireworksInstance = useRef(null);
  const [fireworksStarted, setFireworksStarted] = useState(false);

  useEffect(() => {
    // Disable scrolling when fireworks start
    document.body.style.overflow = fireworksStarted ? 'hidden' : '';

    if (fireworksRef.current && fireworksStarted) {
      fireworksInstance.current = new Fireworks(fireworksRef.current, {
        speed: 2,
        acceleration: 1.05,
        friction: 0.95,
        gravity: -0.1,
        particles: 120,
        trace: 3,
        explosion: 5,
        intensity: 30,
        flickering: 50,
        lineWidth: { min: 1, max: 3 },
        hue: { min: 0, max: 360 },
        brightness: { min: 50, max: 80 },
        decay: { min: 0.015, max: 0.03 },
      });

      fireworksInstance.current.start();
      const intervalId = setInterval(() => fireworksInstance.current.start(), 1500);

      const timer = setTimeout(() => {
        setShowName(true);
      }, 4000);

      return () => {
        fireworksInstance.current.stop();
        clearTimeout(timer);
        clearInterval(intervalId);
        document.body.style.overflow = '';
      };
    }
  }, [fireworksStarted]);

  useEffect(() => {
    if (fireworksStarted) {
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [fireworksStarted]);

  const handleStart = () => {
    setFireworksStarted(true);
  };

  return (
    <div
      ref={fireworksRef}
      className="fixed inset-0 flex items-center justify-center bg-black h-screen w-screen"
    >
      {!fireworksStarted ? (
        <div className="flex items-center justify-center">
          <button
            onClick={handleStart}
            aria-label="Start Fireworks"
            className="hover:scale-105 hover:shadow-lg rounded-lg"
            style={{
              color: '#FFD700',
              fontSize: '4vw', // Responsive font size for mobile
              fontWeight: 'bold',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              borderRadius: '1rem',
              padding: '1rem 1.5rem',
              border: 'none',
              background: 'green',
              boxShadow: '0 8px 20px rgba(255, 183, 0, 0.4)',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
          >
            Touch pannu da ...!!
          </button>
        </div>
      ) : (
        <>
          {showName && (
            <h1
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold z-10"
              style={{ color: '#FF4545', fontSize: '8vw', fontWeight: 'bold', textAlign: 'center' }}
            >
              R <span className="heart">  ❤️  </span> ja <span className="float">🥰</span> ಸುಂದರವಾದ ಬೆಂಕಿ<span className="float">😍</span>....!! <h7 style={{color:'#00712D'}}>by venkat...<span className="float">🥰😉</span> </h7>
            </h1>
          )}

          <style>
            {`
              .heart {
                display: inline-block;
                animation: beat 0.8s infinite alternate;
              }

              .float {
                display: inline-block;
                animation: float 3s ease-in-out infinite;
              }

              @keyframes beat {
                from {
                  transform: scale(1);
                }
                to {
                  transform: scale(1.2);
                }
              }

              @keyframes float {
                0%, 100% {
                  transform: translateY(0);
                }
                50% {
                  transform: translateY(-10px);
                }
              }
            `}
          </style>

          <canvas className="absolute inset-0" ref={fireworksRef} style={{ height: '100vh', width: '100vw' }} />
        </>
      )}
    </div>
  );
};

export default FireworkAnimation;
