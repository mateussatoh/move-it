import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../styles/pages/Login.module.css";

export default function Home() {
  const router = useRouter();
  async function requestGitHubAuth() {
    const CODE_REQUEST = `https://github.com/login/oauth/authorize?client_id=ccdf4574d42179bf1727&redirect_uri=https://move-it-nlw.vercel.app/`;
    router.push(CODE_REQUEST);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Login | move.it</title>
      </Head>
      <img src="symbol.svg" alt="Logo stripes" />
      <div>
        <img src="logo-full-white.svg" alt="Full logo" />
        <strong>Bem-vindo</strong>
        <p>Faça login com o seu GitHub para começar</p>
        <button type="button" onClick={requestGitHubAuth}>
          <img src="github.png" alt="GitHub logo" />
          Continuar com o GitHub
        </button>
      </div>
    </div>
  );
}
