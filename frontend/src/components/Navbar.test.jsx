import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';

describe('Navbar component', () => {
  it('renders navigation links and logos correctly', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Navbar />
      </MemoryRouter>
    );

    // Assert Desktop / Mobile Links exist
    expect(screen.getAllByRole('link', { name: /home/i })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /team/i })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /events/i })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /sponsors/i })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /contact us/i })[0]).toBeInTheDocument();
  });

  it('toggles mobile menu on button click and closes on Escape key', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Navbar />
      </MemoryRouter>
    );

    const toggleBtn = screen.getByRole('button', { name: /toggle navigation menu/i });
    expect(toggleBtn).toHaveAttribute('aria-expanded', 'false');

    // Open menu
    fireEvent.click(toggleBtn);
    expect(toggleBtn).toHaveAttribute('aria-expanded', 'true');

    // Press Escape to close
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(toggleBtn).toHaveAttribute('aria-expanded', 'false');
  });
});
