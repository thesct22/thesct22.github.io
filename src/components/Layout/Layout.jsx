import React from 'react';
import { getSiteContent } from '../../utils/dataParser';
import SEO from '../SEO/SEO';
import styles from './Layout.module.css';

export default function Layout({ children }) {
  const content = getSiteContent() || {};
  const { name = '' } = content.basics || {};

  return (
    <div className={styles.layout}>
      <SEO />
      <header className={styles.header}>
        <div className={styles.navContainer}>
          <div className={styles.brand}>{name}</div>
          <nav className={styles.nav} role="navigation">
            <a href="#about" className={styles.navLink}>
              About
            </a>
            <a href="#experience" className={styles.navLink}>
              Experience
            </a>
            <a href="#skills" className={styles.navLink}>
              Skills
            </a>
            <a href="#projects" className={styles.navLink}>
              Projects
            </a>
          </nav>
        </div>
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
