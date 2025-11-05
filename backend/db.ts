import { MongoClient, Db } from 'mongodb';

// Connection string provided by the user
const MONGODB_URI = 'mongodb+srv://harrysong518_db_user:1MFRHx5FLH1t7Ttr@translasensecluster.np2jq4m.mongodb.net/?appName=TranslaSenseCluster';

let cachedClient: MongoClient | null = null;
let connectPromise: Promise<MongoClient> | null = null;

export async function getMongoClient(): Promise<MongoClient> {
  if (cachedClient) {
    return cachedClient;
  }

  if (!connectPromise) {
    const client = new MongoClient(MONGODB_URI);
    connectPromise = client.connect().then((connected) => {
      cachedClient = connected;
      return connected;
    });
  }

  return connectPromise;
}

export async function getDatabase(dbName: string): Promise<Db> {
  const client = await getMongoClient();
  return client.db(dbName);
}

export async function closeMongoClient(): Promise<void> {
  if (cachedClient) {
    await cachedClient.close();
    cachedClient = null;
    connectPromise = null;
  }
}


