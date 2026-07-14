// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import '@testing-library/jest-dom';
import Layout from './Layout';

// Mock getSiteContent
vi.mock('../../utils/dataParser', () => ({
  getSiteContent: () => ({
    basics: {
      name: 'Sharath Cherian Thomas',
      role: 'DevOps Enthusiast',
      roleDescription: 'DevOps and cloud engineer.',
      website: 'https://sharath.is-a.dev',
      linkedin: 'https://www.linkedin.com/in/sharathct22',
    },
  }),
}));

describe('Layout Component', () => {
  beforeEach(() => {
    // Clear head tags
    document.title = '';
    const headElements = document.querySelectorAll(
      'meta[name="description"], script[type="application/ld+json"]'
    );
    headElements.forEach((el) => el.remove());
  });

  it('renders the header and main content container with children', () => {
    render(
      <HelmetProvider>
        <Layout>
          <div data-testid="child">Test Child Content</div>
        </Layout>
      </HelmetProvider>
    );

    // Verify name in header/nav
    expect(screen.getByText('Sharath Cherian Thomas')).toBeInTheDocument();

    // Verify navigation links
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Experience')).toBeInTheDocument();
    expect(screen.getByText('Skills')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();

    // Verify children rendering
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('injects correct SEO metadata into the head', async () => {
    render(
      <HelmetProvider>
        <Layout>
          <div>Content</div>
        </Layout>
      </HelmetProvider>
    );

    // Wait for Helmet to update document head
    await waitFor(() => {
      expect(document.title).toBe('Sharath Cherian Thomas | DevOps Enthusiast');
    });

    const metaDescription = document.querySelector('meta[name="description"]');
    expect(metaDescription).not.toBeNull();
    expect(metaDescription.getAttribute('content')).toBe(
      'DevOps and cloud engineer.'
    );

    // Check JSON-LD schema
    const schemaScript = document.querySelector(
      'script[type="application/ld+json"]'
    );
    expect(schemaScript).not.toBeNull();

    const schemaData = JSON.parse(schemaScript.textContent);
    expect(schemaData['@context']).toBe('https://schema.org');
    expect(schemaData['@type']).toBe('Person');
    expect(schemaData.name).toBe('Sharath Cherian Thomas');
    expect(schemaData.jobTitle).toBe('DevOps Enthusiast');
    expect(schemaData.url).toBe('https://sharath.is-a.dev');
    expect(schemaData.sameAs).toContain(
      'https://www.linkedin.com/in/sharathct22'
    );
  });
});
