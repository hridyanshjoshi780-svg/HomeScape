import express from "express";
import {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  compareProperties,
} from "../controllers/propertyController.js";
import { protect, authorizePropertyOwner } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// NOTE: /compare must be declared BEFORE /:id to avoid route conflict.
router.get("/compare", compareProperties);

router
  .route("/")
  .get(getProperties)
  .post(protect, upload.single("image"), createProperty);

router
  .route("/:id")
  .get(getPropertyById)
  .put(protect, authorizePropertyOwner, updateProperty)
  .delete(protect, authorizePropertyOwner, deleteProperty);

export default router;
