import styles from "./WorkInProgress.module.scss";

interface Props {
  /** Optional custom message. Defaults to "WORK IN PROGRESS". */
  label?: string;
}

export default function WorkInProgress({ label = "WORK IN PROGRESS" }: Props) {
  return (
    <div className={styles.body}>
      {/* NOTE: edited */}
      <p className={styles.wip}>{label}</p>
    </div>
  );
}
