// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import Experience from './Experience';

// Mock getSiteContent
vi.mock('../../utils/dataParser', () => ({
  getSiteContent: () => ({
    experience: [
      {
        company: 'Synopsys / Ansys',
        location: 'Sheffield, UK',
        startDate: 'Jul 2022',
        endDate: 'Present',
        note: 'Synopsys acquired Ansys in 2025',
        milestones: [
          {
            role: 'Senior Engineer',
            startDate: 'Jul 2025',
            endDate: 'Present',
            highlights: ['DevOps and platform support.'],
          },
          {
            role: 'R&D Engineer II',
            startDate: 'Apr 2025',
            endDate: 'Jul 2025',
            highlights: ['R&D Engineering.'],
          },
        ],
      },
      {
        company: 'Samsung R&D Institute India',
        location: 'Bengaluru, India',
        startDate: 'Nov 2019',
        endDate: 'Aug 2020',
        highlights: ['Developed an IoT-based solution for Samsung Watches.'],
      },
    ],
  }),
}));

describe('Experience Component', () => {
  it('renders section title', () => {
    render(<Experience />);
    expect(
      screen.getByRole('heading', { name: /experience/i })
    ).toBeInTheDocument();
  });

  it('renders all experience items and their highlights (expanded by default)', () => {
    render(<Experience />);

    // Verify presence of companies
    expect(screen.getByText('Synopsys / Ansys')).toBeInTheDocument();
    expect(screen.getByText('Samsung R&D Institute India')).toBeInTheDocument();

    // Milestones and highlights should be in the DOM initially
    expect(
      screen.getByText('DevOps and platform support.')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Developed an IoT-based solution for Samsung Watches.')
    ).toBeInTheDocument();
  });
});
