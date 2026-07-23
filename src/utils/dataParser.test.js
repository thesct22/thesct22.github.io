// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { getSiteContent } from './dataParser';

describe('dataParser', () => {
  it('parses basics correctly', () => {
    const data = getSiteContent();
    expect(data.basics.name).toBe('Sharath Thomas');
    expect(data.basics.role).toBe('Senior DevOps Engineer');
    expect(data.basics.bio).toBeDefined();
    expect(data.basics.github).toBe('https://github.com/thesct22');
  });

  it('parses consolidated experience entries', () => {
    const data = getSiteContent();
    expect(data.experience.length).toBe(4);
    expect(data.experience[0].company).toBe('Synopsys / Ansys');
    expect(data.experience[0].milestones).toBeDefined();
    expect(data.experience[0].milestones.length).toBe(4);
  });

  it('parses all 8 skill categories', () => {
    const data = getSiteContent();
    expect(data.skills.length).toBe(8);
    expect(data.skills[0].category).toBe('CI/CD & Automation');
  });

  it('parses projects with techStack arrays', () => {
    const data = getSiteContent();
    expect(data.projects.length).toBe(5);
    expect(data.projects[0].techStack).toContain('React');
  });

  it('parses education and certifications', () => {
    const data = getSiteContent();
    expect(data.education.length).toBe(2);
    expect(data.certifications.length).toBe(5);
  });
});
