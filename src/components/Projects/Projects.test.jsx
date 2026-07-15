// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import Projects from './Projects';

// Mock getSiteContent
vi.mock('../../utils/dataParser', () => ({
  getSiteContent: () => ({
    portfolio: [
      {
        title: 'Project Alpha',
        url: 'https://alpha.example.com',
        description: 'First test project description.',
      },
      {
        title: 'Project Beta',
        url: 'https://beta.example.com',
        description: 'Second test project description.',
      },
    ],
  }),
}));

describe('Projects Component', () => {
  it('renders section title', () => {
    render(<Projects />);
    expect(
      screen.getByRole('heading', { name: /projects/i })
    ).toBeInTheDocument();
  });

  it('renders all projects with title and description', () => {
    render(<Projects />);
    expect(screen.getByText('Project Alpha')).toBeInTheDocument();
    expect(
      screen.getByText('First test project description.')
    ).toBeInTheDocument();
    expect(screen.getByText('Project Beta')).toBeInTheDocument();
    expect(
      screen.getByText('Second test project description.')
    ).toBeInTheDocument();
  });

  it('renders project links with correct href and attributes', () => {
    render(<Projects />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);

    expect(links[0]).toHaveAttribute('href', 'https://alpha.example.com');
    expect(links[0]).toHaveAttribute('target', '_blank');
    expect(links[0]).toHaveAttribute('rel', 'noopener noreferrer');

    expect(links[1]).toHaveAttribute('href', 'https://beta.example.com');
    expect(links[1]).toHaveAttribute('target', '_blank');
    expect(links[1]).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
