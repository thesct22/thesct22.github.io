import { useState, useEffect, useRef } from 'react';
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
  const [activeSection, setActiveSection] = useState('');
  const [hoveredLink, setHoveredLink] = useState(null);

  const linkRefs = useRef({});

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find all intersecting entries
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          // Sort by intersection ratio to find the most visible one
          visibleEntries.sort(
            (a, b) => b.intersectionRatio - a.intersectionRatio
          );
          setActiveSection(`#${visibleEntries[0].target.id}`);
        }
      },
      {
        rootMargin: '-20% 0px -60% 0px', // Trigger when section is near the middle
        threshold: 0,
      }
    );

    NAV_LINKS.forEach((link) => {
      const el = document.querySelector(link.href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleLinkClick = (href) => {
    setMenuOpen(false);
    setActiveSection(href);
  };

  // Determine which link to highlight: hovered link takes precedence, otherwise active section
  const currentHighlight = hoveredLink !== null ? hoveredLink : activeSection;

  let indicatorStyle = { opacity: 0 };
  if (currentHighlight && linkRefs.current[currentHighlight]) {
    const el = linkRefs.current[currentHighlight];
    indicatorStyle = {
      left: el.offsetLeft,
      width: el.offsetWidth,
      opacity: 1,
    };
  }

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
          <NavigationMenu.List
            className={styles.navList}
            onMouseLeave={() => setHoveredLink(null)}
          >
            <div className={styles.navIndicator} style={indicatorStyle} />
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <NavigationMenu.Item key={link.href}>
                  <NavigationMenu.Link
                    className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                    href={link.href}
                    onClick={() => handleLinkClick(link.href)}
                    onMouseEnter={() => setHoveredLink(link.href)}
                    ref={(el) => (linkRefs.current[link.href] = el)}
                  >
                    {link.label}
                  </NavigationMenu.Link>
                </NavigationMenu.Item>
              );
            })}
            <NavigationMenu.Item>
              <NavigationMenu.Link
                className={styles.resumeButton}
                href="/resume.pdf"
                onClick={() => setMenuOpen(false)}
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
