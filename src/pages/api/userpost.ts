import { NowRequest, NowResponse } from "@vercel/node";

import { MongoClient, Db } from "mongodb";

async function conectToDatabase(uri: string) {
  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = client.db("moveit-database");

  return db;
}

export default async (request: NowRequest, response: NowResponse) => {
  const db = await conectToDatabase(process.env.MONGODB_URI);
  const collection = db.collection("userinfo");

  const {
    name,
    avatarUrl,
    level,
    experience,
    completedChallenges,
  } = request.body;

  const query = { name: name };
  const update = {
    $set: {
      avatarUrl: avatarUrl,
      level: level,
      experience: experience,
      completedChallenges: completedChallenges,
    },
  };
  const options = { upsert: true };

  await collection.updateOne(query, update, options);

  return response.status(201).json({ wasSend: true });
};
