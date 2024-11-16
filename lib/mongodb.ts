import { MongoClient, ServerApiVersion } from 'mongodb';

if (!process.env.DB_USERNAME || !process.env.DB_PASSWORD) {
  throw new Error('Please add your MongoDB credentials to .env file');
}

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.aakl4py.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
};

declare global {
  let _mongoClientPromise: Promise<MongoClient> | undefined;
}

class Singleton {
  private static _instance: Promise<MongoClient>;

  public static getInstance(): Promise<MongoClient> {
    if (!this._instance) {
      const client = new MongoClient(uri, options);
      this._instance = client.connect();
    }
    return this._instance;
  }
}
const clientPromise = process.env.NODE_ENV === 'development'
  ? (globalThis as { _mongoClientPromise?: Promise<MongoClient> })._mongoClientPromise
  || ((globalThis as { _mongoClientPromise?: Promise<MongoClient> })._mongoClientPromise = Singleton.getInstance())
  : Singleton.getInstance();

export default clientPromise;
