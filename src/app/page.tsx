'use client';

import { useEffect, useState } from 'react';
import Head from 'next/head';
import Confetti from 'react-confetti';
import { motion } from 'framer-motion';
import { Sparkles, Music, VolumeX } from 'lucide-react';

export default function Home() {
  const [showConfetti, setShowConfetti] = useState(true);
  const [muted, setMuted] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);

  const quotes = [
    "✨ In the shadows of time, today glows brighter than ever.",
    "🌌 The stars align once a year—for *you*.",
    "🌙 Wishes whispered in the dark light up destinies.",
    "🔮 Every birthday is a secret spell of hope and joy.",
    "🕯️ Light your candle, and let the magic begin."
  ];

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 9000);
    const quoteInterval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => {
      clearTimeout(timer);
      clearInterval(quoteInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-900 to-fuchsia-900 text-center p-6 overflow-x-hidden text-white relative">
      <Head>
        <title>🔮 A Magical Birthday</title>
      </Head>

      {showConfetti && <Confetti recycle={false} numberOfPieces={600} />}

      {/* Music */}
      <audio id="mystic-audio" loop>
  <source src="/mystic-birthday.mp3" type="audio/mpeg" />
  Your browser does not support the audio element.
</audio>

<button
  className="fixed bottom-6 right-6 bg-fuchsia-600 text-white p-4 rounded-full shadow-lg animate-pulse hover:scale-105 transition-all z-50"
  onClick={() => {
    const audio = document.getElementById('mystic-audio') as HTMLAudioElement;
    if (audio) {
      if (muted) {
        audio.muted = false;
        audio.play();
      } else {
        audio.muted = true;
        audio.pause();
      }
      setMuted(!muted);
    }
  }}
>
  {muted ? <VolumeX className="w-6 h-6" /> : <Music className="w-6 h-6" />}
</button>



      {/* Title */}
      <motion.h1
        className="text-5xl md:text-7xl font-extrabold text-fuchsia-300 mt-16 drop-shadow-[0_0_15px_fuchsia]"
        initial={{ y: -120, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 70 }}
      >
        ✨ Happy Birthday To Me :)
      </motion.h1>

      {/* Animated quote */}
      <motion.p
        key={quoteIndex}
        className="mt-8 text-xl md:text-2xl max-w-2xl mx-auto italic text-indigo-200 drop-shadow-md"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {quotes[quoteIndex]}
      </motion.p>

      {/* Memory prompt */}
      <motion.div
        className="mt-14 flex justify-center items-center gap-3 text-fuchsia-400 text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <Sparkles className="w-6 h-6 animate-pulse" />
        <span>Step into the gallery of memories ✨</span>
        <Sparkles className="w-6 h-6 animate-pulse" />
      </motion.div>

      {/* Memory cards */}
      <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-4">
        {[1, 2, 3].map((num) => (
          <motion.div
            key={num}
            className="rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500 border border-fuchsia-400 bg-black/20 backdrop-blur"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <img
              src={`/${num}.jpg`}
              alt={`Mystic Memory ${num}`}
              className="w-full h-70 object-cover brightness-90 hover:brightness-110 transition-all"
            />
            <div className="p-4 text-fuchsia-200 text-center font-semibold">
              Memory {num}: An enchanted moment
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <motion.footer
        className="mt-20 text-fuchsia-300 text-sm tracking-wider italic"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
      >
        🕯️ Crafted under moonlight with love and magic.
      </motion.footer>
    </div>
  );
}
