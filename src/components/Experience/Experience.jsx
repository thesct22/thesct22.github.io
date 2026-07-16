import { useState } from 'react';
import { getSiteContent } from '../../utils/dataParser';
import styles from './Experience.module.css';

export default function Experience() {
  const content = getSiteContent() || {};
  const experiences = content.experience || [];

  // Keep track of expanded state for each experience entry.
  // All experiences are collapsed by default.
  const [expandedIndices, setExpandedIndices] = useState({});

  const toggleExpand = (index) => {
    setExpandedIndices((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <section id="experience" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Experience</h2>
        <div className={styles.entries}>
          {experiences.map((exp, index) => {
            const isExpanded = !!expandedIndices[index];
            return (
              <article key={index} className={styles.entry}>
                <button
                  className={styles.entryHeader}
                  onClick={() => toggleExpand(index)}
                  aria-expanded={isExpanded}
                  aria-controls={`exp-content-${index}`}
                >
                  <div className={styles.headerText}>
                    <h3 className={styles.company}>{exp.company}</h3>
                    <p className={styles.meta}>
                      {exp.location} · {exp.startDate} – {exp.endDate}
                    </p>
                    {exp.note && <p className={styles.note}>{exp.note}</p>}
                  </div>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`${styles.chevron} ${isExpanded ? styles.chevronExpanded : ''}`}
                    aria-hidden="true"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {isExpanded && (
                  <div
                    id={`exp-content-${index}`}
                    className={styles.entryContent}
                  >
                    {exp.milestones ? (
                      <div className={styles.milestones}>
                        {exp.milestones.map((ms, msIndex) => (
                          <div key={msIndex} className={styles.milestone}>
                            <div className={styles.milestoneHeader}>
                              <span className={styles.milestoneRole}>
                                {ms.role}
                              </span>
                              <span className={styles.milestoneDates}>
                                {ms.startDate} – {ms.endDate}
                              </span>
                            </div>
                            <p className={styles.milestoneDescription}>
                              {ms.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className={styles.description}>{exp.description}</p>
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
