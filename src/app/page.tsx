'use client';

import { useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import Confetti from 'react-confetti';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Sparkles, Music, VolumeX, ChevronLeft, ChevronRight, X } from 'lucide-react';

export default function Home() {
  const [showConfetti, setShowConfetti] = useState(true);
  const [muted, setMuted] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [activeMemory, setActiveMemory] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const quotes = [
    "✨ In the shadows of time, today glows brighter than ever.",
    "🌌 The stars align once a year—for *you*.",
    "🌙 Wishes whispered in the dark light up destinies.",
    "🔮 Every birthday is a secret spell of hope and joy.",
    "🕯️ Light your candle, and let the magic begin."
  ];

  const memories = [
    { id: 1, title: "Starlit Beginnings", description: "That magical evening when the universe first celebrated you" },
    { id: 2, title: "Enchanted Moments", description: "A fleeting instant that became timeless" },
    { id: 3, title: "Celestial Celebration", description: "When the cosmos paused to honor your journey" }
  ];

  // Parallax effects
  const backgroundX = useTransform(cursorX, [0, window.innerWidth], [-20, 20]);
  const backgroundY = useTransform(cursorY, [0, window.innerHeight], [-20, 20]);

  const handleMouseMove = (e: React.MouseEvent) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
  };

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 9000);
    const quoteInterval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 5000);
    
    // Audio handling with user interaction
    const handleFirstInteraction = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.muted = muted;
        audioRef.current.loop = true;
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => setIsPlaying(true))
            .catch(error => console.log("Playback failed:", error));
        }
      }
      document.removeEventListener('click', handleFirstInteraction);
    };
    
    document.addEventListener('click', handleFirstInteraction);
    
    return () => {
      clearTimeout(timer);
      clearInterval(quoteInterval);
      document.removeEventListener('click', handleFirstInteraction);
    };
  }, [muted]);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setMuted(audioRef.current.muted);
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-900 to-fuchsia-900 text-center p-6 overflow-x-hidden text-white relative cursor-default"
      onMouseMove={handleMouseMove}
      style={{
        backgroundPositionX: backgroundX,
        backgroundPositionY: backgroundY,
      }}
    >
      <Head>
        <title>🔮 A Magical Birthday</title>
        <meta name="description" content="A celestial celebration of your special day" />
      </Head>

      {/* Floating Particles Background */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-fuchsia-400/20 pointer-events-none"
          style={{
            width: Math.random() * 5 + 2,
            height: Math.random() * 5 + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, (Math.random() - 0.5) * 100],
            x: [0, (Math.random() - 0.5) * 100],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
      ))}

      {showConfetti && (
        <Confetti 
          recycle={false} 
          numberOfPieces={800}
          gravity={0.15}
          wind={0.02}
          opacity={1}
          colors={['#FF10F0', '#A78BFA', '#818CF8', '#E879F9']}
          confettiSource={{ x: 0, y: 0, w: window.innerWidth, h: 0 }}
        />
      )}

      {/* Audio Element */}
      <audio ref={audioRef} id="mystic-audio" loop>
        <source src="/mystic-birthday.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Music Control with Visualizer */}
      <motion.button
        className="fixed bottom-6 right-6 bg-gradient-to-br from-fuchsia-600 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all z-50 group"
        onClick={toggleMute}
        aria-label={muted ? "Unmute music" : "Mute music"}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative">
          {muted ? (
            <VolumeX className="w-6 h-6" />
          ) : (
            <>
              <Music className="w-6 h-6" />
              <div className="absolute -top-2 -right-2 flex space-x-1">
                {[1, 2, 3].map((i) => (
                  <motion.span
                    key={i}
                    className="w-1 bg-fuchsia-300 rounded-full"
                    style={{
                      height: `${Math.random() * 10 + 4}px`,
                    }}
                    animate={{
                      height: [`${Math.random() * 10 + 4}px`, `${Math.random() * 20 + 8}px`, `${Math.random() * 10 + 4}px`],
                    }}
                    transition={{
                      duration: 0.5 + Math.random(),
                      repeat: Infinity,
                      repeatType: 'reverse',
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </div>
        <span className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-black/80 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
          {muted ? "Play music" : "Mute music"}
        </span>
      </motion.button>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Animated Title Section */}
        <motion.div 
          className="relative mt-16 mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Floating decorative elements */}
          <motion.div
            className="absolute -top-16 -left-16 w-40 h-40 bg-fuchsia-500/10 rounded-full blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -bottom-16 -right-16 w-48 h-48 bg-indigo-500/10 rounded-full blur-xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
          
          <motion.h1
            className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-300 via-purple-300 to-indigo-300 pb-2 relative z-10"
            initial={{ y: -120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 70, damping: 15 }}
          >
            <motion.span
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="inline-block"
            >
              ✨
            </motion.span> Happy Birthday To Me <motion.span
              animate={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              className="inline-block"
            >
              ✨
            </motion.span>
          </motion.h1>
          
          <motion.div
            className="mt-6 h-1 bg-gradient-to-r from-transparent via-fuchsia-500/70 to-transparent mx-auto max-w-md"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 1.5, ease: "backOut" }}
          />
        </motion.div>

        {/* Animated Quote with Floating Transition */}
        <div className="min-h-[120px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={quoteIndex}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <motion.p
                className="mt-8 text-xl md:text-2xl max-w-2xl mx-auto italic text-indigo-200 font-medium"
              >
                {quotes[quoteIndex]}
              </motion.p>
              <motion.div
                className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-fuchsia-400/30 rounded-full"
                animate={{
                  scaleX: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Animated Memory Prompt */}
        <motion.div
          className="mt-20 mb-16 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full max-w-2xl h-px bg-gradient-to-r from-transparent via-fuchsia-500/40 to-transparent"></div>
          </div>
          <motion.div
            className="relative inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-fuchsia-900/70 to-indigo-900/70 rounded-full border border-fuchsia-500/30 shadow-lg backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: [
                '0 0 10px rgba(217, 70, 239, 0.3)',
                '0 0 20px rgba(217, 70, 239, 0.4)',
                '0 0 10px rgba(217, 70, 239, 0.3)',
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Sparkles className="w-5 h-5 text-fuchsia-300" />
            </motion.div>
            <span className="ml-3 text-fuchsia-100 font-medium tracking-wide">Step into the gallery of memories</span>
            <motion.div
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            >
              <Sparkles className="w-5 h-5 text-fuchsia-300 ml-3" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Premium Memory Cards with 3D Tilt Effect */}
        <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-4">
          {memories.map((memory) => (
            <motion.div
              key={memory.id}
              className="group relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border border-fuchsia-400/20 hover:border-fuchsia-400/40 transition-all duration-500 cursor-pointer"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ y: -10 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveMemory(memory.id)}
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              <div className="relative h-64 overflow-hidden">
                <motion.img
                  src={`/${memory.id}.jpg`}
                  alt={memory.title}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <motion.div
                  className="absolute inset-0 bg-fuchsia-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 100%'],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              </div>
              <div className="p-6 text-left">
                <h3 className="text-xl font-bold text-fuchsia-100 mb-2">{memory.title}</h3>
                <p className="text-fuchsia-200/90 text-sm">{memory.description}</p>
                <motion.button 
                  className="mt-4 text-xs font-medium text-fuchsia-300 hover:text-white transition-colors flex items-center"
                  whileHover={{ x: 5 }}
                >
                  View full memory
                  <ChevronRight className="w-4 h-4 ml-1" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Premium Memory Modal */}
        <AnimatePresence>
          {activeMemory !== null && (
            <motion.div 
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveMemory(null)}
            >
              <motion.div 
                className="relative max-w-4xl w-full bg-gradient-to-br from-purple-950 to-indigo-900 rounded-xl overflow-hidden shadow-2xl border border-fuchsia-400/30"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ 
                  scale: 1, 
                  opacity: 1,
                  boxShadow: '0 0 30px rgba(217, 70, 239, 0.5)'
                }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  className="absolute top-4 right-4 z-10 text-fuchsia-200 hover:text-white bg-black/50 rounded-full p-2"
                  onClick={() => setActiveMemory(null)}
                  aria-label="Close memory"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <div className="relative h-96 w-full overflow-hidden">
                  <motion.img
                    src={`/${activeMemory}.jpg`}
                    alt={memories[activeMemory-1].title}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                </div>
                
                <div className="p-6">
                  <motion.h3 
                    className="text-2xl font-bold text-fuchsia-100 mb-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {memories[activeMemory-1].title}
                  </motion.h3>
                  <motion.p 
                    className="text-fuchsia-200/90 mb-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    {memories[activeMemory-1].description}
                  </motion.p>
                  <motion.div 
                    className="flex justify-between items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <motion.button 
                      className="flex items-center text-fuchsia-300 hover:text-white transition-colors"
                      whileHover={{ x: -5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ChevronLeft className="w-5 h-5 mr-1" />
                      Previous
                    </motion.button>
                    <div className="text-xs text-fuchsia-400/80">
                      Memory {activeMemory} of {memories.length}
                    </div>
                    <motion.button 
                      className="flex items-center text-fuchsia-300 hover:text-white transition-colors"
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Next
                      <ChevronRight className="w-5 h-5 ml-1" />
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Animated Footer */}
        <motion.footer
          className="mt-32 mb-10 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
        >
          <motion.div
            className="text-fuchsia-300/80 text-sm tracking-wider font-light"
            animate={{
              textShadow: [
                '0 0 5px rgba(217, 70, 239, 0)',
                '0 0 5px rgba(217, 70, 239, 0.5)',
                '0 0 5px rgba(217, 70, 239, 0)',
              ],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
            }}
          >
            <p className="mb-2">🕯️ Crafted under moonlight with love and magic</p>
            <p className="text-xs text-fuchsia-400/50">© {new Date().getFullYear()} Celestial Celebrations</p>
          </motion.div>
        </motion.footer>
      </div>
    </motion.div>
  );
}