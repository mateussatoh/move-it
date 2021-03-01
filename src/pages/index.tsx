import Head from "next/head";
import { GetServerSideProps } from "next";

import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { Countdown } from "../components/Countdown";
import { CompletedChallanges } from "../components/CompletedChallanges";
import { ChallengeBox } from "../components/ChallengeBox";

import homeStyles from "../styles/pages/Home.module.css";
import loginStyles from "../styles/pages/Login.module.css";

import { CountdownProvider } from "../contexts/CountdownContext";
import { ChallengesProvider } from "../contexts/ChallengesContext";
import { ProfileProvider } from "../contexts/ProfileContext";

interface ChallengesPageProps {
  level: number;
  experience: number;
  completedChallenges: number;
}

import { signIn, signOut, useSession } from "next-auth/client";

export default function ChallengesPage(props: ChallengesPageProps) {
  const [session, loading] = useSession();
  return (
    <>
      {!session && (
        <>
          <div className={loginStyles.container}>
            <Head>
              <title>Login | move.it</title>
            </Head>
            <img src="symbol.svg" alt="Logo stripes" />
            <div>
              <img src="logo-full-white.svg" alt="Full logo" />
              <strong>Bem-vindo</strong>
              <p>Faça login com o seu GitHub para começar</p>
              <button type="button" onClick={() => signIn("github")}>
                <img src="github.png" alt="GitHub logo" />
                Continuar com o GitHub
              </button>
            </div>
          </div>
        </>
      )}
      {session && (
        <>
          <ChallengesProvider
            level={props.level}
            experience={props.experience}
            completedChallenges={props.completedChallenges}
          >
            <div className={homeStyles.container}>
              <button type="button" onClick={() => signOut()}>
                <img src="/icons/close-white.png" alt="Signout" />
              </button>
              <Head>
                <title>Início | move.it</title>
              </Head>
              <ExperienceBar />

              <CountdownProvider>
                <section>
                  <div>
                    <ProfileProvider
                      avatarUrl={session.user.image}
                      name={session.user.name}
                    >
                      <Profile />
                    </ProfileProvider>
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
