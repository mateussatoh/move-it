import styles from "../styles/components/Sidebar.module.css";

import { signIn, signOut, useSession } from "next-auth/client";

import { useRouter } from "next/router";

export function Sidebar() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <img src="/logo.png" alt="Logo" />
      <button type="button" onClick={() => router.push("/leaderboard")}>
        <img src="/icons/award.svg" alt="award" />
      </button>
      <button type="button" onClick={() => router.push("/")}>
        <img src="/icons/home.svg" alt="home" />
      </button>
      <button type="button" onClick={() => signOut()}>
        <img src="/icons/close-white.png" alt="Signout" />
      </button>
    </div>
  );
}
