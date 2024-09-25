// takopedia\src\db\config.ts

import { MongoClient } from "mongodb";

const uri = process.env.MONGODB
const client = new MongoClient(uri as string)
export const db = client.db("takopedia_db")