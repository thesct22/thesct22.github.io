import React from 'react';
import { getSiteContent } from '../../utils/dataParser';
import styles from './Hero.module.css';

export default function Hero() {
  const content = getSiteContent() || {};
  const {
    name = '',
    role = '',
    roleDescription = '',
    github = '',
    linkedin = '',
  } = content.basics || {};

  return (
    <section id="about" className={styles.hero}>
      <div className={styles.blob}></div>
      <div className={styles.grid}></div>
      <div className={styles.content}>
        <div className={styles.badge}>Welcome to my portfolio</div>
        <h1 className={styles.name}>{name}</h1>
        <h2 className={styles.role}>{role}</h2>
        <p className={styles.description}>{roleDescription}</p>

        <div className={styles.actions}>
          <a
            href="/resume.pdf"
            className={styles.primaryButton}
            aria-label="Download Resume"
          >
            Download Resume
          </a>
          <div className={styles.socials}>
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="GitHub"
              >
                <svg
                  className={styles.socialIcon}
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon" />
                </svg>
              </a>
            )}
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="LinkedIn"
              >
                <svg
                  className={styles.socialIcon}
                  viewBox="0 0 24 24"
                  role="presentation"
                  aria-hidden="true"
                  fill="currentColor"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
