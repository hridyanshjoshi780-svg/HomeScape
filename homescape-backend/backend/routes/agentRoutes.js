import express from "express";
import {
  getAgents,
  getAgentById,
  createAgent,
} from "../controllers/agentController.js";

const router = express.Router();

router.route("/").get(getAgents).post(createAgent);
router.get("/:id", getAgentById);

export default router;