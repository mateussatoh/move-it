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
  const sort = { level: -1 };

  const cursor = collection.find({}).sort(sort);

  const data = await cursor.toArray();

  return response.json({
    user: data,
  });
};
