import Head from "next/head";

import styles from "../../styles/pages/Login.module.css";

import { signIn, signOut, useSession } from "next-auth/client";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const [session, loading] = useSession();
  const router = useRouter();

  return (
    <>
      {!session && (
        <>
          <Head>
            <title>Login | move.it</title>
          </Head>
          <div className={styles.container}>
            <img src="symbol.svg" alt="Logo stripes" />
            <div>
              <img src="logo-full-white.svg" alt="Full logo" />
              <strong>Bem-vindo</strong>
              <p>Faça login para continuar</p>
              <button
                className={styles.github}
                type="button"
                onClick={() => signIn("github")}
              >
                <img src="github.png" alt="GitHub logo" />
                Continuar com o GitHub
              </button>
              <button
                className={styles.google}
                type="button"
                onClick={() => signIn("google")}
              >
                <img src="google.png" alt="Google logo" />
                Continuar com o Google
              </button>
              <strong>ou</strong>
              <button
                className={styles.leaderboard}
                type="button"
                onClick={() => router.push("/leaderboard")}
              >
                <img src="/icons/medal.png" alt="Google logo" />
                Veja o placar geral
              </button>
            </div>
          </div>
        </>
      )}
      {session &&
        useEffect(() => {
          if (session) {
            router.push("/");
          }
        }, [])}
    </>
  );
}
