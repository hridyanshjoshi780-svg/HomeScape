// import dotenv from "dotenv";
// dotenv.config();

// import mongoose from "mongoose";
// import connectDB from "./config/db.js";
// import User from "./models/User.js";
// import Property from "./models/Property.js";
// import Inquiry from "./models/Inquiry.js";

// const run = async () => {
//   await connectDB();

//   console.log("Clearing existing data...");
//   await Promise.all([
//     User.deleteMany({}),
//     Property.deleteMany({}),
//     Inquiry.deleteMany({}),
//   ]);

//   console.log("Seeding users...");
//   const agent = await User.create({
//     name: "Ravi Sharma",
//     email: "agent@homescape.com",
//     password: "Agent@123",
//     role: "agent",
//   });
//   const user = await User.create({
//     name: "Priya Verma",
//     email: "user@homescape.com",
//     password: "User@123",
//     role: "user",
//   });

//   console.log("Seeding properties...");
//   const propertyData = [
//     {
//       title: "Sea-view 3BHK Apartment",
//       type: "Apartment",
//       price: 12500000,
//       location: "Mumbai",
//       bedrooms: 3,
//       bathrooms: 2,
//       area: 1450,
//       description: "Spacious apartment with panoramic sea views in Bandra.",
//       image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
//     },
//     {
//       title: "Luxury Villa with Pool",
//       type: "Villa",
//       price: 45000000,
//       location: "Goa",
//       bedrooms: 5,
//       bathrooms: 5,
//       area: 4800,
//       description: "Private pool villa, 5 minutes from the beach.",
//       image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
//     },
//     {
//       title: "Modern Studio near Metro",
//       type: "Studio",
//       price: 3800000,
//       location: "Bangalore",
//       bedrooms: 1,
//       bathrooms: 1,
//       area: 480,
//       description: "Fully furnished studio ideal for professionals.",
//       image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
//     },
//     {
//       title: "Family House in Suburbs",
//       type: "House",
//       price: 8500000,
//       location: "Pune",
//       bedrooms: 4,
//       bathrooms: 3,
//       area: 2200,
//       description: "Quiet neighbourhood with garden and 2-car parking.",
//       image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800",
//     },
//     {
//       title: "Commercial Office Space",
//       type: "Commercial",
//       price: 22000000,
//       location: "Delhi",
//       bedrooms: 0,
//       bathrooms: 2,
//       area: 1800,
//       description: "Ready-to-move office in Connaught Place.",
//       image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
//     },
//     {
//       title: "Residential Plot",
//       type: "Plot",
//       price: 6500000,
//       location: "Hyderabad",
//       bedrooms: 0,
//       bathrooms: 0,
//       area: 2400,
//       description: "Corner plot in gated community, clear titles.",
//       image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
//     },
//     {
//       title: "Penthouse with Terrace",
//       type: "Apartment",
//       price: 35000000,
//       location: "Mumbai",
//       bedrooms: 4,
//       bathrooms: 4,
//       area: 3200,
//       description: "Duplex penthouse with private terrace and jacuzzi.",
//       image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
//     },
//     {
//       title: "Budget 2BHK Flat",
//       type: "Apartment",
//       price: 4200000,
//       location: "Ahmedabad",
//       bedrooms: 2,
//       bathrooms: 2,
//       area: 950,
//       description: "Well-ventilated flat in a family-friendly society.",
//       image: "https://images.unsplash.com/photo-1494526585095-c41746248156?w=800",
//     },
//     {
//       title: "Heritage Bungalow",
//       type: "House",
//       price: 28000000,
//       location: "Jaipur",
//       bedrooms: 6,
//       bathrooms: 5,
//       area: 5000,
//       description: "Restored heritage bungalow with courtyard.",
//       image: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800",
//     },
//     {
//       title: "Beachside Villa",
//       type: "Villa",
//       price: 62000000,
//       location: "Chennai",
//       bedrooms: 4,
//       bathrooms: 4,
//       area: 3800,
//       description: "Direct beach access, fully furnished, ECR.",
//       image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800",
//     },
//   ];

//   const properties = await Property.insertMany(
//     propertyData.map((p) => ({ ...p, owner: agent._id }))
//   );

//   console.log("Seeding inquiries...");
//   await Inquiry.insertMany([
//     {
//       name: "Amit Patel",
//       email: "amit@example.com",
//       phone: "9876543210",
//       message: "Interested in a site visit this weekend.",
//       propertyId: properties[0]._id,
//     },
//     {
//       name: "Neha Gupta",
//       email: "neha@example.com",
//       phone: "9123456780",
//       message: "Is the price negotiable?",
//       propertyId: properties[1]._id,
//     },
//     {
//       name: "Rohit Singh",
//       email: "rohit@example.com",
//       phone: "9988776655",
//       message: "Please share more photos and floor plan.",
//       propertyId: properties[3]._id,
//     },
//     {
//       name: "Kavya Iyer",
//       email: "kavya@example.com",
//       phone: "9012345678",
//       message: "Looking for a long-term rental option.",
//       propertyId: properties[2]._id,
//     },
//     {
//       name: "Vikram Rao",
//       email: "vikram@example.com",
//       phone: "9765432109",
//       message: "What documents are ready for the plot?",
//       propertyId: properties[5]._id,
//     },
//   ]);

//   console.log("\n✅ Seed complete!");
//   console.log("Sample credentials:");
//   console.log("  Agent -> agent@homescape.com / Agent@123");
//   console.log("  User  -> user@homescape.com  / User@123");

//   await mongoose.disconnect();
//   process.exit(0);
// };

// run().catch((err) => {
//   console.error("Seed error:", err);
//   process.exit(1);
// });


import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import connectDB from "./config/db.js";
import User from "./models/User.js";
import Property from "./models/Property.js";
import Inquiry from "./models/Inquiry.js";
import Agent from "./models/Agent.js";

const run = async () => {
  await connectDB();

  console.log("Clearing existing data...");
  await Promise.all([
    User.deleteMany({}),
    Property.deleteMany({}),
    Inquiry.deleteMany({}),
    Agent.deleteMany({}),
  ]);

  console.log("Seeding users...");
  const owner = await User.create({
    name: "Ravi Sharma",
    email: "agent@homescape.com",
    password: "Agent@123",
    role: "agent",
  });
  await User.create({
    name: "Priya Verma",
    email: "user@homescape.com",
    password: "User@123",
    role: "user",
  });

  console.log("Seeding agents (Feature 3)...");
  const agents = await Agent.insertMany([
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
  ]);

  console.log("Seeding properties...");
  const propertyData = [
    {
      title: "Sea-view 3BHK Apartment",
      type: "Apartment",
      price: 12500000,
      location: "Mumbai",
      bedrooms: 3,
      bathrooms: 2,
      area: 1450,
      description: "Spacious apartment with panoramic sea views in Bandra.",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
    },
    {
      title: "Luxury Villa with Pool",
      type: "Villa",
      price: 45000000,
      location: "Goa",
      bedrooms: 5,
      bathrooms: 5,
      area: 4800,
      description: "Private pool villa, 5 minutes from the beach.",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
    },
    {
      title: "Modern Studio near Metro",
      type: "Studio",
      price: 3800000,
      location: "Bangalore",
      bedrooms: 1,
      bathrooms: 1,
      area: 480,
      description: "Fully furnished studio ideal for professionals.",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
    },
    {
      title: "Family House in Suburbs",
      type: "House",
      price: 8500000,
      location: "Pune",
      bedrooms: 4,
      bathrooms: 3,
      area: 2200,
      description: "Quiet neighbourhood with garden and 2-car parking.",
      image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800",
    },
    {
      title: "Commercial Office Space",
      type: "Commercial",
      price: 22000000,
      location: "Delhi",
      bedrooms: 0,
      bathrooms: 2,
      area: 1800,
      description: "Ready-to-move office in Connaught Place.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
    },
    {
      title: "Residential Plot",
      type: "Plot",
      price: 6500000,
      location: "Hyderabad",
      bedrooms: 0,
      bathrooms: 0,
      area: 2400,
      description: "Corner plot in gated community, clear titles.",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
    },
    {
      title: "Penthouse with Terrace",
      type: "Apartment",
      price: 35000000,
      location: "Mumbai",
      bedrooms: 4,
      bathrooms: 4,
      area: 3200,
      description: "Duplex penthouse with private terrace and jacuzzi.",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
    },
    {
      title: "Budget 2BHK Flat",
      type: "Apartment",
      price: 4200000,
      location: "Ahmedabad",
      bedrooms: 2,
      bathrooms: 2,
      area: 950,
      description: "Well-ventilated flat in a family-friendly society.",
      image: "https://images.unsplash.com/photo-1494526585095-c41746248156?w=800",
    },
    {
      title: "Heritage Bungalow",
      type: "House",
      price: 28000000,
      location: "Jaipur",
      bedrooms: 6,
      bathrooms: 5,
      area: 5000,
      description: "Restored heritage bungalow with courtyard.",
      image: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800",
    },
    {
      title: "Beachside Villa",
      type: "Villa",
      price: 62000000,
      location: "Chennai",
      bedrooms: 4,
      bathrooms: 4,
      area: 3800,
      description: "Direct beach access, fully furnished, ECR.",
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800",
    },
  ];

  // Round-robin agent assignment
  const properties = await Property.insertMany(
    propertyData.map((p, i) => ({
      ...p,
      owner: owner._id,
      agent: agents[i % agents.length]._id,
    }))
  );

  console.log("Seeding inquiries...");
  await Inquiry.insertMany([
    {
      name: "Amit Patel",
      email: "amit@example.com",
      phone: "9876543210",
      message: "Interested in a site visit this weekend.",
      propertyId: properties[0]._id,
      agentId: properties[0].agent,
    },
    {
      name: "Neha Gupta",
      email: "neha@example.com",
      phone: "9123456780",
      message: "Is the price negotiable?",
      propertyId: properties[1]._id,
      agentId: properties[1].agent,
    },
  ]);

  console.log("\n✅ Seed complete!");
  console.log("Sample credentials:");
  console.log("  Agent -> agent@homescape.com / Agent@123");
  console.log("  User  -> user@homescape.com  / User@123");

  await mongoose.disconnect();
  process.exit(0);
};

run().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});