import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";
import styles from "../styles/components/Profile.module.css";

export function Profile() {
  const { level } = useContext(ChallengesContext);
  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/mateussatoh.png" alt="Avatar" />
      <div>
        <strong>Mateus Satoh</strong>
        <p>
          <img src="/icons/level.svg" alt="Level Icon" />
          Level {level}
        </p>
      </div>
    </div>
  );
}
