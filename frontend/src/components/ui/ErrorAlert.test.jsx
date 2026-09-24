import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ErrorAlert from './ErrorAlert';

describe('ErrorAlert component', () => {
  it('renders default message', () => {
    render(<ErrorAlert />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it('renders custom message and triggers retry', () => {
    const handleRetry = vi.fn();
    render(<ErrorAlert message="Failed to load items" onRetry={handleRetry} />);

    expect(screen.getByText('Failed to load items')).toBeInTheDocument();
    const retryBtn = screen.getByRole('button', { name: /retry/i });
    fireEvent.click(retryBtn);
    expect(handleRetry).toHaveBeenCalledTimes(1);
  });
});
