import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../models/User.js";
import Property from "../models/Property.js";

// Protect routes – require valid JWT
export const protect = async (req, res, next) => {
  try {
    let token;
    const auth = req.headers.authorization;
    if (auth && auth.startsWith("Bearer ")) {
      token = auth.split(" ")[1];
    }
    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Not authorized, token invalid or expired" });
  }
};

export const authorizePropertyOwner = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid property id" });
    }

    const property = await Property.findById(id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    if (!req.user || property.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Forbidden" });
    }

    req.property = property;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Unable to authorize property owner" });
  }
};

// Restrict to specific roles (e.g., 'agent')
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Forbidden: insufficient role" });
    }
    next();
  };
};
