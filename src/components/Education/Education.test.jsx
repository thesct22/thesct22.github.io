// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import Education from './Education';

// Mock getSiteContent
vi.mock('../../utils/dataParser', () => ({
  getSiteContent: () => ({
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

describe('Education Component', () => {
  it('renders section title', () => {
    render(<Education />);
    expect(
      screen.getByRole('heading', { name: /education & certifications/i })
    ).toBeInTheDocument();
  });

  it('renders education details', () => {
    render(<Education />);
    expect(
      screen.getByText('MSc Advanced Computer Science')
    ).toBeInTheDocument();
    expect(screen.getByText('University of Leicester')).toBeInTheDocument();
    expect(screen.getByText('2021 – 2023')).toBeInTheDocument();
  });

  it('renders certifications details', () => {
    render(<Education />);
    expect(
      screen.getByText('Kubernetes and Cloud Native Associate (KCNA)')
    ).toBeInTheDocument();
  });
});
