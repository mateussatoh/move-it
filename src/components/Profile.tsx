import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";
import { ProfileContext } from "../contexts/ProfileContext";
import styles from "../styles/components/Profile.module.css";

export function Profile() {
  const { level } = useContext(ChallengesContext);
  const { name, avatarUrl } = useContext(ProfileContext);
  return (
    <div className={styles.profileContainer}>
      <img src={avatarUrl} alt="Avatar" />
      <div>
        <strong>{name}</strong>
        <p>
          <img src="/icons/level.svg" alt="Level Icon" />
          Level {level}
        </p>
      </div>
    </div>
  );
}
