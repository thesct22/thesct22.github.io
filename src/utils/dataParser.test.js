import { describe, it, expect } from 'vitest';
import { getSiteContent } from './dataParser';

describe('dataParser', () => {
  it('parses the YAML content successfully', () => {
    const data = getSiteContent();
    expect(data.basics.name).toBe('Sharath Cherian Thomas');
    expect(data.basics.role).toBe('DevOps Engineer');
  });

  it('contains the new Senior Engineer at Synopsys Inc role', () => {
    const data = getSiteContent();
    expect(data.experience).toBeDefined();
    expect(Array.isArray(data.experience)).toBe(true);
    expect(data.experience[0]).toEqual({
      company: 'Synopsys Inc',
      role: 'Senior Engineer',
      startDate: 'July 2025',
      endDate: 'Present',
      location: 'Sheffield, England, United Kingdom',
      description: 'DevOps and platform support.',
    });
  });

  it('contains education, skills, and portfolio data', () => {
    const data = getSiteContent();
    expect(data.education).toBeDefined();
    expect(data.skills).toBeDefined();
    expect(data.portfolio).toBeDefined();
    expect(data.education.length).toBeGreaterThan(0);
    expect(data.skills.length).toBeGreaterThan(0);
    expect(data.portfolio.length).toBeGreaterThan(0);
  });

  it('returns the same object reference on subsequent calls', () => {
    const data1 = getSiteContent();
    const data2 = getSiteContent();
    expect(data1).toBe(data2);
  });
});
