import { NowRequest, NowResponse } from "@vercel/node";

import { MongoClient } from "mongodb";

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

  const { name } = request.body;

  const user = await collection.findOne({
    name: name,
  });

  return response.json({ user });
};
