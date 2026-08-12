import dns from 'node:dns';
dns.setServers(['8.8.8.8', '8.8.4.4'])
import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import cors from 'cors';
import 'dotenv/config';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const uri = process.env.MONGODB_URI;

// 1. Create a single database client instance
const client = new MongoClient(uri);

// 2. Connect to MongoDB ONCE when the server starts up
async function startServer() {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB!");

    // Start listening for web requests ONLY after the database is ready
    app.listen(PORT, () => {
      console.log(`Backend server running at: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB startup:", error);
    process.exit(1); // Stop the app if it can't connect
  }
}

// ROUTE 1: Find Documents (Cleaned up - no client.close() anymore)
app.post('/api/data/find', async (req, res) => {
  try {
    const db = client.db(req.body.database);
    const collection = db.collection(req.body.collection);
    
    const queryFilter = req.body.filter || {};
    const documents = await collection.find(queryFilter).toArray();
    
    res.json({ success: true, documents });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ROUTE 2: Update Document (Cleaned up - no client.close() anymore)
app.post('/api/data/update-by-name', async (req, res) => {
  try {
    const db = client.db(req.body.database);
    const collection = db.collection(req.body.collection);

    // Filter directly by the text name provided by the frontend
    const itemFilter = { name: req.body.name }; 
    
    const updateRule = { $set: req.body.updatedFields };

    // Updates the FIRST item that matches this name
    const result = await collection.updateOne(itemFilter, updateRule);

    if (result.matchedCount === 0) {
      return res.status(404).json({ success: false, error: "No item found with that name" });
    }

    res.json({ success: true, modifiedCount: result.modifiedCount });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


app.post('/api/data/update', async (req, res) => {
  const { database, collection, filter, update } = req.body;

  try {
    const db = client.db(database);
    const col = db.collection(collection);

    // Updates the item and returns the updated document instantly
    const result = await col.findOneAndUpdate(
      filter, 
      update, 
      { returnDocument: 'after' } 
    );

    if (!result) {
      return res.status(404).json({ success: false, error: "Item not found" });
    }

    res.status(200).json({
      success: true,
      document: result
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 3. Run the startup sequence
startServer()

