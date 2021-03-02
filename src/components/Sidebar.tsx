import styles from "../styles/components/Sidebar.module.css";

import { signIn, signOut, useSession } from "next-auth/client";

export function Sidebar() {
  return (
    <div className={styles.container}>
      <img src="/logo.png" alt="Logo" />
      <img src="/icons/award.svg" alt="award" />
      <img src="/icons/home.svg" alt="home" />
      <button type="button" onClick={() => signOut()}>
        <img src="/icons/close-white.png" alt="Signout" />
      </button>
    </div>
  );
}
