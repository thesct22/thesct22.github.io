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
            description: 'DevOps and platform support.',
          },
          {
            role: 'R&D Engineer II',
            startDate: 'Apr 2025',
            endDate: 'Jul 2025',
            description: 'R&D Engineering.',
          },
        ],
      },
      {
        company: 'Samsung R&D Institute India',
        location: 'Bengaluru, India',
        startDate: 'Nov 2019',
        endDate: 'Aug 2020',
        description: 'Developed an IoT-based solution for Samsung Watches.',
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

  it('renders all experience items with company, location, dates, note, and milestones/descriptions', () => {
    render(<Experience />);

    // First main entry
    expect(screen.getByText('Synopsys / Ansys')).toBeInTheDocument();
    expect(
      screen.getByText(/Sheffield, UK\s*·\s*Jul 2022\s*–\s*Present/)
    ).toBeInTheDocument();
    expect(
      screen.getByText('Synopsys acquired Ansys in 2025')
    ).toBeInTheDocument();

    // Milestones for first entry
    expect(screen.getByText('Senior Engineer')).toBeInTheDocument();
    expect(screen.getByText('Jul 2025 – Present')).toBeInTheDocument();
    expect(
      screen.getByText('DevOps and platform support.')
    ).toBeInTheDocument();

    expect(screen.getByText('R&D Engineer II')).toBeInTheDocument();
    expect(screen.getByText('Apr 2025 – Jul 2025')).toBeInTheDocument();
    expect(screen.getByText('R&D Engineering.')).toBeInTheDocument();

    // Second main entry (no milestones)
    expect(screen.getByText('Samsung R&D Institute India')).toBeInTheDocument();
    expect(
      screen.getByText(/Bengaluru, India\s*·\s*Nov 2019\s*–\s*Aug 2020/)
    ).toBeInTheDocument();
    expect(
      screen.getByText('Developed an IoT-based solution for Samsung Watches.')
    ).toBeInTheDocument();
  });
});
