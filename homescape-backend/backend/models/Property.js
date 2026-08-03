import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    type: {
      type: String,
      required: true,
      enum: ["Apartment", "Villa", "House", "Studio", "Plot", "Commercial"],
    },
    price: { type: Number, required: true, min: 0 },
    location: { type: String, required: true, trim: true },
    bedrooms: { type: Number, default: 0 },
    bathrooms: { type: Number, default: 0 },
    area: { type: Number, default: 0 }, // sq ft
    description: { type: String, default: "" },
    image: { type: String, default: "" }, // URL only
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // NEW: dedicated agent reference (Feature 3)
    agent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agent",
      default: null,
    },
  },
  { timestamps: true }
);

const Property = mongoose.model("Property", propertySchema);
export default Property;
