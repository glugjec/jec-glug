import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SkeletonCard from './SkeletonCard';

describe('SkeletonCard component', () => {
  it('renders default 6 skeleton cards', () => {
    render(<SkeletonCard />);
    const skeletons = screen.getAllByTestId('skeleton-card');
    expect(skeletons).toHaveLength(6);
  });

  it('renders custom count of skeleton cards', () => {
    render(<SkeletonCard count={3} />);
    const skeletons = screen.getAllByTestId('skeleton-card');
    expect(skeletons).toHaveLength(3);
  });
});
