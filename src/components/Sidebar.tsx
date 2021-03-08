import styles from "../styles/components/Sidebar.module.css";

import { signOut, useSession } from "next-auth/client";

import { useRouter } from "next/router";

import Cookies from "js-cookie";

export function Sidebar() {
  const router = useRouter();
  const [session, loading] = useSession();

  return (
    <div className={styles.container}>
      <img src="/logo.png" alt="Logo" />
      <button
        type="button"
        onClick={(event) => {
          event.preventDefault();
          router.push("/leaderboard");
        }}
      >
        <img src="/icons/award.svg" alt="award" />
      </button>
      <button
        type="button"
        onClick={(event) => {
          event.preventDefault();
          router.push("/");
        }}
      >
        <img src="/icons/home.svg" alt="home" />
      </button>
      {session && (
        <div className={styles.logout}>
          <button
            type="button"
            onClick={(event) => {
              event.preventDefault();
              Cookies.remove("level");
              Cookies.remove("experience");
              Cookies.remove("totalExperience");
              Cookies.remove("completedChallenges");
              Cookies.remove("cookieAvatarUrl");
              Cookies.remove("cookieName");

              signOut();
            }}
          >
            <img src="/icons/close-white.png" alt="Signout" />
          </button>
        </div>
      )}
    </div>
  );
}
