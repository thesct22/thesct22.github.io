// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import App from './App';

// Mock getSiteContent for sub-components
vi.mock('./utils/dataParser', () => ({
  getSiteContent: () => ({
    basics: {
      name: 'Sharath Cherian Thomas',
      role: 'DevOps Enthusiast',
      bio: 'DevOps and cloud engineer.',
      github: 'https://github.com/sharathct',
      linkedin: 'https://www.linkedin.com/in/sharathct22',
      email: 'sharath@example.com',
      website: 'https://sharath.is-a.dev',
    },
    experience: [
      {
        company: 'Example Corp',
        startDate: '2023',
        endDate: 'Present',
        location: 'Remote',
        description: 'Working on Kubernetes and SRE duties.',
      },
    ],
    skills: [
      {
        category: 'Cloud',
        items: ['AWS', 'GCP'],
      },
    ],
    projects: [
      {
        title: 'Project Alpha',
        description: 'A cloud deployment project.',
        url: 'https://github.com/sharathct/alpha',
      },
    ],
    education: [
      {
        degree: 'MSc Advanced Computer Science',
        institution: 'University of Leicester',
        startDate: '2021',
        endDate: '2023',
      },
    ],
    certifications: [
      {
        name: 'Kubernetes and Cloud Native Associate (KCNA)',
      },
    ],
  }),
}));

describe('App Component Assembly', () => {
  it('renders all sections inside the layout', () => {
    render(<App />);

    // Verify Layout is rendered (nav links, name)
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(
      screen.getAllByText('Sharath Cherian Thomas').length
    ).toBeGreaterThanOrEqual(2);

    // Verify Hero is rendered
    expect(screen.getByText('DevOps Enthusiast')).toBeInTheDocument();
    expect(screen.getByText('DevOps and cloud engineer.')).toBeInTheDocument();

    // Verify Experience is rendered
    expect(
      screen.getByRole('heading', { name: 'Experience', level: 2 })
    ).toBeInTheDocument();
    expect(screen.getByText('Example Corp')).toBeInTheDocument();

    // Verify Skills is rendered
    expect(
      screen.getByRole('heading', { name: 'Skills', level: 2 })
    ).toBeInTheDocument();
    expect(screen.getByText('Cloud')).toBeInTheDocument();

    // Verify Projects is rendered
    expect(
      screen.getByRole('heading', { name: 'Projects', level: 2 })
    ).toBeInTheDocument();
    expect(screen.getByText('Project Alpha')).toBeInTheDocument();

    // Verify Education & Certifications is rendered
    expect(
      screen.getByRole('heading', {
        name: 'Education & Certifications',
        level: 2,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText('MSc Advanced Computer Science')
    ).toBeInTheDocument();

    // Verify Footer is rendered
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});
