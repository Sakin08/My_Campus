import HousingPost from "../models/HousingPost.js";

export const createHousing = async (req, res) => {
  try {
    const post = await HousingPost.create({
      ...req.body,
      postedBy: req.user._id,
    });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getHousings = async (req, res) => {
  try {
    const posts = await HousingPost.find().populate("postedBy", "name email");
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
