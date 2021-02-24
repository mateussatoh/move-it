import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";
import styles from "../styles/components/CompletedChallenges.module.css";

export function CompletedChallanges() {
  const { data } = useContext(ChallengesContext);
  const { completedChallenges } = data;
  return (
    <div className={styles.completedChallengesContainer}>
      <span>Desafios Completos</span>
      <span>{completedChallenges}</span>
    </div>
  );
}
