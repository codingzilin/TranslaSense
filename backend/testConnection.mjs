import 'dotenv/config';
import { MongoClient } from 'mongodb';

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('Missing MONGODB_URI environment variable');
    process.exit(1);
  }

  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('admin');
    const result = await db.command({ ping: 1 });
    console.log('MongoDB ping result:', result);
    console.log('✅ Connection successful');
  } catch (err) {
    console.error('❌ Connection failed');
    console.error(err);
    process.exitCode = 1;
  } finally {
    await client.close().catch(() => {});
  }
}

main();


