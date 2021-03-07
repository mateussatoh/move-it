import styles from "../styles/components/LeaderboardCard.module.css";

export function LeaderboardCard({
  name,
  avatarUrl,
  completedChallenges,
  totalExperience,
  level,
}) {
  return (
    <div className={styles.container}>
      <p>1</p>

      <div className={styles.avatar}>
        <img src={avatarUrl} alt="" />
        <div>
          <strong>{name}</strong>
          <p>
            <img src="/icons/level.svg" alt="" />
            Level {level}
          </p>
        </div>
      </div>

      <div className={styles.numbers}>
        <p>{completedChallenges}</p>
        <p> completados</p>
      </div>
      <div className={styles.numbers}>
        <p>{totalExperience}</p>
        <p> xp</p>
      </div>
    </div>
  );
}
