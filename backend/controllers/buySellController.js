import BuySellPost from "../models/BuySellPost.js";

// Create post
export const createPost = async (req, res) => {
  try {
    const post = await BuySellPost.create({
      ...req.body,
      postedBy: req.user._id,
    });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all posts
export const getPosts = async (req, res) => {
  try {
    const posts = await BuySellPost.find().populate("postedBy", "name email");
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single post
export const getPost = async (req, res) => {
  try {
    const post = await BuySellPost.findById(req.params.id).populate(
      "postedBy",
      "name email"
    );
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
