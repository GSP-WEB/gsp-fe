import KpiCard from "@/components/KpiCard/KpiCard";
import Grid from "@/components/Grid/Grid";
import { KpiCardData } from "@/data/scoreCard";
import styles from "./ScoreCardSection.module.scss";

interface Props {
  title: string;
  cards: KpiCardData[];
  /** Prefix for React keys. Needed when the same card data is rendered in
   * more than one section on the same page (e.g. the combined overview,
   * where Network Maintenance and Last Mile Repair currently mock the same
   * cards as Selling and Installation) so keys don't collide. */
  keyPrefix?: string;
}

export default function ScoreCardSection({
  title,
  cards,
  keyPrefix = "",
}: Props) {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{title}</h2>
      <Grid minColumnWidth={260} columns={4}>
        {cards.map((card) => (
          <KpiCard key={`${keyPrefix}${card.id}`} data={card} />
        ))}
      </Grid>
    </section>
  );
}
