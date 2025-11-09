const BorrowPost = require('../models/BorrowPost');
const { validateBorrowInput } = require('../utils/validators');

/**
 * GET /api/borrow
 * List borrow posts
 */
async function listBorrow(req, res, next) {
  try {
    const page = Math.max(1, parseInt(req.query.page || '1', 10));
    const limit = Math.min(100, parseInt(req.query.limit || '20', 10));
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.q) filter.itemName = new RegExp(req.query.q, 'i');

    const [items, total] = await Promise.all([
      BorrowPost.find(filter).populate('owner borrower', 'name email avatar').sort({ createdAt: -1 }).skip(skip).limit(limit),
      BorrowPost.countDocuments(filter)
    ]);

    res.json({ items, meta: { page, limit, total } });
  } catch (err) {
    next(err);
  }
}

/**
 * POST /api/borrow
 */
async function createBorrow(req, res, next) {
  try {
    const payload = req.body;
    const errors = validateBorrowInput(payload);
    if (errors.length) return res.status(400).json({ message: 'Validation failed', errors });

    const post = await BorrowPost.create({
      itemName: payload.itemName,
      description: payload.description || '',
      requestDate: new Date(payload.requestDate),
      returnDate: payload.returnDate ? new Date(payload.returnDate) : null,
      owner: req.userId
    });

    const populated = await post.populate('owner', 'name email avatar');
    res.status(201).json(populated);
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/borrow/:id
 */
async function getBorrow(req, res, next) {
  try {
    const post = await BorrowPost.findById(req.params.id).populate('owner borrower', 'name email avatar');
    if (!post) return res.status(404).json({ message: 'Not found' });
    res.json(post);
  } catch (err) {
    next(err);
  }
}

/**
 * PUT /api/borrow/:id
 * Owner may edit. Borrower may be set when someone takes the item.
 */
async function updateBorrow(req, res, next) {
  try {
    const post = await BorrowPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Not found' });

    if (post.owner.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not allowed' });
    }

    const payload = req.body;
    const errors = validateBorrowInput(Object.assign({}, post.toObject(), payload));
    if (errors.length) return res.status(400).json({ message: 'Validation failed', errors });

    post.itemName = payload.itemName ?? post.itemName;
    post.description = payload.description ?? post.description;
    post.requestDate = payload.requestDate ? new Date(payload.requestDate) : post.requestDate;
    post.returnDate = payload.returnDate ? new Date(payload.returnDate) : post.returnDate;
    // borrower shouldn't be set by owner here generally; but allow if present
    if (payload.borrower) post.borrower = payload.borrower;

    await post.save();
    const populated = await post.populate('owner borrower', 'name email avatar');
    res.json(populated);
  } catch (err) {
    next(err);
  }
}

/**
 * DELETE /api/borrow/:id
 * Owner or admin
 */
async function deleteBorrow(req, res, next) {
  try {
    const post = await BorrowPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Not found' });

    if (post.owner.toString() !== req.userId && req.userRole !== 'admin') {
      return res.status(403).json({ message: 'Not allowed' });
    }

    await post.deleteOne();
    res.json({ message: 'Deleted' });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listBorrow,
  createBorrow,
  getBorrow,
  updateBorrow,
  deleteBorrow
};
