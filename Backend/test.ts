import 'dotenv/config';
import mongoose from 'mongoose';

const URI = process.env.MONGO_URI;
if (!URI) {
  console.error('MONGO_URI not set in environment (.env)');
  process.exit(1);
}

async function main() {
  try {
    // assert URI is string for TS
    await mongoose.connect(URI as string);

    const db = mongoose.connection.db;
    if (!db) {
      throw new Error('mongoose.connection.db is undefined');
    }

    console.log('Connected to MongoDB');

    const collections = await db.listCollections().toArray();
    if (collections.length === 0) {
      console.log('No collections found');
      return;
    }

    for (const coll of collections) {
      const name = coll.name;
      const collection = db.collection(name);
      const count = await collection.countDocuments();
      console.log(`\nCollection: ${name} — count: ${count}`);

      const samples = await collection.find().limit(5).toArray();
      console.log('Samples:', samples);
    }
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected');
  }
}

main().catch((e) => {
  console.error('Unhandled error:', e);
  process.exit(1);
});