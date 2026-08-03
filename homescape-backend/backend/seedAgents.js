/**
 * seedAgents.js – Idempotent backfill script (Feature 3).
 *
 * - Ensures a default set of Agents exists.
 * - Assigns a default agent to every Property that does NOT already have one.
 *
 * Run:  node seedAgents.js
 */
import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import connectDB from "./config/db.js";
import Agent from "./models/Agent.js";
import Property from "./models/Property.js";

const DEFAULT_AGENTS = [
  {
    name: "Ravi Sharma",
    email: "ravi.sharma@homescape.com",
    phone: "+91 98765 43210",
    photo:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
    bio: "12+ years helping families find their forever home across Mumbai and Pune.",
  },
  {
    name: "Priya Verma",
    email: "priya.verma@homescape.com",
    phone: "+91 91234 56780",
    photo:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
    bio: "Luxury residential specialist focused on Bengaluru and Chennai.",
  },
  {
    name: "Arjun Kapoor",
    email: "arjun.kapoor@homescape.com",
    phone: "+91 99887 76655",
    photo:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
    bio: "Commercial & plot expert – NCR and Hyderabad.",
  },
];

const run = async () => {
  await connectDB();

  // 1. Upsert default agents
  const agents = [];
  for (const a of DEFAULT_AGENTS) {
    const existing = await Agent.findOne({ email: a.email });
    if (existing) {
      agents.push(existing);
      console.log(`Agent already exists: ${a.email}`);
    } else {
      const created = await Agent.create(a);
      agents.push(created);
      console.log(`Created agent: ${a.email}`);
    }
  }

  const defaultAgent = agents[0];

  // 2. Backfill – assign an agent to every property that has none
  const orphanProps = await Property.find({
    $or: [{ agent: null }, { agent: { $exists: false } }],
  });

  console.log(`\nProperties without agent: ${orphanProps.length}`);

  for (let i = 0; i < orphanProps.length; i++) {
    // Round-robin across default agents so listings are distributed
    const chosen = agents[i % agents.length] || defaultAgent;
    orphanProps[i].agent = chosen._id;
    await orphanProps[i].save();
  }

  console.log(`Backfilled ${orphanProps.length} properties.`);

  await mongoose.disconnect();
  console.log("\n✅ Backfill complete.");
  process.exit(0);
};

run().catch((err) => {
  console.error("Backfill error:", err);
  process.exit(1);
});