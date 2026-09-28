import React, { useState, useEffect } from 'react';

const EventCountdown = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isPast, setIsPast] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate) - new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
        setIsPast(false);
      } else {
        setIsPast(true);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (isPast) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-white/5 backdrop-blur-md rounded-[2rem] border border-white/10">
        <h3 className="font-canno text-xl md:text-2xl text-[#8AE6FF] font-bold tracking-[0.2em] uppercase mb-2">Event Status</h3>
        <p className="font-poppins text-lg text-white font-medium tracking-widest">EVENT ENDED</p>
      </div>
    );
  }

  const formatNumber = (num) => num.toString().padStart(2, '0');

  return (
    <div className="flex flex-col items-center justify-center p-6 md:p-8 bg-[#0F1629]/80 backdrop-blur-md rounded-[2rem] md:rounded-[3rem] border border-white/10 shadow-[0_8px_30px_rgb(138,230,255,0.05)] w-full">
      <h3 className="font-canno text-lg md:text-xl text-[#8AE6FF] font-bold tracking-[0.2em] uppercase mb-6 text-center">Event Starts In</h3>
      
      <div className="flex gap-3 md:gap-8 justify-center items-center w-full max-w-lg mx-auto">
        <div className="flex flex-col items-center w-16 md:w-24">
          <span className="font-poppins text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-2 tabular-nums transition-all duration-300">{formatNumber(timeLeft.days)}</span>
          <span className="font-poppins text-[10px] md:text-xs text-gray-400 tracking-widest uppercase">Days</span>
        </div>
        
        <span className="text-xl md:text-3xl text-white/30 font-light mb-6 md:mb-8">:</span>
        
        <div className="flex flex-col items-center w-16 md:w-24">
          <span className="font-poppins text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-2 tabular-nums transition-all duration-300">{formatNumber(timeLeft.hours)}</span>
          <span className="font-poppins text-[10px] md:text-xs text-gray-400 tracking-widest uppercase">Hours</span>
        </div>
        
        <span className="text-xl md:text-3xl text-white/30 font-light mb-6 md:mb-8">:</span>
        
        <div className="flex flex-col items-center w-16 md:w-24">
          <span className="font-poppins text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-2 tabular-nums transition-all duration-300">{formatNumber(timeLeft.minutes)}</span>
          <span className="font-poppins text-[10px] md:text-xs text-gray-400 tracking-widest uppercase">Minutes</span>
        </div>
        
        <span className="text-xl md:text-3xl text-white/30 font-light mb-6 md:mb-8">:</span>
        
        <div className="flex flex-col items-center w-16 md:w-24">
          <span className="font-poppins text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-2 tabular-nums transition-all duration-300">{formatNumber(timeLeft.seconds)}</span>
          <span className="font-poppins text-[10px] md:text-xs text-gray-400 tracking-widest uppercase">Seconds</span>
        </div>
      </div>
    </div>
  );
};

export default EventCountdown;
