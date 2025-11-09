import ClubPost from "../models/ClubPost.js";

// CREATE
export const createClubPost = async (req, res) => {
  try {
    const post = new ClubPost({ ...req.body, postedBy: req.user.id });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ ALL
export const getClubPosts = async (req, res) => {
  try {
    const posts = await ClubPost.find().populate("postedBy", "name email").sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ SINGLE
export const getClubPost = async (req, res) => {
  try {
    const post = await ClubPost.findById(req.params.id).populate("postedBy", "name email");
    if (!post) return res.status(404).json({ message: "Not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
export const updateClubPost = async (req, res) => {
  try {
    const post = await ClubPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Not found" });
    if (post.postedBy.toString() !== req.user.id && req.user.role !== "admin")
      return res.status(403).json({ message: "Forbidden" });

    const updated = await ClubPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE
export const deleteClubPost = async (req, res) => {
  try {
    const post = await ClubPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Not found" });
    if (post.postedBy.toString() !== req.user.id && req.user.role !== "admin")
      return res.status(403).json({ message: "Forbidden" });

    await post.deleteOne();
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
