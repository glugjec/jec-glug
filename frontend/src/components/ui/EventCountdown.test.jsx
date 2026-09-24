import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import EventCountdown from './EventCountdown';

describe('EventCountdown Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders countdown correctly for a future event', () => {
    const now = new Date('2026-10-01T12:00:00Z').getTime();
    vi.setSystemTime(now);

    // Event is 2 days, 3 hours, 4 minutes, 5 seconds in the future
    const targetDate = new Date(now + (2 * 86400 + 3 * 3600 + 4 * 60 + 5) * 1000).toISOString();

    render(<EventCountdown targetDate={targetDate} />);

    expect(screen.getByText(/event starts in/i)).toBeInTheDocument();
    expect(screen.getByTestId('countdown-days')).toHaveTextContent('02');
    expect(screen.getByTestId('countdown-hours')).toHaveTextContent('03');
    expect(screen.getByTestId('countdown-minutes')).toHaveTextContent('04');
    expect(screen.getByTestId('countdown-seconds')).toHaveTextContent('05');
  });

  it('updates countdown every second', () => {
    const now = new Date('2026-10-01T12:00:00Z').getTime();
    vi.setSystemTime(now);

    const targetDate = new Date(now + 10 * 1000).toISOString();

    render(<EventCountdown targetDate={targetDate} />);

    expect(screen.getByTestId('countdown-seconds')).toHaveTextContent('10');

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.getByTestId('countdown-seconds')).toHaveTextContent('07');
  });

  it('renders expired state when event date is in the past without negative numbers', () => {
    const now = new Date('2026-10-01T12:00:00Z').getTime();
    vi.setSystemTime(now);

    const pastDate = new Date(now - 60000).toISOString();

    render(<EventCountdown targetDate={pastDate} />);

    expect(screen.getByTestId('event-countdown-expired')).toBeInTheDocument();
    expect(screen.getByText(/event started/i)).toBeInTheDocument();
    expect(screen.queryByTestId('countdown-seconds')).not.toBeInTheDocument();
  });

  it('transitions to expired state and triggers onExpire callback when timer reaches zero', () => {
    const now = new Date('2026-10-01T12:00:00Z').getTime();
    vi.setSystemTime(now);

    const targetDate = new Date(now + 2000).toISOString();
    const handleExpire = vi.fn();

    render(<EventCountdown targetDate={targetDate} onExpire={handleExpire} />);

    expect(screen.getByTestId('countdown-seconds')).toHaveTextContent('02');

    act(() => {
      vi.advanceTimersByTime(2500);
    });

    expect(screen.getByText(/event started/i)).toBeInTheDocument();
    expect(handleExpire).toHaveBeenCalledTimes(1);
  });

  it('handles invalid or missing date gracefully', () => {
    const { container: c1 } = render(<EventCountdown targetDate={null} />);
    expect(c1).toBeEmptyDOMElement();

    const { container: c2 } = render(<EventCountdown targetDate="" />);
    expect(c2).toBeEmptyDOMElement();

    const { container: c3 } = render(<EventCountdown targetDate="not-a-real-date" />);
    expect(c3).toBeEmptyDOMElement();
  });

  it('cleans up interval on component unmount', () => {
    const clearIntervalSpy = vi.spyOn(window, 'clearInterval');
    const now = new Date('2026-10-01T12:00:00Z').getTime();
    vi.setSystemTime(now);

    const targetDate = new Date(now + 60000).toISOString();

    const { unmount } = render(<EventCountdown targetDate={targetDate} />);

    unmount();

    expect(clearIntervalSpy).toHaveBeenCalled();
    clearIntervalSpy.mockRestore();
  });
});
