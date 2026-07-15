import React from 'react';
import { getSiteContent } from '../../utils/dataParser';
import styles from './Skills.module.css';

export default function Skills() {
  const content = getSiteContent() || {};
  const skills = content.skills || [];

  return (
    <section id="skills" className={styles.skills}>
      <h2 className={styles.sectionTitle}>Skills</h2>
      <div className={styles.grid}>
        {skills.map((categoryObj, catIndex) => (
          <div key={catIndex} className={styles.categoryCard}>
            <h3 className={styles.categoryTitle}>{categoryObj.category}</h3>
            <div className={styles.pillsContainer}>
              {categoryObj.items.map((skill, skillIndex) => (
                <span key={skillIndex} className={styles.pill}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
