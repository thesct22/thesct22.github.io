// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import Skills from './Skills';

// Mock getSiteContent
vi.mock('../../utils/dataParser', () => ({
  getSiteContent: () => ({
    skills: [
      {
        category: 'Frontend Development',
        items: ['React.js', 'HTML5', 'CSS3 Modules'],
      },
      {
        category: 'DevOps & Cloud',
        items: ['Azure DevOps', 'GitHub Actions', 'Kubernetes'],
      },
    ],
  }),
}));

describe('Skills Component', () => {
  it('renders section title', () => {
    render(<Skills />);
    expect(
      screen.getByRole('heading', { name: /skills/i })
    ).toBeInTheDocument();
  });

  it('renders all skill categories', () => {
    render(<Skills />);
    expect(screen.getByText('Frontend Development')).toBeInTheDocument();
    expect(screen.getByText('DevOps & Cloud')).toBeInTheDocument();
  });

  it('renders individual skill items as pills', () => {
    render(<Skills />);
    expect(screen.getByText('React.js')).toBeInTheDocument();
    expect(screen.getByText('HTML5')).toBeInTheDocument();
    expect(screen.getByText('CSS3 Modules')).toBeInTheDocument();
    expect(screen.getByText('Azure DevOps')).toBeInTheDocument();
    expect(screen.getByText('GitHub Actions')).toBeInTheDocument();
    expect(screen.getByText('Kubernetes')).toBeInTheDocument();
  });
});
