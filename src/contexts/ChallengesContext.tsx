import { createContext, useState, ReactNode } from "react";

import challenges from "../../challenges.json";

interface ChallengesProviderProps {
  children: ReactNode;
}

interface ChallengesContextData {
  data: {
    level: number;
    experience: number;
    experienceToNextLevel: number;
    completedChallenges: number;
    activeChallenge: {
      type: "body" | "eye";
      description: string;
      amount: number;
    };
  };
  functions: {
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
  };
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }: ChallengesProviderProps) {
  const [level, setLevel] = useState(1);
  const [experience, setExperience] = useState(10);
  const [completedChallenges, setCompletedChallenges] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState(null);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  function levelUp() {
    setLevel(level + 1);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const newChallenge = challenges[randomChallengeIndex];
    setActiveChallenge(newChallenge);
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  return (
    <ChallengesContext.Provider
      value={{
        data: {
          level,
          experience,
          experienceToNextLevel,
          completedChallenges,
          activeChallenge,
        },
        functions: {
          levelUp,
          startNewChallenge,
          resetChallenge,
        },
      }}
    >
      {children}
    </ChallengesContext.Provider>
  );
}
