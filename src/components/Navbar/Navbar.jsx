import { useState, useEffect } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { getSiteContent } from '../../utils/dataParser';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#education', label: 'Education' },
];

export default function Navbar() {
  const content = getSiteContent() || {};
  const { name = '' } = content.basics || {};
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}
      role="banner"
    >
      <div className={styles.container}>
        <a href="#" className={styles.brand} aria-label="Home">
          {name}
        </a>

        <button
          className={styles.menuToggle}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation menu"
        >
          <span
            className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
          />
        </button>

        <NavigationMenu.Root
          className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}
        >
          <NavigationMenu.List className={styles.navList}>
            {NAV_LINKS.map((link) => (
              <NavigationMenu.Item key={link.href}>
                <NavigationMenu.Link
                  className={styles.navLink}
                  href={link.href}
                  onClick={handleLinkClick}
                >
                  {link.label}
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            ))}
            <NavigationMenu.Item>
              <NavigationMenu.Link
                className={styles.resumeButton}
                href="/resume.pdf"
                onClick={handleLinkClick}
              >
                Resume
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Root>
      </div>
    </header>
  );
}
