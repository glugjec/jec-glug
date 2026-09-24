import React from 'react';

const SkeletonCard = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-2 sm:p-6 transition-all duration-300">
      {[...Array(count)].map((_, index) => (
        <div
          key={index}
          data-testid="skeleton-card"
          className="bg-slate-800/60 backdrop-blur-md rounded-2xl overflow-hidden border border-slate-700/50 animate-pulse shadow-xl"
        >
          {/* Top Banner / Image Skeleton */}
          <div className="h-32 sm:h-40 bg-gradient-to-r from-slate-700/60 via-slate-600/40 to-slate-700/60" />

          {/* Content Area */}
          <div className="p-4 sm:p-5 space-y-3">
            {/* Title */}
            <div className="h-5 sm:h-6 bg-slate-700/70 rounded-md w-3/4" />

            {/* Subtitle / Date */}
            <div className="h-3 sm:h-4 bg-slate-700/50 rounded w-1/3" />

            {/* Description lines */}
            <div className="space-y-2 pt-1">
              <div className="h-3 bg-slate-700/40 rounded w-full" />
              <div className="h-3 bg-slate-700/40 rounded w-5/6" />
            </div>

            {/* Tags / Pills */}
            <div className="flex flex-wrap gap-2 pt-2">
              <div className="h-5 bg-blue-500/20 rounded-full w-14" />
              <div className="h-5 bg-blue-500/20 rounded-full w-16" />
              <div className="h-5 bg-blue-500/20 rounded-full w-12" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonCard;
