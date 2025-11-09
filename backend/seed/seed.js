import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import BuySellPost from "../models/BuySellPost.js";
import HousingPost from "../models/HousingPost.js";
import Event from "../models/Event.js";
import SportsPost from "../models/SportsPost.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/campushub";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const seed = async () => {
  try {
    await mongoose.connection.dropDatabase();
    console.log("Database cleared");

    // --- Users ---
    const password = await bcrypt.hash("123456", 10);

    const admin = await User.create({
      name: "Admin User",
      email: "admin@sust.edu",
      regNo: "ADMIN001",
      department: "CSE",
      batch: "2020",
      role: "admin",
      verified: true,
      password,
    });

    const students = await User.create([
      {
        name: "Student One",
        email: "student1@student.sust.edu",
        regNo: "2021001",
        department: "CSE",
        batch: "2021",
        role: "student",
        verified: true,
        password,
      },
      {
        name: "Student Two",
        email: "student2@student.sust.edu",
        regNo: "2021002",
        department: "CSE",
        batch: "2021",
        role: "student",
        verified: true,
        password,
      },
    ]);

    // --- Buy/Sell Posts ---
    await BuySellPost.create([
      {
        title: "Used Laptop",
        description: "Good condition laptop for sale",
        price: 15000,
        category: "Electronics",
        location: "CSE Hall",
        postedBy: students[0]._id,
        status: "available",
      },
      {
        title: "Textbooks for Sale",
        description: "Math and Programming books",
        price: 500,
        category: "Books",
        location: "CSE Hall",
        postedBy: students[1]._id,
        status: "available",
      },
    ]);

    // --- Housing Posts ---
    await HousingPost.create([
      {
        type: "Mess",
        location: "Hall-1",
        rent: 1500,
        description: "Mess available for 2 students",
        contact: "017xxxxxxx",
        postedBy: students[0]._id,
      },
      {
        type: "Flat",
        location: "Near Campus",
        rent: 5000,
        description: "1 room flat for rent",
        contact: "018xxxxxxx",
        postedBy: students[1]._id,
      },
    ]);

    // --- Event Posts ---
    await Event.create([
      {
        eventName: "SUST Tech Fest",
        organizer: "CSE Club",
        date: new Date("2025-12-20"),
        time: "10:00",
        venue: "Auditorium",
        description: "Annual tech festival with competitions",
        postedBy: students[0]._id,
      },
    ]);

    // --- Sports Posts ---
    await SportsPost.create([
      {
        sportName: "Football",
        updateType: "Match",
        description: "SUST vs DU at 5 PM",
        postedBy: students[1]._id,
      },
    ]);

    console.log("Seeding completed");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

connectDB().then(seed);
