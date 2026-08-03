import mongoose from "mongoose";
import Agent from "../models/Agent.js";
import Property from "../models/Property.js";

// GET /api/agents – all agents
export const getAgents = async (req, res) => {
  const agents = await Agent.find().sort({ createdAt: -1 });
  res.json(agents);
};

// GET /api/agents/:id – agent details + their listed properties
export const getAgentById = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "Invalid agent id" });
  }

  const agent = await Agent.findById(req.params.id);
  if (!agent) return res.status(404).json({ message: "Agent not found" });

  const properties = await Property.find({ agent: agent._id }).sort({
    createdAt: -1,
  });

  res.json({
    _id: agent._id,
    name: agent.name,
    email: agent.email,
    phone: agent.phone,
    photo: agent.photo,
    bio: agent.bio,
    createdAt: agent.createdAt,
    properties,
  });
};

// POST /api/agents – create agent (open for now, admin later)
export const createAgent = async (req, res) => {
  const { name, email, phone, photo, bio } = req.body;
  if (!name || !email || !phone) {
    return res
      .status(400)
      .json({ message: "name, email and phone are required" });
  }
  const exists = await Agent.findOne({ email });
  if (exists) {
    return res.status(400).json({ message: "Agent email already exists" });
  }
  const agent = await Agent.create({ name, email, phone, photo, bio });
  res.status(201).json(agent);
};