// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

vi.mock('./utils/dataParser', () => ({
  getSiteContent: () => ({
    basics: {
      name: 'Sharath Thomas',
      role: 'Senior DevOps Engineer',
      bio: 'Building scalable CI/CD platforms.',
      github: 'https://github.com/thesct22',
      linkedin: 'https://www.linkedin.com/in/sharathct22',
      email: 'sharath@example.com',
      website: 'https://sharath.is-a.dev',
    },
    experience: [
      {
        company: 'Synopsys / Ansys',
        location: 'Sheffield, UK',
        startDate: 'Jul 2022',
        endDate: 'Present',
        milestones: [
          {
            role: 'Senior Engineer',
            startDate: 'Jul 2025',
            endDate: 'Present',
            description: 'DevOps and platform support.',
          },
        ],
      },
    ],
    skills: [
      {
        category: 'CI/CD & Pipelines',
        items: ['GitHub Actions', 'Azure DevOps'],
      },
    ],
    projects: [
      {
        title: 'Toolbox Web App',
        description: 'Containerized web app.',
        techStack: ['React', 'Flask'],
        url: 'https://github.com/thesct22/toolbox_webapp',
      },
    ],
    education: [
      {
        institution: 'University of Leicester',
        degree: 'MSc Advanced Computer Science',
        startDate: '2021',
        endDate: '2023',
      },
    ],
    certifications: [{ name: 'KCNA' }],
  }),
}));

describe('App Component Assembly', () => {
  it('renders the navbar with name', () => {
    render(<App />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getAllByText('Sharath Thomas').length).toBeGreaterThanOrEqual(
      1
    );
  });

  it('renders the hero section', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Sharath Thomas'
    );
    expect(screen.getByText('Senior DevOps Engineer')).toBeInTheDocument();
  });

  it('renders the experience section', () => {
    render(<App />);
    expect(
      screen.getByRole('heading', { name: 'Experience' })
    ).toBeInTheDocument();
    expect(screen.getByText('Synopsys / Ansys')).toBeInTheDocument();

    // Expand the entry to see milestones
    const ansysButton = screen.getByText('Synopsys / Ansys').closest('button');
    fireEvent.click(ansysButton);

    expect(screen.getByText('Senior Engineer')).toBeInTheDocument();
  });

  it('renders the skills section', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: 'Skills' })).toBeInTheDocument();
    expect(screen.getByText('GitHub Actions')).toBeInTheDocument();
  });

  it('renders the projects section', () => {
    render(<App />);
    expect(
      screen.getByRole('heading', { name: 'Projects' })
    ).toBeInTheDocument();
    expect(screen.getByText('Toolbox Web App')).toBeInTheDocument();
  });

  it('renders the education section', () => {
    render(<App />);
    expect(screen.getByText('Education & Certifications')).toBeInTheDocument();
    expect(
      screen.getByText('MSc Advanced Computer Science')
    ).toBeInTheDocument();
    expect(screen.getByText('KCNA')).toBeInTheDocument();
  });

  it('renders the footer', () => {
    render(<App />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});
