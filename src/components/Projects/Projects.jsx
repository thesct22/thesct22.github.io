import { getSiteContent } from '../../utils/dataParser';
import styles from './Projects.module.css';

export default function Projects() {
  const content = getSiteContent() || {};
  const projects = content.projects || [];

  return (
    <section id="projects" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Projects</h2>
        <div className={styles.grid}>
          {projects.map((project, index) => (
            <article key={index} className={styles.card}>
              <h3 className={styles.projectTitle}>{project.title}</h3>
              {project.techStack && (
                <div className={styles.techStack}>
                  {project.techStack.map((tech, techIndex) => (
                    <span key={techIndex} className={styles.techTag}>
                      {tech}
                    </span>
                  ))}
                </div>
              )}
              <p className={styles.description}>{project.description}</p>
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                  aria-label={`View ${project.title} on GitHub`}
                >
                  View Project
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className={styles.linkIcon}
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
