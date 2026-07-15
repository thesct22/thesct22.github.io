// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import Footer from './Footer';

// Mock getSiteContent
vi.mock('../../utils/dataParser', () => ({
  getSiteContent: () => ({
    basics: {
      name: 'Sharath Cherian Thomas',
      role: 'DevOps Engineer',
      email: 'sharathct22@gmail.com',
      linkedin: 'https://www.linkedin.com/in/sharathct22',
      github: 'http://github.com/thesct22',
      website: 'https://sharath.is-a.dev',
    },
  }),
}));

describe('Footer Component', () => {
  it('renders copyright text with current year and name', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(currentYear, 'i'))).toBeInTheDocument();
    expect(screen.getByText(/Sharath Cherian Thomas/i)).toBeInTheDocument();
  });

  it('renders contact links with correct hrefs', () => {
    render(<Footer />);
    const emailLink = screen.getByRole('link', { name: /email/i });
    const githubLink = screen.getByRole('link', { name: /github/i });
    const linkedinLink = screen.getByRole('link', { name: /linkedin/i });

    expect(emailLink).toHaveAttribute('href', 'mailto:sharathct22@gmail.com');
    expect(githubLink).toHaveAttribute('href', 'http://github.com/thesct22');
    expect(linkedinLink).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/sharathct22'
    );
  });
});
