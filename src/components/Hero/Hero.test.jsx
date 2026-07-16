// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import Hero from './Hero';

// Mock getSiteContent
vi.mock('../../utils/dataParser', () => ({
  getSiteContent: () => ({
    basics: {
      name: 'Sharath Cherian Thomas',
      role: 'DevOps Engineer',
      bio: 'Cloud Computing and IoT enthusiast.',
      email: 'sharathct22@gmail.com',
      linkedin: 'https://www.linkedin.com/in/sharathct22',
      github: 'http://github.com/thesct22',
      website: 'https://sharath.is-a.dev',
    },
  }),
}));

describe('Hero Component', () => {
  it('renders name, role, and bio', () => {
    render(<Hero />);
    expect(screen.getByText('Sharath Cherian Thomas')).toBeInTheDocument();
    expect(screen.getByText('DevOps Engineer')).toBeInTheDocument();
    expect(
      screen.getByText('Cloud Computing and IoT enthusiast.')
    ).toBeInTheDocument();
  });

  it('renders a download resume button linking to the resume PDF', () => {
    render(<Hero />);
    const downloadBtn = screen.getByRole('link', { name: /download resume/i });
    expect(downloadBtn).toBeInTheDocument();
    expect(downloadBtn).toHaveAttribute('href', '/resume.pdf');
  });

  it('renders social icons linking to github and linkedin', () => {
    render(<Hero />);
    const linkedinBtn = screen.getByRole('link', { name: /linkedin/i });
    const githubBtn = screen.getByRole('link', { name: /github/i });

    expect(linkedinBtn).toBeInTheDocument();
    expect(linkedinBtn).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/sharathct22'
    );

    expect(githubBtn).toBeInTheDocument();
    expect(githubBtn).toHaveAttribute('href', 'http://github.com/thesct22');
  });
});
