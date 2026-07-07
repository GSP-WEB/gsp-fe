import TopBar from '@/components/TopBar/TopBar';
import SideNav from '@/components/SideNav/SideNav';
import styles from './AppShell.module.scss';

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.shell}>
      <SideNav />
      <div className={styles.column}>
        <TopBar />
        <div className={styles.pageArea}>{children}</div>
      </div>
    </div>
  );
}
