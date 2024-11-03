import React, { useEffect, useRef, useState } from 'react';
import { Fireworks } from 'fireworks-js';
import TypingEffect from 'react-typing-effect';
import celebrationAudio from '../assets/love.mp3';
import dancingrose from '../assets/myrose.gif';
import '../index.css';

const FireworkAnimation = () => {
  const fireworksRef = useRef(null);
  const [showName, setShowName] = useState(false);
  const audioRef = useRef(new Audio(celebrationAudio));
  const fireworksInstance = useRef(null);
  const [fireworksStarted, setFireworksStarted] = useState(false);

  useEffect(() => {
    document.body.style.overflow = fireworksStarted ? 'hidden' : '';

    if (fireworksRef.current && fireworksStarted) {
      fireworksInstance.current = new Fireworks(fireworksRef.current, {
        speed: 2,
        particles: 120,
        intensity: 30,
        flickering: 50,
        lineWidth: { min: 1, max: 3 },
        hue: { min: 0, max: 360 },
        brightness: { min: 50, max: 80 },
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
              fontSize: '4vw',
              fontWeight: 'bold',
              textAlign: 'center',
              borderRadius: '1rem',
              padding: '1rem 1.5rem',
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
              <TypingEffect
                text={[
                  "R ❤️ ja.L",
                  "ನಮ್ಮ ಬದುಕನ್ನು ಬೆಳಗಿಸುವ ಸುಂದರ ಜ್ಯೋತಿ ನೀನು😍....!!",
                  "Always by your side, this is Venkat ❤️---cherishing and protecting you forever 🥰😉"
                ]}
                speed={100}
                eraseDelay={3000}
                displayTextRenderer={(text, i) => (
                  <span>
                    {text.split("").map((char, index) => (
                      <span key={index}>{char}</span>
                    ))}
                    <img
                      src={dancingrose}
                      alt="Dancing Rose"
                      style={{
                        width: '10vw',
                        height: 'auto',
                        marginLeft: '0.5rem',
                        verticalAlign: 'middle'
                      }}
                    />
                  </span>
                )}
              />
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
