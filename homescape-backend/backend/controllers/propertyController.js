// import mongoose from "mongoose";
// import Property from "../models/Property.js";

// // GET /api/properties  (supports filters: location, type, minPrice, maxPrice)
// export const getProperties = async (req, res) => {
//   const { location, type, minPrice, maxPrice } = req.query;
//   const filter = {};

//   if (location) filter.location = { $regex: location, $options: "i" };
//   if (type) filter.type = type;
//   if (minPrice || maxPrice) {
//     filter.price = {};
//     if (minPrice) filter.price.$gte = Number(minPrice);
//     if (maxPrice) filter.price.$lte = Number(maxPrice);
//   }

//   const properties = await Property.find(filter)
//     .populate("owner", "name email role")
//     .sort({ createdAt: -1 });

//   res.json(properties);
// };

// // GET /api/properties/compare?ids=id1,id2,id3
// export const compareProperties = async (req, res) => {
//   const { ids } = req.query;
//   if (!ids) {
//     return res.status(400).json({ message: "ids query param is required" });
//   }
//   const idList = ids
//     .split(",")
//     .map((s) => s.trim())
//     .filter((s) => mongoose.isValidObjectId(s));

//   if (idList.length === 0) {
//     return res.status(400).json({ message: "No valid ids provided" });
//   }

//   const properties = await Property.find({ _id: { $in: idList } }).populate(
//     "owner",
//     "name email role"
//   );
//   res.json(properties);
// };

// // GET /api/properties/:id
// export const getPropertyById = async (req, res) => {
//   if (!mongoose.isValidObjectId(req.params.id)) {
//     return res.status(400).json({ message: "Invalid property id" });
//   }
//   const property = await Property.findById(req.params.id).populate(
//     "owner",
//     "name email role"
//   );
//   if (!property) return res.status(404).json({ message: "Property not found" });
//   res.json(property);
// };

// // POST /api/properties  (auth required)
// export const createProperty = async (req, res) => {
//   const {
//     title,
//     type,
//     price,
//     location,
//     bedrooms,
//     bathrooms,
//     area,
//     description,
//     image,
//   } = req.body;

//   if (!title || !type || price === undefined || !location) {
//     return res.status(400).json({
//       message: "title, type, price and location are required",
//     });
//   }

//   const property = await Property.create({
//     title,
//     type,
//     price,
//     location,
//     bedrooms,
//     bathrooms,
//     area,
//     description,
//     image,
//     owner: req.user._id,
//   });

//   res.status(201).json(property);
// };

// // PUT /api/properties/:id  (owner only)
// export const updateProperty = async (req, res) => {
//   if (!mongoose.isValidObjectId(req.params.id)) {
//     return res.status(400).json({ message: "Invalid property id" });
//   }
//   const property = await Property.findById(req.params.id);
//   if (!property) return res.status(404).json({ message: "Property not found" });

//   if (property.owner.toString() !== req.user._id.toString()) {
//     return res
//       .status(403)
//       .json({ message: "You are not allowed to update this property" });
//   }

//   const fields = [
//     "title",
//     "type",
//     "price",
//     "location",
//     "bedrooms",
//     "bathrooms",
//     "area",
//     "description",
//     "image",
//   ];
//   fields.forEach((f) => {
//     if (req.body[f] !== undefined) property[f] = req.body[f];
//   });

//   const updated = await property.save();
//   res.json(updated);
// };

// // DELETE /api/properties/:id  (owner only)
// export const deleteProperty = async (req, res) => {
//   if (!mongoose.isValidObjectId(req.params.id)) {
//     return res.status(400).json({ message: "Invalid property id" });
//   }
//   const property = await Property.findById(req.params.id);
//   if (!property) return res.status(404).json({ message: "Property not found" });

//   if (property.owner.toString() !== req.user._id.toString()) {
//     return res
//       .status(403)
//       .json({ message: "You are not allowed to delete this property" });
//   }

//   await property.deleteOne();
//   res.json({ message: "Property removed" });
// };


import mongoose from "mongoose";
import Property from "../models/Property.js";
import { uploadToCloudinary } from "../config/cloudinary.js";

/**
 * GET /api/properties
 * Supported query filters (Feature 1 – Advanced Search):
 *   location   – case-insensitive contains
 *   type       – exact property type
 *   minPrice   – price >=
 *   maxPrice   – price <=
 *   bedrooms   – bedrooms >= (min bedrooms)
 *   bathrooms  – bathrooms >= (min bathrooms)
 *   sort       – "latest" (default) | "price_asc" | "price_desc"
 */
export const getProperties = async (req, res) => {
  const {
    location,
    type,
    minPrice,
    maxPrice,
    bedrooms,
    bathrooms,
    sort,
  } = req.query;

  const filter = {};

  if (location) filter.location = { $regex: location, $options: "i" };
  if (type) filter.type = type;

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice !== undefined && minPrice !== "")
      filter.price.$gte = Number(minPrice);
    if (maxPrice !== undefined && maxPrice !== "")
      filter.price.$lte = Number(maxPrice);
  }

  if (bedrooms !== undefined && bedrooms !== "") {
    filter.bedrooms = { $gte: Number(bedrooms) };
  }
  if (bathrooms !== undefined && bathrooms !== "") {
    filter.bathrooms = { $gte: Number(bathrooms) };
  }

  // Sort options
  let sortOption = { createdAt: -1 }; // latest
  if (sort === "price_asc") sortOption = { price: 1 };
  else if (sort === "price_desc") sortOption = { price: -1 };

  const properties = await Property.find(filter)
    .populate("owner", "name email role")
    .populate("agent", "name email phone photo")
    .sort(sortOption);

  res.json(properties);
};

/**
 * GET /api/properties/compare?ids=id1,id2,id3,id4
 * Feature 2 – Property Comparison (up to 4 ids)
 */
export const compareProperties = async (req, res) => {
  const { ids } = req.query;
  if (!ids) {
    return res.status(400).json({ message: "ids query param is required" });
  }
  const idList = ids
    .split(",")
    .map((s) => s.trim())
    .filter((s) => mongoose.isValidObjectId(s))
    .slice(0, 4); // cap at 4

  if (idList.length === 0) {
    return res.status(400).json({ message: "No valid ids provided" });
  }

  const properties = await Property.find({ _id: { $in: idList } })
    .populate("owner", "name email role")
    .populate("agent", "name email phone photo");

  // Preserve requested order
  const map = new Map(properties.map((p) => [String(p._id), p]));
  const ordered = idList.map((id) => map.get(id)).filter(Boolean);
  res.json(ordered);
};

// GET /api/properties/:id
export const getPropertyById = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "Invalid property id" });
  }
  const property = await Property.findById(req.params.id)
    .populate("owner", "name email role")
    .populate("agent", "name email phone photo bio");
  if (!property) return res.status(404).json({ message: "Property not found" });
  res.json(property);
};

// POST /api/properties  (auth required)
export const createProperty = async (req, res) => {
  try {
    const {
      title,
      type,
      price,
      location,
      bedrooms,
      bathrooms,
      area,
      description,
      image,
      agent,
    } = req.body;

    if (!title || !type || price === undefined || !location) {
      return res.status(400).json({
        message: "title, type, price and location are required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Property image is required.",
      });
    }

    const uploadResult = await uploadToCloudinary(req.file.buffer, req.file.originalname);

    const property = await Property.create({
      title: String(title).trim(),
      type,
      price: Number(price),
      location: String(location).trim(),
      bedrooms: bedrooms === "" || bedrooms === undefined ? 0 : Number(bedrooms),
      bathrooms: bathrooms === "" || bathrooms === undefined ? 0 : Number(bathrooms),
      area: area === "" || area === undefined ? 0 : Number(area),
      description: description || "",
      image: uploadResult.secure_url,
      owner: req.user._id,
      agent: agent && mongoose.isValidObjectId(agent) ? agent : null,
    });

    return res.status(201).json(property);
  } catch (error) {
    return res.status(400).json({
      message: error.message || "Unable to create property. Please check your image and details.",
    });
  }
};

// PUT /api/properties/:id  (owner only)
export const updateProperty = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "Invalid property id" });
  }

  const property = await Property.findById(req.params.id);
  if (!property) return res.status(404).json({ message: "Property not found" });

  if (property.owner.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Forbidden" });
  }

  const fields = [
    "title",
    "type",
    "price",
    "location",
    "bedrooms",
    "bathrooms",
    "area",
    "description",
    "image",
    "agent",
  ];
  fields.forEach((f) => {
    if (req.body[f] !== undefined) property[f] = req.body[f];
  });

  const updated = await property.save();
  res.json(updated);
};

// DELETE /api/properties/:id  (owner only)
export const deleteProperty = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "Invalid property id" });
  }

  const property = await Property.findById(req.params.id);
  if (!property) return res.status(404).json({ message: "Property not found" });

  if (property.owner.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Forbidden" });
  }

  await property.deleteOne();
  res.json({ message: "Property removed" });
};