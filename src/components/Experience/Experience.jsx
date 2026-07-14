import React from 'react';
import { getSiteContent } from '../../utils/dataParser';
import styles from './Experience.module.css';

export default function Experience() {
  const content = getSiteContent() || {};
  const experiences = content.experience || [];

  return (
    <section id="experience" className={styles.experience}>
      <h2 className={styles.sectionTitle}>Experience</h2>
      <div className={styles.timeline}>
        {experiences.map((exp, index) => {
          const dateStr = `${exp.startDate} - ${exp.endDate}`;
          return (
            <div key={index} className={styles.timelineItem}>
              <div className={styles.timelineMarker}>
                <div className={styles.markerDot}></div>
                {index < experiences.length - 1 && (
                  <div className={styles.markerLine}></div>
                )}
              </div>
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <div>
                    <h3 className={styles.role}>{exp.role}</h3>
                    <h4 className={styles.company}>{exp.company}</h4>
                  </div>
                  <div className={styles.meta}>
                    <span className={styles.date}>{dateStr}</span>
                    <span className={styles.location}>{exp.location}</span>
                  </div>
                </div>
                <p className={styles.description}>{exp.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
