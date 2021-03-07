import { NowRequest, NowResponse } from "@vercel/node";

import { MongoClient } from "mongodb";

export default async (request: NowRequest, response: NowResponse) => {
  const { name } = request.body;

  const client = await MongoClient.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = client.db("moveit-database");
  const collection = db.collection("userinfo");

  const user = await collection
    .findOne({
      name: name,
    })
    .finally(() => {
      client.close();
    });

  return response.json({ user });
};
