// import mongoose from "mongoose";
// import Inquiry from "../models/Inquiry.js";
// import Property from "../models/Property.js";

// // POST /api/inquiries
// export const createInquiry = async (req, res) => {
//   const { name, email, phone, message, propertyId } = req.body;

//   if (!name || !email || !phone || !message || !propertyId) {
//     return res.status(400).json({
//       message: "name, email, phone, message and propertyId are required",
//     });
//   }
//   if (!mongoose.isValidObjectId(propertyId)) {
//     return res.status(400).json({ message: "Invalid propertyId" });
//   }

//   const property = await Property.findById(propertyId);
//   if (!property) {
//     return res.status(404).json({ message: "Property not found" });
//   }

//   const inquiry = await Inquiry.create({
//     name,
//     email,
//     phone,
//     message,
//     propertyId,
//   });

//   res.status(201).json(inquiry);
// };

// // GET /api/inquiries  (auth required – returns all inquiries for the logged-in agent's properties)
// export const getInquiries = async (req, res) => {
//   // If user is an agent, return inquiries only for their own properties.
//   // Otherwise (normal user) also scope to their own listed properties (they may be a lister).
//   const myProps = await Property.find({ owner: req.user._id }).select("_id");
//   const propIds = myProps.map((p) => p._id);

//   const inquiries = await Inquiry.find({ propertyId: { $in: propIds } })
//     .populate("propertyId", "title location price")
//     .sort({ createdAt: -1 });

//   res.json(inquiries);
// };

import mongoose from "mongoose";
import Inquiry from "../models/Inquiry.js";
import Property from "../models/Property.js";

// POST /api/inquiries  (Feature 4 – public, no auth needed)
export const createInquiry = async (req, res) => {
  const { name, email, phone, message, propertyId } = req.body;

  if (!name || !email || !phone || !message || !propertyId) {
    return res.status(400).json({
      message: "name, email, phone, message and propertyId are required",
    });
  }
  if (!mongoose.isValidObjectId(propertyId)) {
    return res.status(400).json({ message: "Invalid propertyId" });
  }

  const property = await Property.findById(propertyId).populate("agent");
  if (!property) {
    return res.status(404).json({ message: "Property not found" });
  }

  const inquiry = await Inquiry.create({
    name,
    email,
    phone,
    message,
    propertyId,
    agentId: property.agent ? property.agent._id : null,
  });

  res.status(201).json({
    message: "Inquiry submitted successfully",
    inquiry,
  });
};

// GET /api/inquiries  (auth required – returns inquiries for logged-in user's properties)
export const getInquiries = async (req, res) => {
  const myProps = await Property.find({ owner: req.user._id }).select("_id");
  const propIds = myProps.map((p) => p._id);

  const inquiries = await Inquiry.find({ propertyId: { $in: propIds } })
    .populate("propertyId", "title location price")
    .populate("agentId", "name email phone")
    .sort({ createdAt: -1 });

  res.json(inquiries);
};