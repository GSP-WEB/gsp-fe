import TopBar from "@/components/TopBar/TopBar";
import NavBar from "@/components/NavBar/NavBar";
import styles from "./page.module.scss";

export default function Page() {
  return (
    <div className={styles.shell}>
      <NavBar />
      <div className={styles.body}>
        <p className={styles.wip}>WORK IN PROGRESS</p>
      </div>
    </div>
  );
}
