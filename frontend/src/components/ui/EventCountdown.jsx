import React, { useState, useEffect, useRef } from 'react';

const EventCountdown = ({ targetDate, onExpire }) => {
  const onExpireRef = useRef(onExpire);
  onExpireRef.current = onExpire;

  const calculateTimeLeft = () => {
    if (!targetDate) return null;
    const target = new Date(targetDate).getTime();
    if (isNaN(target)) return null;

    const diff = target - Date.now();
    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
    }

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      isExpired: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    if (!targetDate) {
      setTimeLeft(null);
      return;
    }

    const targetTime = new Date(targetDate).getTime();
    if (isNaN(targetTime)) {
      setTimeLeft(null);
      return;
    }

    const tick = () => {
      const diff = targetTime - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
        if (onExpireRef.current) {
          onExpireRef.current();
        }
        return false;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
        isExpired: false,
      });
      return true;
    };

    const isRunning = tick();
    if (!isRunning) return;

    const timer = setInterval(() => {
      const continues = tick();
      if (!continues) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) return null;

  if (timeLeft.isExpired) {
    return (
      <div
        data-testid="event-countdown-expired"
        className="my-3 p-2.5 rounded-xl bg-emerald-500/20 backdrop-blur-md border border-emerald-400/40 text-center shadow-[0_0_12px_rgba(16,185,129,0.2)]"
      >
        <span className="text-xs sm:text-sm font-bold text-emerald-300 tracking-wider uppercase flex items-center justify-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          EVENT STARTED
        </span>
      </div>
    );
  }

  const timeUnits = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours },
    { label: 'MINUTES', value: timeLeft.minutes },
    { label: 'SECONDS', value: timeLeft.seconds },
  ];

  return (
    <div
      data-testid="event-countdown"
      className="my-3 p-3 rounded-2xl bg-black/40 backdrop-blur-md border border-cyan-400/30 shadow-[0_0_16px_rgba(6,182,212,0.15)] text-center w-full max-w-full"
    >
      <div className="text-[10px] sm:text-xs font-semibold tracking-widest text-cyan-300 uppercase mb-2">
        EVENT STARTS IN
      </div>
      <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
        {timeUnits.map((unit) => (
          <div
            key={unit.label}
            className="flex flex-col items-center justify-center p-1.5 sm:p-2 rounded-xl bg-white/5 border border-white/10"
          >
            <span
              data-testid={`countdown-${unit.label.toLowerCase()}`}
              className="text-base sm:text-lg font-bold font-mono text-cyan-400 leading-tight"
            >
              {String(unit.value).padStart(2, '0')}
            </span>
            <span className="text-[8px] sm:text-[9px] font-medium text-gray-300 uppercase tracking-tighter sm:tracking-tight mt-0.5">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCountdown;
