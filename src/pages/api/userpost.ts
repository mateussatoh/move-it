import { NowRequest, NowResponse } from "@vercel/node";

import { MongoClient } from "mongodb";

export default async (request: NowRequest, response: NowResponse) => {
  const client = await MongoClient.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = client.db("moveit-database");
  const collection = db.collection("userinfo");

  const {
    name,
    avatarUrl,
    level,
    experience,
    totalExperience,
    completedChallenges,
  } = request.body;

  const query = { name: name };
  const update = {
    $set: {
      avatarUrl: avatarUrl,
      level: level,
      experience: experience,
      totalExperience: totalExperience,
      completedChallenges: completedChallenges,
    },
  };
  const options = { upsert: true };

  await collection.updateOne(query, update, options).finally(() => {
    client.close();
  });

  return response.status(201).json({ wasSend: true });
};
