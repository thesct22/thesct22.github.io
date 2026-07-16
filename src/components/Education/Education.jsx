import { getSiteContent } from '../../utils/dataParser';
import styles from './Education.module.css';

export default function Education() {
  const content = getSiteContent() || {};
  const education = content.education || [];
  const certifications = content.certifications || [];

  return (
    <section id="education" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Education & Certifications</h2>
        <div className={styles.grid}>
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Education</h3>
            <div className={styles.entries}>
              {education.map((edu, index) => (
                <div key={index} className={styles.entry}>
                  <h4 className={styles.degree}>{edu.degree}</h4>
                  <p className={styles.institution}>{edu.institution}</p>
                  <p className={styles.dates}>
                    {edu.startDate} – {edu.endDate}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Certifications</h3>
            <div className={styles.entries}>
              {certifications.map((cert, index) => (
                <div key={index} className={styles.certEntry}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className={styles.certIcon}
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <span className={styles.certName}>{cert.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
