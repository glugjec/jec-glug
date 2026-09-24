import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Toast from './Toast';

describe('Toast component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('renders message and appropriate role', () => {
    render(<Toast message="Event created successfully" type="success" />);
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText('Event created successfully')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const handleClose = vi.fn();
    render(<Toast message="Error occurred" type="error" onClose={handleClose} />);

    const closeBtn = screen.getByRole('button', { name: /close notification/i });
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('auto-dismisses after duration', () => {
    const handleClose = vi.fn();
    render(<Toast message="Info message" duration={3000} onClose={handleClose} />);

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
