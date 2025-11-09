const express = require('express');
const router = express.Router();
const borrow = require('../controllers/borrowController');
const { requireAuth } = require('../middlewares/authMiddleware');

router.get('/', borrow.listBorrow);
router.post('/', requireAuth, borrow.createBorrow);
router.get('/:id', borrow.getBorrow);
router.put('/:id', requireAuth, borrow.updateBorrow);
router.delete('/:id', requireAuth, borrow.deleteBorrow);

module.exports = router;
