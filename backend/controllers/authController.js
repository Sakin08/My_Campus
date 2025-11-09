// backend/controllers/authController.js
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import cloudinary from "../config/cloudinary.js";

// REGISTER
export const registerUser = async (req, res) => {
  const { name, regNo, email, password, department, batch } = req.body;

  if (!name || !regNo || !email || !password) {
    return res.status(400).json({ message: "Please fill all required fields" });
  }

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { regNo }] });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email or regNo already exists" });
    }

    const user = await User.create({
      name,
      regNo,
      email,
      password,
      department,
      batch,
      role: "student",
      verified: false,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      regNo: user.regNo,
      role: user.role,
      department: user.department,
      batch: user.batch,
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// LOGIN
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      regNo: user.regNo,
      role: user.role,
      department: user.department,
      batch: user.batch,
      avatar: user.avatar,
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET ME
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE PROFILE WITH CLOUDINARY
export const updateProfile = async (req, res) => {
  const { name, email, department, batch, currentPassword, newPassword, avatar } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update text fields
    if (name) user.name = name;
    if (email) {
      const existing = await User.findOne({ email, _id: { $ne: user._id } });
      if (existing) return res.status(400).json({ message: "Email already in use" });
      user.email = email;
    }
    if (department) user.department = department;
    if (batch) user.batch = batch;

    // Upload avatar to Cloudinary
    if (avatar) {
      // Delete old avatar if exists
      if (user.avatar) {
        try {
          const publicId = user.avatar.split("/").pop().split(".")[0];
          await cloudinary.uploader.destroy(publicId);
        } catch (err) {
          console.log("Old avatar delete failed:", err);
        }
      }

      // Upload new avatar
      const result = await cloudinary.uploader.upload(avatar, {
        folder: "campus-hub/avatars",
        width: 300,
        height: 300,
        crop: "fill",
        quality: "auto",
        format: "webp", // Modern format
      });

      user.avatar = result.secure_url;
    }

    // Change password
    if (currentPassword && newPassword) {
      const isMatch = await user.comparePassword(currentPassword);
      if (!isMatch) return res.status(400).json({ message: "Current password incorrect" });
      if (newPassword.length < 6) return res.status(400).json({ message: "Password too short" });
      
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }

    await user.save();
    const token = generateToken(user._id, user.role);

    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        regNo: user.regNo,
        role: user.role,
        department: user.department,
        batch: user.batch,
        avatar: user.avatar,
      },
      token,
    });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};