import { getSiteContent } from '../../utils/dataParser';
import styles from './Experience.module.css';

export default function Experience() {
  const content = getSiteContent() || {};
  const experiences = content.experience || [];

  return (
    <section id="experience" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Experience</h2>
        <div className={styles.entries}>
          {experiences.map((exp, index) => (
            <article key={index} className={styles.entry}>
              <div className={styles.entryHeader}>
                <div>
                  <h3 className={styles.company}>{exp.company}</h3>
                  <p className={styles.meta}>
                    {exp.location} · {exp.startDate} – {exp.endDate}
                  </p>
                  {exp.note && <p className={styles.note}>{exp.note}</p>}
                </div>
              </div>

              {exp.milestones ? (
                <div className={styles.milestones}>
                  {exp.milestones.map((ms, msIndex) => (
                    <div key={msIndex} className={styles.milestone}>
                      <div className={styles.milestoneHeader}>
                        <span className={styles.milestoneRole}>{ms.role}</span>
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
