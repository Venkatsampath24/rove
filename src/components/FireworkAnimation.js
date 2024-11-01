import React, { useEffect, useRef, useState } from 'react';
import { Fireworks } from 'fireworks-js';
import celebrationAudio from '../assets/Chellakuttiye.mp3'; // Ensure your audio file is added here
import '../index.css';

const FireworkAnimation = () => {
  const fireworksRef = useRef(null);
  const [showName, setShowName] = useState(false);
  const audioRef = useRef(new Audio(celebrationAudio));
  const fireworksInstance = useRef(null);
  const [fireworksStarted, setFireworksStarted] = useState(false); // State to track if fireworks have started

  useEffect(() => {
    // Prevent scrolling
    document.body.style.overflow = fireworksStarted ? 'hidden' : ''; // Toggle scrollbars

    if (fireworksRef.current && fireworksStarted) {
      // Initialize fireworks
      fireworksInstance.current = new Fireworks(fireworksRef.current, {
        speed: 2,
        acceleration: 1.05,
        friction: 0.95,
        gravity: -0.1, // Adjust gravity to keep fireworks upward
        particles: 120,
        trace: 3,
        explosion: 5,
        intensity: 30,
        flickering: 50,
        lineWidth: {
          min: 1,
          max: 3,
        },
        hue: {
          min: 0,
          max: 360,
        },
        brightness: {
          min: 50,
          max: 80,
        },
        decay: {
          min: 0.015,
          max: 0.03,
        },
      });

      // Start fireworks and set interval for continuous firing
      fireworksInstance.current.start();
      const intervalId = setInterval(() => fireworksInstance.current.start(), 1500); // Fire every 1.5 seconds

      // Show "Roja" after a delay
      const timer = setTimeout(() => {
        setShowName(true);
      }, 4000); // 4 seconds delay after fireworks start

      return () => {
        fireworksInstance.current.stop();
        audioRef.current.pause(); // Pause audio on unmount
        clearTimeout(timer);
        clearInterval(intervalId); // Cleanup interval
        document.body.style.overflow = ''; // Restore scrollbars on unmount
      };
    }
  }, [fireworksStarted]); // Add fireworksStarted to the dependency array

  const handleStart = () => {
    setFireworksStarted(true); // Set the state to start fireworks on button click
    audioRef.current.play().catch((error) => {
      console.error("Error playing audio:", error);
    }); // Play audio on button click
  };

  return (
    <div
      ref={fireworksRef}
      className="fixed inset-0 flex items-center justify-center bg-black h-screen" // Set to black background
      style={{ height: '100vh' }} // Explicitly set height to 100vh
    >
      {!fireworksStarted ? (
        <button
        onClick={handleStart}
        style={{
          color: '#FFD700', // Text color
          fontSize: '3rem', // Font size
          fontWeight: 'bold', // Font weight
          textAlign: 'center', // Center text alignment
          borderRadius: '2rem', // Rounded corners
          padding: '1rem 2rem', // Padding
          border: 'none', // Remove border
          background: 'linear-gradient(135deg, #ffbb00 0%, #ff007f 100%)', // Gradient background
          boxShadow: '0 8px 20px rgba(255, 183, 0, 0.4)', // Shadow for depth
          transition: 'transform 0.2s, box-shadow 0.2s', // Transition effects
        }}
        className="absolute hover:scale-105 hover:shadow-lg rounded-lg"
      >
        Touch pannu ...!!
      </button>
      
      ) : (
        <>
          {showName && (
            <h1
            style={{ color: '#FFD700', fontSize: '4rem', fontWeight: 'bold', textAlign: 'center' }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-7xl font-bold z-10"
          >
            Ro<span className="heart">❤️</span>ja ....!!
          </h1>
          )}
          <canvas className="absolute inset-0" ref={fireworksRef} style={{ height: '100vh' }} /> {/* Single canvas for fireworks */}
        </>
      )}
    </div>
  );
};

export default FireworkAnimation;
