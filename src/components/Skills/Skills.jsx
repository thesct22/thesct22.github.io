import { getSiteContent } from '../../utils/dataParser';
import styles from './Skills.module.css';

export default function Skills() {
  const content = getSiteContent() || {};
  const skills = content.skills || [];

  return (
    <section id="skills" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Skills</h2>
        <div className={styles.grid}>
          {skills.map((categoryObj, catIndex) => (
            <div key={catIndex} className={styles.card}>
              <h3 className={styles.categoryTitle}>{categoryObj.category}</h3>
              <div className={styles.pills}>
                {categoryObj.items?.map((skill, skillIndex) => (
                  <span key={skillIndex} className={styles.pill}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
