import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";
import styles from "../styles/components/ExperienceBar.module.css";

export function ExperienceBar() {
  const { data } = useContext(ChallengesContext);
  const { experience, experienceToNextLevel } = data;

  const percentToLevelUp = Math.round(
    (100 * experience) / experienceToNextLevel
  );

  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>

      <div>
        <div style={{ width: `${percentToLevelUp}%` }}></div>

        <span
          className={styles.currentExperience}
          style={{ left: `${percentToLevelUp}%` }}
        >
          {experience} xp
        </span>
      </div>

      <span>{experienceToNextLevel} xp</span>
    </header>
  );
}
