'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './NavBar.module.scss';
import { navTabs } from '@/data/scoreCard';

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className={styles.navbar}>
      {navTabs.map((tab) => {
        const isActive = pathname === tab.href || pathname.startsWith(tab.href + '/');
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`${styles.tab} ${isActive ? styles.active : ''}`}
          >
            [{tab.label}]
            <span className={styles.chevron}>▾</span>
          </Link>
        );
      })}
    </nav>
  );
}
