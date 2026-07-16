// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
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

  it('renders all experience items and handles collapse/expand toggle (all collapsed by default)', () => {
    render(<Experience />);

    // Verify presence of companies
    expect(screen.getByText('Synopsys / Ansys')).toBeInTheDocument();
    expect(screen.getByText('Samsung R&D Institute India')).toBeInTheDocument();

    // Query buttons
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);

    const firstButton = buttons[0];
    const secondButton = buttons[1];

    // Assert default collapsed state
    expect(firstButton).toHaveAttribute('aria-expanded', 'false');
    expect(secondButton).toHaveAttribute('aria-expanded', 'false');

    // Milestones and description should NOT be in the DOM initially
    expect(
      screen.queryByText('DevOps and platform support.')
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText('Developed an IoT-based solution for Samsung Watches.')
    ).not.toBeInTheDocument();

    // Click first button to expand it
    fireEvent.click(firstButton);
    expect(firstButton).toHaveAttribute('aria-expanded', 'true');
    expect(
      screen.getByText('DevOps and platform support.')
    ).toBeInTheDocument();

    // Click second button to expand it
    fireEvent.click(secondButton);
    expect(secondButton).toHaveAttribute('aria-expanded', 'true');
    expect(
      screen.getByText('Developed an IoT-based solution for Samsung Watches.')
    ).toBeInTheDocument();

    // Click first button again to collapse it
    fireEvent.click(firstButton);
    expect(firstButton).toHaveAttribute('aria-expanded', 'false');
    expect(
      screen.queryByText('DevOps and platform support.')
    ).not.toBeInTheDocument();
  });
});
