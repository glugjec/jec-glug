import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import EventImageGallery from './EventImageGallery';

describe('EventImageGallery component', () => {
  it('renders "No Image" fallback when no images provided', () => {
    render(<EventImageGallery imageUrls={[]} />);
    expect(screen.getByText('No Image')).toBeInTheDocument();
  });

  it('renders single image correctly without arrows', () => {
    render(<EventImageGallery imageUrl="https://example.com/single.jpg" alt="Single Event" />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://example.com/single.jpg');
    expect(screen.queryByRole('button', { name: /previous image/i })).not.toBeInTheDocument();
  });

  it('handles multiple images and navigates on button click and keyboard arrow keys', () => {
    const images = ['https://example.com/1.jpg', 'https://example.com/2.jpg', 'https://example.com/3.jpg'];
    render(<EventImageGallery imageUrls={images} alt="Multi Event" />);

    const region = screen.getByRole('region', { name: /multi event gallery/i });
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', images[0]);

    // Next button
    const nextBtn = screen.getByRole('button', { name: /next image/i });
    fireEvent.click(nextBtn);
    expect(screen.getByRole('img')).toHaveAttribute('src', images[1]);

    // Keyboard navigation (ArrowLeft)
    fireEvent.keyDown(region, { key: 'ArrowLeft' });
    expect(screen.getByRole('img')).toHaveAttribute('src', images[0]);
  });

  it('renders image with object-contain to prevent cropping', () => {
    render(<EventImageGallery imageUrl="https://example.com/poster.jpg" alt="Poster Event" />);
    const img = screen.getByRole('img');
    expect(img.className).toContain('object-contain');
    expect(img.className).not.toContain('object-cover');
  });
});
