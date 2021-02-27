import Head from "next/head";
import { GetServerSideProps } from "next";

import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { Countdown } from "../components/Countdown";
import { CompletedChallanges } from "../components/CompletedChallanges";
import { ChallengeBox } from "../components/ChallengeBox";

import styles from "../styles/pages/Home.module.css";
import { CountdownProvider } from "../contexts/CountdownContext";
import { ChallengesProvider } from "../contexts/ChallengesContext";

import axios from "axios";
import Cookies from "js-cookie";
import { ProfileProvider } from "../contexts/ProfileContext";
import { useRouter } from "next/router";

interface ChallengesPageProps {
  hasQuery: boolean;
  hasCookies: boolean;
  avatar_url: string;
  name: string;
  level: number;
  experience: number;
  completedChallenges: number;
}

export default function ChallengesPage(props: ChallengesPageProps) {
  const router = useRouter();

  const pushToLoginPage = async () => {
    router.push("/login");
  };

  if (props.hasQuery || props.hasCookies) {
    return (
      <ChallengesProvider
        level={props.level}
        experience={props.experience}
        completedChallenges={props.completedChallenges}
      >
        <div className={styles.container}>
          <Head>
            <title>Início | move.it</title>
          </Head>
          <ExperienceBar />
          <CountdownProvider>
            <section>
              <div>
                <ProfileProvider avatarUrl={props.avatar_url} name={props.name}>
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
    );
  } else {
    pushToLoginPage();
    return null;
  }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { cookies } = context.req;
  const {
    cookieAvatarUrl,
    cookieName,
    level,
    experience,
    completedChallenges,
  } = cookies;

  const { code } = context.query;

  if (cookieName && cookieAvatarUrl) {
    return {
      props: {
        hasQuery: false,
        hasCookies: true,
        name: cookieName,
        avatar_url: cookieAvatarUrl,
        level: Number(level),
        experience: Number(experience),
        completedChallenges: Number(completedChallenges),
      },
    };
  } else if (code) {
    const clientSecret = process.env.CLIENT_SECRET;
    const ACCESS_TOKEN_REQUEST = `https://github.com/login/oauth/access_token?client_id=ccdf4574d42179bf1727&client_secret=${clientSecret}&code=${code}&redirect_uri=https://move-it-nlw.vercel.app/`;
    const ACCESS_TOKEN_RESPONSE = await axios.get(ACCESS_TOKEN_REQUEST, {
      headers: {
        Accept: "application/json",
      },
    });
    const { access_token } = ACCESS_TOKEN_RESPONSE.data;
    const API_REQUEST = "https://api.github.com/user";
    const API_RESPONSE = await axios.get(API_REQUEST, {
      headers: {
        Authorization: `token ${access_token}`,
      },
    });
    const { data } = API_RESPONSE;
    const { avatar_url, name } = data;

    return {
      props: {
        hasQuery: true,
        hasCookies: false,
        name: name,
        avatar_url: avatar_url,
        level: Number(level),
        experience: Number(experience),
        completedChallenges: Number(completedChallenges),
      },
    };
  } else {
    return {
      props: {
        hasQuery: false,
        hasCookies: false,
        name: null,
        avatar_url: null,
        level: null,
        experience: null,
        completedChallenges: null,
      },
    };
  }
};
