import Head from "next/head";
import { GetServerSideProps } from "next";

import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { Countdown } from "../components/Countdown";
import { CompletedChallanges } from "../components/CompletedChallanges";
import { ChallengeBox } from "../components/ChallengeBox";
import { Sidebar } from "../components/Sidebar";

import homeStyles from "../styles/pages/Home.module.css";

import { CountdownProvider } from "../contexts/CountdownContext";
import { ChallengesProvider } from "../contexts/ChallengesContext";
import { ProfileProvider } from "../contexts/ProfileContext";

interface ChallengesPageProps {
  level: number;
  experience: number;
  completedChallenges: number;
}

import { useSession } from "next-auth/client";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function ChallengesPage(props: ChallengesPageProps) {
  const [session, loading] = useSession();
  const router = useRouter();

  return (
    <>
      {!session &&
        useEffect(() => {
          if (!session) {
            router.push("/login");
          }
        }, [])}
      {session && (
        <>
          <Head>
            <title>Início | move.it</title>
          </Head>
          <ProfileProvider
            avatarUrl={session.user.image}
            name={session.user.name}
          >
            <ChallengesProvider
              level={props.level}
              experience={props.experience}
              completedChallenges={props.completedChallenges}
            >
              <div className={homeStyles.container}>
                <Sidebar />
                <ExperienceBar />

                <CountdownProvider>
                  <section>
                    <div>
                      <Profile />
                      <CompletedChallanges />
                      <Countdown />
                    </div>
                    <div>
                      <ChallengeBox />
                    </div>
                  </section>
                </CountdownProvider>
              </div>
            </ChallengesProvider>
          </ProfileProvider>
        </>
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { cookies } = context.req;
  const { level, experience, completedChallenges } = cookies;

  return {
    props: {
      level: Number(level),
      experience: Number(experience),
      completedChallenges: Number(completedChallenges),
    },
  };
};
