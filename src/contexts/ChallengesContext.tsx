import { createContext, useState, ReactNode, useEffect } from "react";

import Cookies from "js-cookie";

import challenges from "../../challenges.json";
import { LevelUpModal } from "../components/LevelUpModal";

interface ChallengesProviderProps {
  children: ReactNode;
  level: number;
  experience: number;
  completedChallenges: number;
}

interface ChallengesContextData {
  level: number;
  experience: number;
  experienceToNextLevel: number;
  completedChallenges: number;
  activeChallenge: {
    type: "body" | "eye";
    description: string;
    amount: number;
  };
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
  closeModal: () => void;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({
  children,
  ...cookies
}: ChallengesProviderProps) {
  const [level, setLevel] = useState(cookies.level ?? 1);
  const [experience, setExperience] = useState(cookies.experience ?? 0);
  const [completedChallenges, setCompletedChallenges] = useState(
    cookies.completedChallenges ?? 0
  );
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [levelUpModalOpen, setLevelUpModalOpen] = useState(false);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    Cookies.set("level", String(level));
    Cookies.set("experience", String(experience));
    Cookies.set("completedChallenges", String(completedChallenges));
  }, [level, experience, completedChallenges]);

  function levelUp() {
    setLevel(level + 1);
    setLevelUpModalOpen(true);
  }

  function closeModal() {
    setLevelUpModalOpen(false);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const newChallenge = challenges[randomChallengeIndex];
    setActiveChallenge(newChallenge);

    new Audio("/notification.mp3").play();

    if (Notification.permission === "granted") {
      new Notification("Novo desafio 🎉", {
        body: `Valendo ${newChallenge.amount}xp`,
      });
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenge() {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;
    let finalExperience = experience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setExperience(finalExperience);
    setActiveChallenge(null);
    setCompletedChallenges(completedChallenges + 1);
  }

  return (
    <ChallengesContext.Provider
      value={{
        level,
        experience,
        experienceToNextLevel,
        completedChallenges,
        activeChallenge,
        levelUp,
        startNewChallenge,
        resetChallenge,
        completeChallenge,
        closeModal,
      }}
    >
      {children}
      {levelUpModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  );
}
