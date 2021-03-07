import Head from "next/head";
import { LeaderboardCard } from "../../components/LeaderboardCard";
import { Sidebar } from "../../components/Sidebar";
import styles from "../../styles/pages/Leaderboard.module.css";

import axios from "axios";

import { useEffect } from "react";
import { GetServerSideProps, GetStaticProps } from "next";

import { MongoClient } from "mongodb";

export default function Leaderboard({ data }) {
  return (
    <>
      <Head>
        <title>Placar | move.it</title>
      </Head>
      <Sidebar />
      <div className={styles.container}>
        <h1>Leaderboard</h1>
        <div>
          <p>Posição</p>
          <p>Usuário</p>
          <p>Desafios</p>
          <p>Experiência</p>
        </div>
        <div>
          {data.map((userData) => {
            return (
              <LeaderboardCard
                name={userData.name}
                avatarUrl={userData.avatarUrl}
                completedChallenges={userData.completedChallenges}
                totalExperience={userData.totalExperience}
                level={userData.level}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const client = await MongoClient.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = client.db("moveit-database");
  const collection = db.collection("userinfo");
  const sort = { totalExperience: -1 };
  const projection = {
    _id: 0,
    name: 1,
    avatarUrl: 1,
    completedChallenges: 1,
    experience: 1,
    totalExperience: 1,
    level: 1,
  };

  const cursor = collection.find({}).sort(sort).project(projection);

  const data = await cursor.toArray().finally(() => {
    client.close();
  });

  return {
    props: {
      data,
    },
  };
};
