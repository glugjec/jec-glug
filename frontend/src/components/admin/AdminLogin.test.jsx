import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import AdminLogin from './AdminLogin';
import AUTH_CONFIG from '../../config/auth';

describe('AdminLogin component', () => {
  it('renders login form inputs and button', () => {
    render(<AdminLogin onLogin={vi.fn()} />);
    expect(screen.getByPlaceholderText(/enter username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login to dashboard/i })).toBeInTheDocument();
  });

  it('toggles password visibility', () => {
    render(<AdminLogin onLogin={vi.fn()} />);
    const passwordInput = screen.getByPlaceholderText(/enter password/i);
    const toggleBtn = screen.getByRole('button', { name: /show password/i });

    expect(passwordInput).toHaveAttribute('type', 'password');
    fireEvent.click(toggleBtn);
    expect(passwordInput).toHaveAttribute('type', 'text');
    fireEvent.click(toggleBtn);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('shows error on invalid credentials', () => {
    const handleLogin = vi.fn();
    render(<AdminLogin onLogin={handleLogin} />);

    fireEvent.change(screen.getByPlaceholderText(/enter username/i), { target: { value: 'wronguser' } });
    fireEvent.change(screen.getByPlaceholderText(/enter password/i), { target: { value: 'wrongpass' } });
    fireEvent.click(screen.getByRole('button', { name: /login to dashboard/i }));

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(handleLogin).not.toHaveBeenCalled();
  });

  it('calls onLogin on valid credentials', () => {
    const handleLogin = vi.fn();
    render(<AdminLogin onLogin={handleLogin} />);

    fireEvent.change(screen.getByPlaceholderText(/enter username/i), {
      target: { value: AUTH_CONFIG.ADMIN_USERNAME },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter password/i), {
      target: { value: AUTH_CONFIG.ADMIN_PASSWORD },
    });
    fireEvent.click(screen.getByRole('button', { name: /login to dashboard/i }));

    expect(handleLogin).toHaveBeenCalledTimes(1);
  });
});
