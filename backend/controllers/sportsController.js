import SportsPost from "../models/SportsPost.js";

export const createSportPost = async (req, res) => {
  try {
    const post = await SportsPost.create({
      ...req.body,
      postedBy: req.user._id,
    });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getSportsPosts = async (req, res) => {
  try {
    const posts = await SportsPost.find().populate("postedBy", "name email");
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
