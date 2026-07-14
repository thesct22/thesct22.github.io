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
        company: 'Synopsys Inc',
        role: 'Senior Engineer',
        startDate: 'July 2025',
        endDate: 'Present',
        location: 'Sheffield, UK',
        description: 'DevOps and platform support.',
      },
      {
        company: 'Ansys',
        role: 'R&D Engineer II',
        startDate: 'April 2025',
        endDate: 'July 2025',
        location: 'Sheffield, UK',
        description: 'R&D Engineering.',
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

  it('renders all experience items with company, role, location, dates, and description', () => {
    render(<Experience />);

    expect(screen.getByText('Senior Engineer')).toBeInTheDocument();
    expect(screen.getByText('Synopsys Inc')).toBeInTheDocument();
    expect(screen.getAllByText('Sheffield, UK')).toHaveLength(2);
    expect(screen.getByText('July 2025 - Present')).toBeInTheDocument();
    expect(
      screen.getByText('DevOps and platform support.')
    ).toBeInTheDocument();

    // Second item
    expect(screen.getByText('R&D Engineer II')).toBeInTheDocument();
    expect(screen.getByText('Ansys')).toBeInTheDocument();
    expect(screen.getByText('April 2025 - July 2025')).toBeInTheDocument();
    expect(screen.getByText('R&D Engineering.')).toBeInTheDocument();
  });
});
